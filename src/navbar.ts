import { Navbar } from "@docusaurus/theme-common"

export const navbar: Navbar = {
  hideOnScroll: false,
  logo: {
    alt: "Ory",
    src: `/docs/img/logos/logo-docs-2023-02-15.svg`,
    srcDark: `/docs/img/logos/logo-docs-dark-2023-02-15.svg`,
    href: `https://www.ory.sh`,
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
          label: "Identities",
        },
        {
          to: "/docs/getting-started/ory-network-oauth2",
          //   to: "/docs/federation", // TODO: Use this route
          label: "OAuth2/OIDC",
        },
        {
          to: "/docs/guides/permissions/overview",
          //   to: "/docs/permissions", // TODO: Use this route
          label: "Permissions",
        },
        {
          to: "/docs/self-hosted/oel/quickstart",
          label: "Self Hosting",
        },
      ],
    },
    {
      label: "Develop",
      position: "left",
      items: [
        {
          to: "/docs/getting-started/local-development",
          label: "Local Development",
        },

        {
          to: "/docs/ecosystem/projects",
          label: "OSS Ecosystem",
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
      ],
    },
    {
      label: "Need Support?",
      position: "right",
      items: [
        {
          to: "https://www.ory.sh/support",
          label: "Enterprise Support",
        },
        {
          to: "https://www.ory.sh/docs/search",
          label: "Search the docs",
        },
        {
          to: "https://www.ory.sh/chat",
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
          to: "https://www.ory.sh/contact",
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
