// Check if a user is authenticated
const requireAuth = async (req, res, next) => {
  try {
    // This verifies the session and throws an error if not authenticated
    const { data: session } = await ory.toSession({
      cookie: req.header("cookie"),
    })

    // Make session available to the route handler
    req.session = session
    next()
  } catch (err) {
    // Not authenticated, redirect to login
    res.redirect("/login")
  }
}

// Use the middleware for protected routes
app.get("/dashboard", requireAuth, (req, res) => {
  // Access user data
  const userId = req.session.identity.id
  const email = req.session.identity.traits.email

  res.render("dashboard", { user: req.session.identity })
})
