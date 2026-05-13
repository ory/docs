---
id: ory-parse-relationships
title: ory parse relationships
description: ory parse relationships
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory parse relationships

Parse human readable relationships

### Synopsis

Parse human readable relationships as used in the documentation.
Supports various output formats. Especially useful for piping into other commands by using `--format json`.
Ignores comments (lines starting with `//`) and blank lines.

From file or folder:
```
keto relation-tuple parse -f tuples1.txt -f tuples2.txt
keto relation-tuple parse -f tuples-dir
```

Use '-' as filename to read from STD_IN:
```
keto relation-tuple parse -f -
```

```
ory parse relationships [flags]
```

### Options

```
  -f, --file strings       Read relationships from JSON files or directories (use the special filename - for stdin)
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help               help for relationships
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### See also

* [ory parse](ory-parse) Parse Ory Network resources

