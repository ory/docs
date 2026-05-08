import { Navbar } from "@docusaurus/theme-common"

export const navbar: Navbar = {
  hideOnScroll: false,
  logo: {
    alt: "Ory",
    src: `/docs/img/logos/logo-light-mode.svg`,
    srcDark: `/docs/img/logos/logo-dark-mode.svg`,
    href: `https://www.ory.com`,
    width: 63,
    height: 32,
  },
  items: [
    {
      to: "/getting-started/overview",
      label: "Start",
      position: "left",
    },
    {
      label: "Products",
      position: "left",
      items: [
        {
          to: "/docs/identities",
          label: "Ory Kratos Identities",
        },
        {
          to: "/docs/oauth2-oidc",
          label: "Ory Hydra OAuth2",
        },
        {
          to: "/docs/keto",
          label: "Ory Keto Permissions",
        },
        {
          to: "/docs/polis",
          label: "Ory Polis SAML",
        },
        {
          to: "/docs/oathkeeper",
          label: "Ory Oathkeeper Zero Trust",
        },
        {
          to: "/docs/self-hosted/oel",
          label: "Ory Enterprise License",
        },
        {
          to: "/docs/elements",
          label: "Ory Elements",
        },
      ],
    },
    {
      label: "Manage",
      position: "left",
      items: [
        {
          to: "/docs/guides/operations",
          label: "Platform",
        },
        {
          to: "/docs/category/troubleshooting",
          label: "Troubleshooting",
        },
        {
          to: "/docs/security-compliance/compliance-and-certifications",
          label: "Security and compliance",
        },
      ],
    },
    {
      //   to: "/docs/reference/api",
      //   to: "/docs/reference", // TODO: Use this route
      label: "Reference",
      position: "left",
      items: [
        {
          to: "/docs/reference/api",
          label: "REST API",
        },
        {
          to: "/docs/category/ory-cli-reference",
          label: "Ory CLI",
        },
        {
          to: "/docs/sdk",
          label: "Ory SDKs",
        },
        {
          to: "/docs/category/operations-reference",
          label: "Operations",
        },
      ],
    },
    {
      to: "/docs/ecosystem/projects",
      label: "Open Source",
      position: "left",
    },
    {
      label: "Need Support?",
      position: "right",
      items: [
        {
          to: "https://www.ory.com/support",
          label: "Enterprise Support",
        },
        {
          to: "https://www.ory.com/docs/search",
          label: "Search the docs",
        },
        {
          to: "https://slack.ory.com",
          label: "Ory Community Slack",
        },
        {
          to: "https://github.com/orgs/ory/discussions",
          label: "GitHub Discussions",
        },
        {
          to: "https://stackoverflow.com/questions/tagged/ory",
          label: "Stack Overflow",
        },
        {
          to: "https://www.ory.com/contact",
          label: "Schedule a discovery call",
        },
      ],
    },

    {
      href: `https://github.com/ory`,
      label: "GitHub",
      position: "right",
    },
  ],
}
