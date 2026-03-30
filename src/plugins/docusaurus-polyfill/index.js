// eslint-disable-next-line
module.exports = function (context, options) {
  return {
    name: "docusaurus-polyfill",
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            path: require.resolve("path-browserify"),
          },
        },
      }
    },
  }
}