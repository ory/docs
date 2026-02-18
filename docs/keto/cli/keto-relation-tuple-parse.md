---
id: keto-relation-tuple-parse
title: keto relation-tuple parse
description: keto relation-tuple parse
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto relation-tuple parse

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
keto relation-tuple parse [flags]
```

### Options

```
  -f, --file strings    Read relationships from JSON files or directories (use the special filename - for stdin)
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help            help for parse
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto relation-tuple](keto-relation-tuple) Read and manipulate relationships

