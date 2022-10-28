module.exports = function pluginUsercentrics(_, options) {
  const { usercentricsID, gtmID } = options

  return {
    name: "docusaurus-plugin-usercentrics",
    getClientModules() {
      return [require.resolve("./analytics")]
    },
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}

gtag('consent', 'default', {
  'analytics_storage': 'allowed',
  'ad_storage': 'denied',
  'ads_data_redaction': true
});

gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ads_data_redaction': true,
  'region': ['BE','BG','CZ','DK','DE','EE','IE','EL','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE','US-CA']
});

window.originalPushFunction = window.dataLayer.push;
window.dataLayer.push = function () {
  for (var args = arguments, i = 0; i < args.length; i++) {
    if (!window.google_tag_manager) {
      if (
        (args[i].length == 3 && args[i][0] == 'consent' && args[i][1] == 'update') || 
        (args[i] && args[i].event && -1 < args[i].event.indexOf("consent_status"))
      ) {
        window.dataLayer.splice(2, 0, args[i])
        continue;
      }
    }
    window.originalPushFunction.call(window.dataLayer, args[i]);
  }
};
window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
window.dataLayer.push({event: "track", action: "page_view",track: null});
            `,
          },
          {
            tagName: "script",
            attributes: {
              async: true,
              id: "usercentrics-cmp",
              "data-settings-id": usercentricsID,
              src: "https://app.usercentrics.eu/browser-ui/latest/loader.js",
            },
          },
          {
            tagName: "script",
            attributes: {
              async: true,
              type: "text/plain",
              "data-usercentrics": "Google Tag Manager",
              src: "https://www.googletagmanager.com/gtm.js?id=" + gtmID,
            },
          },
        ],
      }
    },
  }
}
