// Minimal Express app wiring the identities get-started JS examples
// and providing stable routes for integration tests.

import express from "express"
import cookieParser from "cookie-parser"

import {
  baseUrl,
  ory,
} from "../../../../docs/identities/get-started/_common/code-examples/js/setupDev.js"
import { registerSignUpRoute } from "../../../../docs/identities/get-started/_common/code-examples/js/sign-up.js"
import { registerLoginRoute } from "../../../../docs/identities/get-started/_common/code-examples/js/login.js"
import { registerLogoutRoute } from "../../../../docs/identities/get-started/_common/code-examples/js/logout.js"
import {
  createRequireAuth,
  registerSessionRoute,
} from "../../../../docs/identities/get-started/_common/code-examples/js/session/check-session.js"
import { registerRefreshSessionRoute } from "../../../../docs/identities/get-started/_common/code-examples/js/session/refresh-session.js"

const app = express()
app.use(cookieParser())

// Health / configure endpoint
app.get("/configure", (req, res) => {
  res.json({
    orySdkUrl: baseUrl,
  })
})

// Routers that reuse the docs sample snippets.
const signupRouter = express.Router()
registerSignUpRoute(signupRouter, ory, baseUrl)
app.use("/signup", signupRouter)

const loginRouter = express.Router()
registerLoginRoute(loginRouter, ory, baseUrl)
app.use("/login", loginRouter)

const logoutRouter = express.Router()
registerLogoutRoute(logoutRouter, ory)
app.use("/", logoutRouter)

const requireAuth = createRequireAuth(ory, baseUrl)
const sessionRouter = express.Router()
registerSessionRoute(sessionRouter, requireAuth)
app.use("/session", sessionRouter)

registerRefreshSessionRoute(app, baseUrl)

const port = process.env.EXAMPLES_TEST_APP_PORT || 3800

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Examples test app listening on http://localhost:${port}`)
  })
}

export { app }


