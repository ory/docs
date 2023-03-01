// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OidcApi } from "@ory/client"

const ory = new OidcApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function deleteOidcDynamicClient(
  id: string,
  registrationAccessToken: string,
) {
  // highlight-start
  await ory.deleteOidcDynamicClient(
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${registrationAccessToken}`,
      },
    },
  )
  // highlight-end
}
