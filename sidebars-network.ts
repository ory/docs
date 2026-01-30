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
    collapsed: false,
    collapsible: false,
    link: {
      type: "doc",
      id: "network/getting-started/index",
    },
    items: [
      "network/getting-started/index",
      {
        type: "category",
        label: "Getting Started",
        collapsed: true,
        collapsible: true,
        items: ["getting-started/local-development"],
      },
      {
        type: "category",
        label: "Identity Management & AuthN",
        className: "sidebar-icon sidebar-icon-kratos",
        collapsed: true,
        items: [
          {
            type: "category",
            label: "Get Started",
            collapsed: false,
            collapsible: false,
            link: {
              type: "generated-index",
            },
            items: ["identities/get-started/setup"],
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
              "identities/sign-in/two-step-registration",
              "identities/sign-in/identifier-first-authentication",
              "identities/sign-in/login-hint",
              "identities/sign-in/actions",
              "identities/sign-in/code-submission-limit",
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
                  "identities/get-started/sign-up",
                  "kratos/self-service/flows/user-login",
                  "identities/get-started/sign-in",
                  "kratos/self-service/flows/user-logout",
                  "identities/get-started/sign-out",
                  "kratos/self-service/flows/user-settings",
                  "kratos/self-service/flows/verify-email-account-activation",
                  "kratos/self-service/flows/account-recovery-password-reset",
                  "identities/get-started/account-recovery",
                  "kratos/self-service/flows/user-facing-errors",
                  "identities/get-started/social-sign-in",
                  "identities/get-started/passwordless",
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
                  "identities/get-started/session-management",
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
                  "identities/get-started/mfa",
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
              {
                type: "category",
                label: "Search",
                link: {
                  type: "doc",
                  id: "kratos/manage-identities/search/identity-search-console",
                },
                items: [
                  "kratos/manage-identities/search/identity-search-console",
                  "kratos/manage-identities/search/identity-search-api",
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
                  "kratos/bring-your-own-ui/custom-vs-built-in-ui",
                  {
                    type: "doc",
                    id: "elements/index",
                    label: "Ory Elements",
                    className: "external-link",
                  },
                  {
                    type: "category",
                    label: "Build your custom UI",
                    link: {
                      type: "doc",
                      id: "getting-started/custom-ui",
                    },
                    items: [
                      "kratos/bring-your-own-ui/custom-ui-basic-integration",
                      "kratos/bring-your-own-ui/custom-ui-advanced-integration",
                      "kratos/concepts/ui-user-interface",
                    ],
                  },
                  "kratos/bring-your-own-ui/configure-ory-to-use-your-ui",
                ],
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Fine-grained AuthZ & Permissions",
        className: "sidebar-icon sidebar-icon-keto",
        collapsed: true,
        items: [
          "keto/index",
          {
            type: "category",
            label: "Start",
            collapsed: false,
            collapsible: false,
            link: {
              type: "doc",
              id: "guides/permissions/overview",
            },
            items: ["keto/quickstart", "keto/examples/olymp-file-sharing"],
          },
          {
            type: "category",
            label: "Concepts",
            collapsed: false,
            collapsible: false,
            link: {
              type: "doc",
              id: "keto/index",
            },
            items: [
              "keto/guides/rbac",
              {
                type: "autogenerated",
                dirName: "keto/concepts",
              },
              "keto/reference/ory-permission-language",
            ],
          },
          {
            type: "category",
            label: "Guides",
            collapsed: false,
            collapsible: false,
            items: [
              "keto/guides/simple-access-check-guide",
              "keto/modeling/create-permission-model",
              "keto/guides/list-api-display-objects",
              "keto/guides/expand-api-display-who-has-access",
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Delegated Scope-based AuthZ & Federated AuthN",
        className: "sidebar-icon sidebar-icon-hydra",
        collapsed: true,
        items: [
          "oauth2-oidc/index",
          {
            type: "category",
            label: "Start",
            collapsed: false,
            collapsible: false,
            link: {
              type: "doc",
              id: "getting-started/ory-network-oauth2",
            },
            items: [
              "getting-started/oauth2-openid/expressjs",
              "hydra/guides/using-oauth2",
            ],
          },
          {
            type: "category",
            label: "Concepts",
            collapsed: false,
            collapsible: false,
            link: {
              type: "doc",
              id: "oauth2-oidc/index",
            },
            items: [
              "oauth2-oidc/overview/oauth2-concepts",
              "oauth2-oidc/overview/oidc-concepts",
              "hydra/concepts/before-oauth2",
              "hydra/security-architecture",
            ],
          },
          {
            type: "category",
            label: "Guides",
            collapsed: false,
            collapsible: false,
            link: {
              type: "doc",
              id: "hydra/guides/oauth2-token-introspection",
            },
            items: [
              {
                type: "category",
                label: "Flows",
                link: {
                  type: "doc",
                  id: "oauth2-oidc/authorization-code-flow",
                },
                items: [
                  "oauth2-oidc/authorization-code-flow",
                  "oauth2-oidc/client-credentials",
                  "oauth2-oidc/device-authorization",
                  "oauth2-oidc/resource-owner-password-grant",
                  "oauth2-oidc/refresh-token-grant",
                  "oauth2-oidc/userinfo-oidc",
                  "oauth2-oidc/oidc-logout",
                  "oauth2-oidc/wellknown-endpoint-discovery",
                ],
              },
              {
                type: "category",
                label: "Token management",
                link: {
                  type: "generated-index",
                  slug: "guides/token-management",
                },
                items: [
                  "hydra/guides/oauth2-token-introspection",
                  "oauth2-oidc/revoke-consent",
                  "oauth2-oidc/skip-consent",
                  "oauth2-oidc/jwt-access-token",
                  "hydra/guides/audiences",
                  "hydra/guides/jwt",
                  "hydra/guides/client-token-expiration",
                  "hydra/guides/graceful-token-refresh",
                  "oauth2-oidc/claims-scope",
                ],
              },
              {
                type: "category",
                label: "Ory Actions",
                items: ["hydra/guides/claims-at-refresh"],
              },
              {
                type: "category",
                label: "Client management",
                items: [
                  "hydra/guides/oauth2-clients",
                  "hydra/jwks",
                  "hydra/guides/openid",
                  "oauth2-oidc/issuer-url",
                ],
              },
              {
                type: "category",
                label: "User Interface",
                link: {
                  type: "doc",
                  id: "hydra/guides/custom-ui-oauth2",
                },
                items: [
                  "oauth2-oidc/custom-login-consent/flow",
                  "hydra/guides/logout",
                ],
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Enterprise SSO AuthZ",
        className: "sidebar-icon sidebar-icon-polis",
        collapsed: true,
        items: [
          "polis/index",
          {
            type: "category",
            label: "Self-Hosted",
            collapsed: false,
            collapsible: false,
            items: [
              "polis/install",
              "polis/quickstart",
              "polis/reference/api",
              {
                type: "category",
                label: "Enterprise SSO",
                collapsed: false,
                collapsible: false,
                link: {
                  type: "doc",
                  id: "polis/saml-federation/index",
                },
                items: [
                  {
                    type: "category",
                    label: "Concepts",
                    link: {
                      type: "doc",
                      id: "polis/sso-flow/index",
                    },
                    items: [
                      "polis/sso-flow/index",
                      "polis/sso-flow/example-flow",
                      "polis/security",
                    ],
                  },
                  {
                    type: "category",
                    label: "Configuration",
                    items: [
                      "polis/deploy/env-variables",
                      "polis/guides/configuring-saml-sso",
                      "polis/guides/login-with-saml-sso",
                      "polis/deploy/pre-loaded-connections",
                    ],
                  },
                  {
                    type: "category",
                    label: "Guides",
                    link: {
                      type: "doc",
                      id: "polis/guides/service",
                    },
                    items: [
                      "polis/guides/service",
                      "polis/guides/npm-library",
                      "polis/upgrade",
                      "polis/guides/examples",
                      "polis/sbom",
                      "polis/container-signing",
                      "polis/events",
                      "polis/observability",
                      {
                        type: "category",
                        label: "Frameworks",
                        items: [
                          {
                            type: "autogenerated",
                            dirName: "polis/guides/frameworks",
                          },
                        ],
                      },
                      {
                        type: "category",
                        label: "Deployment",
                        items: [
                          {
                            type: "autogenerated",
                            dirName: "polis/guides/deployment",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "category",
                    label: "SAML SSO Providers",
                    link: {
                      type: "doc",
                      id: "polis/sso-providers/index",
                    },
                    items: [
                      {
                        type: "autogenerated",
                        dirName: "polis/sso-providers",
                      },
                    ],
                  },
                ],
              },
              {
                type: "category",
                label: "Directory Sync",
                collapsed: false,
                collapsible: false,
                link: {
                  type: "doc",
                  id: "polis/directory-sync/index",
                },
                items: [
                  "polis/directory-sync/quickstart",
                  "polis/directory-sync/api-reference",
                  {
                    type: "category",
                    label: "Guides",
                    collapsed: true,
                    link: {
                      type: "generated-index",
                      slug: "polis/directory-sync/guides",
                    },
                    items: [
                      "polis/directory-sync/webhooks",
                      "polis/directory-sync/events",
                      "polis/directory-sync/observability",
                      "polis/directory-sync/examples",
                      "polis/directory-sync/faq",
                      {
                        type: "category",
                        label: "Directory providers",
                        link: {
                          type: "generated-index",
                          slug: "polis/directory-sync/providers",
                        },
                        items: [
                          {
                            type: "autogenerated",
                            dirName: "polis/directory-sync/providers",
                          },
                        ],
                      },
                      {
                        type: "category",
                        label: "Frameworks",
                        items: [
                          {
                            type: "autogenerated",
                            dirName: "polis/directory-sync/guides",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "category",
                label: "Admin Portal",
                collapsed: false,
                collapsible: false,
                link: {
                  type: "doc",
                  id: "polis/admin-portal/index",
                },
                items: [
                  {
                    type: "category",
                    label: "Guides",
                    collapsed: true,
                    link: {
                      type: "generated-index",
                      slug: "polis/admin-portal/guides",
                    },
                    items: [
                      "polis/admin-portal/enterprise-sso",
                      "polis/admin-portal/setup-links-enterprise-sso",
                      "polis/admin-portal/directory-sync",
                      "polis/admin-portal/setup-links-directory-sync",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Proxy-based Access Control",
        className: "sidebar-icon sidebar-icon-oathkeeper",
        collapsed: true,
        items: [
          "oathkeeper/index",
          "oathkeeper/install",
          "oathkeeper/reference/api",
          {
            type: "category",
            label: "Concepts",
            collapsed: false,
            collapsible: false,
            items: [
              "oathkeeper/api-access-rules",
              {
                type: "category",
                label: "Handlers",
                items: [
                  "oathkeeper/pipeline",
                  "oathkeeper/pipeline/authn",
                  "oathkeeper/pipeline/authz",
                  "oathkeeper/pipeline/mutator",
                  "oathkeeper/pipeline/error",
                ],
              },
              "oathkeeper/grpc-middleware",
            ],
          },
          {
            type: "category",
            label: "Guides",
            collapsed: false,
            collapsible: false,
            items: [
              "oathkeeper/configure-deploy",
              "oathkeeper/guides/proxy-websockets",
              "oathkeeper/guides/traefik-proxy-integration",
              "oathkeeper/guides/upgrade",
            ],
          },
          {
            type: "category",
            label: "Reference",
            collapsed: false,
            collapsible: false,
            items: [
              "oathkeeper/reference/configuration",
              "oathkeeper/reference/configuration-editor",
              {
                "Command Line Interface (CLI)": [
                  {
                    type: "autogenerated",
                    dirName: "oathkeeper/cli",
                  },
                ],
              },
              "oathkeeper/sdk",
            ],
          },
        ],
      },
    ],
  },
]

export default networkSidebar
