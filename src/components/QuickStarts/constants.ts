import type { QuickstartCategory, DeploymentMode, LanguageMeta } from "./types"

export const CATEGORIES: QuickstartCategory[] = [
  {
    id: "ory-kratos",
    label: "Ory Kratos",
    items: [
      {
        label: "Introduction to Ory Kratos",
        to: "/docs/identities",
        description: "Identity management and authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Kratos",
        to: "/docs/kratos/quickstart",
        description:
          "Run Ory Kratos locally with Docker and explore the main flows.",
        deploymentModes: ["oel", "oss"],
      },
      {
        label: "Get started with identity management",
        to: "/docs/kratos/manage-identities/overview",
        description: "Identity management and authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with authentication",
        to: "/docs/guides/authentication",
        description:
          "Password, passwordless, passkey, and other authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with multi-factor authentication",
        to: "/docs/kratos/mfa/overview",
        description: "Multi-factor authentication.",
        deploymentModes: ["network", "oel", "oss"],
      },
    ],
  },
  {
    id: "ory-hydra",
    label: "Ory Hydra",
    items: [
      {
        label: "Introduction to Ory Hydra",
        to: "/docs/oauth2-oidc",
        description: "OAuth2 & OpenID Connect social sign-in concepts.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Hydra",
        to: "/docs/getting-started/ory-network-oauth2",
        description: "Client credential and authorization code grant.",
        deploymentModes: ["network"],
      },
      {
        label: "Get started with Ory Hydra",
        to: "/docs/hydra/self-hosted/quickstart",
        description:
          "Run Ory Hydra locally and try the most important OAuth2 flows.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-keto",
    label: "Ory Keto",
    items: [
      {
        label: "Introduction to Ory Keto",
        to: "/docs/keto",
        description: "Relationship-based permissions system.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Keto",
        to: "/docs/keto/quickstart",
        description:
          "Quickstart for understanding relationships and permission checks.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-oathkeeper",
    label: "Ory Oathkeeper",
    items: [
      {
        label: "Introduction to Ory Oathkeeper",
        to: "/docs/oathkeeper",
        description: "Zero trust proxy concepts and architecture.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Configure and deploy Ory Oathkeeper",
        to: "/docs/oathkeeper/configure-deploy",
        description: "Configure, build, and deploy Ory Oathkeeper.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-polis",
    label: "Ory Polis",
    items: [
      {
        label: "Introduction to Ory Polis",
        to: "/docs/polis",
        description:
          "Enterprise SSO for SAML and OIDC identity providers and SCIM provising.",
        deploymentModes: ["network", "oel", "oss"],
      },
      {
        label: "Get started with Ory Polis",
        to: "/docs/polis/quickstart",
        description:
          "Quickstart for Enterprise SSO authentication and SCIM provisioning.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-elements",
    label: "Ory Elements",
    items: [
      {
        label: "Ory Elements introduction",
        to: "/docs/elements",
        description:
          "Pre-built UI components for Ory self-service and OAuth2 flows.",
        deploymentModes: ["network", "oel"],
      },
      {
        label: "Next.js App Router quickstart",
        to: "/docs/getting-started/integrate-auth/16_nextjs_app_router",
        description: "Use Ory Elements in a Next.js App Router application.",
        deploymentModes: ["network", "oel"],
      },
      {
        label: "Next.js Pages Router quickstart",
        to: "/docs/getting-started/integrate-auth/17_nextjs_pages_router",
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
