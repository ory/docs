# ORY Documentation

[![CircleCI](https://circleci.com/gh/ory/docs/tree/master.svg?style=shield)](https://circleci.com/gh/ory/docs/tree/master)

This repository contains the documentation (HTTP API Reference, User Guides, FAQ) for all ORY products. Changes, when merged or pushed to master, are directly deployed to the website.

To view the docs go to **[www.ory.sh/docs/next](https://www.ory.sh/docs/next)**.

To make changes, simply modify the markdown files.

## Caveats

When editing markdown files, bear in mind that all the resources under `/website/static/*` are hosted at `/*`. So `/website/static/images/blah.svg` becomes `/images/blah.svg` and so on. _(even if it looks broken on Github markdown preview)_

## Releasing a new version

The ORY Documentation is versioned according to `oryOS.X` version semantics. To (re-)release a version run:
 
```
$ cd website
$ npm run release oryOS.
```
