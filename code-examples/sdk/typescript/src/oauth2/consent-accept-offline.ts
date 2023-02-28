// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function acceptConsent(consentChallenge: string) {
  const { data } = await ory.getOAuth2ConsentRequest({ consentChallenge })

  const grantScope = []

  // highlight-start
  // If the client requested the "offline_access" scope, and the user consents,
  // we add the "offline_access" scope to the scope to grant.
  if (data.requested_scope.includes("offline_access")) {
    // if (userGaveConsentForTokenRefresh) {
    grantScope.push("offline_access")
    // }
  }

  return await ory
    .acceptOAuth2ConsentRequest({
      consentChallenge: consentChallenge,
      acceptOAuth2ConsentRequest: {
        grant_scope: grantScope,
      },
    })
    // highlight-end
    .then(({ data }) => data)
}
