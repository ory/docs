export const createRequireAuth = (ory, baseUrl = process.env.ORY_SDK_URL) => {
  return async (req, res, next) => {
    try {
      const { data: session } = await ory.toSession({
        cookie: req.header("cookie"),
      })
      req.session = session
      next()
    } catch (error) {
      res.redirect(`${baseUrl}/self-service/login/browser`)
    }
  }
}

export const registerSessionRoute = (app, requireAuth) => {
  app.get("/session", requireAuth, (req, res) => {
    res.json(req.session.identity.traits) // { email: 'newtestuser@gmail.com' }
  })
}
