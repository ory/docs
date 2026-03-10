// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function removeRedirectUri(clientId: string, uriToRemove: string) {
  // highlight-start
  const { data: client } = await ory.getOAuth2Client({ id: clientId })
  await ory.setOAuth2Client({
    id: clientId,
    oAuth2Client: {
      ...client,
      redirect_uris: (client.redirect_uris ?? []).filter(
        (u) => u !== uriToRemove,
      ),
    },
  })
  // highlight-end
}
