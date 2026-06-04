---
title: SQLite
---

SQLite is the default database for the OSS edition. It needs no external dependencies.

## Editions

Talos ships two SQLite drivers with different runtime behavior:

- **OSS** — single-tenant. The driver pins the connection pool to a single connection and sets only
  `foreign_keys=ON` (no WAL, no `busy_timeout`). One connection serializes every query. Use it for
  development, prototypes, and low-traffic single-node deployments.
- **Commercial** — multi-tenant, with data isolated per tenant network. The driver enables WAL
  (`journal_mode=WAL`, `synchronous=NORMAL`, `busy_timeout=10s`) so reads run concurrently with a
  writer, and uses a pool of 10 connections. Every transaction starts with `BEGIN IMMEDIATE`
  (`_txlock=immediate`), which takes the write lock up front to avoid deadlocks between concurrent
  transactions. Reads gain concurrency, but SQLite's single-writer lock still serializes writes.

Both editions accept either the `sqlite://` or `sqlite3://` DSN scheme and share the same OSS
migrations (commercial SQLite has no separate migration set).

## Configuration

The path after `sqlite://` is a raw filesystem path. The example below uses
`/var/lib/talos/data.db`, but any writable location works.

```yaml
db:
  dsn: "sqlite:///var/lib/talos/data.db"
```

## Migrations

```shell
talos migrate up --database "sqlite:///var/lib/talos/data.db"
```

## Limitations

These limits describe the OSS edition. The commercial driver adds concurrent reads through WAL but
keeps SQLite's single-writer lock and stays single-node.

- Single-node only. No multi-instance deployments.
- The OSS driver processes queries sequentially through one connection, with no parallel reads or
  writes.
- Disk I/O limits write throughput.
- Not suitable for [split admin and self-service deployments](../deploy/deployment-modes.md) unless
  the surfaces share the same node and database file.

For multi-tenant workloads or sustained concurrent traffic, use the commercial edition.
