const express = require("express")
const cors = require("cors")
const { FrontendApi, Configuration } = require("@ory/client-fetch")

const app = express()

const ory = new FrontendApi(
  new Configuration({
    // Points to the local Ory API server (Ory TunneL).
    basePath: process.env.ORY_URL || "http://localhost:4000",
    credentials: "include",
  }),
)

app.use(
  cors({
    origin: process.env.UI_URL || "http://localhost:5173",
  }),
)

app.use((req, res, next) => {
  // A simple middleware to authenticate the request.
  ory
    .toSession({ cookie: req.header("cookie") })
    .then((session) => {
      req.session = session
      next()
    })
    .catch((err) => {
      console.error("Error fetching session:", err)
      res.status(401).json({ error: "Unauthorized" })
    })
})

app.get("/api/hello", (req, res) => {
  console.log("Session:", req.session)
  res.json({
    message: "Hello from our API!",
    session_id: req.session.id,
    identity_traits: req.session.identity.traits,
  })
})

const port = process.env.PORT || 8081
app.listen(port, () => {
  try {
    console.log(`Example app listening on port ${port}`)
  } catch (err) {
    console.error("Error starting server:", err)
  }
})
