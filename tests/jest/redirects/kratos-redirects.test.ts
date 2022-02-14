import { readSitemapXML, Sitemap, getLoc, getNewURL } from './utils'

const sitemap = readSitemapXML('sitemap_kratos.xml')

describe('docs sitemap', () => {
  it.each(sitemap)('loc %s => %s', async (loc) => {
      const { status } = await getLoc(loc)
      expect(status).toBeLessThan(400)
    })
})
