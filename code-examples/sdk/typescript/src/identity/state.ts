// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, IdentityApi } from "@ory/client"
import { JsonPatchOpEnum } from "@ory/client/api"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function setState(
  identityId: string,
  state: "active" | "inactive",
) {
  // highlight-start
  return await identity
    .patchIdentity({
      id: identityId,
      jsonPatch: [
        {
          op: JsonPatchOpEnum.Replace,
          value: state,
          path: "/state",
        },
      ],
    })
    .then(({ data }) => data)
  // highlight-end
}
