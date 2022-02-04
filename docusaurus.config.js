const fs = require('fs')

const customCss = [require.resolve('./contrib/theme.css')]

if (fs.existsSync('./src/css/theme.css')) {
  customCss.push(require.resolve('./src/css/theme.css'))
}

const githubPrismTheme = require('prism-react-renderer/themes/github')

const prismThemeLight = {
  ...githubPrismTheme,
  styles: [
    ...githubPrismTheme.styles,
    {
      languages: ['keto-relation-tuples'],
      types: ['namespace'],
      style: {
        color: '#666'
      }
    },
    {
      languages: ['keto-relation-tuples'],
      types: ['object'],
      style: {
        color: '#939'
      }
    },
    {
      languages: ['keto-relation-tuples'],
      types: ['relation'],
      style: {
        color: '#e80'
      }
    },
    {
      languages: ['keto-relation-tuples'],
      types: ['delimiter'],
      style: {
        color: '#555'
      }
    },
    {
      languages: ['keto-relation-tuples'],
      types: ['comment'],
      style: {
        color: '#999'
      }
    },
    {
      languages: ['keto-relation-tuples'],
      types: ['subject'],
      style: {
        color: '#903'
      }
    }
  ]
}

module.exports = {
  title: 'Ory',
  tagline: 'Open Source Identity and Access Infrastructure',
  url: `https://www.ory.sh/`,
  baseUrl: '/',
  favicon: 'img/favico.png',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'error',
  onDuplicateRoutes: 'error',
  organizationName: 'ory',
  projectName: 'docs',
  staticDirectories: ['src/static'],
  themeConfig: {
    prism: {
      theme: prismThemeLight,
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['json5', 'pug', 'shell-session']
    },
    announcementBar: {
      id: 'supportus',
      content: `Sign up for <a href="https://ory.us10.list-manage.com/subscribe?u=ffb1a878e4ec6c0ed312a3480&id=f605a41b53">important security announcements</a> and if you like the Ory's project give us some ⭐️ on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ory">GitHub</a>!`
    },
    algolia: {
      appId: 'V2EFIWEJ25',
      apiKey: 'dc6b220f7d2bcd12da60b9cce431d8c5',
      indexName: 'ory',
      contextualSearch: true,
      searchParameters: {
        facetFilters: [[`tags:docs`]]
      }
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: 'Ory',
        src: `img/logo-docs.svg`,
        srcDark: `img/logo-docs.svg`,
        href: `https://www.ory.sh`
      },
      items: [
        {
          to: 'https://www.ory.sh/',
          label: `Home`,
          position: 'left'
        },
        {
          href: `https://github.com/ory/cloud/discussions`,
          label: 'Discussions',
          position: 'right'
        },
        {
          href: 'https://www.ory.sh/chat',
          label: 'Slack',
          position: 'right'
        },
        {
          href: `https://github.com/ory`,
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Ory Corp`,
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'Imprint',
              href: 'https://www.ory.sh/imprint'
            },
            {
              label: 'Privacy',
              href: 'https://www.ory.sh/privacy'
            },
            {
              label: 'Terms',
              href: 'https://www.ory.sh/tos'
            }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs',
        sidebarPath: require.resolve('./src/sidebar.js'),
        editUrl: `https://github.com/ory/docs/edit/master/docs`,
        // editCurrentVersion: false,
        routeBasePath: '/docs/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        disableVersioning: false,
        include: ['**/*.md', '**/*.mdx', '**/*.jsx', '**/*.tsx'],
        docLayoutComponent: '@theme/RoutedDocPage'
      }
    ],
    '@docusaurus/plugin-content-pages',
    require.resolve('./src/plugins/ory-scripts-loader'),
    require.resolve('./src/plugins/docusaurus-plugin-matamo'),
    '@docusaurus/plugin-sitemap'
  ],
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: require.resolve('./src/css/theme.css')
      }
    ],
    '@docusaurus/theme-search-algolia',
    'docusaurus-theme-redoc'
  ]
}
