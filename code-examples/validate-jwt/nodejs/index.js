// This is the middleware which protects the endpoint. It requires a valid
// JSON Web Token signed by a key provided by the Ory Proxy.
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import { NextFunction, Request, Response } from 'express'

const jwtMiddleware = jwt({
  secret: jwks.expressJwtSecret({
    // We disable the cache because restarting the project generates new keys.
    //
    // Unfortunately, jwks-rsa does not try to lookup unknown keys, resulting
    // in a redirect loop.
    cache: false,

    // This URL is provided by the Ory Proxy and contains the cryptographic keys
    // for validating the JSON Web Token.
    jwksUri: 'http://localhost:4000/.ory/proxy/jwks.json'
  }),
  algorithms: ['ES256']
})

// A small wrapper which redirects to login if we are not authenticated.
export const protect = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  jwtMiddleware(req, res, (err?: any) => {
    // If no error happened, we just call the _next function
    if (!err) {
      return next()
    }

    // If the JWT middleware says we are not authorized, we show a page asking to sign in
    if (err.name === 'UnauthorizedError') {
      res.render('unauthorized')
      return
    }

    // If another error occurred, we show that instead.
    next(err)
  })
}
