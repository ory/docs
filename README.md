# ORY Documentation

[![CircleCI](https://circleci.com/gh/ory/docs/tree/master.svg?style=shield)](https://circleci.com/gh/ory/docs/tree/master)

This repository contains the documentation (HTTP API Reference, User Guides,
FAQ) for all ORY products. Changes, when merged or pushed to master, are
directly deployed to the website.

To view the docs go to **[www.ory.sh/docs/next](https://www.ory.sh/docs/next)**.

To make changes, simply modify the markdown files.

## Caveats

When editing markdown files, bear in mind that all the resources under
`/website/static/*` are hosted at `/*`. So `/website/static/images/blah.svg`
becomes `/images/blah.svg` and so on. _(even if it looks broken on Github
markdown preview)_

## Releasing a new version

### CI

To release a new (or updated) version of the ORY Documentation, simply create a
new git tag in the format of `v0.0.X+oryOS.Z`.

**Warning:** This will also update all Docker Image tags to the latest available
release (on GitHub)!

### Manual

The ORY Documentation is versioned according to `oryOS.X` version semantics. To
(re-)release a version run:

```
$ export CIRCLE_TAG=vA.B.C+oryOS.D
$ cd website; npm run release
```

## Development

To automatically update and format the Markdown, Javascript, and REST API
definitions in this repo everytime you commit a change on your local machine,
please run the following command after `git clone`:

```
# On Linux/macOS:
$ ln -s ./hooks/pre-commit .git/hooks/pre-commit

# On Windows:
> copy hooks\pre-commit .\.git\hooks\pre-commit
```

You can also run the formatter manually:

```
cd website ; npm run format
```
