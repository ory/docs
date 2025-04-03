// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

package main

import (
	"context"
	"errors"
	"log"
	"net/http"

	ory "github.com/ory/client-go"
)

func (app *App) sessionMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		log.Printf("handling middleware request\n")

		// This example passes all request.Cookies to `ToSession` function.
		//
		// However, it is enough to pass only the value of the `ory_session_projectslug` cookie to the endpoint.
		cookies := request.Header.Get("Cookie")

		// A native app would submit the session token instead of a cookie.
		// You can look up session tokens the same way by using the `XSessionToken` setter on the `ToSession` function.

		// Look up session.
		session, _, err := app.ory.FrontendAPI.ToSession(request.Context()).Cookie(cookies).Execute()
		// Check if a session exists and if it is active.
		// You could add your own logic here to check if the session is valid for the specific endpoint, e.g. using the `session.AuthenticatedAt` field.
		// Redirect to login if session doesn't exist or is inactive
		if err != nil || (err == nil && !*session.Active) {
			log.Printf("No active session, redirecting to login\n")
			// Redirect to the tunnel URL, not the local app
			http.Redirect(writer, request, app.tunnelUrl+"/ui/login", http.StatusSeeOther)
			return
		}

		// Add the session details to the context for handlers to access.
		ctx := withSession(request.Context(), session)

		// Continue to the next handler (the dashboard in the simple example).
		next.ServeHTTP(writer, request.WithContext(ctx))
	}
}

func withSession(ctx context.Context, v *ory.Session) context.Context {
	return context.WithValue(ctx, "req.session", v)
}

func getSession(ctx context.Context) (*ory.Session, error) {
	session, ok := ctx.Value("req.session").(*ory.Session)
	if !ok || session == nil {
		return nil, errors.New("session not found in context")
	}
	return session, nil
}
