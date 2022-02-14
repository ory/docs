const { pathToRegexp, match, parse, compile } = require('path-to-regexp')

it('should ensure the regex is ok', () => {
  const regexp = pathToRegexp('/docs/hydra/:version(v[0-9\\.]+|next)/:path*')

  expect(regexp.exec('/docs/hydra/v1.9/foo')).toMatchSnapshot()
  expect(regexp.exec('/docs/hydra/v1.9/')).toMatchSnapshot()
  expect(regexp.exec('/docs/hydra/v1.9')).toMatchSnapshot()
})
