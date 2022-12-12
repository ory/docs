// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
  }),
)

export async function logout(token: string) {
  // highlight-start
  return await frontend.performNativeLogout({
    performNativeLogoutBody: {
      session_token: token,
    },
  })
  // highlight-end
}
