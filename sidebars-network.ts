// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

// sidebars-network.ts

import {
  SidebarItem,
  SidebarItemConfig,
} from "@docusaurus/plugin-content-docs/src/sidebars/types"

type SidebarItemsConfig = SidebarItemConfig[]



const networkSidebar = [
  {
    type: "category",
    label: "Ory Network",
    items: [
      "network/getting-started/index",
      "network/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Guides",
    items: [
      "guides/email-sms",
      "guides/oauth2-openid-connect",
      "guides/operations",
    ],
  },
  {
    type: "category",
    label: "Manage identities",
    items: [
      "kratos/manage-identities/scim",
    ],
  },
]




export default networkSidebar

