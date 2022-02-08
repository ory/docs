---
id: testing
title: Ory Documentation Testing
sidebar_label: Documentation Testing
---

# Documentation testing

Ory documentation is stored in projects with code and treated like code. 
We use automated processes to maintain the standards and quality of Ory documentation.

We have tests:

- To lint the words and structure of the documentation.
- To check the validity of internal links within the documentation suite.

## CI tests

>TODO 

## Run tests locally

Similar to previewing your changes locally](index.md#previewing-the-changes-live), you can also
run these tests on your local computer. This has the advantage of:

- Speeding up the feedback loop. You can know of any problems with the changes in your branch
  without waiting for a CI/CD pipeline to run.
- Lowering costs. Running tests locally is cheaper than running tests on the cloud
  infrastructure GitLab uses.

To run tests locally, it's important to:

- [Install the tools](#install-linters), and keep them up to date.
- Run linters and documentation link tests the same way they are run in CI/CD pipelines. It's important to use
  same configuration we use in CI/CD pipelines, which can be different than the default configuration
  of the tool.

### Install linters

At a minimum, install [markdownlint](#markdownlint) and [Vale](#vale) to match the checks run in
build pipelines:

1. Install [`vale`](https://github.com/errata-ai/vale/releases). For example, to install using
   `brew` for macOS, run:

   ```shell
   brew install vale
   ```

1. Install `markdownlint-cli`:

   ```shell
   yarn global add markdownlint-cli
   ```

   We recommend installing the version of `markdownlint-cli`
   [used (see `variables:` section)](https://gitlab.com/gitlab-org/gitlab-docs/-/blob/main/.gitlab-ci.yml) when building
   the `image:docs-lint-markdown`.

These tools can be [integrated with your code editor](#configure-editors).

## Local linters

To help adhere to the [documentation style guidelines](./styleguide.md), and improve the content
added to documentation, [install documentation linters](#install-linters) and
[integrate them with your code editor](#configure-editors).

At Ory we use:

- [markdownlint](#markdownlint)
- [Vale](#vale)
- [prettier](#prettier)

### Vale

Vale is a grammar, style and word usage linter. Vale’s configuration is stored in the .vale.ini file located in the root directory of a projects documentation. 

- [Vale documentation](https://docs.errata.ai/)
- [Gitlab Vale Documentation](https://docs.gitlab.com/ee/development/documentation/testing.html#vale)

#### How to use Vale

1. Download and install [Vale](https://github.com/errata-ai/vale).  
`brew install vale`
1. Check if Vale installed correctly.  
`vale -h`
1. Copy the [Ory Vale Styles and Vocab](https://github.com/ory/docs/tests/vale).  
1. Add `.vale.ini` in your root or project folder. [Reference .vale.ini](https://raw.githubusercontent.com/ory/docs/.vale.ini)
1. Check the document:  
`vale yourdocument.md` or `vale src/markdown/blog/some-blogpost.mdx`

### markdownlint

> TODO https://github.com/DavidAnson/markdownlint

### prettier

To ensure correct code formatting run prettier: 

`npm run format`


