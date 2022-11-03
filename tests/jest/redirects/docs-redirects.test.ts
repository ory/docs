// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { readSitemapXML, Sitemap, getLoc, getNewURL, runTest } from "./utils"

const sitemap = readSitemapXML("sitemap_docs.xml")

it("test docs sitemap", async () => {
  await runTest(sitemap)
})
