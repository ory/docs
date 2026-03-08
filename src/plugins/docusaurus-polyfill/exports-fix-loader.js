// Fixes "exports is not defined" in docusaurus-openapi-docs packages.
// These packages ship CJS code using bare `exports.X = ...` which breaks when
// webpack incorrectly marks the modules as ESM. This loader prepends a local
// `exports` binding so the variable is always defined.
module.exports = function (source) {
  if (!source.includes("exports.")) {
    return source
  }
  return `var exports = module.exports;\n${source}`
}
