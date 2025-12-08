import type { QuickstartCategory, DeploymentMode, LanguageMeta } from "./types"

export const CATEGORIES: QuickstartCategory[] = [
  {
    id: "ory-kratos",
    label: "Ory Kratos",
    items: [
      {
        label: "Introduction to Ory Identities",
        to: "/docs/identities",
        description: "What Ory Identities (Kratos) is and when to use it.",
        deploymentModes: ["network"],
      },
      {
        label: "Identity management guide",
        to: "/docs/identities/get-started",
        description:
          "Day 1 essentials for browser-based authentication with Ory.",
        deploymentModes: ["network"],
      },
      {
        label: "Kratos self-hosted quickstart",
        to: "/docs/kratos/quickstart",
        description:
          "Run Ory Kratos locally with Docker and explore the main flows.",
        deploymentModes: ["oel", "oss"],
      },
    ],
  },
  {
    id: "ory-hydra",
    label: "Ory Hydra",
    items: [
      {
        label: "Introduction to Ory Hydra OAuth2",
        to: "/docs/oauth2-oidc",
        description:
          "High-level OAuth2 & OpenID Connect overview for Ory Hydra.",
      },
      {
        label: "OAuth2 & OpenID Connect",
        to: "/docs/oauth2-oidc",
        description: "Concepts and flows for Ory OAuth2 & OpenID Connect.",
      },
      {
        label: "Try common OAuth2 grants",
        to: "/docs/getting-started/ory-network-oauth2",
        description:
          "Hands-on Authorization Code and Client Credentials flows.",
      },
      {
        label: "Hydra self-hosted quickstart",
        to: "/docs/hydra/self-hosted/quickstart",
        description:
          "Run Ory Hydra locally and try the most important OAuth2 flows.",
      },
      {
        label: "Hydra guides",
        to: "/docs/hydra/guides/common-oauth2-openid-connect-flows",
        description:
          "Deep-dive guides for specific OAuth2/OpenID Connect scenarios.",
      },
    ],
  },
  {
    id: "ory-keto",
    label: "Ory Keto",
    items: [
      {
        label: "Introduction to Ory Keto Permissions",
        to: "/docs/keto",
        description: "Overview of Ory's relationship-based permission system.",
      },
      {
        label: "Keto quickstart",
        to: "/docs/keto/quickstart",
        description:
          "Cat videos example to understand relationships and permission checks.",
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
        description: "Enterprise SSO bridge for SAML and OIDC.",
      },
      {
        label: "Polis quickstart",
        to: "/docs/polis/quickstart",
        description:
          "Choose between service or npm-library integration for enterprise SSO.",
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
      },
      {
        label: "Next.js App Router quickstart",
        to: "/docs/getting-started/integrate-auth/16_nextjs_app_router",
        description: "Use Ory Elements in a Next.js App Router application.",
      },
      {
        label: "Next.js Pages Router quickstart",
        to: "/docs/getting-started/integrate-auth/17_nextjs_pages_router",
        description: "Use Ory Elements in a Next.js Pages Router application.",
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
