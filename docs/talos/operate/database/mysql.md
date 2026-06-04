---
title: MySQL
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

The commercial edition supports MySQL as a production database.

## Supported versions

MySQL 8.0 and later.

## Configuration

```yaml
db:
  dsn: "mysql://talos:secret@tcp(db:3306)/talos?tls=true&parseTime=true"
```

Or set it through an environment variable:

```shell
export TALOS_DB_DSN="mysql://talos:secret@tcp(db:3306)/talos?tls=true&parseTime=true"
```

## DSN format

```text
mysql://user:password@tcp(host:port)/dbname?param=value&param=value
```

The DSN requires the `mysql://` scheme prefix. Ory Talos strips it before passing the DSN to the Go
MySQL driver.

:::note

Set `parseTime=true` in the DSN. The Go MySQL driver needs it to scan `DATETIME` columns into
`time.Time`. The example DSNs on this page include it.

:::

## DSN parameters

### Connection pool parameters

Ory Talos parses these pool parameters from the DSN query string and removes them before passing the
DSN to the database driver.

| Parameter            | Type     | Default                  | Description                                                 |
| -------------------- | -------- | ------------------------ | ----------------------------------------------------------- |
| `max_conns`          | integer  | `2 × runtime.GOMAXPROCS` | Maximum number of open connections in the pool              |
| `max_idle_conns`     | integer  | `runtime.GOMAXPROCS`     | Maximum number of idle connections (must be ≤ `max_conns`)  |
| `max_conn_lifetime`  | duration | `30m`                    | Maximum age of a connection before it's closed and replaced |
| `max_conn_idle_time` | duration | `10m`                    | Maximum time a connection can sit idle before it's closed   |

Duration values use Go duration syntax: `5m` (5 minutes), `1h` (1 hour), `30s` (30 seconds).

Always set `max_conns` and `max_idle_conns` explicitly in production. When omitted, the values
derive from the container's CPU allocation, which can change after redeploys or node moves and
exceed your MySQL server's `max_connections` budget.

Ory Talos sets non-zero defaults for `max_conn_lifetime` and `max_conn_idle_time` so connections
recycle through load balancers and DNS rotation. Setting either to `0` disables recycling. Don't do
this outside development.

MySQL uses standard `database/sql` pooling only. There is no advanced pool mode.

### MySQL driver parameters

Ory Talos passes these parameters through to the underlying Go MySQL driver.

| Parameter         | Description                                | Notes                                                                                                                                                        |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `parseTime`       | Parse `DATETIME` columns to `time.Time`    | Set to `true`. Required by the driver to scan timestamps.                                                                                                    |
| `multiStatements` | Allow multiple statements per query        | Set to `true` to run migration files that contain more than one statement.                                                                                   |
| `tls`             | TLS mode (`true`, `skip-verify`, `custom`) | Recommended for production                                                                                                                                   |
| `charset`         | Character set                              | Defaults to `utf8mb4`                                                                                                                                        |
| `collation`       | Connection collation                       | Defaults to `utf8mb4_general_ci`. Tables created by Ory Talos migrations use `utf8mb4_unicode_ci`; the connection-level setting only affects ad-hoc queries. |
| `loc`             | Timezone for time.Time values              | Defaults to `UTC`                                                                                                                                            |
| `timeout`         | Connection timeout (for example, `10s`)    | —                                                                                                                                                            |
| `readTimeout`     | Read timeout (for example, `30s`)          | —                                                                                                                                                            |
| `writeTimeout`    | Write timeout (for example, `30s`)         | —                                                                                                                                                            |

## Connection pooling

MySQL uses Go's `database/sql` connection pool with the `go-sql-driver/mysql` driver.

```yaml
db:
  dsn: "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m"
```

Pool behavior:

- Creates connections on demand up to `max_conns`.
- Keeps idle connections up to `max_idle_conns`.
- Closes and replaces connections older than `max_conn_lifetime`.
- Closes connections idle longer than `max_conn_idle_time`.

### Pool sizing

Always set `max_conns` and `max_idle_conns` explicitly. Start with 25 connections per instance and
keep the total pool across all instances below MySQL's `max_connections` (default: 151).

| Deployment      | `max_conns`    | Notes                                       |
| --------------- | -------------- | ------------------------------------------- |
| Single instance | `25`           | Good starting point                         |
| 3 instances     | `25` each      | 75 total — within default `max_connections` |
| 5+ instances    | `15`–`20` each | Use ProxySQL or MySQL Router to multiplex   |

For large deployments, place [ProxySQL](https://proxysql.com/) or
[MySQL Router](https://dev.mysql.com/doc/mysql-router/en/) between Ory Talos and MySQL to multiplex
connections.

## Database preparation

```sql
CREATE DATABASE talos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'talos'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON talos.* TO 'talos'@'%';
```

## Migrations

```shell
talos-commercial migrate up --database "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true"
```

## TLS and SSL

To encrypt database connections, set the `tls` parameter in the DSN:

```yaml
db:
  dsn: "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&tls=true"
```

| Parameter         | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `tls=true`        | Enable TLS with default settings                                       |
| `tls=skip-verify` | TLS without certificate verification                                   |
| `tls=custom`      | Use custom TLS configuration registered with `mysql.RegisterTLSConfig` |

## Example DSNs

**Development:**

```text
mysql://talos:secret@tcp(localhost:3306)/talos?parseTime=true
```

**Production with pooling:**

```text
mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&tls=true&max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m
```

**With timeouts:**

```text
mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&tls=true&timeout=10s&readTimeout=30s&writeTimeout=30s&max_conns=25
```
