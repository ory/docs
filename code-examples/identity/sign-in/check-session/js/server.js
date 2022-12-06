// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const express = require("express")
const app = express()
const { FrontendApi, Configuration } = require("@ory/client")

const ory = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

app.get("/blog/posts", async function (req, res) {
  const authHeader = req.headers.authorization
  const hasAuthHeader = authHeader.startsWith("Bearer ")
  const sessionToken = hasAuthHeader
    ? authHeader.slice(7, authHeader.length)
    : null

  const session = await ory
    .toSession({
      cookie: req.cookies.join("; "),
      xSessionToken: sessionToken,
    })
    .catch((err) => {
      // Check the error to see if it's a 401 / 403 -> not logged in
    })
})

app.listen(3000, function () {
  console.log("Listening on http://localhost:3000")
})
