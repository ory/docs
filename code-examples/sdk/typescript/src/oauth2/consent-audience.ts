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

  return await ory
    .acceptOAuth2ConsentRequest({
      consentChallenge: consentChallenge,
      acceptOAuth2ConsentRequest: {
        // highlight-start
        // You may optionally ask the user to consent to the audience parameters too, but
        // here we simply accept the requested token audience:
        grant_access_token_audience: data.requested_access_token_audience,
        // highlight-end
      },
    })
    .then(({ data }) => data)
}
