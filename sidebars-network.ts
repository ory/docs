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
    ],
  },
  {
    type: "category",
    label: "Identity Management",
    items: [
      "guides/email-sms",
      "guides/oauth2-openid-connect",
      "guides/operations",
    ],
  },
  {
    type: "category",
    label: "Get Started",
    collapsed: true,
    link: {
      type: "doc",
      id: "identities/get-started/index",
    },
    items: [
      "identities/get-started/setup",
      "identities/get-started/sign-up",
      "identities/get-started/sign-in",
      "identities/get-started/sign-out",
      "identities/get-started/session-management",
      "identities/get-started/account-recovery",
      "identities/get-started/mfa",
      "identities/get-started/social-sign-in",
      "identities/get-started/passwordless",
    ],
  },
  {
    type: "category",
    label: "Concepts",
    collapsed: false,
    collapsible: false,
    link: {
      type: "generated-index",
    },
    items: [
      "security-model",
      "identities/native-browser",
      "concepts/redirects",
      "kratos/hooks/configure-hooks",
    ],
  },
  {
    type: "category",
    label: "Guides",
    collapsed: false,
    collapsible: false,
    link: {
      type: "generated-index",
    },
    items: [
      {
        type: "category",
        label: "Authentication",
        link: {
          type: "generated-index",
          slug: "guides/authentication",
        },
        items: [
          "kratos/concepts/credentials",
          "kratos/concepts/credentials/username-email-password",
          "kratos/passwordless/passwordless",
          "kratos/passwordless/one-time-code",
          "kratos/passwordless/passkeys",
          "kratos/organizations/organizations",
          "kratos/emails-sms/custom-email-templates",
        ],
      },
      {
        type: "category",
        label: "Flows",
        link: {
          type: "doc",
          id: "kratos/self-service",
        },
        items: [
          "kratos/concepts/browser-redirect-flow-completion",
          "kratos/self-service/flows/user-registration",
          "kratos/self-service/flows/user-login",
          "kratos/self-service/flows/user-logout",
          "kratos/self-service/flows/user-settings",
          "kratos/self-service/flows/verify-email-account-activation",
          "kratos/self-service/flows/account-recovery-password-reset",
          "kratos/self-service/flows/user-facing-errors",
        ],
      },
      {
        type: "category",
        label: "Session",
        link: {
          type: "doc",
          id: "kratos/session-management/overview",
        },
        items: [
          "kratos/session-management/session-management",
          "identities/sign-in/check-session",
          "kratos/session-management/session-lifespan",
          "kratos/session-management/refresh-extend-sessions",
          "kratos/session-management/revoke-sessions-hook",
          "identities/session-to-jwt-cors",
          "concepts/cache",
        ],
      },
      {
        type: "category",
        label: "Multi-factor authentication",
        link: {
          type: "doc",
          id: "kratos/mfa/overview",
        },
        items: [
          "kratos/mfa/lookup-secrets",
          "kratos/mfa/totp",
          "kratos/mfa/webauthn-fido-yubikey",
          "kratos/mfa/mfa-via-sms",
          "kratos/mfa/step-up-authentication",
        ],
      },
      {
        type: "category",
        label: "Emails and SMS",
        collapsed: true,
        collapsible: true,
        link: {
          type: "doc",
          id: "guides/email-sms",
        },
        items: [
          "kratos/emails-sms/sending-emails-smtp",
          "kratos/emails-sms/sending-sms",
        ],
      },
      {
        type: "category",
        label: "Ory Actions",
        link: {
          type: "doc",
          id: "guides/integrate-with-ory-cloud-through-webhooks",
        },
        items: [
          {
            type: "category",
            label: "Identity management",
            items: [
              "identities/sign-in/actions",
              "actions/revoke-active-sessions",
              "actions/session",
              "actions/require-verified-address",
              {
                type: "category",
                label: "Integrations",
                items: [
                  "actions/integrations/hubspot",
                  "actions/integrations/mailchimp",
                  "actions/integrations/segment",
                ],
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Search",
        items: [
          "kratos/manage-identities/search/identity-search-console",
          "kratos/manage-identities/search/identity-search-api",
        ],
      },
      {
        type: "category",
        label: "Identity management",
        link: {
          type: "doc",
          id: "kratos/manage-identities/overview",
        },
        items: [
          "kratos/manage-identities/create-users-identities",
          "kratos/manage-identities/import-user-accounts-identities",
          "identities/model/identity-state",
          "kratos/manage-identities/invite-users",
          "kratos/manage-identities/account-recovery",
          "kratos/manage-identities/export-user-accounts-identities",

          {
            type: "category",
            label: "SCIM",
            link: {
              type: "doc",
              id: "kratos/manage-identities/scim",
            },
            items: [
              "kratos/manage-identities/scim/ms-entra",
              "kratos/manage-identities/scim/okta",
              "kratos/manage-identities/scim/google-workspace",
            ],
          },

          "kratos/manage-identities/external-id",
        ],
      },
      {
        type: "category",
        label: "Identity schema",
        link: {
          type: "doc",
          id: "kratos/manage-identities/identity-schema",
        },
        items: [
          "kratos/manage-identities/managing-users-identities-metadata",
          "identities/model/manage-identity-schema",
          "kratos/manage-identities/customize-identity-schema",
          "identities/model/identity-schema-selection",
          "kratos/manage-identities/best-practices",
        ],
      },

      {
        type: "category",
        label: "User interface",
        link: {
          type: "doc",
          id: "kratos/bring-your-own-ui/custom-ui-overview",
        },
        items: [
          "account-experience/index",
          "kratos/bring-your-own-ui/configure-ory-to-use-your-ui",
          "kratos/bring-your-own-ui/custom-vs-built-in-ui",
          {
            type: "doc",
            id: "elements/index",
            label: "Ory Elements",
            className: "external-link",
          },
          {
            type: "category",
            label: "Build your own UI",
            link: {
              type: "doc",
              id: "getting-started/custom-ui",
            },
            items: [
              "kratos/bring-your-own-ui/custom-ui-basic-integration",
              "kratos/bring-your-own-ui/custom-ui-advanced-integration",
              "kratos/concepts/ui-user-interface",
              {
                type: "doc",
                id: "elements/index",
                label: "Ory Elements",
                className: "external-link",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Configuration",
    collapsed: false,
    collapsible: false,
    items: [
      "identities/sign-in/two-step-registration",
      "identities/sign-in/identifier-first-authentication",
      "identities/sign-in/login-hint",
      "identities/sign-in/actions",
      "identities/sign-in/code-submission-limit",
    ],
  },
  {
    type: "category",
    label: "Self-Hosted",
    collapsed: false,
    collapsible: false,
    link: {
      type: "doc",
      id: "kratos/quickstart",
    },
    items: [
      "kratos/install",
      "kratos/quickstart",
      {
        type: "category",
        label: "Configuration",
        items: [
          "kratos/configuring",
          "kratos/guides/configuring-cookies",
          "kratos/guides/multi-domain-cookies",
          "self-hosted/kratos/configuration/password",
          "kratos/self-hosted/mfa",
          "kratos/guides/setting-up-cors",
          "self-hosted/kratos/configuration/oidc",
          "kratos/guides/setting-up-password-hashing-parameters",
          "kratos/guides/select-cipher-algorithm",
          "kratos/self-hosted/email-http",
          "kratos/reference/configuration-editor",
        ],
      },
      {
        type: "category",
        label: "Guides",
        items: [
          "kratos/guides/docker",
          "kratos/guides/deploy-kratos-example",
          "kratos/guides/upgrade",
          "kratos/guides/production",
          "kratos/guides/multi-tenancy-multitenant",
          "self-hosted/operations/scalability",
          "kratos/self-hosted/mail-courier-templates",
          "kratos/guides/tracing",
          "kratos/guides/zero-trust-iap-proxy-identity-access-proxy",
          "kratos/guides/https-tls",
          "kratos/guides/hosting-own-have-i-been-pwned-api",
          "kratos/guides/secret-key-rotation",
          {
            type: "category",
            label: "Troubleshooting",
            items: [
              {
                type: "autogenerated",
                dirName: "kratos/debug",
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Reference",
        items: [
          "kratos/reference/api",
          {
            "Command Line Interface (CLI)": [
              {
                type: "autogenerated",
                dirName: "kratos/cli",
              },
            ],
          },
          {
            SDK: ["kratos/sdk/overview", "kratos/self-hosted/go"],
          },
          "kratos/reference/configuration",
          "kratos/reference/json-schema-json-paths",
          "kratos/reference/html-forms",
        ],
      },
    ],
  },
]

export default networkSidebar