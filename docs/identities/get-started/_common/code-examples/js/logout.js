// Create logout route
app.get("/logout", async (req, res) => {
  try {
    // Create a logout flow
    const { data: logoutFlow } = await ory.createBrowserLogoutFlow({
      cookie: req.header("cookie"),
    })

    // Redirect to logout URL
    res.redirect(logoutFlow.logout_url)
  } catch (err) {
    console.error("Logout error:", err)
    // Already logged out or error, redirect to login
    res.redirect("/login")
  }
})
