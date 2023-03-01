// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OidcApi } from "@ory/client"

const ory = new OidcApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function createOidcDynamicClient() {
  // highlight-start
  const { data } = await ory.createOidcDynamicClient({
    oAuth2Client: {
      grant_types: ["authorization_code", "refresh_token"],
      redirect_uris: ["https://example.com"],
      scope: "offline openid",
      token_endpoint_auth_method: "client_secret_post",
    },
  })

  console.log(data.registration_access_token) // Write this down, it is only sent once!
  console.log(data.client_id, data.client_secret /* ... */)
  // highlight-end
}
