// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

package main

import (
	"bytes"
	"encoding/json"
	"html/template"
	"net/http"
)

func (app *App) dashboardHandler(writer http.ResponseWriter, request *http.Request) {
	// Get the session from the context. It was added to the context by the sessionMiddleware.
	session, err := getSession(request.Context())
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	// Encode the session data as pretty JSON.
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(session); err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	// Render the dashboard template with the session data.
	err = dashboardTemplate.ExecuteTemplate(writer, "index.html", buffer.String())
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}
}

var dashboardTemplate *template.Template

func init() {
	var err error
	dashboardTemplate, err = template.New("index.html").Parse(`
<html lang="en">
  <head>
    <title>Ory Network secured Go web app</title>
  </head>
  <body>
    <h1>Dashboard</h1>
    <hr />
    <h2>Your Session Data:</h2>
    <code>{{ . }}</code>
  </body>
</html>
`)
	if err != nil {
		panic(err)
	}
}
