# Protect page login Example in Go

This example demonstrates protecting a page in a Go web server using the Ory SDK and Ory Account Experience.

For the full step-by-step guide, see: [Integrate authentication into Go](https://www.ory.sh/docs/getting-started/integrate-auth/go)

## Prerequisites

- Go 1.20+
- Node.js (to run Ory CLI via `npx`)
- An Ory Network project and the Ory CLI logged in

## Run locally

1. Build and run the server:

```bash
go build -o server
./server
```

2. In another terminal, start the Ory Tunnel pointing to your local app:

```bash
npx @ory/cli tunnel --dev http://localhost:3000 --project <project_id>
```

3. Open http://localhost:3000 in your browser. You will be redirected to the Ory Account Experience for sign-in, and then returned to the protected page.

## Notes

- The server reads the tunnel port from `TUNNEL_PORT` (defaults to `4000`) and app port from `PORT` (defaults to `3000`).
- This example’s middleware uses `ToSession` to validate the user session and redirects unauthenticated users to the login UI served via the Ory Tunnel.
