---
id: testing
title: Ory Documentation Testing
sidebar_label: Documentation Testing
---

## prettier

`npm run format`

## markdownlint

> TODO https://github.com/DavidAnson/markdownlint

## Vale

### How to use Vale

> TODO

[Link to Github Repository](https://github.com/errata-ai/vale)

You can install Vale locally and run it in your IDE, browser, text editor or via
the CLI. I prefer running it through the CLI, as I just want to do a check once
or twice before submitting my text. A continuous spell and style check is also
possible. Vale contains two main components - or rather three:

- the `vale.ini` Your main configuration file
- Styles The styles for your text - for example "Avoid future tense, use present
  instead" or "Avoid sentences longer than X words"
- Vocab This contains words you want to exclude from the spellcheck, for example
  product names or people names that come up a lot.

Check the [documentation](https://docs.errata.ai/) for more advanced features.
In the following I will give a short step-by-step guide that will be enough for
basic usage.

[Gitlab Vale Documentation](https://docs.gitlab.com/ee/development/documentation/testing.html#vale)

1. [Installation](https://docs.errata.ai/vale/install) on MacOs:
   `brew install vale`
1. Check if Vale installed correctly: `vale -h` 1 Add a `.vale.ini` to your
   root, you can also add it to a folder/project if it requires custom styles.

```ini
StylesPath = vale/styles

Vocab = Blog

[*.md]
BasedOnStyles = Vale, write-good
```

Create a folder for your styles `mkdir -p vale/styles`

In this folder we're going to put our styles, I started with the boilerplate
styles: https://github.com/errata-ai/vale-boilerplate/tree/master/styles Then I
added the gitlab docs styles
https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/.vale/gitlab

```diff
- BasedOnStyles = Vale, write-good
+ BasedOnStyles = Vale, write-good, gitlab
```

We're going to change the Vocab to our custom vocabulary `Ory`

```diff
- Vocab = Blog
+ Vocab = Ory
```

Inside the Vocab should be a `acccept.txt` and `reject.txt`; if not create them.

add the following to `acccept.txt`:

```
Ory
Kratos
Keto
Hydra
Oathkeeper
```

Now these unique names will be ignored by the spellcheck. One item per line.

Finally add an alias for .mdx files, so they get treated like .md files.

```diff
+ [formats]
+ mdx = md
```

Now you can run Vale like so:

`vale yourdocument.md` or `vale vale src/markdown/blog/some-blogpost.mdx`

You can also embedd Vale in your IDE, text editor or other tools, see the
documentation for more information https://docs.errata.ai/
