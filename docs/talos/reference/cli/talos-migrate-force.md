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

WARNING: use with extreme caution. Never run 'migrate force' against a production database without first taking a verified backup.
This command rewrites the schema_migrations table without inspecting the schema; if the chosen version does not match the actual
on-disk DDL, subsequent 'migrate up' / 'migrate down' invocations will produce inconsistent state that is hard to recover from.

```
talos migrate force VERSION [flags]
```

### Examples

```
  # 1. Inspect the current state
  talos migrate status

  # 2. Confirm the database is dirty at version N (output from status above)
  #    and that you have a verified backup.

  # 3. Mark the dirty version as resolved at version N
  talos migrate force N
```

### Options

```
      --database string   database DSN (overrides DB_DSN)
  -h, --help              help for force
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos migrate](talos-migrate.md) Database migration tools
