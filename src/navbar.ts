// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Navbar } from "@docusaurus/theme-common"

export const navbar: Navbar = {
  hideOnScroll: false,
  logo: {
    alt: "Ory",
    src: `/docs/img/logos/logo-docs-2023-02-15.svg`,
    srcDark: `/docs/img/logos/logo-docs-dark-2023-02-15.svg`,
    href: `https://www.ory.com`,
    width: 63,
    height: 32,
  },
  items: [
    {
      type: 'dropdown',
      label: 'Products',
      position: 'left',
      items: [
        {
          label: 'Ory Network',
          to: '/network/getting-started/overview',
        },
        {
          label: 'Ory Enterprise License',
          to: '/oel/getting-started/overview',
        },
        {
          label: 'Ory Open Source',
          to: '/oss/getting-started/overview',
        },
      ],
    },
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
          to: "/docs/oauth2-oidc",
          label: "OAuth2 & OIDC",
        },
        {
          to: "/docs/keto",
          label: "Permissions",
        },
        {
          to: "/docs/polis",
          label: "SAML",
        },
        {
          to: "/docs/oathkeeper",
          label: "Zero Trust",
        },
        {
          to: "/docs/self-hosted/oel",
          label: "Enterprise License",
        },
        {
          to: "/docs/elements",
          label: "Elements",
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
        //{
        //  to: "/docs/sdk",
        //  label: "Ory SDKs",
        //},
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
          to: "https://www.ory.com/chat",
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
