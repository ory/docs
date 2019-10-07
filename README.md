# ORY Documentation

[![CircleCI](https://circleci.com/gh/ory/docs/tree/master.svg?style=shield)](https://circleci.com/gh/ory/docs/tree/master)

This repository contains the documentation (HTTP API Reference, User Guides,
FAQ) for all ORY products. Changes, when merged or pushed to master, are
directly deployed to the website.

To view the docs go to **[www.ory.sh/docs/next](https://www.ory.sh/docs/next)**.

To make changes simply modify the markdown files.

## Folder structure

- the current documentation is in [docs](docs/)
- the navigation on the left is defined in
  [website/sidebars.json](website/sidebars.json)
- Swagger docs are generated from the Go source code, templates are
  [here](.widdershins/templates).
- static assets (images) are in [website/static](/website/static/). When hosted
  the file `/website/static/images/blah.svg` will have the path
  `/images/blah.svg`. It will look broken on Github. Run the
  [local webserver](#local-preview) to verify links to static assets.

## Local preview

To run a local preview:

```
$ cd website
$ npm install
$ npm run start
```

The script should open a browser with http://localhost:3000/docs for you. You
see the docs for the latest stable version. To see the docs on master:

- click on `oryOS.<version>` in the title bar
- click on the link next to master
- it should take you to http://localhost:3000/docs/next/index

Changes to Markdown should update automatically, refresh the web site if needed.
Changes to [website/sidebars.json](website/sidebars.json) require a restart of
the dev web server: hit `Ctrl-C` and execute `npm run start` again.

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

## Source code formatting

To automatically update and format the Markdown, Javascript, and REST API
definitions in this repo everytime you commit a change on your local machine,
please run the following command after `git clone`:

```
# On Linux/macOS:
$ ln -s ./hooks/pre-commit .git/hooks/pre-commit

# On Windows:
> copy hooks\pre-commit .\.git\hooks\pre-commit
```

You can also run the formatters manually:

```
cd website
npm run api
npm run format
```
