// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const quickstartsSidebar = [
  {
    type: "doc",
    id: "getting-started/overview",
    label: "Quickstarts",
  },
  {
    type: "category",
    label: "Ory Network",
    collapsed: false,
    collapsible: false,
    items: [
      {
        type: "category",
        label: "Ory Kratos",
        items: [
          "identities/index",
          "kratos/quickstart",
          "kratos/manage-identities/overview",
          "kratos/mfa/overview",
        ],
      },
      {
        type: "category",
        label: "Ory Hydra",
        items: [
          "oauth2-oidc/index",
          "getting-started/ory-network-oauth2",
        ],
      },
      {
        type: "category",
        label: "Ory Keto",
        items: [
          "keto/index",
        ],
      },
            {
        type: "category",
        label: "Ory Polis",
        items: [
          "polis/index", 
        ],
      },      {
        type: "category",
        label: "Ory Oathkeeper",
        items: [
          "oathkeeper/index",
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Ory Enterprise License",
    collapsed: false,
    collapsible: false,
    items: [,
      {
        type: "category",
        label: "Ory Kratos",
        collapsed: true,
        collapsible: true,
        items: [
          "identities/index", 
          "kratos/quickstart",
          "kratos/manage-identities/overview",
          "kratos/mfa/overview",
        ],
      },
      {
        type: "category",
        label: "Ory Hydra",
        collapsed: true,
        collapsible: true,
        items: [
          "oauth2-oidc/index",
          "hydra/self-hosted/quickstart",
        ],
      },
      {
        type: "category",
        label: "Ory Keto",
        collapsed: true,
        collapsible: true,
        items: [
          "keto/index",
          "keto/quickstart",
        ],
      },
      {
        type: "category",
        label: "Ory Polis",
        collapsed: true,
        collapsible: true,
        items: [
          "polis/index", 
          "polis/quickstart",
        ],
      },
      {
        type: "category",
        label: "Ory Oathkeeper",
        collapsed: true,
        collapsible: true,
        items: [
          "oathkeeper/index",
          "oathkeeper/configure-deploy",
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Ory Open Source",
    collapsed: false,
    collapsible: false,
    items: [
      {
        type: "category",
        label: "Ory Kratos",
        collapsed: true,
        collapsible: true,
        items: [
          "identities/index", 
          "kratos/quickstart",
          "kratos/manage-identities/overview",
          "kratos/mfa/overview",
        ],
      },
      {
        type: "category",
        label: "Ory Hydra",
        collapsed: true,
        collapsible: true,
        items: [
          "oauth2-oidc/index",
          "hydra/self-hosted/quickstart",
        ],
      },
      {
        type: "category",
        label: "Ory Keto",
        collapsed: true,
        collapsible: true,
        items: [
          "keto/index",
          "keto/quickstart",
        ],
      },
      {
        type: "category",
        label: "Ory Polis",
        collapsed: true,
        collapsible: true,
        items: [
          "polis/index", 
          "polis/quickstart",
        ],
      },
      {
        type: "category",
        label: "Ory Oathkeeper",
        collapsed: true,
        collapsible: true,
        items: [
          "oathkeeper/index",
          "oathkeeper/configure-deploy",
        ],
      },
    ],
  },
]

export default quickstartsSidebar