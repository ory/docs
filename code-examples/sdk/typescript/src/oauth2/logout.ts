// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"
import { Request, Response } from "express"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

function allowLogout() {
  // Dummy function - this returns true or false depending on user input.
  return true
}

// Please note that this is an example implementation.
// In a production app, please add proper error handling.
export async function handleLogout(request: Request, response: Response) {
  const challenge = request.query.logout_challenge.toString()
  const { data: logoutRequest } = await ory.getOAuth2LogoutRequest({
    logoutChallenge: challenge.toString(),
  })

  console.log(logoutRequest.subject) // more fields are available

  // The user did not want to sign out from the given app.
  if (!allowLogout()) {
    await ory
      .rejectOAuth2LogoutRequest({
        logoutChallenge: challenge,
      })
      .then(() => {
        // Do something - redirect somewhere, for example the default home page.
      })
    return
  }

  ory
    .acceptOAuth2LogoutRequest({
      logoutChallenge: challenge,
    })
    .then(({ data }) => response.redirect(data.redirect_to))
}
