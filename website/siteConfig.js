/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
// const users = [
//   {
//     caption: 'User1',
//     // You will need to prepend the image path with your baseUrl
//     // if it is not '/', like: '/test-site/img/docusaurus.svg'.
//     image: '/img/docusaurus.svg',
//     infoLink: 'https://www.facebook.com',
//     pinned: true,
//   },
// ];

const siteConfig = {
  title: 'ORY Documentation', // Title for your website.

  tagline:
    'Open Source OAuth2 and OpenID Connect Access Control &amp; API Security',

  url: 'https://www.ory.sh', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',
  noIndex: false,

  editUrl: 'https://github.com/ory/docs/edit/master/docs/',

  // Used for publishing and more
  projectName: 'docs',
  organizationName: 'ory',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: 'https://community.ory.sh', label: 'Forum' },
    { href: '/chat', label: 'Chat' },
    { doc: 'index', label: 'Docs' },
    { href: 'https://github.com/ory/', label: 'GitHub' },
  ],

  // If you have users set above, you add it here:
  // users,

  /* path to images for header/footer */
  headerIcon: 'images/logo.svg',
  footerIcon: 'images/logo.svg',
  favicon: 'images/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#6274f3',
    secondaryColor: '#2c2b59',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} ORY GmbH`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  disableHeaderTitle: true,
  disableTitleTagline: true,

  // Open Graph and Twitter card images.
  ogImage: 'images/logo.png',
  twitterImage: 'images/logo.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  algolia: {
    apiKey: '8463c6ece843b377565726bb4ed325b0',
    indexName: 'ory',
    // algoliaOptions: {
    //   facetFilters: ['language:LANGUAGE', 'version:VERSION'],
    // },
  },

  docsSideNavCollapsible: true,

  onPageNavHeadings: {topLevel: ["h2"], sub: ["h3", "h4"]},

  gaTrackingId: 'UA-71865250-1',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
