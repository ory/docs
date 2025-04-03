const app = require("express")()
// highlight-next-line
const sdk = require("@ory/client-fetch")

// highlight-start
const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.ORY_SDK_URL || "http://localhost:4000",
  }),
)
// highlight-end

// highlight-start
const requireAuth = async (req, res, next) => {
  try {
    const session = await ory.toSession({ cookie: req.header("cookie") })
    req.session = session
    next()
  } catch (error) {
    res.redirect("/ui/login")
  }
}
// highlight-end

app.get("/", requireAuth, (req, res) => {
  // highlight-next-line
  res.json(req.session)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))
