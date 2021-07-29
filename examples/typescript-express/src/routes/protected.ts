import {Configuration, V0alpha1Api} from "@ory/client";
import {NextFunction, Request, Response} from "express";

// Initializes the Ory SDK
const ory = new V0alpha1Api(new Configuration({
  // This must point to the Ory Proxy.
  //
  // Get this URL from the "Services & APIs" page in the Ory Cloud Console.
  basePath: "https://localhost:4000/.ory",

  // This is your personal access token.
  accessToken: process.env.ORY_ACCESS_TOKEN
}))

// Beautifies any JSON string.
const prettyJson = (json: any) => JSON.stringify(json, null, 2)

// This route handles the /protected page.
export const handleProtected = async (req: Request, res: Response, next: NextFunction) => {
  // Unfortunately @types/express-jwt doesn't have proper typings for this.
  const user = req.user as any

  // Load the user/identity from the Ory Admin API
  const identity = await ory.adminGetIdentity(user.sub)
    .then(({data}) => data)
    .catch((err) => next('Unable to fetch identity from Ory Cloud: ' + err))
  if (!identity) {
    return
  }

  // We create a logout URL for the user
  const logoutUrl = await ory.createSelfServiceLogoutFlowUrlForBrowsers(req.header('cookie'))
    .then(({data}) => data.logout_url)
    .catch((err) => next('Unable to get logout URL from Ory Cloud: ' + err))

  res.render('protected', {
    headers: prettyJson(req.headers),
    identity: prettyJson(identity),
    claims: prettyJson(user),
    logoutUrl,
  })
}
