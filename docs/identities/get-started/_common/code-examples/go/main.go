// main.go
package main

import (
	"fmt"
	"net/http"
	"os"

	ory "github.com/ory/client-go"
)

// App holds application state
type App struct {
	ory       *ory.APIClient
	tunnelUrl string
}

func main() {
	// Get tunnel port from environment or use default
	tunnelPort := os.Getenv("ORY_SDK_URL")
	if tunnelPort == "" {
		tunnelPort = "4000"
	}

	// Configure baseUrl for local development
	baseUrl := fmt.Sprintf("http://localhost:%s", tunnelPort)

	// Configure Ory SDK
	configuration := ory.NewConfiguration()
	configuration.Servers = ory.ServerConfigurations{{URL: baseUrl}}

	// Create Ory client
	oryClient := ory.NewAPIClient(configuration)

	// Initialize application
	app := &App{
		ory:       oryClient,
		tunnelUrl: baseUrl,
	}

	// Setup routes
	mux := http.NewServeMux()
	mux.HandleFunc("/login", app.loginHandler)
	mux.HandleFunc("/logout", app.logoutHandler)
	mux.HandleFunc("/refresh-session", app.refreshSessionHandler)
	mux.Handle("/", app.sessionMiddleware(app.dashboardHandler))

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	// Print tunnel command for convenience
	fmt.Printf("Starting server on port %s. Use tunnel with:\n", port)
	fmt.Printf("npx @ory/cli tunnel --dev http://localhost:%s\n", port)

	// Start the server
	err := http.ListenAndServe(":"+port, mux)
	if err != nil {
		fmt.Printf("Could not start server: %s\n", err)
	}
}
