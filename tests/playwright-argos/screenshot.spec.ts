import * as fs from "fs"
import { test } from "@playwright/test"
import { argosScreenshot } from "@argos-ci/playwright"
import { extractSitemapPathnames, pathnameToArgosName } from "./utils"

// Constants
const siteUrl = "http://localhost:3000"
const sitemapPath = "./build/sitemap.xml"
const stylesheetPath = "./tests/playwright-argos/screenshot.css"
const stylesheet = fs.readFileSync(stylesheetPath).toString()
const ignoredPathnames = ["/docs/reference/api"]

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

  for (const p of pathnames) {
    if (ignoredPathnames.includes(p)) {
      console.log(`Ignoring ${p}`)
    } else {
      screenshotPathname(p)
    }
  }
})
