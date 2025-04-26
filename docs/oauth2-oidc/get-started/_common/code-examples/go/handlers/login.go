
import (
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"time"

	"golang.org/x/oauth2"
)

func handleLogin(w http.ResponseWriter, r *http.Request) {
	// Generate random state parameter
	state, err := generateRandomString(32)
	if err != nil {
		http.Error(w, "Failed to generate state parameter", http.StatusInternalServerError)
		return
	}

	// Generate code verifier for PKCE
	codeVerifier := oauth2.GenerateVerifier()

	// Create a new session
	sessionID, err := generateRandomString(32)
	if err != nil {
		http.Error(w, "Failed to generate session ID", http.StatusInternalServerError)
		return
	}

	// Store session
	sessions[sessionID] = Session{
		State:        state,
		CodeVerifier: codeVerifier,
	}

	// Set session cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		Secure:   r.TLS != nil,
		MaxAge:   int(24 * time.Hour.Seconds()),
	})

	// Generate authorization URL with PKCE challenge
	authURL := oauthConfig.AuthCodeURL(
		state,
		oauth2.S256ChallengeOption(codeVerifier),
	)

	// Redirect to authorization server
	http.Redirect(w, r, authURL, http.StatusSeeOther)
}

func generateRandomString(length int) (string, error) {
	b := make([]byte, length)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(b), nil
}
