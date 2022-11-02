---
id: ory-parse-relationships
title: ory parse relationships
description: ory parse relationships Parse human readable relation tuples
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory parse relationships

Parse human readable relation tuples

### Synopsis

Parse human readable relation tuples as used in the documentation.
Supports various output formats. Especially useful for piping into other commands by using `--format json`.
Ignores comments (starting with `//`) and blank lines.

```
ory parse relationships [flags]
```

### Options

```
  -h, --help             help for relationships
      --project string   The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory parse](ory-parse)	 - Parse Ory Network resources

