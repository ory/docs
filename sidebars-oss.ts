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
    collapsible: false,
    collapsed: false,
    link: {
      type: "doc",
      id: "oss/getting-started/index",
    },
    items: [
      "oss/getting-started/index",
      {
        type: "category",
        label: "Open Source",
        collapsed: true,
        collapsible: true,
        items: [
          "oss/open-source",
          "oss/community",
          "oss/contributing",
          "oss/commitment",
          "oss/software-architecture-philosophy",
        ],
      },
      {
        type: "category",
        label: "Getting started",
        collapsed: true,
        collapsible: true,
        items: [
          "oss/deployment",
          "oss/configuring",
          "oss/guidelines/rest-api-guidelines",
          "oss/guidelines/e2e-integration-tests",
        ],
      },
      {
        type: "category",
        label: "Ory Kratos",
        items: ["kratos/quickstart"],
      },
      {
        type: "category",
        label: "Ory Hydra",
        items: ["hydra/self-hosted/quickstart"],
      },
      {
        type: "category",
        label: "Ory Keto",
        items: ["keto/quickstart"],
      },
      {
        type: "category",
        label: "Ory Polis",
        items: ["polis/quickstart"],
      },
      {
        type: "category",
        label: "Ory Oathkeeper",
        items: ["oathkeeper/index"],
      },
      {
        type: "category",
        label: "Operations",
        items: [
          "self-hosted/operations/tracing",
          "self-hosted/operations/api-access-control",
          "self-hosted/operations/scalability",
          "self-hosted/operations/observability",
          "self-hosted/operations/logging",
          "oss/upgrading",
          "oss/changelog",
          "oss/telemetry",
        ],
      },
    ],
  },
]

export default ossSidebar
