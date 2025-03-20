import { WelcomeCardProps } from "../../components/WelcomeCard/welcome-card"

export const mainFeatures: WelcomeCardProps = {
  id: "main-features",
  cards: [
    {
      title: "Authentication",
      description:
        "Ory Kratos provides a secure and scalable identity management system with email and password authentication flows.",
      language: "auth",
      languageLogoAlt: "Authentication",
      docs: "/docs/guides/authentication",
      isLarge: true,
    },

    {
      title: "2FA",
      description:
        "Ory Kratos supports two-factor authentication (2FA) with TOTP, WebAuthn, and recovery codes.",
      language: "identity",
      languageLogoAlt: "Identity",
      docs: "/docs/kratos/bring-your-own-ui/custom-ui-advanced-integration#two-factor-authentication",
      isLarge: true,
    },
    {
      title: "Magic Links",
      description:
        "Ory Kratos supports passwordless authentication with magic links.",
      language: "magic",
      languageLogoAlt: "Magic",
      docs: "/docs/kratos/manage-identities/account-recovery#magic-links",
      isLarge: true,
    },
    {
      title: "Social Sign-In",
      description:
        "Out of the box, Ory comes with custom-tailored connectors for 15+ social sign-in providers such as GitHub, Google, or Facebook.",
      language: "social",
      docs: "/docs/kratos/social-signin/overview",
      isLarge: true,
    },
    {
      title: "Ory Enterprise License",
      description:
        "Support for mission-critical environments with optimized code, on-prem deployment options, and tailored security updates.",
      language: "enterprise",
      docs: "/docs/self-hosted/deployment",
      isLarge: true,
    },
  ],
}

// Features content
export const features: WelcomeCardProps = {
  id: "features",
  title: "Core Features",
  description: "Explore Ory's core features.",
  cards: [
    {
      title: "Identities",
      description:
        "Ory Kratos provides advanced identity management with passwordless options, MFA, social sign-in, and progressive profiling.",
      language: "identity",
      docs: "/docs/identities",
    },
    {
      title: "OAuth & OIDC",
      description:
        "Ory Hydra delivers high-performance OAuth2 and OpenID Connect provider that integrates with existing identity systems.",
      language: "auth",
      docs: "/docs/getting-started/ory-network-oauth2",
    },
    {
      title: "Permissions",
      description:
        "Ory Keto implements fine-grained permission management with relationship-based access control (ReBAC) for scalable authorization.",
      language: "permission",
      docs: "/docs/guides/permissions/overview",
    },
  ],
}

// Backend frameworks content
export const backendFrameworks: WelcomeCardProps = {
  id: "backend-frameworks",
  title: "Backend Frameworks",
  description:
    "Explore how to integrate Ory into your favorite backend frameworks and libraries.",
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
  description:
    "Explore how to integrate Ory into your favorite frontend frameworks and libraries.",
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
