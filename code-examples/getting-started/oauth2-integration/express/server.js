// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const { randomBytes } = require("crypto")
const express = require("express")
const { auth, requiresAuth } = require("express-openid-connect")
const app = express()

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(
  auth({
    authRequired: false,
    baseURL: "http://localhost:3000",
    secret: process.env.ENCRYPTION_SECRET || randomBytes(64).toString("hex"),

    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    issuerBaseURL: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,

    authorizationParams: {
      response_type: "code",
      scope: "openid email offline_access",
    },
  }),
)

// The / route will show the full oidc payload
app.get("/", requiresAuth(), (req, res) => {
  req.oidc.fetchUserInfo().then((userInfo) => {
    res.send(
      `<html lang='en'><body><pre><code>${JSON.stringify(
        {
          accessToken: req.oidc.accessToken,
          refreshToken: req.oidc.refreshToken,
          idToken: req.oidc.idToken,
          idTokenClaims: req.oidc.idTokenClaims,
          userInfo,
        },
        null,
        2,
      )}</code></pre></body></html>`,
    )
  })
})

app.listen(3000, function () {
  console.log("Listening on http://localhost:3000")
})
