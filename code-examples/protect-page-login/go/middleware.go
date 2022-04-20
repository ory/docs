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

		// this example passes all request.Cookies
		// to `ToSession` function
		//
		// However, you can pass only the value of
		// ory_session_projectid cookie to the endpoint
		cookies = request.Header.Get("Cookie")

		// check if we have a session
		session, _, err := app.ory.V0alpha2Api.ToSession(request.Context()).Cookie(cookies).Execute()
		if (err != nil && session == nil) || (err == nil && !*session.Active) {
			// this will redirect the user to the managed Ory Login UI
			http.Redirect(writer, request, "/.ory/self-service/login/browser", http.StatusSeeOther)
			return
		}
		app.cookies = cookies
		app.session = session
		// continue to the requested page (in our case the Dashboard)
		next.ServeHTTP(writer, request)
		return
	}
}
