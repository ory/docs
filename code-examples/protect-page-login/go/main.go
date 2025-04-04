package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	ory "github.com/ory/client-go"
)

type App struct {
	ory       *ory.APIClient
	tunnelUrl string
}

func main() {
	tunnelPort := os.Getenv("TUNNEL_PORT")
	if tunnelPort == "" {
		tunnelPort = "4000"
	}

	// Configure Ory client to use tunnel
	c := ory.NewConfiguration()
	c.Servers = ory.ServerConfigurations{{URL: fmt.Sprintf("http://localhost:%s", tunnelPort)}}

	// Store the tunnel URL for redirects
	tunnelUrl := fmt.Sprintf("http://localhost:%s", tunnelPort)

	app := &App{
		ory:       ory.NewAPIClient(c),
		tunnelUrl: tunnelUrl,
	}
	mux := http.NewServeMux()

	// dashboard
	mux.Handle("/", app.sessionMiddleware(app.dashboardHandler))

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	fmt.Printf("Application launched and running on http://127.0.0.1:%s\n", port)
	fmt.Printf("Make sure to run Ory Tunnel in another terminal:\n")
	fmt.Printf("npx @ory/cli tunnel --dev http://localhost:%s\n", port)

	// start the server
	err := http.ListenAndServe(":"+port, mux)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Println("Server closed")
		return
	}
	fmt.Printf("Could not start server: %s\n", err)
}
