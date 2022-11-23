// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const config = {
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
  staticDirectories: ["src/static"],
  themeConfig: {
    respectPrefersColorScheme: true,
    prism: {
      additionalLanguages: [
        "powershell",
        "json5",
        "pug",
        "shell-session",
        "bash",
        "tsx",
        "php",
        "yaml",
        "dart",
      ],
    },
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
        src: `/docs/img/logo-docs.svg`,
        srcDark: `/docs/img/logo-docs.svg`,
        href: `https://www.ory.sh/docs`,
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
          sidebarId: "sdk",
          label: "SDK",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "api",
          label: "API",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "selfhosting",
          label: "Self-Hosting",
        },
        {
          to: "https://www.ory.sh/",
          label: `Website`,
          position: "right",
        },
        {
          href: `https://github.com/ory/cloud/discussions`,
          label: "Discussions",
          position: "right",
        },
        {
          href: "https://www.ory.sh/chat",
          label: "Slack",
          position: "right",
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
      ],
      logo: {
        alt: "Ory logo in white",
        src: "/docs/img/logo-ory-white.svg",
        href: "https://opensource.fb.com",
        height: 80,
      },
    },
  },
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        path: "docs",
        sidebarPath: require.resolve("./src/sidebar.js"),
        editUrl: `https://github.com/ory/docs/edit/master`,
        // editCurrentVersion: false,
        routeBasePath: "/",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        disableVersioning: false,
        include: ["**/*.md", "**/*.mdx", "**/*.jsx", "**/*.tsx"],
        docLayoutComponent: "@theme/RoutedDocPage",
      },
    ],
    "@docusaurus/plugin-content-pages",
    require.resolve("./src/plugins/docusaurus-plugin-matamo"),
    [
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
  ],
}

async function createConfig() {
  const lightTheme = (await import("./src/utils/prismLight.mjs")).default
  const darkTheme = (await import("./src/utils/prismDark.mjs")).default
  config.themeConfig.prism.theme = lightTheme
  config.themeConfig.prism.darkTheme = darkTheme
  return config
}

module.exports = createConfig
