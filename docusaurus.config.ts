// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs"

import lightTheme from "./src/utils/prismLight.mjs"
import darkTheme from "./src/utils/prismDark.mjs"
import { navbar } from "./src/navbar"
const config: Config = {
  customFields: {
    CLOUD_URL: process.env.CLOUD_URL || "https://api.console.ory:8080",
  },
  title: "Ory",
  tagline: "Open Source Identity and Access Infrastructure",
  url: `https://www.ory.com`,
  baseUrl: "/docs/",
  favicon: "img/favico.png",
  onBrokenLinks: "warn",
  onDuplicateRoutes: "throw",
  organizationName: "ory",
  projectName: "docs",
  trailingSlash: false,
  markdown: {
    format: "detect",
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  staticDirectories: ["src/static"],
  clientModules: [require.resolve("./src/clientModules/speedInsights.tsx")],
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
        "json",
        "json5",
        "shell-session",
        "bash",
        "tsx",
        "markup-templating",
        "php",
        "yaml",
        "csharp",
        "diff",
        "http",
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
    navbar,
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Ory Corp`,
      links: [
        {
          label: "Support?",
          href: "https://www.ory.com/support",
        },
        {
          label: "Search",
          href: "https://www.ory.com/docs/search",
        },
        {
          label: "Status",
          href: "https://status.ory.com",
        },
        {
          label: "Privacy",
          href: "https://www.ory.com/privacy",
        },
        {
          label: "Company",
          href: "https://www.ory.com/legal/company",
        },
        {
          label: "Terms of Service",
          href: "https://www.ory.com/tos",
        },
        {
          label: "Schedule a discovery call",
          href: "https://www.ory.com/contact",
        },
        {
          html: `<button onClick="window.__showOryConsentDialog()">Consent Preferences</button>`,
        },
      ] satisfies Preset.ThemeConfig["footer"]["links"],
      logo: {
        alt: "Ory logo in white",
        src: "/docs/img/logos/logo-ory-white-2022-11-04.svg",
        href: "https://www.ory.com/",
        height: 80,
        width: 130.7,
      },
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    // Not very useful and ruins page speed.
    //
    // [
    //   "docusaurus-pushfeedback",
    //   {
    //     project: "7bhe9sxlqg",
    //     buttonPosition: "center-right",
    //   },
    // ],
    "./src/plugins/preload-css",
    async function tailwindcss(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("@tailwindcss/postcss"))
          return postcssOptions
        },
      }
    },

    [
      "@docusaurus/plugin-content-docs",
      {
        id: "default",
        path: "docs", // all product docs live here
        routeBasePath: "/", // gives URLs like /docs/xxx
        sidebarPath: require.resolve("./sidebars.ts"),
        editUrl: "https://github.com/ory/docs/edit/master",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        disableVersioning: false,
        include: ["**/*.md", "**/*.mdx", "**/*.jsx", "**/*.tsx"],
        docRootComponent: "@theme/DocRoot",
        docItemComponent: "@theme/ApiItem",
      },
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "default",
        config: {
          talos: {
            specPath: "docs/talos/reference/api.json",
            outputDir: "docs/talos/reference/api",
            sidebarOptions: { groupPathsBy: "tag" },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],

    "@docusaurus/plugin-content-pages",
    require.resolve("./src/plugins/docusaurus-polyfill"),
    require.resolve("./src/plugins/docusaurus-rate-limits-data/index.ts"),
    // require.resolve("./src/plugins/docusaurus-static-fonts"),
    [
      "@docusaurus/plugin-sitemap",
      {
        lastmod: "date",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/quickstart/sdks",
            to: "/sdk",
          },
          {
            from: "/product-selector",
            to: "/welcome",
          },
          // Ory Talos: old custom-id URLs -> Rabat path-based URLs.
          // Quickstart
          { from: "/talos/quickstart", to: "/talos/quickstart/open-source" },
          {
            from: "/talos/quickstart/early-access-quickstart",
            to: "/talos/quickstart/docker-commercial",
          },
          {
            from: "/talos/quickstart/talos-docker-quickstart",
            to: "/talos/quickstart/docker-commercial",
          },
          // Concepts
          {
            from: "/talos/concepts/talos-architecture",
            to: "/talos/concepts/architecture",
          },
          {
            from: "/talos/concepts/caching-consistency",
            to: "/talos/concepts/caching",
          },
          {
            from: "/talos/concepts/talos-rate-limiting",
            to: "/talos/concepts/rate-limiting",
          },
          {
            from: "/talos/concepts/talos-security-model",
            to: "/talos/concepts/security-model",
          },
          {
            from: "/talos/concepts/talos-token-format",
            to: "/talos/concepts/token-format",
          },
          {
            from: "/talos/concepts/token-derivation-security",
            to: "/talos/concepts/security-model",
          },
          // Integrate
          {
            from: "/talos/integrate/talos-error-handling",
            to: "/talos/integrate/error-handling",
          },
          {
            from: "/talos/integrate/talos-import-keys",
            to: "/talos/integrate/import-keys",
          },
          {
            from: "/talos/integrate/talos-ip-restrictions",
            to: "/talos/integrate/ip-restrictions",
          },
          {
            from: "/talos/integrate/talos-issue-verify-keys",
            to: "/talos/integrate/issue-and-verify",
          },
          {
            from: "/talos/integrate/talos-rate-limiting",
            to: "/talos/integrate/rate-limiting",
          },
          {
            from: "/talos/integrate/api-key-self-revocation",
            to: "/talos/integrate/self-revocation",
          },
          {
            from: "/talos/integrate/sdk/talos-curl",
            to: "/talos/integrate/sdk/curl",
          },
          {
            from: "/talos/integrate/sdk/talos-go-sdk",
            to: "/talos/integrate/sdk/go",
          },
          // Operate
          {
            from: "/talos/operate/talos-install",
            to: "/talos/operate/install",
          },
          {
            from: "/talos/operate/talos-configure",
            to: "/talos/operate/configure",
          },
          {
            from: "/talos/operate/talos-performance-benchmarks",
            to: "/talos/operate/benchmarks",
          },
          {
            from: "/talos/operate/talos-multi-tenancy",
            to: "/talos/operate/multi-tenancy",
          },
          {
            from: "/talos/operate/secret-management",
            to: "/talos/operate/secrets",
          },
          {
            from: "/talos/operate/talos-tls-configuration",
            to: "/talos/operate/tls",
          },
          {
            from: "/talos/operate/talos-troubleshooting",
            to: "/talos/operate/troubleshooting",
          },
          {
            from: "/talos/operate/deploy/talos-docker",
            to: "/talos/operate/deploy/docker",
          },
          {
            from: "/talos/operate/deploy/talos-kubernetes",
            to: "/talos/operate/deploy/deployment-modes",
          },
          {
            from: "/talos/operate/deploy/separate-planes",
            to: "/talos/operate/deploy/deployment-modes",
          },
          {
            from: "/talos/operate/cache/talos-in-memory-cache",
            to: "/talos/operate/cache/memory",
          },
          {
            from: "/talos/operate/cache/redis-cache",
            to: "/talos/operate/cache/redis",
          },
          {
            from: "/talos/operate/database/talos-migrations",
            to: "/talos/operate/database/migrations",
          },
          {
            from: "/talos/operate/database/talos-cockroachdb",
            to: "/talos/operate/database/cockroachdb",
          },
          {
            from: "/talos/operate/database/talos-postgresql",
            to: "/talos/operate/database/postgresql",
          },
          {
            from: "/talos/operate/database/talos-sqlite",
            to: "/talos/operate/database/sqlite",
          },
          {
            from: "/talos/operate/database/talos-mysql",
            to: "/talos/operate/database/mysql",
          },
          {
            from: "/talos/operate/monitoring/talos-health-checks",
            to: "/talos/operate/monitoring/health-checks",
          },
          {
            from: "/talos/operate/monitoring/talos-prometheus-metrics",
            to: "/talos/operate/monitoring/metrics",
          },
          {
            from: "/talos/operate/monitoring/talos-opentelemetry",
            to: "/talos/operate/monitoring/tracing",
          },
          // Reference
          {
            from: "/talos/reference/talos-config-reference",
            to: "/talos/reference/config",
          },
          {
            from: "/talos/reference/talos-token-format-reference",
            to: "/talos/reference/token-format",
          },
          {
            from: "/talos/reference/talos-audit-events",
            to: "/talos/reference/events",
          },
          {
            from: "/talos/reference/talos-error-codes",
            to: "/talos/reference/error-codes",
          },
          // Reference API (renamed methods)
          {
            from: "/talos/reference/api/admin-batch-import-api-keys",
            to: "/talos/reference/api/admin-batch-create-imported-api-keys",
          },
          {
            from: "/talos/reference/api/admin-revoke-api-key",
            to: "/talos/reference/api/admin-revoke-issued-api-key",
          },
          {
            from: "/talos/reference/api/admin-get-jwks",
            to: "/talos/reference/api/get-jwks",
          },
          // Reference CLI (renamed/removed commands)
          {
            from: "/talos/reference/cli/talos-keys-revoke",
            to: "/talos/reference/cli/talos-keys-issued-revoke",
          },
          {
            from: "/talos/reference/cli/talos-serve-check",
            to: "/talos/reference/cli/talos-serve-public",
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-svgr",
      {
        svgrConfig: {},
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
          {
            id: "polis-api",
            spec: "docs/polis/reference/api.json",
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
    "docusaurus-theme-openapi-docs",
  ],
  headTags: [],
}

module.exports = config
