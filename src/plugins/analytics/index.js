module.exports = function (context) {
  return {
    name: "ory-plugin-analytics",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              type: "text/javascript",
              src: "https://app.termly.io/resource-blocker/3563b8d6-caf2-41c3-a821-9d0eb05a7409?autoBlock=on",
            },
          },
          {
            tagName: "script",
            attributes: {
              type: "text/javascript",
              "data-categories": "essential",
              src: "https://www.ory.sh/scripts/cookies.js",
            },
          },
        ],
      }
    },
  }
}
