// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, JsonPatch, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function patchOAuth2Client(id: string, patches: JsonPatch[]) {
  await ory.patchOAuth2Client({
    id,
    jsonPatch: [
      ...patches,
      {
        // highlight-start
        op: "replace",
        path: "access_token_strategy",
        value: "jwt",
        // highlight-end
      },
    ],
  })
}
