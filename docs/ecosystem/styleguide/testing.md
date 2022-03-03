---
id: testing
title: Ory Documentation Testing
sidebar_label: Testing
---

## prettier

To format all documents properly run the following commands:

```
cd docs
npm i
npm run format
git commit -a -m "chore: format"
```

## markdownlint

The Ory Documentation uses
[markdownlint](https://github.com/igorshubovych/markdownlint) to enforce
markdown styles.

### How to use markdownlint locally

1. Download and install the
   [markdownlint CLI](https://github.com/igorshubovych/markdownlint-cli).
   `brew install markdownlint-cli`
1. Check if markdownlint installed.  
   `markdownlint --help``
1. Lint all files in the project, in the docs folder use `cd docs`
   `markdownlint '**/*.md' --ignore node_modules`
1. Fix all files in the project, `Warning: This writes to your files!` `cd docs`
   `markdownlint './docs/**/*.+(md|mdx)' --ignore node_modules --fix`

## Vale

The Ory Documentation uses [Vale](https://github.com/errata-ai/vale) to enforce
writing style.

### How to use Vale locally

1. Download and install [Vale](https://github.com/errata-ai/vale).  
   `brew install vale`
1. Check if Vale installed.  
   `vale -h`
1. Copy the write-good and Microsoft Vale Styles:

- https://github.com/errata-ai/write-good/releases/latest/download/write-good.zip
- https://github.com/errata-ai/Microsoft/releases/latest/download/Microsoft.zip

1. Add `.vale.ini` in your root or project folder.
   [Reference .vale.ini](https://raw.githubusercontent.com/ory/docs/master/docs/.vale.ini)
1. Check the document:  
   `vale yourdocument.md` or `vale docs/ecosystem/styleguide/testing.md`

Check the [documentation](https://docs.errata.ai/) for more advanced features.
