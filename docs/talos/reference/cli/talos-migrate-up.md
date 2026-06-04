---
id: talos-migrate-up
title: talos migrate up
description: talos migrate up
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos migrate up

Run all pending migrations

### Synopsis

Apply all pending migrations to the database.

The database connection string is resolved in this order (first match wins):

1. --database flag
2. DB_DSN environment variable
3. DSN environment variable
4. --config file's "db.dsn" key

The DSN scheme selects the driver. SQLite accepts both sqlite:// and sqlite3:// prefixes;
postgres:// and postgresql:// are aliases (same for cockroach:// and cockroachdb://).

```
talos migrate up [flags]
```

### Examples

```
  # SQLite
  talos migrate up --database "sqlite3://./data/talos.db"

  # PostgreSQL (commercial)
  export DB_DSN="postgres://user:pass@localhost:5432/talos?sslmode=disable"
  talos migrate up

  # MySQL (commercial)
  talos migrate up --database "mysql://user:pass@tcp(localhost:3306)/talos"

  # CockroachDB (commercial)
  talos migrate up --database "cockroach://user:pass@localhost:5432/talos?sslmode=disable"
```

### Options

```
      --database string   database DSN (overrides DB_DSN)
  -h, --help              help for up
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos migrate](talos-migrate.md) Database migration tools
