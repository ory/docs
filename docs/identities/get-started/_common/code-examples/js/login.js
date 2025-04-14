app.get("/", (req, res) => {
  ory
    .toSession({ cookie: req.header("cookie") })
    .then((data) => res.json(data))
    .catch(() => res.redirect(`${baseUrl}/ui/login`))
})
