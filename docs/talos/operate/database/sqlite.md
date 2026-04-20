---
title: SQLite
---

# SQLite

SQLite is the default database for the OSS edition. It requires no external dependencies.

## Configuration

```yaml
db:
  dsn: "sqlite:///var/lib/talos/data.db"
```

Talos enables WAL mode automatically for better concurrency.

## Migrations

```bash
talos migrate up --database "sqlite:///var/lib/talos/data.db"
```

## Limitations

- Single-node only (no multi-instance deployments)
- No connection pooling (single-writer lock)
- Write throughput limited by disk I/O
- Not suitable for [separate admin/data planes](../deploy/separate-planes.md) unless co-located
