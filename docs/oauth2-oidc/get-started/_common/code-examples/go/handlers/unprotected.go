func handleHome(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_id")
	var loggedIn bool
	var userInfo map[string]interface{}

	if err == nil {
		if session, ok := sessions[cookie.Value]; ok && session.Token != nil && session.Token.Valid() {
			loggedIn = true
			userInfo = session.UserInfo
		}
	}

	w.Header().Set("Content-Type", "text/html")
	if loggedIn {
		// Display logged-in page with user info
		fmt.Fprintf(w, `
			<html>
				<head><title>OAuth2 Test</title></head>
				<body>
					<h1>Welcome!</h1>
					<p>You are logged in.</p>
					<h2>User Info:</h2>
					<pre>%v</pre>
					<p><a href="/profile">View Profile</a></p>
					<p><a href="/logout">Logout</a></p>
				</body>
			</html>
		`, userInfo)
	} else {
		// Display login page
		fmt.Fprintf(w, `
			<html>
				<head><title>OAuth2 Test</title></head>
				<body>
					<h1>Welcome</h1>
					<p>You are not logged in.</p>
					<p><a href="/login">Login</a></p>
				</body>
			</html>
		`)
	}
}
