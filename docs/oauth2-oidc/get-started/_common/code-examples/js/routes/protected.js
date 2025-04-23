app.get("/profile", requireAuth, async (req, res) => {
  try {
    // Get user info
    const userInfo = await client.fetchUserInfo(
      config,
      req.session.tokens.access_token,
      client.skipSubjectCheck,
    )

    res.json({
      message: "This is protected data from the resource server",
      email: userInfo.email,
      sub: userInfo.sub,
    })
  } catch (error) {
    console.error("Profile error:", error)
    res.status(500).json({ error: `Error accessing profile: ${error.message}` })
  }
})
