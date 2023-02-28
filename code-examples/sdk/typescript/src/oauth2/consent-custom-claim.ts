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
        session: {
          access_token: {
            some_custom_claim: "some_custom_value",
          },
        },
        // highlight-end
      },
    })
    .then(({ data }) => data)
}
