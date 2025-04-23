// Home route
app.get("/", async (req, res) => {
  if (req.session.tokens) {
    // If we have tokens, try to get user info
    let userInfo = null
    try {
      if (req.session.tokens.access_token) {
        // For userInfo we need expectedSubject or skipSubjectCheck
        userInfo = await client.fetchUserInfo(
          config,
          req.session.tokens.access_token,
          client.skipSubjectCheck,
        )
      }
    } catch (error) {
      console.error("Error fetching user info:", error)
    }

    res.send(`
    <html lang='en'>
      <body>
        <h1>Authenticated!</h1>
        <h2>Tokens:</h2>
        <pre>${JSON.stringify(req.session.tokens, null, 2)}</pre>
        ${userInfo ? `<h2>User Info:</h2><pre>${JSON.stringify(userInfo, null, 2)}</pre>` : ""}
        <p><a href="/profile">View Profile API</a></p>
        <p><a href="/logout">Logout</a></p>
      </body>
    </html>
  `)
  } else {
    res.send(`
    <html lang='en'>
      <body>
        <h1>Welcome</h1>
        <a href="/login">Login</a>
      </body>
    </html>
  `)
  }
})
