---
title: PostgreSQL
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# PostgreSQL

PostgreSQL is the recommended production database backend. It provides connection pooling, ACID transactions, and
high-availability via streaming replication.

## Supported versions

PostgreSQL 14 and later.

## Configuration

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?sslmode=require&max_conns=25&max_conn_lifetime=5m"
```

Or via environment variable:

```bash
export TALOS_DB_DSN="postgres://talos:secret@db:5432/talos?sslmode=require&max_conns=25&max_conn_lifetime=5m"
```

## DSN format

```
postgres://user:password@host:port/dbname?param=value&param=value
```

Both `postgres://` and `postgresql://` schemes are accepted.

## DSN parameters

### Connection pool parameters

Pool parameters are parsed from the DSN query string and removed before the DSN is passed to the database driver.

| Parameter            | Type     | Default         | Description                                                  |
| -------------------- | -------- | --------------- | ------------------------------------------------------------ |
| `max_conns`          | integer  | `25`            | Maximum number of open connections in the pool               |
| `max_idle_conns`     | integer  | `5`             | Maximum number of idle connections (must be ≤ `max_conns`)   |
| `max_conn_lifetime`  | duration | `0` (unlimited) | Maximum age of a connection before it is closed and replaced |
| `max_conn_idle_time` | duration | `0` (unlimited) | Maximum time a connection can sit idle before it is closed   |
| `pool_mode`          | string   | `standard`      | Pool implementation: `standard` or `advanced` (see below)    |

Duration values use Go duration syntax: `5m` (5 minutes), `1h` (1 hour), `30s` (30 seconds).

### PostgreSQL driver parameters

These parameters are passed through to the underlying PostgreSQL driver (`pgx`).

| Parameter          | Description                                                 | Recommended   |
| ------------------ | ----------------------------------------------------------- | ------------- |
| `sslmode`          | TLS mode (`disable`, `require`, `verify-ca`, `verify-full`) | `verify-full` |
| `sslrootcert`      | Path to CA certificate file                                 | —             |
| `sslcert`          | Path to client certificate file (for mTLS)                  | —             |
| `sslkey`           | Path to client private key file (for mTLS)                  | —             |
| `connect_timeout`  | Connection timeout in seconds                               | `10`          |
| `application_name` | Application name reported to PostgreSQL                     | —             |

## Connection pooling

Talos supports two pool modes for PostgreSQL, controlled by the `pool_mode` DSN parameter.

### Standard mode (default)

Uses Go's `database/sql` connection pool with the `pgx` driver. This is the default and works with all tooling.

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m"
```

Pool behavior:

- Connections are created on demand up to `max_conns`
- Idle connections are kept up to `max_idle_conns`
- Connections older than `max_conn_lifetime` are closed and replaced
- Connections idle longer than `max_conn_idle_time` are closed

### Advanced mode

Uses native `pgxpool` for high-availability deployments. Provides built-in health checks and is optimized for Kubernetes and cloud
environments.

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?pool_mode=advanced"
```

In advanced mode, pool sizing is configured through pgxpool's native parameters parsed from the DSN. The `max_conns`,
`max_idle_conns`, `max_conn_lifetime`, and `max_conn_idle_time` parameters are not used — pgxpool manages its own pool.

Use advanced mode when:

- Running in Kubernetes with connection health checks
- Using cloud-managed PostgreSQL (RDS, Cloud SQL, AlloyDB) with aggressive connection recycling
- Deploying with PgBouncer and needing precise pool control

## Pool sizing

Start with 25 connections per instance. The total pool across all instances must stay below PostgreSQL's `max_connections`
(default: 100).

| Deployment      | `max_conns`    | Notes                                       |
| --------------- | -------------- | ------------------------------------------- |
| Single instance | `25`           | Good starting point                         |
| 3 instances     | `25` each      | 75 total — within default `max_connections` |
| 5+ instances    | `15`–`20` each | Use PgBouncer to multiplex connections      |

For large deployments, place [PgBouncer](https://www.pgbouncer.org/) between Talos and PostgreSQL. PgBouncer multiplexes many
application connections over fewer database connections, allowing you to scale beyond PostgreSQL's connection limit.

## Migrations

```bash
talos-commercial migrate up --database "postgres://talos:secret@db:5432/talos"
```

## TLS / SSL

Use the `sslmode` parameter in the DSN for encrypted database connections:

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt"
```

| Mode          | Description                                         |
| ------------- | --------------------------------------------------- |
| `disable`     | No TLS                                              |
| `require`     | TLS without certificate verification                |
| `verify-ca`   | TLS with CA verification                            |
| `verify-full` | TLS with CA and hostname verification (recommended) |

For mutual TLS (mTLS), provide both client certificate and key:

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&sslcert=/certs/client.crt&sslkey=/certs/client.key"
```

## Example DSNs

**Development:**

```
postgres://talos:secret@localhost:5432/talos?sslmode=disable
```

**Production with standard pooling:**

```
postgres://talos:secret@db:5432/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m
```

**Production with advanced pooling (Kubernetes):**

```
postgres://talos:secret@db:5432/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&pool_mode=advanced
```

**Behind PgBouncer:**

```
postgres://talos:secret@pgbouncer:6432/talos?sslmode=require&max_conns=50&max_idle_conns=10&max_conn_lifetime=5m
```
