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
    className: "sidebar-quickstart-top-level",
    items: [
      {
        type: "category",
        label: "Ory Kratos: Identity Management & AuthN",
        className: "sidebar-icon sidebar-icon-kratos",
        items: [
          "network/kratos/intro",
          "network/kratos/quickstart",
          "network/kratos/identity_model",
          "network/kratos/mfa-overview",
        ],
      },
      {
        type: "category",
        label: "Delegated Scope-based AuthZ & Federated AuthN",
        className: "sidebar-icon sidebar-icon-hydra",
        items: [
          "network/hydra/quickstarts/index",
          "network/hydra/quickstarts/ory-network-oauth2",
        ],
      },
      {
        type: "category",
        label: "Fine-grained AuthZ & Permissions",
        className: "sidebar-icon sidebar-icon-keto",
        items: [
          "network/keto/quickstarts/index",
          "network/keto/quickstarts/overview",
          "network/keto/quickstarts/quickstart",
          "network/keto/quickstarts/file-sharing-example",
        ],
      },
      {
        type: "category",
        label: "Enterprise SSO AuthZ",
        className: "sidebar-icon sidebar-icon-polis",
        items: [
          "network/polis/quickstarts/index",
          "network/polis/quickstarts/quickstart",
        ],
      },
      {
        type: "category",
        label: "Proxy-based Access Control",
        className: "sidebar-icon sidebar-icon-oathkeeper",
        items: ["network/oathkeeper/index"],
      },
    ],
  },
  {
    type: "category",
    label: "Ory Enterprise License",
    collapsed: false,
    collapsible: false,
    className: "sidebar-quickstart-top-level",
    items: [
      {
        type: "category",
        label: "Ory Kratos",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-kratos",
        items: [
          "oel/kratos/intro",
          "oel/kratos/quickstart",
          "oel/kratos/identity_model",
          "oel/kratos/mfa-overview",
        ],
      },
      {
        type: "category",
        label: "Ory Hydra",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-hydra",
        items: ["oel/hydra/index", "oel/hydra/quickstart"],
      },
      {
        type: "category",
        label: "Ory Keto",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-keto",
        items: ["oel/keto/index", "oel/keto/quickstart"],
      },
      {
        type: "category",
        label: "Ory Polis",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-polis",
        items: ["oel/polis/index", "oel/polis/quickstart"],
      },
      {
        type: "category",
        label: "Ory Oathkeeper",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-oathkeeper",
        items: ["oel/oathkeeper/index", "oel/oathkeeper/configure-deploy"],
      },
    ],
  },
  {
    type: "category",
    label: "Ory Open Source",
    collapsed: false,
    collapsible: false,
    className: "sidebar-quickstart-top-level",
    items: [
      {
        type: "category",
        label: "Ory Kratos",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-kratos",
        items: [
          "oss/kratos/intro",
          "oss/kratos/quickstart",
          "oss/kratos/identity_model",
          "oss/kratos/mfa-overview",
        ],
      },
      {
        type: "category",
        label: "Ory Hydra",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-hydra",
        items: ["oss/hydra/index", "oss/hydra/quickstart"],
      },
      {
        type: "category",
        label: "Ory Keto",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-keto",
        items: ["oss/keto/index", "oss/keto/quickstart"],
      },
      {
        type: "category",
        label: "Ory Polis",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-polis",
        items: ["oss/polis/index", "oss/polis/quickstart"],
      },
      {
        type: "category",
        label: "Ory Oathkeeper",
        collapsed: true,
        collapsible: true,
        className: "sidebar-icon sidebar-icon-oathkeeper",
        items: ["oss/oathkeeper/index", "oss/oathkeeper/configure-deploy"],
      },
    ],
  },
]

export default quickstartsSidebar
