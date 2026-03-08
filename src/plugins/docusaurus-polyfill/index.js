const path = require("path")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// eslint-disable-next-line
module.exports = function () {
  return {
    name: "docusaurus-polyfill",
    // eslint-disable-next-line
    configureWebpack() {
      return {
        plugins: [
          new NodePolyfillPlugin(),
        ],
        module: {
          rules: [
            {
              // Fix "exports is not defined" in docusaurus-openapi-docs packages.
              // They ship CJS code that webpack incorrectly marks as ESM.
              // This loader prepends `var exports = module.exports;` to ensure
              // the `exports` variable is available.
              test: /\.js$/,
              include: [
                path.resolve(
                  __dirname,
                  "../../../node_modules/docusaurus-theme-openapi-docs"
                ),
                path.resolve(
                  __dirname,
                  "../../../node_modules/docusaurus-plugin-openapi-docs"
                ),
              ],
              enforce: "pre",
              use: [
                {
                  loader: path.resolve(__dirname, "exports-fix-loader.js"),
                },
              ],
            },
          ],
        },
      }
    },
  }
}
