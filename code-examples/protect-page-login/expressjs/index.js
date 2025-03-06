const app = require("express")()
const sdk = require("@ory/client-fetch")

const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.ORY_ENDPOINT || "http://localhost:4000/.ory",
  }),
)
app.get("/", (req, res) =>
  ory
    .toSession({ cookie: req.header("cookie") })
    .then((data) => res.json(data))
    .catch(() => res.redirect("/.ory/ui/login")),
)

app.listen(3000, () => console.log("Server is running on port 3000"))
