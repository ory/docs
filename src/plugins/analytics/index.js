module.exports = function (context) {
  return {
    name: "ory-plugin-analytics",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              window.TERMLY_CUSTOM_BLOCKING_MAP = {
                "sqa-web.ory.sh": "essential",
                "static.reo.dev": "analytics",
              }
            `
          },
          {
            tagName: "script",
            attributes: {
              type: "text/javascript",
              src: "https://app.termly.io/resource-blocker/3563b8d6-caf2-41c3-a821-9d0eb05a7409?autoBlock=on",
            },
          },
          {
            tagName: "script",
            innerHTML: `
            !function(){var e,t,n;e="400b988f083a73b",t=function(){Reo.init({clientID:"400b988f083a73b"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.async=!0,n.onload=t,document.head.appendChild(n)}();
            `
          },
        ],
      }
    },
  }
}
