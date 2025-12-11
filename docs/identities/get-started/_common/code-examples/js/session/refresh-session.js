export const registerRefreshSessionRoute = (app, baseUrl) => {
  app.get("/refresh-session", async (req, res) => {
    // Redirect to login with refresh=true parameter
    res.redirect(`${baseUrl}/ui/login?refresh=true`)
  })
}
