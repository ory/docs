import { WelcomeCardProps } from "../../components/WelcomeCard/welcome-card"

// Authentication section cards
export const authenticationCards: WelcomeCardProps = {
  id: "authentication-section",
  title: "Authentication",
  cards: [
    {
      title: "Email & Password",
      description: "Secure authentication with username/email and password, with advanced password policies.",
      language: "mail",
      languageLogoAlt: "Email & Password logo",
      docs: "/docs/kratos/passwordless/one-time-code",
    },
    {
      title: "Magic Link",
      description: "Ory Kratos supports passwordless authentication with magic links.",
      language: "magic",
      languageLogoAlt: "Magic Link logo",
      docs: "/docs/kratos/manage-identities/account-recovery#magic-links",
    },
    {
      title: "Passkey",
      description: "Implement WebAuthn/FIDO2 passkeys for a secure and passwordless experience.",
      language: "lock",
      languageLogoAlt: "Passkey logo",
      docs: "/docs/kratos/passwordless/passkeys",
    },

  ],
}

// OAuth2 section cards
export const oauthCards: WelcomeCardProps = {
  id: "oauth-section",
  title: "OAuth 2",
  cards: [
    {
      title: "Social Sign-in",
      description: "Ory includes custom connectors for 15+ social sign-in providers, such as GitHub, Google, and Facebook.",
      language: "contact",
      languageLogoAlt: "Social Sign-in logo",
      docs: "/docs/kratos/social-signin/overview",
    },
    {
      title: "FedCM",
      description: "FedCM is a browser API that allows websites to authenticate users via third-party identity providers.",
      language: "contact",
      languageLogoAlt: "FedCM logo",
      docs: "/docs/kratos/social-signin/fedcm",
    },
  ],
}

// Permission section cards
export const permissionCards: WelcomeCardProps = {
  id: "permission-section",
  title: "Permission",
  cards: [
    {
      title: "Permissions",
      description: "Ory provides fine-grained permissions with relationship-based access control (ReBAC) for scalable authorization.",
      language: "shield",
      languageLogoAlt: "Permissions logo",
      docs: "/docs/guides/permissions/overview",
    },
    {
        title: "RBAC",
        description: "Explore all permission and authorization features provided by Ory.",
        language: "shield-user",
        languageLogoAlt: "Permissions logo",
        docs: "/docs/keto/guides/rbac",
      },
  ],
}

// Use Ory section cards
export const useOryCards: WelcomeCardProps = {
  id: "use-ory-section",
  title: "Use Ory",
  cards: [
    {
      title: "Ory Network",
      description: "The Ory Network is the most convenient way to run Ory. Sign up and create a free developer project.",
      language: "ory",
      languageLogoAlt: "Ory Network logo",
      docs: "https://console.ory.sh/registration",
    },
    {
      title: "Ory Enterprise",
      description: "Enterprise-grade support and features for your self-hosted Ory deployment.",
      language: "ory",
      languageLogoAlt: "Ory Enterprise logo",
      docs: "/docs/self-hosted/oel/quickstart",
    },
    {
      title: "Open Source",
      description: "Ory is open source first. We believe in the power of open source to build a better internet.",
      language: "github",
      languageLogoAlt: "Open Source logo",
      docs: "/docs/open-source",
    },
  ],
}
