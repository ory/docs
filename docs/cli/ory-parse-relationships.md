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
      --format string    Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help             help for relationships
      --project string   The project to use, either project ID or a (partial) slug.
  -q, --quiet            Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory parse](ory-parse)	 - Parse Ory Network resources

