// Profile handler (protected route)
func handleProfile(w http.ResponseWriter, r *http.Request) {
	// Get session cookie
	cookie, err := r.Cookie("session_id")
	if err != nil {
		http.Error(w, "No session found", http.StatusUnauthorized)
		return
	}

	// Get session from store
	session, ok := sessions[cookie.Value]
	if !ok {
		http.Error(w, "Invalid session", http.StatusUnauthorized)
		return
	}

	// Return profile data
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "This is protected data from the resource server",
		"user":    session.UserInfo,
	})
}
