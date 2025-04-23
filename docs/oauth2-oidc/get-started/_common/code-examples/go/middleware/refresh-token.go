// RefreshToken refreshes an expired token if a refresh token is available
func RefreshToken(session *Session) (*oauth2.Token, error) {
	if session.Token == nil || session.Token.RefreshToken == "" {
		return nil, fmt.Errorf("no refresh token available")
	}

	// Create a TokenSource with the current token
	tokenSource := oauthConfig.TokenSource(context.Background(), session.Token)

	// Get a new token (this will use the refresh token if the access token is expired)
	newToken, err := tokenSource.Token()
	if err != nil {
		return nil, fmt.Errorf("failed to refresh token: %w", err)
	}

	// Log successful token refresh (optional)
	log.Println("Token refreshed successfully")

	return newToken, nil
}
