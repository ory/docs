const path = require('path')

module.exports = function (context) {
  return {
    name: 'docusaurus-plugin-ory-web-script',

    // https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#injectHtmlTags
    injectHtmlTags({ content }) {
      return {
        postBodyTags:
          process.env.NODE_ENV === 'production'
            ? ['<script src="/docs/scripts/init.js" async></script>']
            : []
      }
    }
  }
}
