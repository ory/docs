---
id: talos-migrate-force
title: talos migrate force
description: talos migrate force
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos migrate force

Force set migration version (use with caution)

### Synopsis

Force the migration version to a specific value.

This is useful when:
  - A migration failed and left the database in a dirty state
  - You need to manually fix the database state
  - You want to mark a migration as applied without running it

WARNING: This command should be used carefully as it can lead to
inconsistent database state if used incorrectly.

```
talos migrate force VERSION [flags]
```

### Examples

```
  # Mark database as clean at version 5
  talos migrate force 5
```

### Options

```
      --database string   database DSN (overrides DB_DSN)
  -h, --help              help for force
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos migrate](talos-migrate.md) Database migration tools

