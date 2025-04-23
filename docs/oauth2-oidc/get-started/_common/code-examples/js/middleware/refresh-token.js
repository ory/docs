// Middleware to refresh tokens
const refreshToken = async (req, res, next) => {
  if (!config) {
    return res
      .status(500)
      .send("Configuration not ready yet. Please try again in a moment.")
  }

  try {
    // Use the refresh token to get new tokens
    const tokens = await client.refreshTokenGrant(
      config,
      req.session.tokens.refresh_token,
    )

    // Update the tokens in the session
    req.session.tokens = tokens

    // Continue with the request
    next()
  } catch (error) {
    console.error("Token refresh error:", error)
    // Clear session and redirect to login
    req.session.destroy()
    res.redirect("/login")
  }
}
