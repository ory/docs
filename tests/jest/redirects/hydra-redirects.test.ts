// Copyright © 2022 Ory Corp

import { readSitemapXML, Sitemap, getLoc, getNewURL, runTest } from "./utils"

const sitemap = readSitemapXML("sitemap_hydra.xml")

it("test hydra sitemap", async () => {
  await runTest(sitemap)
})
