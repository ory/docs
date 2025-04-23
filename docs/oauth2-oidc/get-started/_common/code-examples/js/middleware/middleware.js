const requireAuth = (req, res, next) => {
  if (!req.session.tokens || !req.session.tokens.access_token) {
    // User is not authenticated, redirect to login
    return res.redirect("/login")
  }

  // Check if the token is expired
  if (req.session.tokens.expiresIn && req.session.tokens.expiresIn() <= 0) {
    // Token is expired, we need to refresh it if we have a refresh token
    if (req.session.tokens.refresh_token) {
      // We'll handle refresh in a separate middleware
      return refreshToken(req, res, next)
    } else {
      // No refresh token, redirect to login
      return res.redirect("/login")
    }
  }

  // User is authenticated with a valid token
  next()
}
