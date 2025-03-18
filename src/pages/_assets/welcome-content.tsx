import { WelcomeCardProps } from "../../components/WelcomeCard/welcome-card"

// Backend frameworks content
export const backendFrameworks: WelcomeCardProps = {
  id: "backend-frameworks",
  title: "Backend Frameworks",
  cards: [
    {
      title: "Node/Express",
      description:
        "The Ory Node.js SDK allows you to integrate authentication into your Express.js application.",
      language: "typescript",
      languageLogoAlt: "TypeScript logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/expressjs",
      docs: "/docs/getting-started/integrate-auth/expressjs",
    },
    {
      title: "Go",
      description:
        "The Ory Go SDK allows you to easily integrate authentication into your Go application.",
      language: "go",
      languageLogoAlt: "Go logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/go",
      docs: "/docs/getting-started/integrate-auth/go",
    },
    {
      title: "PHP",
      description:
        "The Ory PHP SDK allows you to integrate authentication into your PHP application.",
      language: "php",
      languageLogoAlt: "PHP logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/php",
      docs: "/docs/getting-started/integrate-auth/php",
    },
    {
      title: "Python",
      description: "Python SDK for Ory Kratos and Ory Keto with Flask.",
      language: "python",
      languageLogoAlt: "Python logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/examples/tree/master/kratos-keto-flask",
      docs: "https://www.ory.sh/blog/securing-flask-application-using-kratos-and-keto",
    },
    {
      title: ".NET Core",
      description:
        "The Ory .NET Core SDK allows you to integrate authentication into your .NET Core application.",
      language: "dotnet",
      languageLogoAlt: ".NET Core logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/dotnet",
      docs: "/docs/getting-started/integrate-auth/dotnet",
    },
  ],
}

// Frontend frameworks content
export const frontendFrameworks: WelcomeCardProps = {
  id: "frontend-frameworks",
  title: "Frontend Frameworks",
  cards: [
    {
      title: "React",
      description:
        "Integrate authentication into your React + Vite application with Ory.",
      language: "react",
      languageLogoAlt: "React logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/react",
      docs: "/docs/getting-started/integrate-auth/react",
    },
    {
      title: "Next.js",
      description:
        "Integrate authentication into your Next.js application with Ory.",
      language: "nextjs",
      languageLogoAlt: "Next.js logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs",
      docs: "/docs/getting-started/integrate-auth/nextjs",
    },
    {
      title: "Vue.js",
      description:
        "Get started with Ory and Vue.js to protect a page with login.",
      language: "vue",
      languageLogoAlt: "Vue.js logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/vuejs",
      docs: "/docs/getting-started/integrate-auth/vue",
    },
    {
      title: "React Native",
      description:
        "The Ory React Native SDK allows you to integrate authentication into your React Native application.",
      language: "react",
      languageLogoAlt: "React logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/kratos-selfservice-ui-react-native",
      docs: "/docs/getting-started/integrate-auth/react-native",
    },
    {
      title: "Flutter",
      description:
        "Easily add authentication to your Flutter web application with Ory.",
      language: "flutter",
      languageLogoAlt: "Flutter logo",
      author: "ory",
      tested: true,
      repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/flutter_web_redirect",
      docs: "/docs/getting-started/integrate-auth/flutter-web-redirect",
    },
  ],
}
// Authentication section cards
export const authenticationCards: WelcomeCardProps = {
  id: "authentication-section",
  title: "Authentication",
  cards: [
    {
      title: "Email & Password",
      description:
        "Secure authentication with username/email and password, with advanced password policies.",
      language: "mail",
      languageLogoAlt: "Email & Password logo",
      docs: "/docs/kratos/passwordless/one-time-code",
    },
    {
      title: "Magic Link",
      description:
        "Ory Kratos supports passwordless authentication with magic links.",
      language: "magic",
      languageLogoAlt: "Magic Link logo",
      docs: "/docs/kratos/manage-identities/account-recovery#magic-links",
    },
    {
      title: "Passkey",
      description:
        "Implement WebAuthn/FIDO2 passkeys for a secure and passwordless experience.",
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
      description:
        "Ory includes custom connectors for 15+ social sign-in providers, such as GitHub, Google, and Facebook.",
      language: "contact",
      languageLogoAlt: "Social Sign-in logo",
      docs: "/docs/kratos/social-signin/overview",
    },
    {
      title: "FedCM",
      description:
        "FedCM is a browser API that allows websites to authenticate users via third-party identity providers.",
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
      description:
        "Ory provides fine-grained permissions with relationship-based access control (ReBAC) for scalable authorization.",
      language: "shield",
      languageLogoAlt: "Permissions logo",
      docs: "/docs/guides/permissions/overview",
    },
    {
      title: "RBAC",
      description:
        "Explore all permission and authorization features provided by Ory.",
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
      description:
        "The Ory Network is the most convenient way to run Ory. Sign up and create a free developer project.",
      language: "ory",
      languageLogoAlt: "Ory Network logo",
      docs: "https://console.ory.sh/registration",
    },
    {
      title: "Ory Enterprise",
      description:
        "Enterprise-grade support and features for your self-hosted Ory deployment.",
      language: "ory",
      languageLogoAlt: "Ory Enterprise logo",
      docs: "/docs/self-hosted/oel/quickstart",
    },
    {
      title: "Open Source",
      description:
        "Ory is open source first. We believe in the power of open source to build a better internet.",
      language: "github",
      languageLogoAlt: "Open Source logo",
      docs: "/docs/open-source",
    },
  ],
}
