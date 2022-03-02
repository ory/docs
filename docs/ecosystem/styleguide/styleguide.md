---
id: styleguide
title: Ory Documentation Style Guide
sidebar_label: Style Guide
---

This document defines the standards for Ory documentation, including grammar,
formatting, word use, and more.

In addition to this page, the following resources can help you craft and
contribute to documentation:

- [Doc style and consistency testing](testing.md)
- [UI text guidelines](https://design.gitlab.com/content/error-messages/)
- [Gitlab Handbook](https://about.gitlab.com/handbook/)
- [Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)

## Documentation is the single source of truth

The Ory documentation is the place to find all information related to Ory
services, usage and troubleshooting.

This prevents information silos, making it easier to find information about Ory
products.

It also informs decisions about the kinds of content we include in our
documentation.

### The documentation includes all information

Include problem-solving actions that may address rare cases or be considered
risky, but provide proper context through fully detailed warnings and caveats.
This kind of content should be included as it could be helpful to others and,
when properly explained, its benefits outweigh the risks.

Ory adds all troubleshooting information to the documentation, no matter how
unlikely a user is to encounter a situation.

### The documentation includes all media types

Include any media types/sources if the content is relevant to readers. You can
freely include or link presentations, diagrams, and videos. No matter who it was
originally composed for, if it is helpful to any of our audiences, we can
include it.

- If you use an image that has a separate source file (for example, a vector or
  diagram format), link the image to the source file so that anyone can update
  or reuse it.
- Do not copy and paste content from other sources unless it is a limited
  quotation with the source cited. Typically it is better to either rephrase
  relevant information in your own words or link out to the other source.

### Category types

The Ory Developer documentation can be organized in three different main
categories:

- Concepts
  - The purpose of this category is to give the reader a deep understanding of
    the ideas upon which the project is built. Content in this category has the
    form of a discursive explanation. The main goal is to explain.
- Guides
  - The purpose of this category is to solve a specific problem. It has the form
    of a series of steps towards a goal. It is aimed towards more experienced
    users, who are already familiar with the concepts and tools
- Reference
  - The purpose of this category is to provide a detailed & in-depth description
    of the project. It has the form of an austere and to the point explanation
    and is rooted in code, most often these documents are built directly from
    code without editor interaction. It does not give information on how to do
    specific things.

There are also the following sub-types:

- Introduction
  - The purpose of this guide is to introduce the very basics of the project and
    give newcomers an easy way to start. Contains the most basic explanation of
    the project, an installation guide or a Quickstart/5-Minute Tutorial.
- Troubleshooting
  - Contains instructions on how to resolve issues with Ory services.

Ory uses [category type templates](templates.md).

### Link instead of repeating text

Rather than repeating information from another topic, link to the single source
of truth and explain why it is important.

## Markdown

All Ory documentation is written using
[Markdown](https://en.wikipedia.org/wiki/Markdown).

### Import Markdown

Use the same markdown in several places:

````bash
```mdx-code-block
import ExampleMarkdown from './_common/example.md'

<ExampleMarkdown />
```
````

### HTML in Markdown

Hard-coded HTML is valid, although it's discouraged from being used. HTML is
permitted if:

- There's no equivalent markup in Markdown.
- Advanced tables are necessary.
- Special styling is required.
- Reviewed and approved by a technical writer.

### Markdown Rules

Ory ensures that the Markdown used across all documentation is consistent, as
well as easy to review and maintain by
[testing documentation changes](testing.md).

## Language

Ory documentation should be clear and easy to understand.

- Avoid unnecessary words.
- Be clear, concise, and stick to the goal of the topic.
- Write in US English with US grammar.
- Use articles such as a/an and the wherever possible.
- Use active voice.
- Avoid slang and jargon, while allowing for specific terminology.

### Capitalization

#### Sentence case headings

Use sentence case. For example:

- `# Use variables to configure pipelines`
- `## Use the To-Do List`

#### UI text

When referring to specific user interface text, like a button label or menu
item, use the same capitalization that's displayed in the user interface.

#### Feature names

- Feature names are typically lowercase.
- Some features require title case, typically nouns that name Ory-specific
  capabilities or tools. Features requiring title case should be added to the
  [word list](https://github.com/ory/docs/blob/0533161365f1d8bdca23dcb7ae36a34ea631997a/docs/markdownlint.yml#L31).

Do not match the capitalization of terms or phrases on the
[Website](https://ory.sh) by default.

#### Other terms

Capitalize names of:

- Ory [product tiers](https://ory.sh/pricing/). For example, Ory Cloud Developer
  and Ory Cloud Growth.
- Third-party organizations, software, and products. For example, Prometheus,
  Kubernetes, Git, and The Linux Foundation.
- Methods or methodologies. For example, Continuous Integration, Continuous
  Deployment, Scrum, and Agile.

Follow the capitalization style listed at the authoritative source for the
entity, which may use non-standard case styles. For example: Ory and npm.

### Fake user information

You may need to include user information in entries such as a REST call or user
profile. Do not use real user information or email addresses in Ory
documentation. For email addresses and names, use:

- Email addresses: Use an email address ending in `example.com`.
- Names: Use strings like `example_username`. Alternatively, use diverse or
  non-gendered names with common surnames, such as `Sidney Jones`, `Zhang Wei`,
  or `Alex Garcia`.

### Fake URLs

When including sample URLs in the documentation, use:

- `example.com` when the domain name is generic.
- `ory.sh` when referring to self-hosted Ory. Use `ory.sh` for Ory Cloud
  projects.

### Fake tokens

There may be times where a token is needed to demonstrate an API call using cURL
or a variable used in CI. It is strongly advised not to use real tokens in
documentation even if the probability of a token being exploited is low.

You can use these fake tokens as examples:

<!-- TODO
| Token type            | Token value                                                        |
|:----------------------|:-------------------------------------------------------------------|
| Personal access token | `<your_access_token>`                                             |
| Application ID        | `2fcb195768c39e9a94cec2c2e32c59c0aad7a3365c10892e8116b5d83d4096b6` |
| Application secret    | `04f294d1eaca42b8692017b426d53bbc8fe75f827734f0260710b83a556082df` |
| Webhook secret token  | `6XhDroRcYPM5by_h-HLY`                                             |
| Health check token    | `Tu7BgjR9qeZTEyRzGG2P`                                             |
| Request profile token | `7VgpS4Ax5utVD2esNstz`                                             |
-->

### Contractions

Contractions are encouraged, and can create a friendly and informal tone,
especially in tutorials, instructional documentation, and user interfaces.

Some contractions, however, should be avoided:

| Do not use a contraction      | Example                                          | Use instead                                       |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| With a proper noun and a verb | The **Container Registry's** a powerful feature. | The **Container Registry** is a powerful feature. |
| To emphasize a negative       | **Don't** install X with Y.                      | **Do not** install X with Y.                      |
| In reference documentation    | **Don't** set a limit.                           | **Do not** set a limit.                           |
| In error messages             | Requests to localhost **aren't** allowed.        | Requests to localhost **are not** allowed.        |

### Acronyms

If you use an acronym, spell it out on first use on a page. You do not need to
spell it out more than once on a page. When possible, try to avoid acronyms in
headings.

### Numbers

When using numbers in text, spell out zero through nine, and use numbers for 10
and greater. For details, see the
[Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide/numbers).

## Text

- [Write in Markdown](#markdown).
- Splitting long lines (preferably up to 100 characters) can make it easier to
  provide feedback on small chunks of text.
- Insert an empty line for new paragraphs.
- Insert an empty line between different markups (for example, after every
  paragraph, header, list, and so on). Example:

  ```markdown
  ## Header

  Paragraph.

  - List item 1
  - List item 2
  ```

### Comments

To embed comments within Markdown, use standard HTML comments that are not
rendered when published. Example:

```html
<!-- This is a comment that is not rendered -->
```

### Emphasis

Use **bold** rather than italic to provide emphasis. Ory uses a sans-serif font
and italic text does not stand out as much as it would in a serif font. For
details, see
[Butterick's Practical Typography guide on bold or italic](https://practicaltypography.com/bold-or-italic.html).

You can use italics when you are introducing a term for the first time.
Otherwise, use bold.

- Use double asterisks (`**`) to mark a word or text in bold (`**bold**`).
- Use underscore (`_`) for text in italics (`_italic_`).
- Use greater than (`>`) for blockquotes.

### Text Punctuation

Follow these guidelines for punctuation:

| Rule                                                                                                                                                     | Example                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Avoid semicolons. Use two sentences instead.                                                                                                             | That's the way that the world goes 'round. You're up one day and the next you're down. |
| Always end full sentences with a period.                                                                                                                 | For a complete overview, read through this document.                                   |
| Always add a space after a period when beginning a new sentence.                                                                                         | For a complete overview, check this doc. For other references, check out this guide.   |
| Do not use double spaces. (Tested in [`SentenceSpacing.yml`](SentenceSpacing.yml).)                                                                      | ---                                                                                    |
| Do not use tabs for indentation. Use spaces instead. You can configure your code editor to output spaces instead of tabs when pressing the tab key.      | ---                                                                                    |
| Use serial commas (Oxford commas) before the final **and** or **or** in a list of three or more items. (Tested in [`OxfordComma.yml`](OxfordComma.yml).) | You can create new issues, merge requests, and milestones.                             |
| Always add a space before and after dashes when using it in a sentence (for replacing a comma, for example).                                             | You should try this - or not.                                                          |
| When a colon is part of a sentence, always use lowercase after the colon.                                                                                | Linked issues: a way to create a relationship between issues.                          |
| Do not use typographer's quotes. Use straight quotes instead. (Tested in [`NonStandardQuotes.yml`](NonStandardQuotes.yml).)                              | "It's the questions we can't answer that teach us the most"---Patrick Rothfuss         |

### Placeholder text

You might want to provide a command or configuration that uses specific values.

In these cases, use
[`<` and `>`](https://en.wikipedia.org/wiki/Usage_message#Pattern) to call out
where a reader must replace text with their own value.

For example:

```shell
cp <your_source_directory> <your_destination_directory>
```

### Keyboard commands

Use the HTML `<kbd>` tag when referring to keystroke presses. For example:

```plaintext
To stop the command, press <kbd>Control</kbd>+<kbd>C</kbd>.
```

When the docs are generated, the output is:

To stop the command, press <kbd>Control</kbd>+<kbd>C</kbd>.

### Text entered in the UI

If you want the user to type something in the UI, use backticks. For example:

```plaintext
In the **Commit message** box, type `This is my merge request`.
```

Backticks are more precise than quotes. For example, in this string:

- In the **Commit message** box, type "This is my merge request."

It's not clear whether the user should include the period in the string.

### Spaces between words

Use only standard spaces between words. The search engine for the documentation
website doesn't split words separated with
[non-breaking spaces](https://en.wikipedia.org/wiki/Non-breaking_space) when
indexing, and fails to create expected individual search terms. Tests that
search for certain words separated by regular spaces can't find words separated
by non-breaking spaces.

## Lists

- Always start list items with a capital letter, unless they're parameters or
  commands that are in backticks, or similar.
- Always leave a blank line before and after a list.
- Begin a line with spaces (not tabs) to denote a
  [nested sub-item](#nesting-inside-a-list-item).

### Ordered vs. unordered lists

Only use ordered lists when their items describe a sequence of steps to follow.

Do:

```markdown
These are the steps to do something:

1. First, do the first step.
1. Then, do the next step.
1. Finally, do the last step.
```

Don't:

```markdown
This is a list of available features:

1. Feature 1
1. Feature 2
1. Feature 3
```

### Markup

- Use dashes (`-`) for unordered lists instead of asterisks (`*`).
- Prefix `1.` to every item in an ordered list. When rendered, the list items
  display with sequential numbering.

### List Punctuation

- Don't add commas (`,`) or semicolons (`;`) to the ends of list items.
- Only add periods to the end of a list item if the item consists of a complete
  sentence (with a subject and a verb).
- Be consistent throughout the list: if the majority of the items do not end in
  a period, do not end any of the items in a period, even if they consist of a
  complete sentence. The opposite is also valid: if the majority of the items
  end with a period, end all with a period.
- Separate list items from explanatory text with a colon (`:`). For example:

  ```markdown
  The list is as follows:

  - First item: this explains the first item.
  - Second item: this explains the second item.
  ```

**Examples:**

Do:

- First list item
- Second list item
- Third list item

Don't:

- First list item
- Second list item
- Third list item.

Do:

- Let's say this is a complete sentence.
- Let's say this is also a complete sentence.
- Not a complete sentence.

Don't (vary use of periods; majority rules):

- Let's say this is a complete sentence.
- Let's say this is also a complete sentence.
- Not a complete sentence

### Nesting inside a list item

It's possible to nest items under a list item, so that they render with the same
indentation as the list item. This can be done with:

- [Code blocks](#code-blocks)
- [Blockquotes](#blockquotes)
- [Alert boxes](#alert-boxes)
- [Images](#images)

Items nested in lists should always align with the first character of the list
item. In unordered lists (using `-`), this means two spaces for each level of
indentation:

````markdown
- Unordered list item 1

  A line nested using 2 spaces to align with the `U` above.

- Unordered list item 2

  > A quote block that will nest inside list item 2.

- Unordered list item 3

  ```plaintext
  a code block that nests inside list item 3
  ```

- Unordered list item 4

  ![an image that will nest inside list item 4](image.png)
````

For ordered lists, use three spaces for each level of indentation:

````markdown
1. Ordered list item 1

   A line nested using 3 spaces to align with the `O` above.

1. Ordered list item 2

   > A quote block that will nest inside list item 2.

1. Ordered list item 3

   ```plaintext
   a code block that nests inside list item 3
   ```

1. Ordered list item 4

   ![an image that will nest inside list item 4](image.png)
````

You can nest full lists inside other lists using the same rules as above. If you
want to mix types, that's also possible, if you don't mix items at the same
level:

```markdown
1. Ordered list item one.
1. Ordered list item two.
   - Nested unordered list item one.
   - Nested unordered list item two.
1. Ordered list item three.

- Unordered list item one.
- Unordered list item two.
  1. Nested ordered list item one.
  1. Nested ordered list item two.
- Unordered list item three.
```

## Tables

Tables should be used to describe complex information in a straightforward
manner. Note that in many cases, an unordered list is sufficient to describe a
list of items with a single, simple description per item. But, if you have data
that's best described by a matrix, tables are the best choice.

### Creation guidelines

To keep tables accessible and scannable, tables should not have any empty cells.
If there is no otherwise meaningful value for a cell, consider entering **N/A**
for 'not applicable' or **None**.

To help tables be easier to maintain, consider adding additional spaces to the
column widths to make them consistent. For example:

```markdown
| App name | Description         | Requirements   |
| :------- | :------------------ | :------------- |
| App 1    | Description text 1. | Requirements 1 |
| App 2    | Description text 2. | None           |
```

Consider installing a plugin or extension in your editor for formatting tables:

- [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify)
  for Visual Studio Code
- [Markdown Table Formatter](https://packagecontrol.io/packages/Markdown%20Table%20Formatter)
  for Sublime Text
- [Markdown Table Formatter](https://atom.io/packages/markdown-table-formatter)
  for Atom

### Feature tables

When creating tables of lists of features use these phrases:

| Option | Markdown                 | Displayed result       |
| ------ | ------------------------ | ---------------------- |
| No     | `**{dotted-circle}** No` | **{dotted-circle}** No |
| Yes    | `**{check-circle}** Yes` | **{check-circle}** Yes |

### Footnotes

To indicate a footnote, use the HTML tag `<sup>` with a number. Put the tag at
the end of the sentence or term.

For the footnotes below the table, use a bold number followed by a sentence.

For example:

```markdown
| App name | Description                    |
| :------- | :----------------------------- |
| App A    | Description text. <sup>1</sup> |
| App B    | Description text. <sup>2</sup> |

1. This is the footnote.
1. This is the other footnote.
```

This text renders this output:

| App name | Description                    |
| :------- | :----------------------------- |
| App A    | Description text. <sup>1</sup> |
| App B    | Description text. <sup>2</sup> |

1. This is the footnote.
1. This is the other footnote.

## Quotes

Valid for Markdown content only, not for front matter entries:

- Standard quotes: double quotes (`"`). Example: "This is wrapped in double
  quotes".
- Quote inside a quote: double quotes (`"`) wrap single quotes (`'`). Example:
  "This sentence 'quotes' something in a quote".

For other punctuation rules, refer to the
[Pajamas Design System Punctuation section](https://design.Ory.com/content/punctuation/).
This is overridden by the
[documentation-specific punctuation rules](#punctuation).

## Headings

- Add only one H1 in each document, by adding `#` at the beginning of it (when
  using Markdown). The `h1` becomes the document `<title>`.
- Start with an `h2` (`##`), and respect the order `h2` > `h3` > `h4` > `h5` >
  `h6`. Never skip the hierarchy level, such as `h2` > `h4`
- Avoid putting numbers in headings. Numbers shift, hence documentation anchor
  links shift too, which eventually leads to dead links. If you think it is
  compelling to add numbers in headings, make sure to at least discuss it with
  someone in the Merge Request.
- Avoid using symbols and special characters in headers. Whenever possible, they
  should be plain and short text.
- When possible, avoid including words that might change in the future. Changing
  a heading changes its anchor URL, which affects other linked pages.
- When introducing a new document, be careful for the headings to be
  grammatically and syntactically correct. This is to ensure that no document
  with wrong heading is going live without an audit, thus preventing dead links
  and redirection issues when corrected.
- Use the context provided by parent section headings. That is, don't repeat the
  parent heading's text in each subsection's heading.
- Use articles and prepositions in headings where it would make sense in regular
  text.
- Leave exactly one blank line before and after a heading.
- Do not use links in headings.
- Search engines prioritize words used in headings and subheadings. Make your
  subheading titles clear, descriptive, and complete to help users find the
  right example, as shown in the section on [heading titles](#heading-titles).
- See [Capitalization](#capitalization) for guidelines on capitalizing headings.

### Heading titles

Keep heading titles clear and direct. Make every word count. To accommodate
search engine optimization (SEO), use the imperative, where possible.

| Do                                 | Don't                                                      |
| :--------------------------------- | :--------------------------------------------------------- |
| Configure CORS                     | Configuring CORS                                           |
| Ory Release and Maintenance Policy | This section covers the Ory Release and Maintenance Policy |
| Upgrade to older releases          | Upgrading to older releases                                |
| Ory Kratos examples                | Examples                                                   |

For guidelines on capitalizing headings, see the section on
[capitalization](#capitalization).

NOTE: If you change an existing title, be careful. In-page
[anchor links](#anchor-links), links in the Ory application, and links from
external sites can break.

### Anchor links

Headings generate anchor links when rendered. `## This is an example` generates
the anchor `#this-is-an-example`.

Important:

- Avoid crosslinking documentation to headings unless you need to link to a
  specific section of the document. This avoids breaking anchors in the future
  in case the heading is changed.
- If possible, avoid changing headings, because they're not only linked
  internally. There are various links to Ory documentation on the internet, such
  as tutorials, presentations, StackOverflow posts, and other sources.
- Do not link to `h1` headings.

## Links

Links are important in Ory documentation. Use links instead of summarizing to
help preserve a
[single source of truth](#documentation-is-the-single-source-of-truth) in Ory
documentation.

We include guidance for links in these categories:

- How to set up [anchor links](#anchor-links) for headings.
- How to set up [criteria](#basic-link-criteria) for configuring a link.
- How to set up
  [links to internal documentation](#links-to-internal-documentation) for
  cross-references.
- How to set up
  [links to external documentation](#links-to-external-documentation) for
  authoritative sources.
- When to use [links requiring permissions](#links-requiring-permissions).
- How to set up a [link to a video](#link-to-video).
- How to [include links with version text](#where-to-put-version-text).
- How to [link to specific lines of code](#link-to-specific-lines-of-code)

### Basic link criteria

- Use inline link Markdown markup `[Text](https://example.com)`. It's easier to
  read, review, and maintain. Do not use `[Text][identifier]` reference-style
  links.

- Use
  [meaningful anchor text](https://www.futurehosting.com/blog/links-should-have-meaningful-anchor-text-heres-why/).
  For example, instead of writing something like
  `Read more about merge requests [here](LINK)`, write
  `Read more about [merge requests](LINK)`.

### Links to internal documentation

NOTE: **Internal** refers to documentation in the same project. When linking to
documentation in separate projects (for example, linking to Omnibus
documentation from Ory documentation), you must use absolute URLs.

Do not use absolute URLs like `https://ory.sh/docs/index/` to cross-link to
other documentation in the same project. Use relative links to the file, like
`../index.md`. (These are converted to HTML when the site is rendered.)

Relative linking enables crosslinks to work:

- in Review Apps, local previews, and `/help`.
- when working on the documentation locally, so you can verify that they work as
  early as possible in the process.
- in the Ory user interface when browsing doc files in their respective
  repositories. For example, the links displayed at
  `https://github.com/ory/kratos/master/doc/README.md`.

To link to internal documentation:

- Use relative links to Markdown files in the same repository.
- Do not use absolute URLs or URLs from `ory.sh/docs`.
- Use `../` to navigate to higher-level directories.
- Don't prepend `./` to links to files or directories. To link to a file in the
  same directory or one of its sub-directories, use the syntax
  `path/to/file.md`.
- Don't link relative to root. For example, `/user/docs/index.md`.

  Don't:

  - `https://ory.sh/docs/kratos/identities/troubleshooting.html`
  - `/docs/kratos/identities/troubleshooting.md`
  - `./troubleshooting.md`

  Do: `../../kratos/identities/troubleshooting.md`

- Always add the filename `file.md` at the end of the link with the `.md`
  extension, not `.html`.

  Don't:

  - `../../merge_requests/`
  - `../../issues/tags.html`
  - `../../issues/tags.html#stages`

  Do:

  - `../../merge_requests/index.md`
  - `../../issues/tags.md`
  - `../../issues/tags.md#stages`
  - `issues/tags.md`

### Links to external documentation

When describing interactions with external software, it's often helpful to
include links to external documentation. When possible, make sure that you're
linking to an [**authoritative** source](#authoritative-sources). For example,
if you're describing a feature in Microsoft's Active Directory, include a link
to official Microsoft documentation.

### Authoritative sources

When citing external information, use sources that are written by the people who
created the item or product in question. These sources are the most likely to be
accurate and remain up to date.

Examples of authoritative sources include:

- Specifications, such as a
  [Request for Comments](https://www.ietf.org/standards/rfcs/) document from the
  Internet Engineering Task Force.
- Official documentation for a product. For example, if you're setting up an
  interface with the Google OAuth 2 authorization server, include a link to
  Google's documentation.
- Official documentation for a project. For example, if you're citing NodeJS
  functionality, refer directly to
  [NodeJS documentation](https://nodejs.org/en/docs/).
- Books from an authoritative publisher.

Examples of sources to avoid include:

- Personal blog posts.
- Wikipedia.
- Non-trustworthy articles.
- Discussions on forums such as Stack Overflow.
- Documentation from a company that describes another company's product.

While many of these sources to avoid can help you learn skills and or features,
they can become obsolete quickly. Nobody is obliged to maintain any of these
sites. Therefore, we should avoid using them as reference literature.

NOTE: Non-authoritative sources are acceptable only if there is no equivalent
authoritative source. Even then, focus on non-authoritative sources that are
extensively cited or peer-reviewed.

### Names for menus

> TODO

### Names for UI elements

> TODO

UI elements, like button and checkbox names, should be **bold**. Guidance for
each individual UI element is in
[the word list](https://github.com/ory/docs/blob/0533161365f1d8bdca23dcb7ae36a34ea631997a/docs/markdownlint.yml#L31).

### How to write navigation task steps

To be consistent, use these templates when you write navigation steps in a task
topic.

To enable email verification:

```markdown
1. In the left side menu, select **Customize > Email Verification**.
1. In the main screen, click the **Enable Email/Phone Verification** modal.
1. Click **Save** to save your changes.
```

To select your avatar:

```markdown
1. In the top right corner, select your avatar.
1. Click **Settings** to open your account settings.
1. Change your name and click **Save** to save your changes.
1. You might be ask to log in again to confirm your identity.
```

### Optional steps

If a step is optional, start the step with the word `Optional` followed by a
period.

For example:

```markdown
1. Optional. Enter a description for the job.
```

## Images

Images, including screenshots, can help a reader better understand a concept.
However, they should be used sparingly because:

- They tend to become out-of-date.
- They are difficult and expensive to localize.
- They cannot be read by screen readers.

When needed, use images to help the reader understand:

- Where they are in a complicated process.
- How they should interact with the application.

### Capture the image

When you take screenshots:

- **Ensure it provides value.** Don't use `lorem ipsum` text. Try to replicate
  how the feature would be used in a real-world scenario, and
  [use realistic text](#fake-user-information).
- **Capture only the relevant UI.** Don't include unnecessary white space or
  areas of the UI that don't help illustrate the point. The sidebars in Ory can
  change, so don't include them in screenshots unless absolutely necessary.
- **Keep it small.** If you don't need to show the full width of the screen,
  don't. Reduce the size of your browser window as much as possible to keep
  elements close together and reduce empty space. Try to keep the screenshot
  dimensions as small as possible.
- **Review how the image renders on the page.** Preview the image locally or use
  the review app in the merge request. Make sure the image isn't blurry or
  overwhelming.
- **Be consistent.** Coordinate screenshots with the other screenshots already
  on a documentation page for a consistent reading experience. Ensure your
  navigation theme is **Indigo** and the syntax highlighting theme is **Light**.
  These are the default preferences.

### Add callouts

If you need to emphasize an area in a screenshot, use an arrow.

- For color, use `#EE2604`. If you use the Preview application on macOS, this is
  the default red.
- For the line width, use 3 pt. If you use the Preview application on macOS,
  this is the third line in the list.
- Use the arrow style shown in the following image.
- If you have multiple arrows, make them parallel when possible.

### Save the image

- Resize any wide or tall screenshots if needed, but make sure the screenshot is
  still clear after being resized and compressed.
- All images **must** be [compressed](#compress-images) to 100KB or less. In
  many cases, 25-50KB or less is often possible without reducing image quality.
- Save the image with a lowercase filename that's descriptive of the feature or
  concept in the image:
  - If the image is of the Ory interface, append the Ory version to the
    filename, based on this format: `image_name_vX_Y.png`. For example, for a
    screenshot taken from the pipelines page of Ory 11.1, a valid name is
    `pipelines_v11_1.png`.
  - If you're adding an illustration that doesn't include parts of the user
    interface, add the release number corresponding to the release the image was
    added to. For an MR added to 11.1's milestone, a valid name for an
    illustration is `devops_diagram_v11_1.png`.
- Place images in a directory named `img/` >TODO.
- Consider using PNG images instead of JPEG.
- Compress GIFs with <https://ezgif.com/optimize> or similar tool.
- Images should be used (only when necessary) to illustrate the description of a
  process, not to replace it.
- See also how to link and embed [videos](#videos) to illustrate the
  documentation.

### Add the image link to content

The Markdown code for including an image in a document is:
`![Image description which will be the alt tag](img/document_image_title_vX_Y.png)`

The image description is the alt text for the rendered image on the
documentation site. For accessibility and SEO, use
[descriptions](https://webaim.org/techniques/alttext/) that:

- Are accurate, succinct, and unique.
- Don't use **image of** or **graphic of** to describe the image.

### Compress images

You should always compress any new images you add to the documentation. One
known tool is [`pngquant`](https://pngquant.org/), which is cross-platform and
open source. Install it by visiting the official website and following the
instructions for your OS.

If you use macOS and want all screenshots to be compressed automatically, read
[One simple trick to make your screenshots 80% smaller](https://about.Ory.com/blog/2020/01/30/simple-trick-for-smaller-screenshots/).

## Videos

Adding Ory video tutorials to the documentation is highly encouraged, unless the
video is outdated. Videos should not replace documentation, but complement or
illustrate it. If content in a video is fundamental to a feature and its key use
cases, but isn't adequately covered in the documentation, you should:

- Add this detail to the documentation text.
- Create an issue to review the video and update the page.

Do not upload videos to the product repositories. [Link](#link-to-video) or
[embed](#embed-videos) them instead.

### Convert Videos

When you
[record your screen using Quicktime](https://support.apple.com/en-gb/guide/quicktime-player/qtp97b08e666/mac),
a `.mov` file is recorded. When recording a video, please follow these rules:

1. Please use 16:9 format with at least 1024 pixels wide. `ffmpeg` will scale it
   to the right size.
2. Please make sure that no history or auto-suggestions are visible.

Once recoded, use the commands below to convert them to `mp4` and `webm`:

```shellsession
file="screencast.mov"

ffmpeg -i $file -an -c:v libvpx-vp9 -vf scale=1024:-1 -crf 30 -b:v 0 "${file%.*}".webm
ffmpeg -i $file -vcodec h264 -vf scale=1024:-1 -an "${file%.*}".mp4
```

Next copy them next to the markdown file you are editing. Then use the following
code to display the video:

```md
import mp4 from './screencast.mp4' import webm from './screencast.webm' import
VideoEmbed from '@site/src/components/VideoEmbed'

<VideoEmbed mp4={mp4} webm={webm} />
```

### Link to video

To link out to a video, include a YouTube icon so that readers can scan the page
for videos before reading:

```markdown
<i class="fa fa-youtube-play youtube" aria-hidden="true"></i> For an overview,
see [Video Title](link-to-video).
```

You can link any up-to-date video that's useful to the Ory user.

### Embed videos

The [Ory documentation](https://ory.sh/docs) supports embedded videos.

You can embed videos from
[the official YouTube account for Ory](https://www.youtube.com/channel/UC9hCxZZeviexX0GclD0brrw)
only. For videos from other sources, [link](#link-to-video) them instead.

In most cases, [link to a video](#link-to-video), because embedded videos take
up a lot of space on the page and can be distracting to readers.

To embed a video:

1. Copy the code from this procedure and paste it into your Markdown file. Leave
   a blank line above and below it. Do not edit the code (don't remove or add
   any spaces).
1. In YouTube, visit the video URL you want to display. Copy the regular URL
   from your browser (`https://www.youtube.com/watch?v=VIDEO-ID`).
1. Paste it where it should appear in the document.

## Code blocks

- Always wrap code added to a sentence in inline code blocks (`` ` ``). For
  example, `kratos.yml`, `git add .`, `CODEOWNERS`, or `only: [main]`. File
  names, commands, entries, and anything that refers to code should be added to
  code blocks. To make things easier for the user, always add a full code block
  for things that can be useful to copy and paste, as they can do it with the
  button on code blocks.
- HTTP methods (`HTTP POST`) and HTTP status codes, both full
  (`404 File Not Found`) and abbreviated (`404`), should be wrapped in inline
  code blocks when used in sentences. For example: Send a `DELETE` request to
  delete the runner. Send a `POST` request to create one.
- Add a blank line above and below code blocks.
- When providing a shell command and its output, prefix the shell command with
  `$` and leave a blank line between the command and the output.
- When providing a command without output, don't prefix the shell command with
  `$`.
- If you need to include triple backticks inside a code block, use four
  backticks for the code block fences instead of three.
- For regular fenced code blocks, always use a highlighting class corresponding
  to the language for better readability. Examples:

  ````markdown
  ```go
  Go code
  ```

  ```javascript
  JavaScript code
  ```

  ```markdown
  [Markdown code example](example.md)
  ```

  ```plaintext
  Code or text for which no specific highlighting class is available.
  ```
  ````

### Import example code from this repository

Use the same example code in several places:

````bash
```mdx-code-block
import exampleJs from '!!raw-loader!./code-example.jsx'
import exampleGo from '!!raw-loader!./code-example.go'

<CodeBlock className="language-jsx">{exampleJs}</CodeBlock>
<CodeBlock className="language-go">{exampleGo}</CodeBlock>
```
````

### Write a shell example

Use `shellsession`:

````bash
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

Syntax highlighting is required for fenced code blocks added to the Ory
documentation.

> TODO

| Preferred language tags | Language aliases and notes                                                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asciidoc`              |                                                                                                                                                                 |
| `dockerfile`            | Alias: `docker`.                                                                                                                                                |
| `elixir`                |                                                                                                                                                                 |
| `golang`                | Alias: `go`.                                                                                                                                                    |
| `graphql`               |                                                                                                                                                                 |
| `html`                  |                                                                                                                                                                 |
| `ini`                   | For some simple configuration files that are not in TOML format.                                                                                                |
| `javascript`            | Alias `js`.                                                                                                                                                     |
| `json`                  |                                                                                                                                                                 |
| `markdown`              | Alias: `md`.                                                                                                                                                    |
| `mermaid`               |                                                                                                                                                                 |
| `nginx`                 |                                                                                                                                                                 |
| `perl`                  |                                                                                                                                                                 |
| `php`                   |                                                                                                                                                                 |
| `plaintext`             | Examples with no defined language, such as output from shell commands or API calls. If a code block has no language, it defaults to `plaintext`. Alias: `text`. |
| `prometheus`            | Prometheus configuration examples.                                                                                                                              |
| `python`                |                                                                                                                                                                 |
| `ruby`                  | Alias: `rb`.                                                                                                                                                    |
| `shell`                 | Aliases: `bash` or `sh`.                                                                                                                                        |
| `sql`                   |                                                                                                                                                                 |
| `toml`                  | Runner configuration examples, and other TOML-formatted configuration files.                                                                                    |
| `typescript`            | Alias: `ts`.                                                                                                                                                    |
| `xml`                   |                                                                                                                                                                 |
| `yaml`                  | Alias: `yml`.                                                                                                                                                   |

For a complete reference on code blocks, see the
[Kramdown guide](https://about.Ory.com/handbook/markdown-guide/#code-blocks).

## Icons

> TODO

## Alert boxes

Use alert boxes to call attention to information. Use them sparingly, and never
have an alert box immediately follow another alert box.

Alert boxes are generated when one of these words is followed by a line break:

- `FLAG:`
- `NOTE:`
- `WARNING:`
- `INFO:` (Marketing only)
- `DISCLAIMER:`

For example:

```markdown
NOTE: This is something to note.
```

To display an alert box for multiple paragraphs, lists, or headers, use
[blockquotes](#blockquotes) instead.

Alert boxes render only on the Ory documentation (<https://ory.sh/docs>). In the
Ory product help, alert boxes appear as plain text.

### Note

Use notes sparingly. Too many notes can make topics difficult to scan.

Instead of adding a note:

- Re-write the sentence as part of a paragraph.
- Put the information into its own paragraph.
- Put the content under a new subheading.

If you must use a note, use this format:

```markdown
:::note

This is something to note.

:::
```

It renders on the Ory documentation as:

:::note

This is something to note.

:::

### Warning

Use a warning to indicate deprecated features, or to provide a warning about
procedures that have the potential for data loss.

```markdown
:::warning

This is something to be warned about.

:::
```

It renders on the Ory documentation as:

:::warning

This is something to be warned about.

:::

### Info

```markdown
:::info

This is something to be informed about.

:::
```

It renders on the Ory documentation as:

:::info

This is something to be informed about.

:::

## Blockquotes

For highlighting a text inside a blockquote, use this format:

```markdown
> This is a blockquote.
```

It renders on the Ory documentation as:

> This is a blockquote.

If the text spans multiple lines, you can split them.

For multiple paragraphs, use the symbol `>` before every line:

```markdown
> This is the first paragraph.
>
> This is the second paragraph.
>
> - This is a list item
> - Second item in the list
```

It renders on the Ory documentation as:

> This is the first paragraph.
>
> This is the second paragraph.
>
> - This is a list item
> - Second item in the list

## Terms

To maintain consistency through Ory documentation, use these styles and terms.

### Describe UI elements

Follow these styles when you're describing user interface elements in an
application:

- For elements with a visible label, use that label in bold with matching case.
  For example, `Select **Cancel**`.
- For elements with a tooltip or hover label, use that label in bold with
  matching case. For example, `Select **Add status emoji**`.

## Products and features

Refer to the information in this section when describing products and features
in the Ory product documentation.

### Avoid line breaks in names

If a feature or product name contains spaces, don't split the name with a line
break. When names change, it is more complicated to search or grep text that has
line breaks.

## Versions

> TODO

Ory product documentation page can include version information to help users be
aware of recent improvements or additions.?

### View older Ory documentation versions

> TODO

```
## Feature name

> [Introduced](<link-to-issue>) in Ory Kratos 0.9.3.

This feature does something.

## Feature name 2

> - [Introduced](<link-to-issue>) in Ory Kratos 0.7.3.
> - [Enabled by default](<link-to-issue>) in Ory Kratos 0.8.0.

This feature does something else.
```

If you're documenting elements of a feature, start with the feature name or a
gerund:

```markdown
> - Notifications for expiring tokens [introduced](link-to-issue) in Ory 11.3.
> - Creating an issue from an issue board [introduced](link-to-issue) in Ory
>   13.1.
```

If a feature is moved to another tier:

```markdown
> - [Moved](link-to-issue) from Ory Developer to Ory Start Up in 11.4.
> - [Moved](link-to-issue) from Ory Growth to Ory Devevloper in 12.2.
```

#### End-of-life for features or products

When a feature or product enters its end-of-life, indicate its status by
creating a [warning alert](#alert-boxes) directly after its relevant header. If
possible, link to its deprecation and removal issues.

For example:

```markdown
WARNING: This feature is in its end-of-life process. It is
[deprecated](link-to-issue) for use in Ory Kratos X.X, and is planned for
[removal](link-to-issue) in Ory Kratos X.X.
```

After the feature or product is officially deprecated and removed, remove its
information from the Ory documentation.

### Versions in the past or future

When describing functionality available in past or future versions, use:

- Earlier, and not older or before.
- Later, and not newer or after.

For example:

- Available in Ory 13.1 and earlier.
- Available in Ory 12.4 and later.
- In Ory 12.2 and earlier, ...
- In Ory 11.6 and later, ...

### Promising features in future versions

Do not promise to deliver features in a future release. For example, avoid
phrases like, "Support for this feature is planned."

We cannot guarantee future feature work, and promises like these can raise legal
issues. Instead, say that an issue exists. For example:

- Support for improvements is tracked `[in this issue](LINK)`.
- You cannot do this thing, but `[an issue exists](LINK)` to change this
  behavior.

You can say that we plan to remove a feature.

#### Legal disclaimer for future features

If you **must** write about features we have not yet delivered, put this exact
disclaimer near the content it applies to.

```markdown
DISCLAIMER: This page contains information related to upcoming products,
features, and functionality. It is important to note that the information
presented is for informational purposes only. Please do not rely on this
information for purchasing or planning purposes. As with all projects, the items
mentioned on this page are subject to change or delay. The development, release,
and timing of any products, features, or functionality remain at the sole
discretion of Ory Inc.
```

It renders on the Ory documentation as:

DISCLAIMER: This page contains information related to upcoming products,
features, and functionality. It is important to note that the information
presented is for informational purposes only. Please do not rely on this
information for purchasing or planning purposes. As with all projects, the items
mentioned on this page are subject to change or delay. The development, release,
and timing of any products, features, or functionality remain at the sole
discretion of Ory Inc.

If all of the content on the page is not available, use the disclaimer once at
the top of the page.

If the content in a topic is not ready, use the disclaimer in the topic.

### Deprecated features

> TODO

When a feature is deprecated, add `(DEPRECATED)` to the page title or to the
heading of the section documenting the feature, immediately before the tier
badge.

:::info

This document is based on the
[Gitlab Documentation Style Guide](https://docs.gitlab.com/ee/development/documentation/styleguide/)
and licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

:::