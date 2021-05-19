import express from 'express';
import {DefaultApi, Configuration} from '@ory/client'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import dotenv from 'dotenv'

// Enable dotenv: https://www.npmjs.com/package/dotenv
dotenv.config()

// Initializes the Ory SDK
const ory = new DefaultApi(new Configuration({
  // Project URL MUST NOT have a trailing slash!
  basePath: process.env.ORY_PROJECT_URL?.replace(/\/$/, ""),
  accessToken: process.env.ORY_ACCESS_TOKEN
}))

// This is the middleware which protects the endpoint. It requires a valid
// JSON Web Token signed by a key provided by the Ory Proxy.
const protect = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    // This URL is provided by the Ory Proxy and contains the cryptographic keys
    // for validating the JSON Web Token.
    jwksUri: 'https://localhost:4000/.ory/jwks.json'
  }),
  algorithms: ['ES256']
})

const app = express();

app.set('view engine', 'pug')

const prettyJson = (json: any) => JSON.stringify(json, null, 2)

// This page is protected
app.get('/protected',
  protect,
  async (req, res) => {
    const user = req.user as any // Needs a small TypeScript workaround

    // Load the user
    const identity = (await ory.getIdentityAdmin(user.sub)).data

    res.render('protected', {
      headers: prettyJson(req.headers),
      identity: prettyJson(identity),
      claims: prettyJson(user)
    })
  });

// All other URLs show the public page.
app.use((req, res) => res.render('public'));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
