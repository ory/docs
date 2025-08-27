import { routes } from "./console-routes"

export type Path = {
  title: string
  href: string
  active?: boolean
  pill?: string
  hidden?: boolean
  tags?: string[]
  featureFlag?: string
}

export type RootPath = Path & {
  paths?: Path[]
}

export type Paths = RootPath[]

export const getStartedPaths: Path[] = [
  {
    title: "Integrations",
    href: routes.project.getStarted.route + "#integrations",
  },
  {
    title: "Guides and Tutorials",
    href: routes.project.getStarted.route + "#guides-tutorials",
  },
  { title: "Community", href: routes.project.getStarted.route + "#community" },
]

export const activityPaths: Path[] = [
  { title: "Live", href: routes.project.activity.route },
  {
    title: "Logs & Events",
    href: routes.project.activity.events.route,
  },
  { title: "Sessions", href: routes.project.sessions.list.route },
  { title: "Email delivery", href: routes.project.courierMessages.route },
]

export const identititesPaths: Path[] = [
  { title: "Users & Identities", href: routes.project.identities.list.route },
  { title: "Identity schema", href: routes.project.identitySchema.route },
  {
    title: "Import users",
    href: `${routes.project.identitySchema.route}#import`,
    pill: "API only",
  },
]

export const brandingPaths: Path[] = [
  {
    title: "Theming",
    href: routes.project.accountExperience.theming.route,
  },
  {
    title: "Custom domains",
    href: routes.project.cname.route,
  },
  {
    title: "Browser redirects",
    href: routes.project.settings.endpoints.route,
  },
  {
    title: "UI URLs",
    href: routes.project.ui.route,
  },
]

export const authenticationPaths: Path[] = [
  {
    title: "General",
    href: routes.project.authentication.route,
  },
  {
    title: "Passwordless login",
    href: routes.project.passwordless.route,
  },
  {
    title: "Two-factor auth",
    href: routes.project.mfa.route,
  },
  {
    title: "Social Sign-In",
    href: routes.project.socialSignIn.route,
  },
  {
    title: "Actions & Webhooks",
    href: routes.project.developers.actions.route,
  },
  {
    title: "Enterprise SSO",
    href: routes.project.authentication.organizations.route,
  },
  {
    title: "Account recovery",
    href: routes.project.recovery.route,
  },
  {
    title: "Account verification",
    href: routes.project.verification.route,
  },
  {
    title: "Email configuration",
    href: routes.project.emailConfiguration.route,
  },
  {
    title: "Email templates",
    href: routes.project.emailTemplates.route,
  },
  {
    title: "SMS configuration",
    href: routes.project.smsConfiguration.route,
  },
  {
    title: "Sessions",
    href: routes.project.authentication.sessionSettings.route,
  },
]

export const oauthPaths: Path[] = [
  {
    title: "Overview",
    href: routes.project.oauthConfiguration.overview.route,
  },
  {
    title: "OAuth2 Clients",
    href: routes.project.oauthConfiguration.route,
  },
  {
    title: "Configuration",
    href: routes.project.oauthConfiguration.configure.route,
  },
  {
    title: "Identity integration settings",
    href: routes.project.oauthConfiguration.identityIntegration.route,
  },
]

export const permissionsPaths: Path[] = [
  {
    title: "Namespace & rules",
    href: routes.project.permissions.configuration.route,
  },
  {
    title: "Relationships",
    href: routes.project.permissions.relationships.route,
  },
]

export const projectSettingsPaths: Path[] = [
  {
    title: "Overview",
    href: routes.project.settings.route,
  },
  {
    title: "API Keys",
    href: routes.project.developers.route,
  },
  {
    title: "Members",
    href: routes.project.settings.collaborators.route,
  },
  {
    title: "Advanced",
    href: routes.project.settings.advanced.route,
  },
  {
    title: "Plans & Billing",
    href: routes.project.settings.billing.route,
  },
]

export const userSettingsPaths: Path[] = [
  { title: "Basic Profile", href: routes.account.settings + "#profile" },
  { title: "Password", href: routes.account.settings + "#password" },
  {
    title: "Connected Accounts",
    href: `${routes.account.settings}#connected-accounts`,
  },
  {
    title: "Backup Recovery Codes",
    href: `${routes.account.settings}#recovery`,
  },
  {
    title: "Two-factor authentication",
    href: routes.account.settings + "#mfa",
  },
  { title: "Hardware Tokens", href: routes.account.settings + "#webauthn" },
]

export const projectPaths: RootPath[] = [
  {
    title: "Get started",
    href: routes.project.getStarted.route,
    paths: getStartedPaths,
  },
  {
    title: "Activity",
    href: routes.project.activity.route,
    paths: activityPaths,
  },
  {
    title: "User management",
    href: routes.project.identities.list.route,
    paths: identititesPaths,
  },
  {
    title: "Authentication",
    href: routes.project.authentication.route,
    paths: authenticationPaths,
  },
  {
    title: "Branding",
    href: routes.project.accountExperience.theming.route,
    paths: brandingPaths,
  },
  {
    title: "OAuth 2",
    href: routes.project.oauthConfiguration.overview.route,
    paths: oauthPaths,
  },
  {
    title: "Permissions",
    href: routes.project.permissions.configuration.route,
    paths: permissionsPaths,
  },
  {
    title: "Project settings",
    href: routes.project.settings.route,
    paths: projectSettingsPaths,
  },
  {
    title: "Account settings",
    href: routes.account.settings,
    paths: userSettingsPaths,
    hidden: true,
  },
  {
    title: "Contact and support",
    href: routes.support,
    paths: [{ title: "Support", href: routes.support }],
    hidden: true,
  },
]

export const allProjectsPaths: RootPath[] = [
  {
    title: "All projects",
    href: routes.project.list,
    paths: [{ title: "", href: routes.project.list }],
  },
]

const workspaceSettings: Path[] = [
  { title: "Workspace overview", href: routes.workspace.settings.route },
  { title: "Members", href: routes.workspace.settings.members.route },
  { title: "API keys", href: routes.workspace.settings.apiKeys.route },
  {
    title: "Plans and subscription",
    href: routes.workspace.settings.subscription.route,
  },
  {
    title: "Usage and billing",
    href: routes.workspace.settings.billing.route,
  },
]

export const workspacesPaths: RootPath[] = [
  {
    title: "Workspace projects",
    href: routes.workspace.projects.route,
    paths: [{ title: "", href: routes.workspace.projects.route }],
  },
  {
    title: "Workspace settings",
    href: routes.workspace.settings.route,
    paths: workspaceSettings,
  },
]

export const allWorkspacesPaths: RootPath[] = [
  {
    title: "All workspaces",
    href: routes.workspace.list,
    paths: [{ title: "", href: routes.workspace.list }],
  },
]
