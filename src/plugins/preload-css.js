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

      const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"))
      if (cssFiles.length === 0) return

      const baseUrl = siteConfig.baseUrl.replace(/\/$/, "")
      const linkValue = cssFiles
        .map((f) => `<${baseUrl}/assets/css/${f}>; rel=preload; as=style`)
        .join(", ")

      const vercelJsonPath = path.join(__dirname, "..", "..", "vercel.json")
      const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, "utf-8"))

      // Remove any existing preload header entries we previously added
      vercelJson.headers = vercelJson.headers.filter(
        (h) =>
          h.source !== "/docs/:path*" ||
          !h.headers.some((hh) => hh.key === "Link"),
      )

      // Add Link preload header for all doc pages
      vercelJson.headers.push({
        source: "/docs/:path*",
        headers: [
          {
            key: "Link",
            value: linkValue,
          },
        ],
      })

      fs.writeFileSync(
        vercelJsonPath,
        JSON.stringify(vercelJson, null, 2) + "\n",
      )

      console.log(
        "[preload-css] Updated vercel.json with %d CSS preload links",
        cssFiles.length,
      )
    },
  }
}
