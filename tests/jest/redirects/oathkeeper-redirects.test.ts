// Copyright © 2022 Ory Corp

import { readSitemapXML, Sitemap, getLoc, getNewURL, runTest } from "./utils"

const sitemap = readSitemapXML("sitemap_oathkeeper.xml")

it("test oathkeeper sitemap", async () => {
  await runTest(sitemap)
})
