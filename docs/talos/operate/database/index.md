---
title: Database
---

Talos stores API key data in a relational database. The `db.dsn` scheme selects the backend driver.

## Supported backends

| Backend                       | Edition    | DSN scheme     | Use case                             |
| ----------------------------- | ---------- | -------------- | ------------------------------------ |
| [SQLite](sqlite.md)           | OSS        | `sqlite://`    | Development, single-node             |
| [PostgreSQL](postgresql.md)   | Commercial | `postgres://`  | Recommended production               |
| [MySQL](mysql.md)             | Commercial | `mysql://`     | Production with MySQL infrastructure |
| [CockroachDB](cockroachdb.md) | Commercial | `cockroach://` | Multi-region, distributed            |

The commercial edition also offers SQLite with multi-tenant isolation and concurrent reads during
writes. See [SQLite](sqlite.md) for details.

## Configuration

```yaml
db:
  dsn: "sqlite:///var/lib/talos/data.db"
```

The `db.dsn` setting requires a server restart to take effect.

## Migrations

Run `talos migrate up` before first use and after each upgrade. See [Migrations](migrations.md).
