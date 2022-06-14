package main

import (
	"fmt"
	"net/http"
	"os"

	ory "github.com/ory/client-go"
)

type App struct {
	ory *ory.APIClient
}

func main() {
	proxyPort := os.Getenv("PROXY_PORT")
	if proxyPort == "" {
		proxyPort = "4000"
	}

	// register a new Ory client with the URL set to the Ory CLI Proxy
	// we can also read the URL from the env or a config file
	c := ory.NewConfiguration()
	c.Servers = ory.ServerConfigurations{{URL: fmt.Sprintf("http://localhost:%s/.ory", proxyPort)}}

	app := &App{
		ory: ory.NewAPIClient(c),
	}
	mux := http.NewServeMux()

	// dashboard
	mux.Handle("/", app.sessionMiddleware(app.dashboardHandler()))

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	fmt.Printf("Application launched and running on http://127.0.0.1:%s\n", port)
	// start the server
	http.ListenAndServe(":"+port, mux)
}
