// eslint-disable-next-line
module.exports = function (context, options) {
  return {
    name: "docusaurus-polyfill",
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            path: require.resolve("path-browserify"),
          },
          fallback: {
            fs: false,
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            "buffer": require.resolve("buffer/")
          },
        },
      }
    },
  }
}
