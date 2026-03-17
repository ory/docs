const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = function (context, options) {
  return {
    name: "docusaurus-polyfill",
    configureWebpack(config, isServer, utils) {
      return {
        mergeStrategy: { "module.rules": "prepend" },
        plugins: [
          new NodePolyfillPlugin(),
        ],
        resolve: {
          fallback: {
            buffer: require.resolve("buffer/"),
          },
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      }
    },
  }
}
