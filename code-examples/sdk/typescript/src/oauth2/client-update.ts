// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api, OAuth2Client } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function updateOAuth2Client(
  id: string,
  update: Partial<OAuth2Client>,
) {
  // highlight-start
  // setOAuth2Client replaces all values (empty ones too),
  // which is why we include the original client.
  const { data: original } = await ory.getOAuth2Client({ id })
  await ory.setOAuth2Client({
    id,
    oAuth2Client: {
      ...original,
      ...update,
    },
  })
  // highlight-end
}
