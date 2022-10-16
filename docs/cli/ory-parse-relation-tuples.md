---
id: ory-parse-relation-tuples
title: ory parse relation-tuples
description: ory parse relation-tuples Parse human readable relation tuples
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory parse relation-tuples

Parse human readable relation tuples

### Synopsis

Parse human readable relation tuples as used in the documentation.
Supports various output formats. Especially useful for piping into other commands by using `--format json`.
Ignores comments (starting with `//`) and blank lines.

```
ory parse relation-tuples [flags]
```

### Options

```
  -h, --help             help for relation-tuples
      --project string   The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory parse](ory-parse)	 - Parse Ory Cloud resources

