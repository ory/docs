// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Client, OidcApi } from "@ory/client"

const ory = new OidcApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function createOidcDynamicClient(
  id: string,
  updatedClient: OAuth2Client,
) {
  // highlight-start
  const { data } = await ory.setOidcDynamicClient({
    id: id,
    oAuth2Client: {
      ...updatedClient,
      grant_types: ["authorization_code", "refresh_token"],
      // ...
    },
  })

  console.log(data.registration_access_token) // Write this down, it is only sent once!
  // highlight-end
}
