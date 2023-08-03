---
id: hydra-migrate-status
title: hydra migrate status
description: hydra migrate status Get the current migration status
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra migrate status

Get the current migration status

```
hydra migrate status [flags]
```

### Options

```
      --block           Block until all migrations have been applied
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help            help for status
  -q, --quiet           Be quiet with output printing.
  -e, --read-from-env   If set, reads the database connection string from the environment variable DSN or config file key dsn.
```

### Options inherited from parent commands

```
  -c, --config strings   Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
```

### SEE ALSO

* [hydra migrate](hydra-migrate)	 - Various migration helpers

