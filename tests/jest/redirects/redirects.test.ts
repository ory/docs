import { readSitemapXML } from './utils'

const { pathToRegexp, match, parse, compile } = require('path-to-regexp')

it('should ensure the regex is ok', () => {
  const regexp = pathToRegexp('/docs/hydra/:version(v[0-9\\.]+|next)/:path*')

  expect(regexp.exec('/docs/hydra/v1.9/foo')).toMatchSnapshot()
  expect(regexp.exec('/docs/hydra/v1.9/')).toMatchSnapshot()
  expect(regexp.exec('/docs/hydra/v1.9')).toMatchSnapshot()
})

it('should ignore some sitemap items', () => {
  const sitemap = readSitemapXML('sitemap_kratos.xml')

  expect(sitemap.find(([source])=>source.indexOf('v0.1')>-1)).toBeUndefined()
})
