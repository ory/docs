// Login route
app.get("/login", async (req, res) => {
  if (!config) {
    return res
      .status(500)
      .send("Configuration not ready yet. Please try again in a moment.")
  }

  try {
    // Generate PKCE code verifier
    const code_verifier = client.randomPKCECodeVerifier()

    // Calculate code challenge from verifier
    const code_challenge =
      await client.calculatePKCECodeChallenge(code_verifier)

    // Generate state for CSRF protection
    const state = client.randomState()

    // Store in session for later verification
    req.session.codeVerifier = code_verifier
    req.session.state = state

    // Build authorization parameters
    const parameters = {
      redirect_uri: "http://localhost:3000/callback",
      scope: "openid email offline_access",
      code_challenge,
      code_challenge_method: "S256",
      state,
    }

    // Build authorization URL
    const redirectTo = client.buildAuthorizationUrl(config, parameters)

    // Redirect user to authorization server
    console.log("Redirecting to:", redirectTo.href)
    res.redirect(redirectTo.href)
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).send(`Login error: ${error.message}`)
  }
})
