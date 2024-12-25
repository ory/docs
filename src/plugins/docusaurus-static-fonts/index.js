const webpack = require("webpack")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// eslint-disable-next-line
module.exports = function (context, options) {
  return {
    name: "docusaurus-static-fonts",
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              type: 'asset/resource',
              generator: {
                filename: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      }
    },
  }
}
