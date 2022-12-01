// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { readSitemapXML, Sitemap, getLoc, getNewURL, runTest } from "./utils"

const sitemap = readSitemapXML("sitemap_keto.xml")

it("test keto sitemap", async () => {
  await runTest(sitemap)
})
