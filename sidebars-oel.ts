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
      "self-hosted/oel/index",
      "self-hosted/oel/quickstart",
    ],
  },
  {
    type: "category",
    label: "Ory Hydra OAuth2",
    items: [
      "self-hosted/oel/oauth2/migrate",
      "self-hosted/oel/oauth2/upgrade",
      "self-hosted/oel/oauth2/changelog",
      "self-hosted/oel/oauth2/token-prefix",
      "self-hosted/oel/oauth2/stateless-jwt",
      "self-hosted/oel/oauth2/migrate-postgresql-ttl",
      "self-hosted/oel/oauth2/revert-database-migrations",
      "self-hosted/oel/oauth2/configuration",
    ],
  },
  {
    type: "category",
    label: "Ory Oathkeeper Zero Trust",
    items: [
      "self-hosted/oel/oathkeeper/upgrade-oathkeeper",
      "self-hosted/oel/oathkeeper/changelog",
      "self-hosted/oel/oathkeeper/configuration",
    ],
  },
  {
    type: "category",
    label: "Ory Kratos Identities",
    items: [
      "self-hosted/oel/kratos/upgrade",
      "self-hosted/oel/kratos/changelog",
      "self-hosted/oel/kratos/configuration",
    ],
  },
  {
    type: "category",
    label: "Ory Keto Permissions",
    items: [
      "self-hosted/oel/keto/changelog",
      "self-hosted/oel/keto/configuration",
    ],
  },
  {
    type: "category",
    label: "Ory Polis",
    items: ["self-hosted/oel/polis/changelog"],
  },
  "self-hosted/oel/monitoring/monitoring",
  "self-hosted/oel/high-performance-pooling",
]

export default oelSidebar
