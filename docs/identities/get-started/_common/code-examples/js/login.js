export const registerLoginRoute = (
  app,
  ory,
  baseUrl = process.env.ORY_SDK_URL,
) => {
  app.get("/", (req, res) => {
    ory
      .toSession({ cookie: req.header("cookie") })
      .then((data) => res.json(data))
      .catch(() => res.redirect(`${baseUrl}/self-service/login/browser`))
  })
}
