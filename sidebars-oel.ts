// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

// sidebars-oel.ts

import {
  SidebarItem,
  SidebarItemConfig,
} from "@docusaurus/plugin-content-docs/src/sidebars/types"

type SidebarItemsConfig = SidebarItemConfig[]


const oelSidebar = [
    {
    type: "category",
    label: "Ory Enterprise License",
    items: [
      "oel/getting-started/index",
      "oel/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Kratos",
    collapsed: true,
    items: [
      "oel/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Hydra",
    collapsed: true,
    items: [
      "oel/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Keto",
    collapsed: true,
    items: [
      "oel/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Polis",
    collapsed: true,
    items: [
      "oel/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Oathkeeper",
    collapsed: true,
    items: [
      "oel/getting-started/auth-overview",
    ],
  },
]

export default oelSidebar
