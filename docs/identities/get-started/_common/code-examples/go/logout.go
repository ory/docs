package main

import (
	"context"
	"net/http"
	
	ory "github.com/ory/client-go"
)

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	// Initialize the Ory client
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "https://$PROJECT_SLUG.projects.oryapis.com",
		},
	}
	client := ory.NewAPIClient(configuration)
	
	// Create a logout flow
	cookie := r.Header.Get("Cookie")
	flow, _, err := client.FrontendApi.CreateBrowserLogoutFlow(context.Background()).Cookie(cookie).Execute()
	
	if err != nil {
		// Already logged out or error, redirect to login
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}
	
	// Redirect to logout URL
	http.Redirect(w, r, flow.LogoutUrl, http.StatusFound)
}