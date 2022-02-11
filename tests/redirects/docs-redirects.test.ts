import { readSitemapXML, Sitemap, getLoc, getNewURL } from './utils'

const sitemap: Sitemap = readSitemapXML('sitemap_docs.xml')

describe('docs sitemap', () => {
  it.each(sitemap.urlset.url
    .map(({ loc }) => [loc, getNewURL(loc)]))('loc %s => %s', async (loc) => {
      const { status } = await getLoc(loc)
      expect(status).toBeLessThan(400)
    }, 10000)
})