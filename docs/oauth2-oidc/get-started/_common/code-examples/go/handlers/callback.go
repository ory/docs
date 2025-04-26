import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/oauth2"
)

func handleCallback(w http.ResponseWriter, r *http.Request) {
	// Get session cookie
	cookie, err := r.Cookie("session_id")
	if err != nil {
		http.Error(w, "No session found", http.StatusBadRequest)
		return
	}

	// Get session from store
	session, ok := sessions[cookie.Value]
	if !ok {
		http.Error(w, "Invalid session", http.StatusBadRequest)
		return
	}

	// Get authorization code and state from query parameters
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	if code == "" || state == "" || state != session.State {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Exchange authorization code for token
	token, err := oauthConfig.Exchange(
		context.Background(),
		code,
		oauth2.VerifierOption(session.CodeVerifier),
	)
	if err != nil {
		http.Error(w, "Failed to exchange token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Update session with token
	session.Token = token
	sessions[cookie.Value] = session

	// Fetch user info
	client := oauthConfig.Client(context.Background(), token)
	userInfoURL := fmt.Sprintf("https://%s.projects.oryapis.com/userinfo", projectSlug)
	resp, err := client.Get(userInfoURL)
	if err != nil {
		http.Error(w, "Failed to fetch user info: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Parse user info response
	var userInfo map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		http.Error(w, "Failed to parse user info: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Update session with user info
	session.UserInfo = userInfo
	sessions[cookie.Value] = session

	// Redirect to home page
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
