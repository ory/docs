// Verifies the Landlock-symlink-swap claim made in
// docs/security-compliance/landlock-sandbox.mdx: when a directory is granted
// via Landlock, a symlink under that directory can be re-pointed to a sibling
// file at runtime and the sandboxed process keeps reading through it without
// any rule update.
//
// Build and run (Linux 5.13+):
//
//	cd code-examples/landlock-symlink-check
//	go run .
//
// Expected output:
//
//	Workdir: /tmp/landlock-symlink-...
//	Applied Landlock RW grant on directory: /tmp/landlock-symlink-...
//	Before swap, read(current) = "contents of A\n"
//	Swapped symlink to point at b.txt
//	After swap,  read(current) = "contents of B\n"
//	OK: directory grant covers the swap; no restart was needed.
package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/landlock-lsm/go-landlock/landlock"
)

func main() {
	dir, err := os.MkdirTemp("", "landlock-symlink-*")
	if err != nil {
		log.Fatal(err)
	}
	defer os.RemoveAll(dir)
	fmt.Printf("Workdir: %s\n", dir)

	fileA := filepath.Join(dir, "a.txt")
	fileB := filepath.Join(dir, "b.txt")
	link := filepath.Join(dir, "current")

	if err := os.WriteFile(fileA, []byte("contents of A\n"), 0o644); err != nil {
		log.Fatal(err)
	}
	if err := os.WriteFile(fileB, []byte("contents of B\n"), 0o644); err != nil {
		log.Fatal(err)
	}
	if err := os.Symlink(fileA, link); err != nil {
		log.Fatal(err)
	}

	if err := landlock.V4.BestEffort().RestrictPaths(landlock.RWDirs(dir)); err != nil {
		log.Fatalf("RestrictPaths: %v", err)
	}
	fmt.Printf("Applied Landlock RW grant on directory: %s\n", dir)

	before, err := os.ReadFile(link)
	if err != nil {
		log.Fatalf("read before swap: %v", err)
	}
	fmt.Printf("Before swap, read(current) = %q\n", before)
	if string(before) != "contents of A\n" {
		log.Fatalf("unexpected pre-swap contents: %q", before)
	}

	// Atomically re-point the symlink to fileB. This mimics what
	// cert-manager / certbot do at renewal time: write the new file, then
	// swap the symlink to point at it.
	tmpLink := link + ".new"
	if err := os.Symlink(fileB, tmpLink); err != nil {
		log.Fatalf("create replacement symlink: %v", err)
	}
	if err := os.Rename(tmpLink, link); err != nil {
		log.Fatalf("rename replacement symlink over current: %v", err)
	}
	fmt.Printf("Swapped symlink to point at %s\n", filepath.Base(fileB))

	after, err := os.ReadFile(link)
	if err != nil {
		log.Fatalf("read after swap: %v — directory grant did NOT cover the new target", err)
	}
	fmt.Printf("After swap,  read(current) = %q\n", after)
	if string(after) != "contents of B\n" {
		log.Fatalf("unexpected post-swap contents: %q", after)
	}

	fmt.Println("OK: directory grant covers the swap; no restart was needed.")
}
