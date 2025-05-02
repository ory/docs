package main

import (
	"io"
	"net/http"
)

// LoginHandler handles the /login route
func (app *App) loginHandler(writer http.ResponseWriter, request *http.Request) {
	// Get cookies from the request
	cookies := request.Header.Get("Cookie")

	// Try to verify session with Ory
	session, response, err := app.ory.FrontendAPI.ToSession(request.Context()).Cookie(cookies).Execute()

	// If there's an error or session is not active, redirect to login UI
	if err != nil || (err == nil && !*session.Active) {
		http.Redirect(writer, request, app.tunnelUrl+"/self-service/login/browser", http.StatusSeeOther)
		return
	}

	// If session is valid, send the session data as JSON response
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	// Use io.Copy to copy the response body to the writer
	io.Copy(writer, response.Body)
}
