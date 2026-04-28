---
title: CockroachDB
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# CockroachDB

CockroachDB provides distributed SQL with automatic sharding and multi-region replication.

## Supported versions

CockroachDB 23.1 and later.

## Configuration

```yaml
db:
  dsn: "cockroach://talos@crdb:26257/talos?sslmode=verify-full&max_conns=50"
```

Or via environment variable:

```bash
export TALOS_DB_DSN="cockroach://talos@crdb:26257/talos?sslmode=verify-full&max_conns=50"
```

## DSN format

```
cockroach://user:password@host:port/dbname?param=value&param=value
```

Both `cockroach://` and `cockroachdb://` schemes are accepted. Internally, the scheme is converted to `postgres://` since
CockroachDB uses the PostgreSQL wire protocol.

## DSN parameters, connection pooling, and TLS

CockroachDB uses the PostgreSQL `pgx` driver and shares the same pooling infrastructure, including both standard and advanced pool
modes. For the full parameter reference, see the [PostgreSQL DSN parameters](postgresql.md#dsn-parameters),
[connection pooling](postgresql.md#connection-pooling), and [TLS / SSL](postgresql.md#tls--ssl) documentation.

Key differences from PostgreSQL:

- **Higher pool sizes** — CockroachDB connections are lighter. Start with `max_conns=50` instead of `25`.
- **Per-node connection limits still apply** — each CockroachDB node enforces its own
  `sql.defaults.idle_in_transaction_session_timeout` and accepts a finite number of connections. Aim for the sum of every Talos
  pool that targets a node to stay below that node's limit. You rarely need PgBouncer in front of CockroachDB, but the limit is
  per-node, not global.
- **Schema-change blast radius** — CockroachDB applies online schema changes asynchronously. Always run `talos migrate up` from a
  single instance, then wait for the schema-change job to finish (`SHOW JOBS WHEN status = 'running'`) before starting a rolling
  deploy of the new application version.
- **Rollback path** — `talos migrate down` is supported but irreversible if the previous version has already written data using
  the new schema. For destructive migrations, take a backup (`BACKUP INTO …`) before applying.

## Migrations

```bash
talos-commercial migrate up --database "cockroach://talos@crdb:26257/talos"
```

## Multi-region

Deploy Talos data plane nodes in each region alongside CockroachDB nodes to minimize verification latency. Talos does not require
special configuration beyond pointing `db.dsn` at the local CockroachDB node.

```yaml
# Region: us-east-1
db:
  dsn: "cockroach://talos@crdb-us-east:26257/talos?sslmode=verify-full&max_conns=50"

# Region: eu-west-1
db:
  dsn: "cockroach://talos@crdb-eu-west:26257/talos?sslmode=verify-full&max_conns=50"
```

## Performance

CockroachDB has higher write latency than PostgreSQL due to distributed consensus (Raft). For verification-heavy workloads:

- Enable [caching](../cache/index.md) to absorb verification reads
- Use `max_conns=50` or higher — CockroachDB connections are lighter than PostgreSQL
- Place Talos data plane nodes in the same region as CockroachDB nodes

## Example DSNs

**Development (CockroachDB Serverless):**

```
cockroach://talos:secret@free-tier.cockroachlabs.cloud:26257/talos?sslmode=require
```

**Production with standard pooling:**

```
cockroach://talos@crdb:26257/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&max_conns=50&max_idle_conns=10&max_conn_lifetime=5m&max_conn_idle_time=1m
```

**Production with advanced pooling (multi-region):**

```
cockroach://talos@crdb-local:26257/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&pool_mode=advanced
```
