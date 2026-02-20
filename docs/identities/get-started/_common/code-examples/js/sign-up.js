export const registerSignUpRoute = (app, ory, baseUrl) => {
  app.get("/signup", (req, res) => {
    ory
      .toSession({ cookie: req.header("cookie") })
      .then((data) => res.json(data))
      .catch(() => res.redirect(`${baseUrl}/self-service/registration/browser`))
  })
}
