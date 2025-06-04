package main

import (
	"log"
	"net/http"
)

// LogoutHandler handles the /logout route
func (app *App) logoutHandler(writer http.ResponseWriter, request *http.Request) {
	// Get cookies from the request
	cookies := request.Header.Get("Cookie")

	// Create a logout flow
	logoutFlow, _, err := app.ory.FrontendAPI.CreateBrowserLogoutFlow(request.Context()).
		Cookie(cookies).
		Execute()

	if err != nil {
		log.Printf("Error creating logout flow: %v", err)
		// Redirect to home page if there's an error
		http.Redirect(writer, request, "/", http.StatusSeeOther)
		return
	}

	// Redirect to the logout URL
	http.Redirect(writer, request, logoutFlow.LogoutUrl, http.StatusSeeOther)
}
