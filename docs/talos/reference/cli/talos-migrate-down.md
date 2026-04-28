---
id: talos-migrate-down
title: talos migrate down
description: talos migrate down
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos migrate down

Rollback migrations

### Synopsis

Roll back the last N migrations (default: 1).

This is useful for reverting recent migrations in development.
In production, use this carefully and ensure you have backups.

```
talos migrate down [flags]
```

### Examples

```
  # Roll back last migration
  talos migrate down

  # Roll back last 3 migrations
  talos migrate down --steps 3
```

### Options

```
      --database string   database DSN (overrides DB_DSN)
  -h, --help              help for down
      --steps int         number of migrations to roll back (default 1)
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos migrate](talos-migrate.md) Database migration tools

