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
      type: "doc",
      docId: "products/products-overview",
      label: "Products",
      position: "left",
    },
    {
      type: "doc",
      docId: "solutions/solutions-overview",
      label: "Solutions",
      position: "left",
    },
    {
      type: "doc",
      docId: "reference/reference-overview",
      label: "Reference",
      position: "left",
    },
    {
      label: "Change log",
      to: "/docs/ecosystem/changelog",
      position: "left",
    },
    {
      label: "Need support?",
      href: "https://www.ory.com/support",
      position: "right",
    },
    {
      label: "Github",
      href: "https://github.com/ory",
      position: "right",
    },
  ],
}
