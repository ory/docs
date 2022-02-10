package main

import (
	"log"
	"net/http"
)

func (app *App) sessionMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		log.Printf("handling middleware request\n")

		// set the cookies on the ory client
		var cookies string
		for _, cookie := range request.Cookies() {
			cookies += cookie.String() + ";"
		}

		// check if we have a session
		session, _, err := app.ory.V0alpha2Api.ToSession(request.Context()).Cookie(cookies).Execute()
		if (err != nil && session == nil) || (err == nil && !*session.Active) {
			// this will redirect the user to the manager Ory Login UI
			http.Redirect(writer, request, "/.ory/api/kratos/public/self-service/login/browser", http.StatusSeeOther)
			return
		}
		app.cookies = cookies
		app.session = session
		// continue with the requested page
		next.ServeHTTP(writer, request)
		return
	}
}
