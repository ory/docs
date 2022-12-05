// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, IdentityApi } from "@ory/client"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function getTokens(identityId: string) {
  // highlight-start
  return await identity
    .getIdentity({ id: identityId, includeCredential: ["oidc"] })
    .then(({ data }) => data)
  // highlight-end
}
