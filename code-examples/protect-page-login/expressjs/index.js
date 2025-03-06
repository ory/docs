const app = require("express")()
// highlight-next-line
const sdk = require("@ory/client-fetch")

// highlight-start
const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.ORY_SDK_URL || "http://localhost:4000/.ory",
  }),
)
 // highlight-end

app.get("/", (req, res) =>
  // highlight-start
  ory
    .toSession({ cookie: req.header("cookie") })
    .then((data) => res.json(data))
    .catch(() => res.redirect("/.ory/ui/login")),
  // highlight-end
)

app.listen(3000, () => console.log("Server is running on port 3000"))
