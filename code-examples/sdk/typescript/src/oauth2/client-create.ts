// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function createOAuth2Client() {
  // highlight-start
  await ory.createOAuth2Client({
    oAuth2Client: {
      grant_types: ["authorization_code", "refresh_token"],
      redirect_uris: ["https://example.com"],
      scope: "offline openid",
      token_endpoint_auth_method: "client_secret_post",
    },
  })
  // highlight-end
}
