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

      // Non-blocking async CSS: preload with onload swap + noscript fallback.
      // The onload flips rel from "preload" to "stylesheet" once the file is
      // fetched, so it never blocks the initial render.
      const asyncTag = `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`

      // Pattern matching the blocking stylesheet Docusaurus injects into <head>
      const blockingPattern = new RegExp(
        `<link[^>]+rel="stylesheet"[^>]+href="${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`,
      )

      function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            walk(full)
          } else if (entry.name.endsWith(".html")) {
            transform(full)
          }
        }
      }

      function transform(filePath) {
        let html = fs.readFileSync(filePath, "utf8")
        if (!blockingPattern.test(html)) return
        // Remove the blocking <link rel="stylesheet"> and replace with async pattern
        html = html.replace(blockingPattern, asyncTag)
        fs.writeFileSync(filePath, html)
      }

      walk(outDir)
    },
  }
}
