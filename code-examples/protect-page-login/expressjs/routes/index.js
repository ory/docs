// Copyright © 2022 Ory Corp

var express = require("express")
var router = express.Router()
// highlight-start
var sdk = require("@ory/client")

var ory = new sdk.V0alpha2Api(
  new sdk.Configuration({
    basePath:
      process.env.ORY_SDK_URL || "https://playground.projects.oryapis.com",
  }),
)
// highlight-end

/* GET home page. */
router.get("/", function (req, res, next) {
  // highlight-start
  ory
    .toSession(undefined, req.header("cookie"))
    .then(({ data: session }) => {
      res.render("index", {
        title: "Express",
        // Our identity is stored in the session along with other useful information.
        identity: session.identity,
      })
    })
    .catch(() => {
      // If logged out, send to login page
      res.redirect("/.ory/ui/login")
    })
  // highlight-end
})

module.exports = router
