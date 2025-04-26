package main

import (
	"fmt"
	"os"

	"golang.org/x/oauth2"
)

// Configuration
var (
	// Replace these with your own values
	clientID     = os.Getenv("OAUTH_CLIENT_ID")
	clientSecret = os.Getenv("OAUTH_CLIENT_SECRET")
	projectSlug  = os.Getenv("ORY_PROJECT_SLUG")
	redirectURL  = os.Getenv("OAUTH_REDIRECT_URI")
	port         = "3000"

	// Ory OAuth2 endpoints
	oryEndpoint = oauth2.Endpoint{
		AuthURL:  fmt.Sprintf("https://%s.projects.oryapis.com/oauth2/auth", projectSlug),
		TokenURL: fmt.Sprintf("https://%s.projects.oryapis.com/oauth2/token", projectSlug),
	}

	// OAuth2 config
	oauthConfig = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{"openid", "offline_access", "email"},
		Endpoint:     oryEndpoint,
	}

	// In-memory session store (replace with a proper session store in production)
	sessions = make(map[string]Session)
)

// Session represents user session data
type Session struct {
	State        string
	CodeVerifier string
	Token        *oauth2.Token
	UserInfo     map[string]interface{}
}
