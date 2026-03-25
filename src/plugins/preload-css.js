// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs")
const path = require("path")

module.exports = function embedCssPlugin() {
  return {
    name: "embed-css",
    async postBuild({ outDir }) {
      const cssDir = path.join(outDir, "assets", "css")
      if (!fs.existsSync(cssDir)) return

      const cssFile = fs.readdirSync(cssDir).find(
        (f) => f.startsWith("styles.") && f.endsWith(".css"),
      )
      if (!cssFile) return

      const cssContent = fs.readFileSync(path.join(cssDir, cssFile), "utf8")

      function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            walk(full)
          } else if (entry.name.endsWith(".html")) {
            inject(full)
          }
        }
      }

      function inject(filePath) {
        let html = fs.readFileSync(filePath, "utf8")

        if (!html.includes(cssFile)) return

        html = html.replace(
          /<link\b[^>]*\bhref="[^"]*styles\.[^"]*\.css"[^>]*>/i,
          `<style>${cssContent}</style>`,
        )
        fs.writeFileSync(filePath, html)
      }

      walk(outDir)
    },
  }
}
