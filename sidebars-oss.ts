// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

// sidebars-oss.ts

import {
  SidebarItem,
  SidebarItemConfig,
} from "@docusaurus/plugin-content-docs/src/sidebars/types"

type SidebarItemsConfig = SidebarItemConfig[]


const ossSidebar = [
  {
    type: "category",
    label: "Ory Open Source",
    items: [
      "oss/getting-started/index",
      "oss/getting-started/auth-overview",
    ],
  },
 {
    type: "category",
    label: "Ory Kratos",
    collapsed: true,
    items: [
      "oss/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Hydra",
    collapsed: true,
    items: [
      "oss/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Keto",
    collapsed: true,
    items: [
      "oss/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Polis",
    collapsed: true,
    items: [
      "oss/getting-started/auth-overview",
    ],
  },
  {
    type: "category",
    label: "Ory Oathkeeper",
    collapsed: true,
    items: [
      "oss/getting-started/auth-overview",
    ],
  },
]

export default ossSidebar