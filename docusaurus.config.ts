// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

import lightTheme from "./src/utils/prismLight.mjs"
import darkTheme from "./src/utils/prismDark.mjs"

const enableUserCentrics = false

const config: Config = {
  customFields: {
    CLOUD_URL: process.env.CLOUD_URL || "https://api.console.ory:8080",
  },
  title: "Ory",
  tagline: "Open Source Identity and Access Infrastructure",
  url: `https://www.ory.sh`,
  baseUrl: "/docs/",
  favicon: "img/favico.png",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",
  organizationName: "ory",
  projectName: "docs",
  markdown: {
    format: "detect",
  },
  staticDirectories: ["src/static"],
  themeConfig: {
    respectPrefersColorScheme: true,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    prism: {
      darkTheme: darkTheme,
      theme: lightTheme,
      additionalLanguages: [
        "powershell",
        "json",
        "json5",
        "pug",
        "shell-session",
        "bash",
        "tsx",
        "markup-templating",
        "php",
        "yaml",
        "dart",
        "csharp",
        "cshtml",
        "diff",
      ],
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-delete-line",
          line: "delete-next-line",
          block: { start: "delete-lines-start", end: "delete-lines-end" },
        },
        {
          className: "code-block-add-line",
          line: "add-next-line",
          block: { start: "add-lines-start", end: "add-lines-end" },
        },
        {
          className: "copyright-2022-ory-corp",
          line: "Copyright © 2022 Ory Corp",
        },
        {
          className: "copyright-2023-ory-corp",
          line: "Copyright © 2023 Ory Corp",
        },
        {
          className: "spdx-license-identifier",
          line: "SPDX-License-Identifier: Apache-2.0",
        },
      ],
    } satisfies Preset.ThemeConfig["prism"],
    algolia: {
      appId: "V2EFIWEJ25",
      apiKey: "dc6b220f7d2bcd12da60b9cce431d8c5",
      indexName: "ory",
      contextualSearch: true,
    },
    navbar: {
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
          type: "docSidebar",
          position: "left",
          sidebarId: "docs",
          label: "Documentation",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "quickstarts-and-tutorials",
          label: "Quickstart",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "guides",
          label: "Guides",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "reference",
          label: "Reference",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "selfhosting",
          label: "Self-hosting",
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
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Ory Corp`,
      links: [
        {
          label: "Need Support?",
          href: "https://www.ory.sh/support/",
        },
        {
          label: "Search",
          href: "https://www.ory.sh/docs/search/",
        },
        {
          label: "Status",
          href: "https://status.ory.sh/",
        },
        {
          label: "Privacy",
          href: "https://www.ory.sh/privacy",
        },
        {
          label: "Imprint",
          href: "https://www.ory.sh/imprint",
        },
        {
          label: "Terms of Service",
          href: "https://www.ory.sh/tos",
        },
        {
          label: "Schedule a discovery call",
          href: "https://www.ory.sh/contact/",
        },
      ],
      logo: {
        alt: "Ory logo in white",
        src: "/docs/img/logos/logo-ory-white-2022-11-04.svg",
        href: "https://www.ory.sh/",
        height: 80,
        width: 130.7,
      },
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        path: "docs",
        sidebarPath: require.resolve("./src/sidebar.ts"),
        editUrl: `https://github.com/ory/docs/edit/master`,
        // editCurrentVersion: false,
        routeBasePath: "/",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        disableVersioning: false,
        include: ["**/*.md", "**/*.mdx", "**/*.jsx", "**/*.tsx"],
        docRootComponent: "@theme/DocRoot",
      },
    ],
    "@docusaurus/plugin-content-pages",
    require.resolve("./src/plugins/docusaurus-plugin-matamo"),
    enableUserCentrics &&
      process.env.NODE_ENV !== "development" && [
        "./src/plugins/plugin-usercentrics-gtm",
        { usercentricsID: "dwogEWVkK", gtmID: "GTM-NTT7RMX" },
      ],
    require.resolve("./src/plugins/docusaurus-polyfill"),
    "@docusaurus/plugin-sitemap",
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // {
          // from: ['/','/docs','/docs/'],
          // to: '/docs/welcome'
          // }
        ],
      },
    ],
  ],
  presets: [
    [
      "redocusaurus",
      {
        specs: [
          {
            id: "ory-network-api",
            spec: "docs/reference/api.json",
          },
        ],
        theme: {},
      },
    ],
  ],
  themes: [
    [
      "@docusaurus/theme-classic",
      {
        customCss: [require.resolve("./src/css/theme.css")],
      },
    ],
    "@docusaurus/theme-search-algolia",
    "docusaurus-theme-redoc",
  ],
  scripts: [
    // Needed as a workaround for https://answers.netlify.com/t/trailing-slash-missing-on-proxied-netlify-site/36367
    "/docs/scripts/redirect.js",
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "e89e7663-df2c-4c7f-974a-1bf8accdd615",
      "data-project-name": "Ory",
      "data-project-color": "#1A237E",
      "data-modal-disclaimer":
        "By utilizing this chatbot, you consent to the collection and transmission of data to kapa.ai, which may include your IP address. Please be advised that your privacy and data protection are of utmost importance to us. We assure you that any data collected will be handled in compliance with applicable laws and regulations. For further details on how your data is processed and used, we encourage you to review our Privacy Policy. If you do not agree with these terms, we kindly request that you refrain from using this chatbot.",
      "data-modal-title": "Ory Copilot",
      "data-button-text": "Help?",
      "data-project-logo":
        "https://assets.website-files.com/627ba6588811eca90ffd6f2a/6282a6b11450b482db646ed2_hydra.png",
      defer: true,
    },
  ],
}

module.exports = config
