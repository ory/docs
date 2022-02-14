const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

it('should ensure the regex is ok', () => {
  const regexp = pathToRegexp("/docs/hydra/:version(v[0-9\\.]+|next)/:path*");
  console.log(regexp.exec("/docs/hydra/v1.9/foo"))
  console.log(regexp.exec("/docs/hydra/v1.9/"))
  console.log(regexp.exec("/docs/hydra/v1.9"))
})

it('should ensure the regex is ok with trailing slash', () => {
  const regexp = pathToRegexp("/oathkeeper/docs(|/)");
  console.log(regexp.exec("/oathkeeper/docs/"))
  console.log(regexp.exec("/oathkeeper/docs"))
})
