// refresh_handler.go
package main

import (
	"net/http"
)

// RefreshSessionHandler handles the /refresh-session route
func (app *App) refreshSessionHandler(writer http.ResponseWriter, request *http.Request) {
	// Redirect to Ory login UI with refresh=true parameter
	http.Redirect(writer, request, app.tunnelUrl+"/self-service/login/browser?refresh=true", http.StatusSeeOther)
}
