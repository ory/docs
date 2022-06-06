<h1 align="center">Ory Documentation</h1>

<h4 align="center">
    <a href="https://www.ory.sh/chat">Chat</a> |
    <a href="http://eepurl.com/di390P">Newsletter</a><br/><br/>
    <a href="https://www.ory.sh/docs/">Documentation</a> |
    <a href="https://opencollective.com/ory">Support this project!</a><br/><br/>
    <a href="https://www.ory.sh/jobs/">Work in Open Source, Ory is hiring!</a>
</h4>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Ory Documentation](#ory-documentation)
  - [Style](#style)
    - [Categories](#categories)
      - [Document Frontmatter](#document-frontmatter)
    - [Text](#text)
      - [Headings](#headings)
        - [Headings Capitalization](#headings-capitalization)
    - [Names for console UI elements](#names-for-console-ui-elements)
    - [Lists](#lists)
  - [Testing](#testing)
    - [Playwright tests](#playwright-tests)
    - [Jest tests](#jest-tests)
    - [Markdownlint](#markdownlint)
  - [How-To](#how-to)
    - [Links to other pages](#links-to-other-pages)
    - [Import Markdown](#import-markdown)
    - [Code snippets](#code-snippets)
      - [From Github](#from-github)
      - [From this Repository](#from-this-repository)
      - [Code Examples in MDX](#code-examples-in-mdx)
    - [Shell Examples](#shell-examples)
    - [Images](#images)
    - [Videos](#videos)
  - [CLI Documentation](#cli-documentation)
    - [Fixing Ory CLI docs](#fixing-ory-cli-docs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ory Documentation

> Documentation is the single source of truth

The Ory documentation is the place to find all information related to Ory services, usage and troubleshooting.

This repository contains meta-documentation for the [Ory Ecosystem](https://www.ory.sh/docs/ecosystem/projects/). You can find the
source code for each project here:

- [Ory Kratos](https://github.com/ory/kratos/)
- [Ory Hydra](https://github.com/ory/hydra/)
- [Ory Oathkeeper](https://github.com/ory/oathkeeper/)
- [Ory Keto](https://github.com/ory/keto/)

Other Ory Projects documentation:

- [Ory Kubernetes Helm Charts](https://github.com/ory/k8s/tree/master/docs/helm)
- [Ory Dockertest](https://github.com/ory/dockertest/blob/v3/README.md)
- [Ory SDKs](https://github.com/ory/sdk/blob/master/README.md)

## Style

### Categories

The Ory Developer documentation can be organized in three different main categories:

- Concepts
  - The purpose of this category is to give the reader a deep understanding of the ideas upon which the project is built. Content
    in this category has the form of a discursive explanation. The main goal is to explain.
- Guides
  - The purpose of this category is to solve a specific problem. It has the form of a series of steps towards a goal. It's aimed
    towards more experienced users, who are already familiar with the concepts and tools
- Reference
  - The purpose of this category is to provide a detailed & in-depth description of the project. It has the form of an austere and
    to the point explanation and is rooted in code, most often these documents are built directly from code without editor
    interaction. It doesn't give information on how to do specific things.

There are also sub-types:

- Introduction
  - The purpose of this guide is to introduce the very basics of the project and give newcomers an easy way to start. Contains the
    most basic explanation of the project, an installation guide or a Quickstart/5-Minute Tutorial.
- Troubleshooting
  - Contains instructions on how to resolve issues with Ory services.

#### Document Frontmatter

Add a meaningful title and an ID to the top of the document. `id` needs to be separated with `-` and lowercase, `title` with space
and Uppercase. Example:

```md
---
id: documentation-id
title: Documentation Title
---
```

### Text

Ory documentation should be clear and easy to understand.

- Avoid unnecessary words.
- Be clear, concise, and stick to the goal of the topic.
- Write in US English with US grammar.
- Use articles such as a/an and the wherever possible.
- Use active voice.
- Avoid slang and jargon, while allowing for specific terminology.

#### Headings

- Add only one H1 in each document, by adding `#` at the beginning of it (when using Markdown). The `h1` becomes the document
  `<title>`.
- Start with an `h2` (`##`), and respect the order `h2` > `h3` > `h4` > `h5` > `h6`. Never skip the hierarchy level, such as
  `h2` > `h4`
- Avoid using symbols and special characters in headers. Whenever possible, they should be plain and short text.
- Leave one blank line before and after a heading.
- Don't use links in headings.
- Search engines prioritize words used in headings and subheadings. Make your subheading titles clear, descriptive, and complete
  to help users find the right example, as shown in the section on [heading titles](#heading-titles).

##### Headings Capitalization

<!-- TODO sentence-casing or [letter-casing](https://en.wikipedia.org/wiki/Letter_case#Sentence_case)  -->

### Names for console UI elements

<!-- TODO

UI elements, like button and checkbox names, should be **bold**. Guidance for
each individual UI element is in
[the word list](https://github.com/ory/docs/blob/master/docs/markdownlint.yml#L31).  -->

### Lists

- Always start list items with a capital letter, unless they're parameters or commands that are in backticks, or similar.
- Always leave a blank line before and after a list.
- Begin a line with spaces (not tabs) to denote a [nested sub-item](#nesting-inside-a-list-item).

## Testing

### Playwright tests

The [Playwright](https://github.com/microsoft/playwright) (E2E) tests file names end with `.spec.ts` and can be found in
`/tests/playwright`. NodeJS is required to run Playright tests locally. To test the documentation locally:

1. Clone this repository.
1. Enter the `/docs` folder in your local git environment.
1. Install dependencies by running: `npm install`.
1. Run the Docs webserver and test the documentation by running: `npm start`
1. Build the docs and verify by running: `npm run build`

### Jest tests

The Playwright (E2E) tests file names end with `.test.ts` and can be found in `/tests/jest`.

### Markdownlint

- [Word List](https://github.com/ory/docs/blob/master/docs/markdownlint.yml#L31).

Locally:

1. Download and install the [markdownlint CLI](https://github.com/igorshubovych/markdownlint-cli). `brew install markdownlint-cli`
1. Check if markdownlint installed.  
   `markdownlint --help``
1. Lint all files in the project, in the docs folder use `cd docs` `markdownlint '**/*.md' --ignore node_modules`
1. Fix all files in the project, `Warning: This writes to your files!` `cd docs`
   `markdownlint './docs/**/*.+(md|mdx)' --ignore node_modules --fix`

## How-To

### Links to other pages

If you would add a link to an outside resource, just go ahead.

**If you want to add a link to a document in our own documentation, add the filename.**

- ✅ `[XY Guide](./guide/XY.md)`
- 🚫 `[XY Guide](./guide/XY)`

This prevents [broken links issue](https://github.com/ory/docusaurus-template/issues/38) when you load the documentation from an
outside link.

### Import Markdown

Use the same markdown in several places:

````md
```mdx-code-block
import ExampleMarkdown from './_common/example.md'

<ExampleMarkdown />
```
````

### Code snippets

#### From Github

Use [CodeFromRemote](https://github.com/ory/docusaurus-template/blob/master/src/theme/CodeFromRemote.js) to import code directly
from Github.

Import at the beginning of your document like so:

```md
---
id: documentation id
title: Documentation Title
---

import CodeFromRemote from '@theme/CodeFromRemote'
```

Then at the place you want the code to appear in the document add:

```js
<CodeFromRemote
  lang="js" # the language of the code you want to add e.g. jsx,tsx,ts,go,yaml,yml,js,html,pug
  link="https://github.com/ory/kratos-selfservice-ui-node/blob/master/src/middleware/simple.ts"
  src="https://raw.githubusercontent.com/ory/kratos-selfservice-ui-node/master/src/middleware/simple.ts"

/>
```

You can use `startAt` and `endAt` if you only want to show a part of the code:

```js
<CodeFromRemote
  lang="yml"
  src="https://github.com/gen1us2k/kratos_flask_example/blob/master/docker-compose.yml"
  startAt="postgres-kratos:"
  endAt="postgres-keto:"
/>
```

#### From this Repository

Use the same code example in several places:

````md
```mdx-code-block
import CodeBlock from '@theme/CodeBlock'
import exampleJs from '!!raw-loader!./code-example.jsx'
import exampleGo from '!!raw-loader!./code-example.go'

<CodeBlock className="language-jsx">{exampleJs}</CodeBlock>
<CodeBlock className="language-go">{exampleGo}</CodeBlock>
```
````

#### Code Examples in MDX

If you are using MDX and are in, for example, code tabs, use the `CodeBlock` to nest code items:

````md
```mdx-code-block
import CodeBlock from '@theme/CodeBlock'

<Tabs
  defaultValue="ui"
  values={[
    {label: 'UI', value: 'ui'},
  ]}>
  <TabItem value="ui">
    <CodeBlock className="language-jsx">{`Your

code

here`}</CodeBlock>
  </TabItem>
  <TabItem value="node">
    <CodeFromRemote
      src="https://github.com/ory/hydra-login-consent-node/blob/master/src/routes/consent.ts"
    />
  </TabItem>
  <TabItem value="html">
    <CodeFromRemote
      src="https://github.com/ory/hydra-login-consent-node/blob/master/views/consent.pug"
    />
  </TabItem>
</Tabs>
```
````

### Shell Examples

Use `shellsession`:

````md
```shellsession
npx create-next-app@latest --typescript
npm i --save @ory/integrations
```
````

Please do not prefixes with `$`

```patch
- $ command --arg # do not
+ command --arg # do
```

### Images

Add images directly with an `img` tag:

```html
<img alt="Image description which will be the alt tag" src={useBaseUrl('images/some-folder/some-image.png')} />
```

The useBaseUrl is `https://www.ory.sh/` and exposes `src/static/...`, so all images are stored in `src/static/images/...`.

Compress new images you add to the documentation. One known tool is [`pngquant`](https://pngquant.org/).
[Related article](https://about.gitlab.com/blog/2020/01/30/simple-trick-for-smaller-screenshots/).

- Don't use `lorem ipsum` text.
- Capture only the relevant UI.

### Videos

When you [record your screen using Quicktime](https://support.apple.com/en-gb/guide/quicktime-player/qtp97b08e666/mac), a `.mov`
file is recorded. Follow these rules:

1. Please use 16:9 format with at least 1024 pixels wide. `ffmpeg` will scale it to the right size.
1. Please make sure that no history or auto-suggestions are visible.

Once recorded, use the commands below to convert them to `mp4` and `webm`:

```shellsession
file="screencast.mov"

ffmpeg -i $file -an -c:v libvpx-vp9 -vf scale=1024:-1 -crf 30 -b:v 0 "${file%.*}".webm
ffmpeg -i $file -vcodec h264 -vf scale=1024:-1 -an "${file%.*}".mp4
```

Next copy them next to the markdown file you are editing. Then use the following code to display the video:

````
```mdx-code-block
import mp4 from './screencast.mp4'
import webm from './screencast.webm'
import VideoEmbed from '@site/src/components/VideoEmbed'

<VideoEmbed mp4={mp4} webm={webm} />
```
````

To embed Youtube videos just copy & paste the link, it's that easy!

## CLI Documentation

### Fixing Ory CLI docs

If you find an error in the Ory CLI documentation here are some pointers on how to fix it:

The code that generates the CLI docs (for Kratos) comes from here: https://github.com/ory/kratos/blob/master/cmd/clidoc/main.go

`cmd/clidoc/main.go` is the general path for all Ory projects.

The command to generate the CLI docs can be found here: https://github.com/ory/x/blob/master/clidoc/generate.go#L96