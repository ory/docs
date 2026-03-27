// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs")
const path = require("path")

/**
 * Split minified CSS into top-level rule blocks, handling nested braces
 * (e.g. @media queries containing inner rules).
 */
function splitCssBlocks(css) {
  const blocks = []
  let i = 0
  while (i < css.length) {
    const braceStart = css.indexOf("{", i)
    if (braceStart === -1) {
      if (i < css.length) blocks.push(css.slice(i))
      break
    }
    let depth = 0
    let j = braceStart
    while (j < css.length) {
      if (css[j] === "{") depth++
      else if (css[j] === "}") {
        depth--
        if (depth === 0) {
          blocks.push(css.slice(i, j + 1))
          i = j + 1
          break
        }
      }
      j++
    }
    if (j >= css.length) {
      blocks.push(css.slice(i))
      break
    }
  }
  return blocks
}

function isDocSearchBlock(block) {
  if (!block.includes(".DocSearch") && !block.includes("--docsearch-"))
    return false
  // Keep all :root blocks — CSS variable definitions are needed for initial layout
  if (block.includes(":root")) return false
  // Keep DocSearch button styles in main CSS — the button is always visible
  if (block.includes(".DocSearch-Button")) return false
  return true
}

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

      const cssPath = path.join(cssDir, cssFile)
      const fullCss = fs.readFileSync(cssPath, "utf8")

      // --- Phase 1: Extract DocSearch CSS into a separate file ---
      const blocks = splitCssBlocks(fullCss)
      const mainBlocks = []
      const docSearchBlocks = []

      for (const block of blocks) {
        if (isDocSearchBlock(block)) {
          docSearchBlocks.push(block)
        } else {
          mainBlocks.push(block)
        }
      }

      const mainCss = mainBlocks.join("")
      const docSearchCss = docSearchBlocks.join("")

      // Extract the hash from the original filename (styles.HASH.css)
      const hash = cssFile.replace("styles.", "").replace(".css", "")
      const docSearchFile = `docsearch.${hash}.css`

      fs.writeFileSync(cssPath, mainCss)
      fs.writeFileSync(path.join(cssDir, docSearchFile), docSearchCss)

      // --- Phase 2: Embed main CSS inline + lazy-load DocSearch CSS ---
      const lazyLoadScript = `<script>(function(){var d=false;function l(){if(d)return;d=true;var s=document.createElement("link");s.rel="stylesheet";s.href="/docs/assets/css/${docSearchFile}";document.head.appendChild(s)}document.addEventListener("DOMContentLoaded",function(){var b=document.querySelector(".DocSearch");if(b){b.addEventListener("mouseover",l,{once:true});b.addEventListener("focus",l,{once:true});b.addEventListener("click",l,{once:true})}})})()</script>`

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

        // Replace the stylesheet link with inline styles + DocSearch lazy loader
        html = html.replace(
          /<link\b[^>]*\bhref="[^"]*styles\.[^"]*\.css"[^>]*>/i,
          `<style>${mainCss}</style>${lazyLoadScript}`,
        )
        fs.writeFileSync(filePath, html)
      }

      walk(outDir)
    },
  }
}
