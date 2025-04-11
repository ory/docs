// Create logout route
app.get("/logout", async (req, res) => {
  try {
    // Create a logout flow
    const { logout_url } = await ory.createBrowserLogoutFlow({
      cookie: req.header("cookie"),
    })
    // Redirect to logout URL
    res.redirect(logout_url)
  } catch (err) {
    res.redirect("/")
  }
})
