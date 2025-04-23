const session = require("express-session")
const client = require("openid-client")
const app = express()

// Session setup to store PKCE and state values
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  }),
)

// Configure environment variables
const ORY_PROJECT_SLUG = "your-project-slug"
const OAUTH_CLIENT_ID = "your-client-id"
const OAUTH_CLIENT_SECRET = "your-client-secret"

// Initialize OpenID client configuration
let config
;(async () => {
  try {
    // Create server URL (Ory's issuer URL)
    const server = new URL(`https://${ORY_PROJECT_SLUG}.projects.oryapis.com`)

    // Use discovery to fetch the server metadata and create a configuration
    config = await client.discovery(
      server,
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      client.ClientSecretBasic(OAUTH_CLIENT_SECRET),
    )

    console.log("Discovery successful")
  } catch (error) {
    console.error("Discovery error:", error)
  }
})()
