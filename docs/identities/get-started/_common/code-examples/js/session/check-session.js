const requireAuth = async (req, res, next) => {
  try {
    const session = await ory.toSession({ cookie: req.header("cookie") })
    req.session = session
    next()
  } catch (error) {
    res.redirect(`${baseUrl}/ui/login`)
  }
}

app.get("/", requireAuth, (req, res) => {
  res.json(req.session.identity.traits) // { email: 'newtestuser@gmail.com' }
})
