const githubPrismTheme = require("prism-react-renderer/themes/github")

const prismThemeLight = {
  ...githubPrismTheme,
  styles: [
    ...githubPrismTheme.styles,
    {
      languages: ["keto-relation-tuples"],
      types: ["namespace"],
      style: {
        color: "#666",
      },
    },
    {
      languages: ["keto-relation-tuples"],
      types: ["object"],
      style: {
        color: "#939",
      },
    },
    {
      languages: ["keto-relation-tuples"],
      types: ["relation"],
      style: {
        color: "#e80",
      },
    },
    {
      languages: ["keto-relation-tuples"],
      types: ["delimiter"],
      style: {
        color: "#555",
      },
    },
    {
      languages: ["keto-relation-tuples"],
      types: ["comment"],
      style: {
        color: "#999",
      },
    },
    {
      languages: ["keto-relation-tuples"],
      types: ["subject"],
      style: {
        color: "#903",
      },
    },
  ],
}

module.exports = {
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
  onDuplicateRoutes: "error",
  organizationName: "ory",
  projectName: "docs",
  staticDirectories: ["src/static"],
  themeConfig: {
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
          type: "doc",
          position: "left",
          docId: "reference/api",
          label: "API reference",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "sdk",
          label: "SDKs",
        },
        {
          to: "/examples",
          position: "left",
          label: "Examples",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "opensource",
          label: "Open source",
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
          title: "Company",
          items: [
            {
              label: "Imprint",
              href: "https://www.ory.sh/imprint",
            },
            {
              label: "Privacy",
              href: "https://www.ory.sh/privacy",
            },
            {
              label: "Terms",
              href: "https://www.ory.sh/tos",
            },
          ],
        },
      ],
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
    require.resolve("./src/plugins/ory-scripts-loader"),
    require.resolve("./src/plugins/docusaurus-plugin-matamo"),
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
  themes: [
    [
      "@docusaurus/theme-classic",
      {
        customCss: [require.resolve("./src/css/theme.css")],
        respectPrefersColorScheme: true,
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
