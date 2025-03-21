import { CardItem } from "../../components/WelcomeCard/welcome-card"

// Section 1: Identity Management
export const identityManagement: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "identity-management-section",
  title: "Identity Management",
  description: "What your users need for authentication and user management",
  cards: [
    {
      title: "Implement User Login",
      description: "Add email/password authentication to your application",
      language: "auth",
      languageLogoAlt: "Authentication icon",
      docs: "/docs/kratos/concepts/credentials/username-email-password",
    },
    {
      title: "Enable Passwordless Authentication",
      description: "Let users sign in without passwords via email links or SMS",
      language: "magic",
      languageLogoAlt: "Magic link icon",
      docs: "/docs/kratos/passwordless/passwordless",
    },
    {
      title: "Add Social Sign-In",
      description: "Connect with Google, GitHub, Facebook and other providers",
      language: "social",
      languageLogoAlt: "Social login icon",
      docs: "/docs/kratos/social-signin/overview",
    },
    {
      title: "Verify User Identities",
      description:
        "Email verification, phone verification, and account activation",
      language: "verify",
      languageLogoAlt: "Verification icon",
      docs: "/docs/kratos/self-service/flows/verify-email-account-activation",
    },
    {
      title: "Manage User Sessions",
      description: "Control login sessions, timeouts, and multi-device access",
      language: "session",
      languageLogoAlt: "Session icon",
      docs: "/docs/kratos/session-management/overview",
    },
    {
      title: "Support Multi-Factor Authentication",
      description: "Add TOTP, WebAuthn, or SMS verification",
      language: "shield",
      languageLogoAlt: "MFA icon",
      docs: "/docs/kratos/mfa/overview",
    },
  ],
}

// Section 2: Authorization & Security
export const authorizationSecurity: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "authorization-security-section",
  title: "Authorization & Security",
  description: "How to secure access to resources and APIs",
  cards: [
    {
      title: "Secure APIs",
      description:
        "Protect your backend services with token-based authentication",
      language: "api",
      languageLogoAlt: "API icon",
      docs: "/docs/getting-started/overview",
    },
    {
      title: "Enable Single Sign-On",
      description: "Let users access multiple applications with one login",
      language: "sso",
      languageLogoAlt: "SSO icon",
      docs: "/docs/kratos/social-signin/oidc-pkce",
    },
    {
      title: "Manage Access Tokens",
      description: "Issue, validate and revoke access credentials",
      language: "token",
      languageLogoAlt: "Token icon",
      docs: "/docs/hydra/guides/oauth2-token-introspection",
    },
    {
      title: "Implement OAuth Flows",
      description: "Add authorization code, client credentials, or other flows",
      language: "oauth",
      languageLogoAlt: "OAuth icon",
      docs: "/docs/oauth2-oidc/authorization-code-flow",
    },
    {
      title: "Connect Service Accounts",
      description: "Enable machine-to-machine authentication",
      language: "service",
      languageLogoAlt: "Service account icon",
      docs: "/docs/oauth2-oidc/client-credentials",
    },
  ],
}

// Section 3: Permission Management
export const permissionManagement: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "permission-management-section",
  title: "Permission Management",
  description: "Controlling who can access what",
  cards: [
    {
      title: "Check Access Permissions",
      description: "Verify if users can perform specific actions",
      language: "permission",
      languageLogoAlt: "Permission icon",
      docs: "/docs/keto/guides/simple-access-check-guide",
    },
    {
      title: "Implement Role-Based Access",
      description: "Control access based on user roles and groups",
      language: "rbac",
      languageLogoAlt: "RBAC icon",
      docs: "/docs/keto/guides/rbac",
    },
    {
      title: "Build Relationship-Based Permissions",
      description: "Advanced access control for complex scenarios",
      language: "relationship",
      languageLogoAlt: "Relationship icon",
      docs: "/docs/keto/modeling/create-permission-model",
    },
    {
      title: "Manage Access Policies",
      description: "Define, update and enforce permission rules",
      language: "policy",
      languageLogoAlt: "Policy icon",
      docs: "/docs/keto/reference/ory-permission-language",
    },
    {
      title: "Audit Access Activities",
      description: "Track permission changes and access attempts",
      language: "audit",
      languageLogoAlt: "Audit icon",
      docs: "/docs/keto/guides/list-api-display-objects",
    },
  ],
}

// Section 4: Implementation Guides - Frontend Frameworks
export const frontendFrameworks: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "frontend-frameworks-section",
  title: "Frontend Frameworks",
  description: "Framework-specific integration help",
  cards: [
    {
      title: "React Integration",
      description:
        "Integrate authentication into your React + Vite application with Ory",
      language: "react",
      languageLogoAlt: "React logo",
      docs: "/docs/getting-started/integrate-auth/react",
    },
    {
      title: "Next.js Integration",
      description:
        "Integrate authentication into your Next.js application with Ory",
      language: "nextjs",
      languageLogoAlt: "Next.js logo",
      docs: "/docs/getting-started/integrate-auth/nextjs",
    },
    {
      title: "Vue.js Integration",
      description:
        "Get started with Ory and Vue.js to protect a page with login",
      language: "vue",
      languageLogoAlt: "Vue.js logo",
      docs: "/docs/getting-started/integrate-auth/vue",
    },
  ],
}

// Section 5: Implementation Guides - Backend Frameworks
export const backendFrameworks: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "backend-frameworks-section",
  title: "Backend Frameworks",
  description: "Framework-specific integration help",
  cards: [
    {
      title: "Node.js/Express Integration",
      description:
        "The Ory Node.js SDK allows you to integrate authentication into your Express.js application",
      language: "nodejs",
      languageLogoAlt: "Node logo",
      docs: "/docs/getting-started/integrate-auth/expressjs",
    },
    {
      title: "Go Integration",
      description:
        "The Ory Go SDK allows you to easily integrate authentication into your Go application",
      language: "go",
      languageLogoAlt: "Go logo",
      docs: "/docs/getting-started/integrate-auth/go",
    },
    {
      title: "Python Integration",
      description:
        "Integrate Ory authentication and permissions with your Python application",
      language: "python",
      languageLogoAlt: "Python logo",
      docs: "https://www.ory.sh/blog/securing-flask-application-using-kratos-and-keto",
    },
  ],
}

// Section 6: Deployment Options
export const deploymentOptions: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "deployment-options-section",
  title: "Deploy Ory",
  description: "Choose your deployment option",
  cards: [
    {
      title: "Ory Enterprise",
      description:
        "Enterprise-grade support and features for your self-hosted Ory deployment.",
      language: "ory",
      languageLogoAlt: "Enterprise icon",
      docs: "/docs/self-hosted/oel/quickstart",
    },
    {
      title: "Open Source",
      description:
        "Ory is open source first. Run Ory on your own infrastructure.",
      language: "github",
      languageLogoAlt: "GitHub icon",
      docs: "/docs/open-source",
    },
  ],
}
