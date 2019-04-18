# ORY Documentation

[![CircleCI](https://circleci.com/gh/ory/docs/tree/master.svg?style=shield)](https://circleci.com/gh/ory/docs/tree/master)

This repository contains the documentation (HTTP API Reference, User Guides, FAQ) for all ORY products. Changes, when merged or pushed to master, are directly deployed to the website.

To make changes, simply modify the markdown files.

## Releasing a new version

The ORY Documentation is versioned according to `oryOS.X` version semantics. To (re-)release a version run:
 
```
$ cd website
$ npm run release oryOS.
```
