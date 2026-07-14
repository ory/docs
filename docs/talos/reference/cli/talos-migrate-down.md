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

WARNING: down migrations may DROP COLUMNS or TABLES and discard data permanently. There is no dry-run mode; the rollback runs
immediately. Be extremely careful in production: during a rolling deploy, an in-flight pod still on the newer version may keep
writing to columns the down migration has just removed, leading to write errors and inconsistent state. Always take a backup,
drain traffic to the previous version, and prefer rolling forward with a corrective migration over rolling back.

See: docs/operate/database/migrations.md

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
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos migrate](talos-migrate.md) Database migration tools
