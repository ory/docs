const path = require("path")

module.exports = function (context) {
  return {
    name: "docusaurus-plugin-ory-web-script",

    // https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#injectHtmlTags
    injectHtmlTags({ content }) {
      return {
        postBodyTags:
          ['<script src="https://utteranc.es/client.js" repo="ory/docs-feedback" issue-term="pathname" theme="github-light" crossorigin="anonymous" async></script>']
      }
    },
  }
}
