import type { QuickstartCategory, DeploymentMode, LanguageMeta } from "./types"

export const CATEGORIES: QuickstartCategory[] = [
  {
    id: "ory-kratos",
    label: "Ory Kratos",
    color: "var(--color-ory-product-kratos)",
    items: [
      {
        label: "Introduction to Ory Kratos",
        to: "/kratos/quickstarts/intro",
        description: "Identity management and authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Kratos",
        to: "/kratos/quickstart",
        description:
          "Run Ory Kratos locally with Docker and explore the main flows.",
        deploymentModes: ["oel", "oss"],
      },
      {
        label: "Get started with identity management",
        to: "/kratos/manage-identities/overview",
        description: "Identity management and authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with authentication",
        to: "/guides/authentication",
        description:
          "Password, passwordless, passkey, and other authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with multi-factor authentication",
        to: "/kratos/mfa/overview",
        description: "Multi-factor authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
    ],
  },
  {
    id: "ory-hydra",
    label: "Ory Hydra",
    color: "var(--color-ory-product-hydra)",
    items: [
      {
        label: "Introduction to Ory Hydra",
        to: "/oauth2-oidc",
        description: "OAuth2 & OpenID Connect social sign-in concepts.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Hydra",
        to: "/getting-started/ory-network-oauth2",
        description: "Client credential and authorization code grant.",
        deploymentModes: ["network"],
      },
      {
        label: "Get started with Ory Hydra",
        to: "/hydra/self-hosted/quickstart",
        description:
          "Run Ory Hydra locally and try the most important OAuth2 flows.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-keto",
    label: "Ory Keto",
    color: "var(--color-ory-product-keto)",
    items: [
      {
        label: "Introduction to Ory Keto",
        to: "/keto",
        description: "Relationship-based permissions system.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Keto",
        to: "/keto/quickstart",
        description:
          "Quickstart for understanding relationships and permission checks.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-polis",
    label: "Ory Polis",
    color: "var(--color-ory-product-polis)",
    items: [
      {
        label: "Introduction to Ory Polis",
        to: "/polis",
        description:
          "Enterprise SSO for SAML and OIDC identity providers and SCIM provising.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Polis",
        to: "/polis/quickstart",
        description:
          "Quickstart for Enterprise SSO authentication and SCIM provisioning.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-oathkeeper",
    label: "Ory Oathkeeper",
    color: "var(--color-ory-product-oathkeeper)",
    items: [
      {
        label: "Introduction to Ory Oathkeeper",
        to: "/oathkeeper",
        description: "Zero trust proxy concepts and architecture.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Configure and deploy Ory Oathkeeper",
        to: "/oathkeeper/configure-deploy",
        description: "Configure, build, and deploy Ory Oathkeeper.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-elements",
    label: "Ory Elements",
    color: "var(--color-ory-product-elements)",
    items: [
      {
        label: "Ory Elements introduction",
        to: "/elements",
        description:
          "Pre-built UI components for Ory self-service and OAuth2 flows.",
        deploymentModes: ["network", "oel"],
      },
      {
        label: "Next.js App Router quickstart",
        to: "/getting-started/integrate-auth/16_nextjs_app_router",
        description: "Use Ory Elements in a Next.js App Router application.",
        deploymentModes: ["network", "oel"],
      },
      {
        label: "Next.js Pages Router quickstart",
        to: "/getting-started/integrate-auth/17_nextjs_pages_router",
        description: "Use Ory Elements in a Next.js Pages Router application.",
        deploymentModes: ["network", "oel"],
      },
    ],
  },
]

export const LANGUAGE_META: Partial<Record<string, LanguageMeta>> = {
  nextjs: {
    id: "nextjs",
    label: "Next.js",
    group: "Web",
    icon: "/docs/img/examples/nextjs.svg",
  },
  react: {
    id: "react",
    label: "React",
    group: "Web",
    icon: "/docs/img/examples/react.svg",
  },
  vue: {
    id: "vue",
    label: "Vue",
    group: "Web",
    icon: "/docs/img/examples/vue.svg",
  },
  flutter: {
    id: "flutter",
    label: "Flutter",
    group: "Mobile",
    icon: "/docs/img/examples/flutter.svg",
  },
  "react-native": {
    id: "react-native",
    label: "React Native",
    group: "Mobile",
    icon: "/docs/img/examples/react.svg",
  },
  go: {
    id: "go",
    label: "Go",
    group: "Backend",
    icon: "/docs/img/examples/go.svg",
  },
  php: {
    id: "php",
    label: "PHP",
    group: "Backend",
    icon: "/docs/img/examples/php.svg",
  },
  python: {
    id: "python",
    label: "Python",
    group: "Backend",
    icon: "/docs/img/examples/python.svg",
  },
  django: {
    id: "django",
    label: "Django",
    group: "Backend",
    icon: "/docs/img/examples/django.svg",
  },
  dotnet: {
    id: "dotnet",
    label: ".NET",
    group: "Backend",
    icon: "/docs/img/examples/dotnet.svg",
  },
  nodejs: {
    id: "nodejs",
    label: "Node.js",
    group: "Backend",
    icon: "/docs/img/examples/nodejs.svg",
  },
}

export const DEPLOYMENT_OPTIONS: { id: DeploymentMode; label: string }[] = [
  { id: "network", label: "Ory Network" },
  { id: "oel", label: "Ory Enterprise License" },
  { id: "oss", label: "Ory Open Source" },
]
