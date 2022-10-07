// Copyright © 2022 Ory Corp

import { readSitemapXML } from "./utils"

const { pathToRegexp, match, parse, compile } = require("path-to-regexp")

it("should ensure the regex is ok", () => {
  let regexp = pathToRegexp("/docs/hydra/:version(v[0-9\\.]+|next)/:path*")

  expect(regexp.exec("/docs/hydra/v1.9/foo")).toMatchSnapshot()
  expect(regexp.exec("/docs/hydra/v1.9/")).toMatchSnapshot()

  regexp = pathToRegexp("/docs/kratos/:version(v[0-9\\.]+|next)/:path*")
  expect(
    regexp.exec("/docs/kratos/v0.8/self-service/flows/user-settings/"),
  ).toMatchSnapshot()
  expect(
    regexp.exec("/docs/kratos/next/self-service/flows/user-settings/"),
  ).toMatchSnapshot()
})

it("should ignore some sitemap items", () => {
  const sitemap = readSitemapXML("sitemap_kratos.xml")

  expect(
    sitemap.find(([source]) => source.indexOf("v0.1") > -1),
  ).toBeUndefined()
})
