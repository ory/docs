---
title: PostgreSQL
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

PostgreSQL is the recommended production database backend for Ory Talos. It provides connection
pooling, ACID transactions, and high availability through streaming replication.

## Supported versions

Ory Talos uses the `pgx/v5` driver and standard SQL features, so any actively supported PostgreSQL
release works. See the
[PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/).

## Configuration

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?sslmode=require&max_conns=25&max_conn_lifetime=5m"
```

Or use an environment variable:

```shell
export TALOS_DB_DSN="postgres://talos:secret@db:5432/talos?sslmode=require&max_conns=25&max_conn_lifetime=5m"
```

## DSN format

```text
postgres://user:password@host:port/dbname?param=value&param=value
```

Talos accepts both `postgres://` and `postgresql://` schemes.

## DSN parameters

### Connection pool parameters

Talos parses pool parameters from the DSN query string and removes them before passing the DSN to
the database driver.

| Parameter            | Type     | Default    | Description                                                  |
| -------------------- | -------- | ---------- | ------------------------------------------------------------ |
| `max_conns`          | integer  | `25`       | Maximum number of open connections in the pool               |
| `max_idle_conns`     | integer  | `5`        | Maximum number of idle connections (must be ≤ `max_conns`)   |
| `max_conn_lifetime`  | duration | `30m`      | Maximum age of a connection before it is closed and replaced |
| `max_conn_idle_time` | duration | `10m`      | Maximum time a connection can sit idle before it is closed   |
| `pool_mode`          | string   | `standard` | Pool implementation: `standard` or `advanced` (see below)    |

Duration values use Go duration syntax: `5m` (5 minutes), `1h` (1 hour), `30s` (30 seconds).

Ory Talos sets non-zero defaults for `max_conn_lifetime` and `max_conn_idle_time` so connections
recycle through load balancers and DNS rotation. Setting either to `0` disables recycling. Don't do
this outside development.

### PostgreSQL driver parameters

Talos passes these parameters through to the underlying PostgreSQL driver (`pgx`).

| Parameter          | Description                                                 | Recommended   |
| ------------------ | ----------------------------------------------------------- | ------------- |
| `sslmode`          | TLS mode (`disable`, `require`, `verify-ca`, `verify-full`) | `verify-full` |
| `sslrootcert`      | Path to CA certificate file                                 | —             |
| `sslcert`          | Path to client certificate file (for mTLS)                  | —             |
| `sslkey`           | Path to client private key file (for mTLS)                  | —             |
| `connect_timeout`  | Connection timeout in seconds                               | `10`          |
| `application_name` | Application name reported to PostgreSQL                     | —             |

## Connection pooling

Ory Talos supports two pool modes for PostgreSQL, set with the `pool_mode` DSN parameter.

### Standard mode

Standard mode is the default. It uses Go's `database/sql` connection pool with the `pgx` driver and
works with all tooling.

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m"
```

Pool behavior:

- Talos creates connections on demand up to `max_conns`.
- Talos keeps idle connections up to `max_idle_conns`.
- Talos closes and replaces connections older than `max_conn_lifetime`.
- Talos closes connections idle longer than `max_conn_idle_time`.

### Advanced mode

Advanced mode uses native `pgxpool`, which adds built-in connection health checks.

```yaml
db:
  dsn: "postgres://talos:secret@db:5432/talos?pool_mode=advanced&pool_max_conns=50&pool_min_conns=2&pool_max_conn_lifetime=30m&pool_max_conn_idle_time=10m"
```

In advanced mode, configure pool sizing through pgxpool's native parameters in the DSN. Talos
ignores `max_conns`, `max_idle_conns`, `max_conn_lifetime`, and `max_conn_idle_time` — use the
`pool_*` equivalents instead.

| pgxpool parameter          | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `pool_max_conns`           | Maximum size of the pgxpool connection pool           |
| `pool_min_conns`           | Minimum number of connections kept open               |
| `pool_max_conn_lifetime`   | Maximum age of a connection before it is replaced     |
| `pool_max_conn_idle_time`  | Maximum idle time before an idle connection is closed |
| `pool_health_check_period` | Interval between background health checks             |

Ory Talos sets no defaults for these parameters; pgxpool chooses them. See the
[pgxpool documentation](https://pkg.go.dev/github.com/jackc/pgx/v5/pgxpool#ParseConfig) for current
defaults and the full parameter list.

Talos exposes the pgxpool through Go's `database/sql` interface. The wrapper's `SetMaxIdleConns` is
forced to `0` so `database/sql` never holds connections idle on top of pgxpool. In advanced mode,
pgxpool is the single source of truth for pool sizing.

Use advanced mode when:

- Running in Kubernetes with connection health checks
- Using cloud-managed PostgreSQL (RDS, Cloud SQL, AlloyDB) with aggressive connection recycling
- Deploying behind PgBouncer and needing precise pool control

## Pool sizing

Start with 25 connections per instance. The total pool across all instances must stay below
PostgreSQL's `max_connections` (default: 100).

| Deployment      | `max_conns`    | Notes                                       |
| --------------- | -------------- | ------------------------------------------- |
| Single instance | `25`           | Good starting point                         |
| 3 instances     | `25` each      | 75 total — within default `max_connections` |
| 5+ instances    | `15`–`20` each | Use PgBouncer to multiplex connections      |

For large deployments, place [PgBouncer](https://www.pgbouncer.org/) between Ory Talos and
PostgreSQL. PgBouncer multiplexes many application connections over fewer database connections, so
you can scale beyond PostgreSQL's connection limit.

## Migrations

```shell
talos-commercial migrate up --database "postgres://talos:secret@db:5432/talos"
```

## TLS / SSL

Set the `sslmode` parameter in the DSN to encrypt database connections:

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

```text
postgres://talos:secret@localhost:5432/talos?sslmode=disable
```

**Production with standard pooling:**

```text
postgres://talos:secret@db:5432/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m
```

**Production with advanced pooling (Kubernetes):**

```text
postgres://talos:secret@db:5432/talos?sslmode=verify-full&sslrootcert=/certs/ca.crt&pool_mode=advanced
```

**Behind PgBouncer:**

```text
postgres://talos:secret@pgbouncer:6432/talos?sslmode=require&max_conns=50&max_idle_conns=10&max_conn_lifetime=5m
```
