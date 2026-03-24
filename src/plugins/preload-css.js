// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs")
const path = require("path")

module.exports = function preloadCssPlugin() {
  return {
    name: "preload-css",
    async postBuild({ outDir, siteConfig }) {
      const cssDir = path.join(outDir, "assets", "css")
      if (!fs.existsSync(cssDir)) return

      const cssFile = fs.readdirSync(cssDir).find(
        (f) => f.startsWith("styles.") && f.endsWith(".css"),
      )
      if (!cssFile) return

      const baseUrl = siteConfig.baseUrl.replace(/\/$/, "")
      const href = `${baseUrl}/assets/css/${cssFile}`
      const preloadTag = `<link rel="preload" as="style" href="${href}">`

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
        if (html.includes(preloadTag)) return
        html = html.replace("<head>", `<head>${preloadTag}`)
        fs.writeFileSync(filePath, html)
      }

      walk(outDir)
    },
  }
}
