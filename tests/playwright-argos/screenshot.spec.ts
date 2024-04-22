import * as fs from "fs"
import { test } from "@playwright/test"
import { argosScreenshot } from "@argos-ci/playwright"
import { extractSitemapPathnames, pathnameToArgosName } from "./utils"

// Constants
const siteUrl = "http://localhost:3000"
const sitemapPath = "./build/sitemap.xml"
const stylesheetPath = "./tests/playwright-argos/screenshot.css"
const stylesheet = fs.readFileSync(stylesheetPath).toString()
const ignoredPathnames = [
  // Thes files are too large to screenshot
  "/docs/reference/api",
  "/docs/hydra/reference/api",
  "/docs/kratos/reference/api",
  "/docs/keto/reference/api",
  "/docs/oathkeeper/reference/api",
  // the configuration pages are lazily loaded and the screenshot is sometimes taken before they are loaded
  "/docs/kratos/reference/configuration-editor",
  "/docs/hydra/reference/configuration-editor",
  "/docs/keto/reference/configuration-editor",
  "/docs/oathkeeper/reference/configuration-editor",
  "/docs/kratos/reference/configuration",
  "/docs/hydra/reference/configuration",
  "/docs/keto/reference/configuration",
  "/docs/oathkeeper/reference/configuration",
]

// Wait for hydration, requires Docusaurus v2.4.3+
// Docusaurus adds a <html data-has-hydrated="true"> once hydrated
// See https://github.com/facebook/docusaurus/pull/9256
function waitForDocusaurusHydration() {
  return document.documentElement.dataset.hasHydrated === "true"
}

function screenshotPathname(pathname: string) {
  test(`pathname ${pathname}`, async ({ page }) => {
    const url = siteUrl + pathname
    await page.goto(url)
    await page.waitForFunction(waitForDocusaurusHydration)
    await page.addStyleTag({ content: stylesheet })
    await argosScreenshot(page, pathnameToArgosName(pathname))
  })
}

test.describe("Docusaurus site screenshots", () => {
  const pathnames = extractSitemapPathnames(sitemapPath)
  console.log(`Ignoring paths: ${ignoredPathnames.join(", ")}`)

  pathnames.filter((p) => !ignoredPathnames.includes(p)).forEach(screenshotPathname)
})
