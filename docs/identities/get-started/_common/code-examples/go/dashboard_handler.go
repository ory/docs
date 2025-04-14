// dashboard_handler.go
package main

import (
	"encoding/json"
	"net/http"
)

// dashboardHandler simply displays the session information
func (app *App) dashboardHandler(writer http.ResponseWriter, request *http.Request) {
	// Get the session from context
	session, err := getSession(request.Context())
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the session data as JSON
	writer.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(writer)
	encoder.SetIndent("", "  ")
	encoder.Encode(session)
}
