// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function setClientLifespans(clientId: string) {
  // highlight-start
  await ory.setOAuth2ClientLifespans({
    id: clientId,
    oAuth2ClientTokenLifespans: {
      authorization_code_grant_access_token_lifespan: "1h",
      authorization_code_grant_id_token_lifespan: "12h",
      authorization_code_grant_refresh_token_lifespan: "24h",
      client_credentials_grant_access_token_lifespan: "1h",
      implicit_grant_access_token_lifespan: "1h",
      implicit_grant_id_token_lifespan: "12h",
      jwt_bearer_grant_access_token_lifespan: "1h",
      refresh_token_grant_access_token_lifespan: "1h",
      refresh_token_grant_id_token_lifespan: "12h",
      refresh_token_grant_refresh_token_lifespan: "24h",
    },
  })
  // highlight-end
}
