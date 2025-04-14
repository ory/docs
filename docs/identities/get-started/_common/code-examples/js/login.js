app.get("/", (req, res) => {
  ory
    .toSession({ cookie: req.header("cookie") })
    .then((data) => res.json(data))
    .catch(() =>
      res.redirect(`${process.env.ORY_SDK_URL}/self-service/login/browser`),
    )
})
