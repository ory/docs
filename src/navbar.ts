// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Navbar } from "@docusaurus/theme-common"

export const navbar: Navbar = {
  hideOnScroll: false,
  logo: {
    alt: "Ory",
    src: `/docs/img/logos/ory-logo.svg`,
    srcDark: `/docs/img/logos/ory-logo.svg`,
    href: `https://www.ory.com`,
    width: 44,
    height: 16,
  },

  items: [
    {
      label: "Home",
      to: "/docs/welcome",
      position: "left",
    },
    {
      type: "doc",
      docId: "getting-started/overview",
      label: "Quickstarts",
      position: "left",
    },
    {
      type: "dropdown",
      to: "products/products-overview",
      label: "Products",
      position: "left",
      items: [
        {
          type: "doc",
          docId: "network/getting-started/index",
          label: "Ory Network",
        },
        {
          type: "doc",
          docId: "oel/getting-started/index",
          label: "Ory Enterprise License",
        },
        {
          type: "doc",
          docId: "oss/getting-started/index",
          label: "Ory Open Source",
        },
      ],
    },
    {
      type: "dropdown",
      to: "/docs/solutions/solutions-overview",
      label: "Solutions",
      position: "left",
      items: [
        {
          type: "doc",
          docId: "solutions/solution_CIAM",
          label: "CIAM",
        },
        {
          type: "doc",
          docId: "solutions/solution_B2B",
          label: "B2B IAM",
        },
        {
          type: "doc",
          docId: "solutions/solution_agentic",
          label: "Agentic IAM",
        },
      ],
    },

    {
      type: "dropdown",
      to: "/docs/reference/reference-overview",
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
      label: "Change Log",
      position: "left",
      items: [
        {
          to: "https://changelog.ory.com/?categories=cat_6MGGeXN7WohDH",
          label: "Ory Network",
        },
        {
          to: "https://changelog.ory.com/?categories=cat_s3C6qgDr7FEyo%2Ccat_n9fSarZSCxDTl%2Ccat_ZTXuym1ZfOYZx%2Ccat_YZLKJTlx35HVW",
          label: "Ory OEL",
        },

        {
          to: "/docs/oss/changelog",
          label: "Ory OSS",
        },
      ],
    },
    {
      label: "Support",
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
