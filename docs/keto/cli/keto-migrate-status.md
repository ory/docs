---
id: keto-migrate-status
title: keto migrate status
description: keto migrate status
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto migrate status

Get the current migration status

### Synopsis

Get the current migration status.
This does not affect namespaces. Use `keto namespace migrate status` for migrating namespaces.

```
keto migrate status [flags]
```

### Options

```
      --block           Block until all migrations have been applied
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help            help for status
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto migrate](keto-migrate) Commands to migrate the database

