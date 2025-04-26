import session from "express-session"
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
)
app.get("/callback", async (req, res) => {
  if (!config) {
    throw new Error("Config not found")
  }

  try {
    // Get the current URL
    const currentUrl = new URL(req.url, `http://${req.headers.host}`)

    // Exchange code for tokens with PKCE verification
    const tokens = await client.authorizationCodeGrant(config, currentUrl, {
      pkceCodeVerifier: req.session.codeVerifier,
      expectedState: req.session.state,
    })

    // Store tokens in session
    req.session.tokens = tokens

    // Redirect to home page
    res.redirect("/")
  } catch (error) {
    console.error("Callback error:", error)
    res.status(500).send(`Authentication failed: ${error.message}`)
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
