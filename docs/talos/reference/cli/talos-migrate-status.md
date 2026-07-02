---
id: talos-migrate-status
title: talos migrate status
description: talos migrate status
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos migrate status

Show migration status

### Synopsis

Display the current database migration status.

Shows:

- Current migration version
- Whether the database is in a dirty state

```
talos migrate status [flags]
```

### Examples

```
  # Status against a SQLite file
  talos migrate status --database "sqlite3://./data/talos.db"

  # Status against the DSN configured in your config file
  talos migrate status --config /etc/talos/config.yaml
```

### Options

```
      --database string   database DSN (overrides DB_DSN)
  -h, --help              help for status
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos migrate](talos-migrate.md) Database migration tools
