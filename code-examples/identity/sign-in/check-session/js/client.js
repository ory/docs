// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const { FrontendApi, Configuration } = require("@ory/client-fetch")

const ory = new FrontendApi(
  new Configuration({
    basePath: `{YOUR-CUSTOM-DOMAIN-OR-ORY-TUNNEL}`,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

const session = await ory.toSession().catch((err) => {
  // Check the error to see if it's a 401 / 403 -> not logged in
})
