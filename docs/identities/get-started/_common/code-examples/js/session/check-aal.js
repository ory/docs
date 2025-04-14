const requireAuth = async (req, res, next) => {
  try {
    const session = await ory.toSession({ cookie: req.header("cookie") })
    // highlight-start
    if (session.authenticator_assurance_level === "aal2") {
      req.session = session
      next()
    } else {
      res.redirect(
        `${process.env.ORY_SDK_URL}/self-service/login/browser?aal=aal2`,
      )
    }
    // highlight-end
  } catch (error) {
    res.redirect(`${process.env.ORY_SDK_URL}/self-service/login/browser`)
  }
}

app.get("/", requireAuth, (req, res) => {
  res.json(req.session.identity.traits) // { email: 'newtestuser@gmail.com' }
})
