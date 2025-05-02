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
		log.Printf("Checking authentication status\n")

		// Pass cookies to Ory's ToSession endpoint
		cookies := request.Header.Get("Cookie")

		// Verify session with Ory
		session, _, err := app.ory.FrontendAPI.ToSession(request.Context()).Cookie(cookies).Execute()

		// Redirect to login if session doesn't exist or is inactive
		if err != nil || (err == nil && !*session.Active) {
			log.Printf("No active session, redirecting to login\n")
			// Redirect to the login page
			http.Redirect(writer, request, app.tunnelUrl+"/self-service/login/browser", http.StatusSeeOther)
			return
		}
		// highlight-start
		if *session.AuthenticatorAssuranceLevel != "aal2" {
			http.Redirect(writer, request, app.tunnelUrl+"/self-service/login/browser?aal=aal2", http.StatusSeeOther)
			return
		}
		// highlight-end

		// Add session to context for the handler
		ctx := withSession(request.Context(), session)
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

// Dashboard page protected by middleware
mux.Handle("/", app.sessionMiddleware(app.dashboardHandler))
