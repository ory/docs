import { CardItem } from "../../components/WelcomeCard/welcome-card"

// Section 1: Identity Management
export const identityManagement: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "identity-management-section",
  title: "Identity management",
  description: "What your users need for authentication and user management",
  cards: [
    {
      title: "Configure password login",
      description:
        "Enable and customize email, username, or phone-based password login",
      language: "auth",
      languageLogoAlt: "Authentication icon",
      docs: "/docs/kratos/concepts/credentials/username-email-password",
    },
    {
      title: "Enable passkeys",
      description:
        "Allow secure login using biometric authentication (fingerprint, face) with industry-standard WebAuthn support",
      language: "fingerprint",
      languageLogoAlt: "Passkey icon",
      docs: "/docs/kratos/passwordless/passkeys",
    },
    {
      title: "Enable OTP via email or SMS",
      description:
        "Implement a simple two-step verification process with one-time codes sent to users' email or phone",
      language: "otp",
      languageLogoAlt: "OTP icon",
      docs: "/docs/kratos/passwordless/one-time-code",
    },
    {
      title: "Add social sign-in",
      description: "Connect with Google, GitHub, Facebook and other providers",
      language: "social",
      languageLogoAlt: "Social login icon",
      docs: "/docs/kratos/social-signin/overview",
    },
    {
      title: "Verify user identities",
      description:
        "Email verification, phone verification, and account activation",
      language: "verify",
      languageLogoAlt: "Verification icon",
      docs: "/docs/kratos/self-service/flows/verify-email-account-activation",
    },
    {
      title: "Manage user sessions",
      description: "Control login sessions, timeouts, and multi-device access",
      language: "session",
      languageLogoAlt: "Session icon",
      docs: "/docs/kratos/session-management/overview",
    },
    {
      title: "Support multi-factor authentication",
      description: "Add TOTP, WebAuthn, or SMS verification",
      language: "shield",
      languageLogoAlt: "MFA icon",
      docs: "/docs/kratos/mfa/overview",
    },
    {
      title: "Enable enterprise SSO login",
      description:
        "Group users by organization and support B2B enterprise SSO with OIDC or SAML",
      language: "organization",
      languageLogoAlt: "Organization icon",
      docs: "/docs/kratos/organizations",
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
  title: "Authorization & security",
  description: "How to secure access to resources and APIs",
  cards: [
    {
      title: "Implement OAuth flows",
      description: "Add authorization code, client credentials, or other flows",
      language: "oauth",
      languageLogoAlt: "OAuth icon",
      docs: "/docs/oauth2-oidc/authorization-code-flow",
    },

    {
      title: "Manage access tokens",
      description: "Issue, validate, and revoke access credentials",
      language: "token",
      languageLogoAlt: "Token icon",
      docs: "/docs/guides/token-management",
    },
    {
      title: "Secure APIs",
      description:
        "Protect your backend services with token-based authentication",
      language: "api",
      languageLogoAlt: "API icon",
      docs: "/docs/getting-started/ory-network-oauth2#authorization-code-grant",
    },
    {
      title: "Connect service accounts",
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
  title: "Permission management",
  description: "Controlling who can access what",
  cards: [
    {
      title: "Check access permissions",
      description: "Verify if users can perform specific actions",
      language: "permission",
      languageLogoAlt: "Permission icon",
      docs: "/docs/keto/guides/simple-access-check-guide",
    },
    // TODO: Add role-based access control after RBAC docs are updated
    // {
    //   title: "Implement role-based access",
    //   description: "Control access based on user roles and groups",
    //   language: "rbac",
    //   languageLogoAlt: "RBAC icon",
    //   docs: "/docs/keto/guides/rbac",
    // },
    {
      title: "Build relationship-based permissions",
      description: "Advanced access control for complex scenarios",
      language: "relationship",
      languageLogoAlt: "Relationship icon",
      docs: "/docs/keto/modeling/create-permission-model",
    },
    {
      title: "Write access policies",
      description: "Define, update and enforce permission rules",
      language: "policy",
      languageLogoAlt: "Policy icon",
      docs: "/docs/keto/reference/ory-permission-language",
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
  title: "Frontend frameworks",
  description: "Framework-specific integration help",
  cards: [
    {
      title: "React integration",
      description:
        "Integrate authentication into your React + Vite application with Ory",
      language: "react",
      languageLogoAlt: "React logo",
      docs: "/docs/getting-started/integrate-auth/react",
    },
    {
      title: "Next.js integration",
      description:
        "Integrate authentication into your Next.js application with Ory",
      language: "nextjs",
      languageLogoAlt: "Next.js logo",
      docs: "/docs/getting-started/integrate-auth/nextjs-app-router-quickstart",
    },
    {
      title: "Vue.js integration",
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
  title: "Backend frameworks",
  description: "Framework-specific integration help",
  cards: [
    {
      title: "Node.js/Express integration",
      description:
        "The Ory Node.js SDK allows you to integrate authentication into your Express.js application",
      language: "nodejs",
      languageLogoAlt: "Node logo",
      docs: "/docs/getting-started/integrate-auth/expressjs",
    },
    {
      title: "Go integration",
      description:
        "The Ory Go SDK allows you to easily integrate authentication into your Go application",
      language: "go",
      languageLogoAlt: "Go logo",
      docs: "/docs/getting-started/integrate-auth/go",
    },
    {
      title: "Python integration",
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
      title: "Ory Enterprise License",
      description:
        "Enterprise-grade support and features for self-hosted on-premise Ory deployments.",
      language: "ory",
      languageLogoAlt: "Enterprise icon",
      docs: "/docs/self-hosted/oel/quickstart",
    },
    {
      title: "Open source",
      description: "Ory is open source. Run Ory on your own infrastructure.",
      language: "github",
      languageLogoAlt: "GitHub icon",
      docs: "/docs/open-source",
    },
  ],
}

export const elements: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "elements",
  title: "Ory Elements Quickstart",
  description: "Quickly add authentication to your app with Ory Elements",
  cards: [
    {
      title: "Next.js (App Router)",
      description:
        "Learn how to use Ory Elements in your Next.js application with the App Router.",
      logoUrl: "/docs/img/examples/nextjs.svg",
      docs: "/docs/getting-started/integrate-auth/nextjs-app-router-quickstart",
    },
    {
      title: "Next.js (Pages Router)",
      description:
        "Learn how to use Ory Elements in your Next.js application with the Pages Router.",
      logoUrl: "/docs/img/examples/nextjs.svg",
      docs: "/docs/getting-started/integrate-auth/nextjs-pages-router-quickstart",
    },
  ],
}

export const elementsGuides: {
  id: string
  title: string
  description: string
  cards: CardItem[]
} = {
  id: "elements",
  title: "Ory Elements Guides",
  description: "",
  cards: [
    {
      title: "Next.js (App Router)",
      description:
        "Learn how to use Ory Elements in your Next.js application with the App Router.",
      logoUrl: "/docs/img/examples/nextjs.svg",
      docs: "/docs/getting-started/integrate-auth/nextjs-app-router-quickstart",
    },
    {
      title: "Next.js (Pages Router)",
      description:
        "Learn how to use Ory Elements in your Next.js application with the Pages Router.",
      logoUrl: "/docs/img/examples/nextjs.svg",
      docs: "/docs/getting-started/integrate-auth/nextjs-pages-router-quickstart",
    },
  ],
}
