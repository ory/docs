// Create logout route
export const registerLogoutRoute = (app, ory) => {
  app.get("/logout", async (req, res) => {
    try {
      // Create a logout flow
      const { data } = await ory.createBrowserLogoutFlow({
        cookie: req.header("cookie"),
      })
      const logoutUrl = data.logout_url || data.logoutUrl
      // Redirect to logout URL
      res.redirect(logoutUrl)
    } catch (err) {
      res.redirect("/")
    }
  })
}
