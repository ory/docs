import { readSitemapXML, Sitemap, getLoc, getNewURL, runTest } from './utils'

const sitemap = readSitemapXML('sitemap_docs.xml')

it('test docs sitemap', async () => {
  await runTest(sitemap)
})
