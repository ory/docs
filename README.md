<h1 align="center">Ory Documentation</h1>

<h4 align="center">
    <a href="https://www.ory.com/chat">Chat</a> |
    <a href="https://www.ory.com/l/sign-up-newsletter">Newsletter</a><br/><br/>
    <a href="https://www.ory.com/docs/">Documentation</a> |
    <a href="https://opencollective.com/ory">Support this project!</a><br/><br/>
    <a href="https://www.ory.com/jobs/">Work in Open Source, Ory is hiring!</a>
</h4>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [Style guide](#style-guide)
  - [Grammar and style](#grammar-and-style)
    - [Lists](#lists)
    - [Headings](#headings)
  - [Formatting](#formatting)
    - [Document front matter](#document-front-matter)
    - [Bolding, 'code formatting'](#bolding-code-formatting)
    - [Linking](#linking)
    - [Code blocks](#code-blocks)
    - [Placeholders and dummy data](#placeholders-and-dummy-data)
    - [UI references](#ui-references)
    - [Diagrams](#diagrams)
  - [Import \& reference content](#import--reference-content)
    - [Markdown partials](#markdown-partials)
    - [Code snippets](#code-snippets)
      - [From GitHub](#from-github)
      - [From this repository](#from-this-repository)
  - [Screenshots and videos](#screenshots-and-videos)
    - [Compressing images](#compressing-images)
    - [Recording and compressing videos](#recording-and-compressing-videos)
  - [Testing](#testing)
  - [Formatting documentation](#formatting-documentation)
  - [Adding content to "Examples" page](#adding-content-to-examples-page)
  - [CLI and API reference - auto-generated content](#cli-and-api-reference---auto-generated-content)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

Ory documentation is the single source of truth for usage, implementation,
configuration, and troubleshooting of the Ory Network and all projects of the
[Ory Ecosystem](https://www.ory.com/docs/ecosystem/projects/). The documentation
is best consumed through the
[Ory documentation portal](https://www.ory.com/docs/).

To see the source code of each of the projects, visit the project repository:

- [Ory Kratos](https://github.com/ory/kratos/)
- [Ory Hydra](https://github.com/ory/hydra/)
- [Ory Oathkeeper](https://github.com/ory/oathkeeper/)
- [Ory Keto](https://github.com/ory/keto/)

Documentation of other Ory projects:

- [Ory Kubernetes Helm Charts](https://github.com/ory/k8s/tree/master/docs/helm)
- [Ory Dockertest](https://github.com/ory/dockertest/blob/v3/README.md)
- [Ory SDKs](https://github.com/ory/sdk/blob/master/README.md)

# Style guide

This style guide outlines the most important rules and conventions that apply to
the Ory documentation. If there are no Ory-specific requirements or guidelines
for a given topic, refer to the
[Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
and follow the rules described there.

## Grammar and style

Ory documentation must be clear, concise, and unambiguous. To achieve that,
follow these simple rules:

1. Use active voice and present tense.
2. Always write in American English.
3. Use
   [zero conditional](https://www.ef.com/wwen/english-resources/english-grammar/zero-conditional/)
   when talking about the cause-and-effect in software behavior.
4. Use the right words to make sure that your message is clear and unambiguous.
   Don't use words like "should", "could", or "may".
5. Don't use phrasal verbs, colloquialisms, and jargon.
6. Don't refer to users in ways that imply their sex.
7. Don't use contractions of Latin origins such as `e.g` or `i.e`.
8. Remember to use articles (`a`, `an`, `the`) in your writing.
9. Use common contractions such as `aren't`, `don't`, `doesn't` to sound
   friendly and informal.

### Lists

Ory follows the
[Microsoft Writing Style Guide list formatting guidelines](https://learn.microsoft.com/en-us/style-guide/scannable-content/lists).

- List items must begin with a capital letter unless there's a specific reason
  not to do that. For example, the item is a proper name that's not capitalized,
  a parameter, or a command wrapped in backticks (`` ` ``).
- Don't use punctuation such as commas (`,`), semicolons (`;`), or conjunctions
  (`and`, `or`) at the end of list items.
- Use periods (`.`) only at the end of list items that are proper sentences,
  even very short ones.
- Make list items consistent in structure. For example, if one list item is a
  full sentence, make all list items full sentences. Don't use different
  structures for list items in a single list.
- Indent lines with 3 spaces to denote nested sub-items in lists. Indent text,
  code blocks, and images.

### Headings

- Use
  [sentence case](https://docs.microsoft.com/en-us/style-guide/text-formatting/using-type/use-sentence-style-capitalization)
  for headings.
- The highest heading level in documents is `h2`. Use `h1` only when you
  override the document `title`.
- The lowest heading level in documents is `h4`. If you absolutely need to add
  more heading levels, don't go lower than `h5`.
- Avoid using symbols and special characters in headings.
- Leave one blank line before and after a heading.
- Don't use links in headings.
- Headings play an important role in SEO and searchability and make the document
  more scannable. Make your headings short and true to the content they
  introduce.

## Formatting

Write in [Markdown](https://www.markdownguide.org/). Don't mix HTML tags with
Markdown. Files with the `.mdx` extension use
[JSX-extended Markdown (MDX)](https://mdxjs.com/).

### Document front matter

Add this front matter to every document you create:

```md
---
id: excellent_feature
title: Learn how to use the excellent feature in your implementation
sidebar_label: Excellent feature
slug: excellent-feature-for-some-reason
---
```

- `id` is the document identifier that makes up the last part of the document
  URL. Try to come up with a short ID that accurately describes the content. IDs
  that use multiple words must use hyphens (`-`) to separate the words.
- `title` is the document title that’s displayed as the page header. Used by
  search engines when displaying search results. Try to make it descriptive so
  that it helps readers understand what the document is about at the first
  glance. If it comes out long(ish), you can overwrite it by adding a `h1` in
  the very first line following the front matter. Use sentence case.
- `sidebar_label` represents the document title used in the sidebar (left
  navigation). Create a short document title that fits the sidebar width. Use
  sentence case.
- `slug` is an optional property that allows you to customize the document URL.
  Use it to create more meaningful, SEO-friendly URLs.

### Bolding, 'code formatting'

- Use only `code` and **bold** formatting. Don't use any other formatting.
- For inline code, wrap text in single backticks (`` ` ``). For code blocks use
  three backticks (` ``` `)
- Use `code` formatting for:
  - Commands, for example `ory --help`
  - File names and paths, for example `file.txt`, `~/Desktop/git/docs`
  - Environment variables, for example `CUSTOM_ENV_VAR`
- Use **bold** only when writing about user interface (UI) elements.

### Linking

- Link to external web pages using absolute links. Don't expose the link on its
  own. Instead, embed it in descriptive text. For example:

  ```
  Ory documentation uses [Prism syntax highlighting](https://prismjs.com/).
  ```

- Link to documents within this repository using relative links. When
  referencing the file, use the file name.

  ```
  [Some link](../path/to/file.mdx)
  ```

### Code blocks

- Always add a programming language identifier to code blocks. Ory documentation
  uses [Prism syntax highlighting](https://prismjs.com/).

  ````
  ```json
  {some-JSON-code-here}
  ```
  ````

- For command line examples, use `shell` as the programming language identifier.
  Don't put `$` before the command.

  ````
  ```shell
  ory get identities
  ```
  ````

- For Ory Permissions (Keto) relation tuples, use `keto-relation-tuples`
  language identifier, and for relationships use `keto-relationships`.

  ````
  ```keto-relation-tuples
  namespace:object#relation:subject
  // comment
  ```

  ```keto-relationships
  namespace:subject is relation of object
  is namespace:subject allowed to permission on object?
  // comment
  ```
  ````

- For multi-line commands, indent subsequent lines of the command with two
  spaces.

  ````
  ```shell
  curl --request GET -sL \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer {ORY_API_KEY}" \
    'https://{project-slug}.projects.oryapis.com/admin/identities/{identity_id}?include_credential=oidc'
  ```
  ````

### Placeholders and dummy data

Using placeholders and dummy data in code snippets and command examples is a
good way to ensure that users run commands in the context of their setups and,
as a result, achieve success faster. Additionally, this fabricated information
prevents leaking of sensitive data such as tokens or API keys.

Follow these rules when using placeholders and dummy data:

- Introduce placeholders and dummy data in curly brackets with a preceding $ so
  they can be used in bash commands.
- Use colons (`-`) or underscores (`_`) to separate multiple words, for example
  `{ORY_SESSION_COOKIE}` or `{project-slug}`.
- When referring to a project API URL or SDK URL, always use
  `https://$PROJECT_SLUG.projects.oryapis.com`.
- When referring to scenarios in which the user runs a custom domain, use
  `https://ory.your-custom-domain.com`.
- Always use short, but descriptive, verbal placeholders. Don't mix digits and
  letters to mimic the format of the data you mock.

### UI references

When talking about any user interface (UI) in the Ory documentation, follow
these rules:

- When referring to UI elements, always use the exact text associated with the
  given element.
- Format the name of the UI element you refer to in **bold**.
- Format any user input with `code`.

> Example: In the **Identity Model Schema** box, type `MyCustomIdentitySchema`.

### Diagrams

Use [Mermaid](https://mermaid-js.github.io/mermaid/#/) to create diagrams. You
can run the tool locally or use [Mermaid Live Editor](https://mermaid.live) in
the browser. See the
[Mermaid Cheatsheet](https://jojozhuang.github.io/tutorial/mermaid-cheat-sheet/)
for a detailed description on how to use Mermaid.

To add a Mermaid diagram, use this `mdx-code-block`:

````md
```mdx-code-block
import Mermaid from "@site/src/theme/Mermaid"
<Mermaid
  chart={`

{your-Mermaid-code}

`}
/>
```
````

## Import & reference content

### Markdown partials

If a certain piece of content must be re-used across multiple documents in the
exact form, it's a good idea to turn it into a partial. Thanks to that, you
maintain content in a single file, instead of multiple instances of the same
content in many docs.

Add partials to the `_common` directory.

To import a partial, use this `mdx-code-block`:

````md
```mdx-code-block
import ExamplePartial from './_common/example.md'

<ExamplePartial />
```
````

> **TIP:** Headings contained in partials aren't added to the Docusaurus table
> of contents (ToC). To make sure users can access all headings through the ToC,
> don't add headings to partials. Instead, add appropriate headings to the
> document manually and introduce partials after them. To see an implementation
> of this approach, look at
> [this file](https://github.com/ory/docs/blob/0137302d511b2a6b0e17a570e917d92fcdff1d1f/docs/kratos/social-signin/10_google.mdx?plain=1#L237).

### Code snippets

#### From GitHub

Use
[CodeFromRemote](https://github.com/ory/docusaurus-template/blob/master/src/theme/CodeFromRemote.js)
to import code directly from GitHub.

Use this `mdx-code-block`:

````md
```mdx-code-block
import CodeFromRemote from '@theme/CodeFromRemote'

<CodeFromRemote
  lang="js"
  link="https://github.com/ory/kratos-selfservice-ui-node/blob/master/src/middleware/simple.ts"
  src="https://raw.githubusercontent.com/ory/kratos-selfservice-ui-node/master/src/middleware/simple.ts"
  startAt="{CONTENT_FROM_CODE}"
  endAt="{CONTENT_FROM_CODE}"
/>
```
````

- `lang` specifies the programming language the code is in
- `link` is the file location displayed in the top part of the code block window
- `src` is the direct link used to import the code (optional)
- `startAt` , `endAt` are used to define where the imported snippet starts and
  ends (optional)

#### From this repository

````md
```mdx-code-block
import CodeBlock from '@theme/CodeBlock'
import exampleJs from '!!raw-loader!./code-example.jsx'
import exampleGo from '!!raw-loader!./code-example.go'

<CodeBlock className="language-jsx">{exampleJs}</CodeBlock>
<CodeBlock className="language-go">{exampleGo}</CodeBlock>
```
````

## Screenshots and videos

- Use screenshots and videos sparingly. These resources tend to get out-of-date
  quickly and are cumbersome to maintain.
- Screenshots and videos must capture only the relevant parts of the screen.
- Screenshots and videos must capture UI elements in English. If you’re
  capturing parts of the browser UI in your work, make sure the UI is in
  English.
- Make an effort to get the screenshots and videos looking as clean as possible.
  Avoid situations where text fields suggest irrelevant inputs, avoid erratic
  mouse cursor movements and general chaos.
- You must add media to `_static` folders.
  - In the `_static` directory, each document that uses media has its own
    directory.
  - In the directory of the document, the files have numbers for names, for
    example, `1.png`, `2.png`, `3.png`. The filenames should reflect the stage
    at which the media is used in the document. This means that the screenshot
    named `1.png` will be used in line 70, while the diagram `2.svg` will be
    used in line 100.

### Compressing images

Compress images you add to the documentation to keep the repository lean. You
can use [`pngquant`](https://pngquant.org/).
[Read this article to learn a trick to make your screenshots 80% smaller](https://about.gitlab.com/blog/2020/01/30/simple-trick-for-smaller-screenshots/).

### Recording and compressing videos

We recommend using
[Quicktime to record videos](https://support.apple.com/en-gb/guide/quicktime-player/qtp97b08e666/mac).
Follow these rules:

- Use 16:9 format with at least 1024 pixels of width. `ffmpeg` will scale it to
  the right size.
- Make sure that no history or auto-suggestions are visible.

After recording the video, convert the `.mov` file to `mp4` and `webm`:

```shellsession
file="screencast.mov"

ffmpeg -i $file -an -c:v libvpx-vp9 -vf scale=1024:-1 -crf 30 -b:v 0 "${file%.*}".webm
ffmpeg -i $file -vcodec h264 -vf scale=1024:-1 -an "${file%.*}".mp4
```

Use this `mdx-code-block` to add the video to your document:

````
```mdx-code-block
import mp4 from './_static/screencast.mp4'
import webm from './_static/screencast.webm'
import VideoEmbed from '@site/src/components/VideoEmbed'

<VideoEmbed mp4={mp4} webm={webm} />
```
````

## Ory Console

### Navigate to Ory Console Pages

You can use the `/current/` route to navigate users to their active Ory Network
project. For example, to access the Custom UI settings for the active Ory
Network project in the Console, you can link to:
https://console.ory.com/projects/current/ui

When referencing a page of the Ory Console, use the
`<ConsoleLink route="project..." />` component in MDX files.

The component resolves the navigation section and page title for the given
route, and renders a standard markup for both, as well as the link with the
`/current/` shortcut mentioned above:

```tsx
<ConsoleLink route="project.activity.events" />

// becomes:
// Activity → Logs & Events in the [Ory Console](https://console.ory.sh/current/projects/activity/events)
```

A list of all supported routes can be found here:
[src/components/ConsoleLink/console-routes.ts](src/components/ConsoleLink/console-routes.ts).

Please note that the syntax is like accessing a path in a JS object, but as a
string. If the route you want to reference is found in the `console-routes.ts`
file in the following way:

```ts
{
  project: {
    activity: {
      events: {
        route: "/projects/[project]/activity/events",
      }
    }
  }
}
```

Use `<ConsoleLink route="project.activity.events" />` to reference it.

To add a new route, you need to add an entry in
[`console-routes.ts`](https://github.com/ory/docs/blob/master/src/components/ConsoleLink/console-routes.ts)
as well as
[`console-nav-data.ts`](https://github.com/ory/docs/blob/master/src/components/ConsoleLink/console-nav-data.ts).

## Testing

To test the documentation locally:

1. Clone this repository.
2. Navigate to the cloned repository and run `npm install` to install all
   dependencies.
3. Run the development server and test the changes you made using a fully
   operational version of the documentation portal that runs on your machine.
   Run `npm run start`.
4. Create a production build to check for any technical issues, such as invalid
   internal links. Run `npm run build`.

## Formatting documentation

All documents and other files in this repository must be formatted with Prettier
using the [Ory Prettier styles](https://github.com/ory/prettier-styles).

To format all relevant files, run these commands from the main directory of the
repository:

```sh
make format
git commit -a -m "chore: format"
git push
```

For a better workflow, install the Prettier plugin for your editor:

- [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [IntelliJ Prettier plugin](https://www.jetbrains.com/help/idea/prettier.html)

## Adding content to "Examples" page

[The Quickstart overview](https://www.ory.sh/docs/getting-started/overview)
provides an overview of Ory quickstarts. To add a new example or modify existing
entries:

1.  Open `examples-content.tsx` in `src/pages/_assets/`.
2.  Copy the following snippet and append it to the correct array (either
    official, community, or self-hosting examples):

    ```tsx
    {
          title: "Protect a Page with Login: NextJs/React", //Your example title goes here
          language: "typescript",                           //The main programming language of your example
          author: "ory",                                    //The author's GitHub handle
          tested: true,                                     //Is the example in ory/examples or ory/docs and has automated tests?
          repo: "https://github.com/ory/docs/tree/master/code-examples/protect-page-login/nextjs", //The repo containing the example code
          docs: "https://www.ory.sh/docs/guides/protect-page-login/next.js",                       //Documentation for the example, can be README, blog article or similar
        },
    ```

    - `language` can be one of: dart, django, docker, erlang, flutter, go, java,
      javascript, kotlin, kubernetes, nextjs, nodejs, ory, php, python, react,
      rescript, svelte, typescript, vue

3.  Open a pull request with your changes.

## CLI and API reference - auto-generated content

Ory documentation contains auto-generated content such as CLI and API
references. Documents of this type are generated from source code and are pushed
to this repository by an automated job.

As such, editing any of these documents in the Ory documentation repository
isn't the way to change or fix this content. Any changes you make will be
overwritten by the next push that follows the generation process.

Instead, find the lines in question in the source code of the Ory projects and
edit them there. For example, if you want to edit the documentation of the Ory
Kratos CLI, you must edit this file:

https://github.com/ory/kratos/blob/master/cmd/clidoc/main.go

The `cmd/clidoc/main.go` is the general path for all Ory projects.

The command to generate the CLI docs can be found here:
https://github.com/ory/x/blob/master/clidoc/generate.go#L96
