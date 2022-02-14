import { readSitemapXML, Sitemap, getLoc, getNewURL, maxTimeout } from './utils'

const sitemap: Sitemap = readSitemapXML('sitemap_hydra.xml')

describe('docs sitemap', () => {
  it.each(sitemap.urlset.url
    .map(({ loc }) => [loc, getNewURL(loc)]))('loc %s => %s', async (loc) => {
      const { status } = await getLoc(loc)
      expect(status).toBeLessThan(400)
    }, maxTimeout)
})
