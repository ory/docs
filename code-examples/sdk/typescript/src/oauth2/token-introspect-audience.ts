// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function introspectToken(accessToken: string) {
  // highlight-start
  const { data } = await ory.introspectOAuth2Token({ token: accessToken })
  console.log(data.aud)
  // highlight-end
}
