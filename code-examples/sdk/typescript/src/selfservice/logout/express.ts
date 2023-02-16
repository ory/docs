// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, FrontendApi } from "@ory/client"
import { Request, Response } from "express"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "https://playground.projects.oryapis.com/",
  }),
)

const route = (req: Request, res: Response) => {
  frontend
    .createBrowserLogoutFlow(req.cookies["ory_kratos_session"])
    .then(({ data }) => {
      console.log(data.logout_url) // The logout URL
      console.log(data.logout_token) // The logout token

      // You can render the logout URL like so:
      // <a href="{{data.logout_url}}>Logout</a>

      // Or call the logout token:
      // kratos.updateLogoutFlow(data.logout_token).then(() => {
      // Logged out
      // })
    })
}
