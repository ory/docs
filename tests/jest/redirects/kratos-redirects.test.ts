// Copyright © 2022 Ory Corp

import { readSitemapXML, Sitemap, getLoc, getNewURL, runTest } from "./utils"

const sitemap = readSitemapXML("sitemap_kratos.xml")

it("test kratos sitemap", async () => {
  await runTest(sitemap)
})
