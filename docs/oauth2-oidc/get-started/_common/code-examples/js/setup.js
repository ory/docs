import * as client from "openid-client"
import express from "express"
const app = express()

// Configure environment variables
const ORY_PROJECT_SLUG = process.env.ORY_PROJECT_SLUG
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET

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
