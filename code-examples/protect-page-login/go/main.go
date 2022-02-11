package main

import (
	"fmt"
	ory "github.com/ory/client-go"
	"net/http"
	"os"
)

type App struct {
	ory *ory.APIClient
	// save the cookies for any upstream calls to the Ory apis
	cookies string
	// save the session to display it on the dashboard
	session *ory.Session
}

func main() {
	// register a new Ory client with the URL set to the Ory CLI Proxy
	// we can also read the URL from the env or a config file
	c := ory.NewConfiguration()
	c.Servers = ory.ServerConfigurations{{URL: "http://localhost:4000/.ory"}}

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
