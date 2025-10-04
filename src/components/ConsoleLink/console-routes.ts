export const routes = {
  default: {
    homepage: "https://ory.com/",
    pricing: "https://ory.com/pricing",
    console: "https://console.ory.com/",
    tos: "https://ory.com/ptos",
    privacy: "https://ory.com/privacy",
    docs: "https://ory.com/docs",
    videos: "https://www.youtube.com/c/ORYAcadamy/videos",
    status: "https://status.ory.com/",
    slack: "https://slack.ory.com/",
    github: "https://github.com/ory",
    bug: "https://github.com/ory/network/issues/new",
    contact: "https://www.ory.com/contact/",
    twitter: "https://twitter.com/orycorp",
    talkToUs: "https://ory.com/talk-to-us",
  },
  resources: {
    iso27001:
      "https://www.ory.com/resources/iso27001/OryCorp-ISO27001-Certificate-of-Registration.pdf",
  },
  root: "/",
  "404": "/404",
  _500: "/500",
  error: "/error",
  support: "/support",
  account: {
    login: "/login",
    recovery: "/recovery",
    verification: "/verification",
    register: "/registration",
    settings: "/settings",
    advancedSettings: "/settings/advanced",
  },
  getStarted: {
    onboard: "/get-started",
  },
  invites: "/invites",
  guides: "/guides",
  project: {
    activity: {
      route: "/projects/[project]/activity",
      href: (project: string) => `/projects/${project}/activity`,
      events: {
        route: "/projects/[project]/activity/events",
        href: (project: string) => `/projects/${project}/activity/events`,
      },
    },
    connect: {
      href: (project: string) => `/projects/${project}/connect`,
      route: "/projects/[project]/connect",
    },
    developers: {
      href: (project: string) => `/projects/${project}/developers`,
      route: "/projects/[project]/developers",
      actions: {
        route: "/projects/[project]/developers/actions",
        href: (project: string) => `/projects/${project}/developers/actions`,
      },
      guides: {
        route: "/projects/[project]/developers/guides",
        href: (project: string) => `/projects/${project}/developers/guides`,
      },
    },
    list: "/projects",
    create: "/projects/create",
    settings: {
      route: "/projects/[project]/settings",
      href: (project: string) => `/projects/${project}/settings`,
      endpoints: {
        route: "/projects/[project]/browser-redirects",
        href: (project: string) => `/projects/${project}/browser-redirects`,
      },
      billing: {
        route: "/projects/[project]/settings/billing",
        href: (project: string) => `/projects/${project}/settings/billing`,
      },
      collaborators: {
        route: "/projects/[project]/settings/collaborators",
        href: (project: string) =>
          `/projects/${project}/settings/collaborators`,
      },
      advanced: {
        route: "/projects/[project]/settings/advanced",
        href: (project: string) => `/projects/${project}/settings/advanced`,
      },
    },
    cname: {
      route: "/projects/[project]/custom-domains",
      href: (project: string) => `/projects/${project}/custom-domains`,
    },
    passwordless: {
      route: "/projects/[project]/passwordless",
      href: (project: string) => `/projects/${project}/passwordless`,
    },
    mfa: {
      route: "/projects/[project]/mfa",
      href: (project: string) => `/projects/${project}/mfa`,
    },
    recovery: {
      route: "/projects/[project]/recovery",
      href: (project: string) => `/projects/${project}/recovery`,
    },
    verification: {
      route: "/projects/[project]/verification",
      href: (project: string) => `/projects/${project}/verification`,
    },
    emailConfiguration: {
      route: "/projects/[project]/email-configuration",
      href: (project: string) => `/projects/${project}/email-configuration`,
    },
    emailTemplates: {
      route: "/projects/[project]/email-templates",
      href: (project: string) => `/projects/${project}/email-templates`,
    },
    smsConfiguration: {
      route: "/projects/[project]/sms-configuration",
      href: (project: string) => `/projects/${project}/sms-configuration`,
    },
    sessionSettings: {
      route: "/projects/[project]/session-settings",
      href: (project: string) => `/projects/${project}/session-settings`,
    },
    ui: {
      route: "/projects/[project]/ui",
      href: (project: string) => `/projects/${project}/ui`,
    },
    identities: {
      list: {
        route: "/projects/[project]/identities",
        href: (project: string) => `/projects/${project}/identities`,
      },
      details: {
        route: "/projects/[project]/identities/[identity]",
        href: (project: string, identity: string) =>
          `/projects/${project}/identities/${identity}`,
      },
    },
    sessions: {
      list: {
        route: "/projects/[project]/sessions",
        href: (project: string) => `/projects/${project}/sessions`,
      },
      details: {
        route: "/projects/[project]/sessions/[session]",
        href: (project: string, id: string) =>
          `/projects/${project}/sessions/${id}`,
      },
    },
    permissions: {
      relationships: {
        route: "/projects/[project]/permissions/relationships",
        href: (project: string) =>
          `/projects/${project}/permissions/relationships`,
      },
      configuration: {
        route: "/projects/[project]/permissions/configuration",
        href: (project: string) =>
          `/projects/${project}/permissions/configuration`,
      },
    },
    identitySchema: {
      route: "/projects/[project]/identity-schema",
      href: (project: string) => `/projects/${project}/identity-schema`,
    },
    socialSignIn: {
      route: "/projects/[project]/social-signin",
      href: (project: string) => `/projects/${project}/social-signin`,
      configureProvider: {
        route: "/projects/[project]/social-signin/[provider]",
        href: (project: string, providerId: string) =>
          `/projects/${project}/social-signin/${providerId}`,
      },
    },
    oauthConfiguration: {
      route: "/projects/[project]/oauth",
      href: (project: string) => `/projects/${project}/oauth`,
      edit: {
        route: "/projects/[project]/oauth/[client]",
        href: (project: string, client: string) =>
          `/projects/${project}/oauth/${client}`,
      },
      create: {
        route: "/projects/[project]/oauth/create",
        href: (project: string) => `/projects/${project}/oauth/create`,
      },
      overview: {
        route: "/projects/[project]/oauth/overview",
        href: (project: string) => `/projects/${project}/oauth/overview`,
      },
      configure: {
        route: "/projects/[project]/oauth/configure",
        href: (project: string) => `/projects/${project}/oauth/configure`,
      },
      identityIntegration: {
        route: "/projects/[project]/oauth/identity-integration-settings",
        href: (project: string) =>
          `/projects/${project}/oauth/identity-integration-settings`,
      },
    },
    courierMessages: {
      route: "/projects/[project]/email-delivery",
      href: (project: string) => `/projects/${project}/email-delivery`,
      detail: {
        route: "/projects/[project]/courier-messages/[id]",
        href: (project: string, msgID: string) =>
          `/projects/${project}/email-delivery/${msgID}`,
      },
    },
    accountExperience: {
      route: "/projects/[project]/account-experience",
      href: (project: string) => `/projects/${project}/account-experience`,
      theming: {
        route: "/projects/[project]/account-experience/theming",
        href: (project: string) =>
          `/projects/${project}/account-experience/theming`,
      },
    },
    authentication: {
      route: "/projects/[project]/authentication",
      href: (project: string) => `/projects/${project}/authentication`,
      sessionSettings: {
        route: "/projects/[project]/authentication/sessions",
        href: (project: string) =>
          `/projects/${project}/authentication/sessions`,
      },
      organizations: {
        route: "/projects/[project]/authentication/organizations",
        href: (project: string) =>
          `/projects/${project}/authentication/organizations`,
        edit: {
          route: "/projects/[project]/authentication/organizations/[id]",
          href: (project: string, id: string) =>
            `/projects/${project}/authentication/organizations/${id}`,
        },
      },
    },
    hostedUI: {
      registration: (base: string) => `${base}/registration`,
      login: (base: string) => `${base}/login`,
    },
    getStarted: {
      route: "/projects/[project]/get-started",
      href: (project: string) => `/projects/${project}/get-started`,
    },
  },
  workspace: {
    route: "/workspaces/[workspace]",
    href: (workspace: string) => `/workspaces/${workspace}`,
    create: "/workspaces/create",
    list: "/workspaces",
    projects: {
      route: "/workspaces/[workspace]/projects",
      href: (workspace: string) => `/workspaces/${workspace}/projects`,
    },
    settings: {
      route: "/workspaces/[workspace]/settings",
      href: (workspace: string) => `/workspaces/${workspace}/settings`,
      members: {
        route: "/workspaces/[workspace]/settings/members",
        href: (workspace: string) =>
          `/workspaces/${workspace}/settings/members`,
      },
      apiKeys: {
        route: "/workspaces/[workspace]/settings/api-keys",
        href: (workspace: string) =>
          `/workspaces/${workspace}/settings/api-keys`,
      },
      subscription: {
        route: "/workspaces/[workspace]/settings/subscription",
        href: (workspace: string) =>
          `/workspaces/${workspace}/settings/subscription`,
      },
      billing: {
        route: "/workspaces/[workspace]/settings/billing",
        href: (workspace: string) =>
          `/workspaces/${workspace}/settings/billing`,
      },
    },
  },
}
