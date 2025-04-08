package main

import (
	"context"
	"fmt"
	"net/http"
	
	ory "github.com/ory/client-go"
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Initialize the Ory client
		configuration := ory.NewConfiguration()
		configuration.Servers = []ory.ServerConfiguration{
			{
				URL: "https://$PROJECT_SLUG.projects.oryapis.com",
			},
		}
		client := ory.NewAPIClient(configuration)
		
		// Check if user is authenticated
		cookie := r.Header.Get("Cookie")
		session, _, err := client.FrontendApi.ToSession(context.Background()).Cookie(cookie).Execute()
		
		if err != nil {
			// Not authenticated, redirect to login
			http.Redirect(w, r, "/login", http.StatusFound)
			return
		}
		
		// User is authenticated, add session to context
		ctx := context.WithValue(r.Context(), "session", session)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	// Get session from context
	session := r.Context().Value("session").(*ory.Session)
	
	// Access user data
	userId := session.Identity.Id
	email := session.Identity.Traits["email"]
	
	// Render dashboard with user data
	fmt.Fprintf(w, "Welcome, %s", email)
}