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

```
keto relation-tuple parse [flags]
```

### Options

```
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help            help for parse
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto relation-tuple](keto-relation-tuple) Read and manipulate relationships

