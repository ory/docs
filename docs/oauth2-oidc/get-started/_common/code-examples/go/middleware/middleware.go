// RequireAuth middleware with explicit token refresh
func RequireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get session cookie
		cookie, err := r.Cookie("session_id")
		if err != nil {
			// No session cookie, redirect to login
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		// Get session from store
		session, ok := sessions[cookie.Value]
		if !ok {
			// Session not found, redirect to login
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		// Check if token is valid
		if session.Token == nil || !session.Token.Valid() {
			// Token expired, try to refresh it
			if session.Token != nil && session.Token.RefreshToken != "" {
				// Call the dedicated refresh function
				newToken, err := RefreshToken(&session)
				if err != nil {
					// Refresh failed, redirect to login
					log.Printf("Token refresh failed: %v", err)
					http.Redirect(w, r, "/login", http.StatusSeeOther)
					return
				}

				// Update session with new token
				session.Token = newToken
				sessions[cookie.Value] = session
			} else {
				// No refresh token, redirect to login
				http.Redirect(w, r, "/login", http.StatusSeeOther)
				return
			}
		}

		// Token is valid, proceed to the next handler
		next(w, r)
	}
}
