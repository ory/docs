---
title: CockroachDB
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

CockroachDB provides distributed SQL with automatic sharding and multi-region replication.

## Supported versions

Ory Talos connects to CockroachDB through the PostgreSQL wire protocol using the `pgx` driver, so
any CockroachDB release that speaks a recent PostgreSQL wire protocol works. Use a version that
Cockroach Labs still supports in production. Talos doesn't test older releases.

## Configuration

```yaml
db:
  dsn: "cockroach://talos@crdb:26257/talos?sslmode=verify-full&max_conns=50"
```

Or use an environment variable:

```shell
export TALOS_DB_DSN="cockroach://talos@crdb:26257/talos?sslmode=verify-full&max_conns=50"
```

## DSN format

```text
cockroach://user:password@host:port/dbname?param=value&param=value
```

Talos accepts both `cockroach://` and `cockroachdb://` schemes. Internally, Talos converts the
scheme to `postgres://` because CockroachDB uses the PostgreSQL wire protocol.

## DSN parameters, connection pooling, and TLS

CockroachDB uses the PostgreSQL `pgx` driver and the same pooling infrastructure, including the
standard and advanced pool modes. For the full parameter reference, see
[PostgreSQL DSN parameters](postgresql.md#dsn-parameters),
[connection pooling](postgresql.md#connection-pooling), and [TLS / SSL](postgresql.md#tls--ssl).

Differences from PostgreSQL:

- **Pool sizing** — the default `max_conns` is `25`, the same as PostgreSQL. Raise it only after
  measuring pool saturation. Each CockroachDB node has its own connection ceiling, so size the sum
  of all pools that target a node, not one pool in isolation.
- **Per-node connection limits** — each CockroachDB node accepts a finite number of SQL connections,
  set by the `server.max_connections_per_gateway` cluster setting. Keep the sum of every Talos pool
  that targets a node below that node's limit. The limit is per node, not global, so PgBouncer is
  rarely needed in front of CockroachDB.
- **Schema-change blast radius** — CockroachDB applies online schema changes asynchronously. Run
  `talos-commercial migrate up` from a single instance, then wait for the schema-change job to
  finish (use `SHOW JOBS` and look for rows with `status = 'running'`) before you roll out the new
  application version.
- **Rollback path** — `talos-commercial migrate down` is supported but irreversible once the
  previous version has written data using the new schema. Take a backup (`BACKUP INTO …`) before a
  destructive migration.

## Migrations

```shell
talos-commercial migrate up --database "cockroach://talos@crdb:26257/talos"
```

## Multi-region

Deploy Ory Talos in each region alongside the local CockroachDB nodes to reduce verification
latency. `talos serve admin` exposes verification as part of the admin surface, which has no
built-in authentication, so run it behind a trusted network boundary — a private VPC, admin VLAN, or
authenticating reverse proxy — and never expose it to the public internet without an external
authN/authZ layer. Run `talos serve public` on the public network for proof-of-possession
self-revocation. Beyond pointing `db.dsn` at the local CockroachDB node, no region-specific
configuration is needed.

```yaml
# Region: us-east-1
db:
  dsn: "cockroach://talos@crdb-us-east:26257/talos?sslmode=verify-full&max_conns=50"

# Region: eu-west-1
db:
  dsn: "cockroach://talos@crdb-eu-west:26257/talos?sslmode=verify-full&max_conns=50"
```

## Performance

Distributed consensus (Raft) gives CockroachDB higher write latency than PostgreSQL. For
verification-heavy workloads:

- Enable [caching](../cache/index.md) to absorb verification reads.
- Tune `max_conns` based on observed pool saturation. The default is `25`, the same as PostgreSQL.
- Co-locate Talos admin instances, which serve verification, with the CockroachDB nodes they read
  from, and keep the admin surface on a trusted network.

## Example DSNs

**Development (CockroachDB Serverless):**

```text
cockroach://talos:secret@free-tier.cockroachlabs.cloud:26257/talos?sslmode=require
```

**Production with standard pooling:**

```text
cockroach://talos@crdb:26257/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&max_conns=50&max_idle_conns=10&max_conn_lifetime=5m&max_conn_idle_time=1m
```

**Production with advanced pooling (multi-region):**

```text
cockroach://talos@crdb-local:26257/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&pool_mode=advanced
```
