---
title: MySQL
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# MySQL

MySQL is supported as a production database in the Commercial edition.

## Supported versions

MySQL 8.0 and later.

## Configuration

```yaml
db:
  dsn: "mysql://talos:secret@tcp(db:3306)/talos?tls=true&parseTime=true"
```

Or via environment variable:

```bash
export TALOS_DB_DSN="mysql://talos:secret@tcp(db:3306)/talos?tls=true&parseTime=true"
```

## DSN format

```
mysql://user:password@tcp(host:port)/dbname?param=value&param=value
```

The `mysql://` scheme prefix is required in the configuration. Talos strips it internally before passing the DSN to the Go MySQL
driver.

:::caution Required parameter Always include `parseTime=true` in the DSN. Without it, datetime columns are returned as byte arrays
instead of `time.Time`, causing runtime errors. :::

## DSN parameters

### Connection pool parameters

Pool parameters are parsed from the DSN query string and removed before the DSN is passed to the database driver.

| Parameter            | Type     | Default         | Description                                                  |
| -------------------- | -------- | --------------- | ------------------------------------------------------------ |
| `max_conns`          | integer  | `25`            | Maximum number of open connections in the pool               |
| `max_idle_conns`     | integer  | `5`             | Maximum number of idle connections (must be ≤ `max_conns`)   |
| `max_conn_lifetime`  | duration | `0` (unlimited) | Maximum age of a connection before it is closed and replaced |
| `max_conn_idle_time` | duration | `0` (unlimited) | Maximum time a connection can sit idle before it is closed   |

Duration values use Go duration syntax: `5m` (5 minutes), `1h` (1 hour), `30s` (30 seconds).

MySQL uses standard `database/sql` pooling only. There is no advanced pool mode.

### MySQL driver parameters

These parameters are passed through to the underlying Go MySQL driver.

| Parameter         | Description                                | Required                         |
| ----------------- | ------------------------------------------ | -------------------------------- |
| `parseTime`       | Parse `DATETIME` columns to `time.Time`    | **Yes** — always set to `true`   |
| `tls`             | TLS mode (`true`, `skip-verify`, `custom`) | Recommended for production       |
| `charset`         | Character set                              | Defaults to `utf8mb4`            |
| `collation`       | Collation                                  | Defaults to `utf8mb4_general_ci` |
| `loc`             | Timezone for time.Time values              | Defaults to `UTC`                |
| `timeout`         | Connection timeout (e.g., `10s`)           | —                                |
| `readTimeout`     | Read timeout (e.g., `30s`)                 | —                                |
| `writeTimeout`    | Write timeout (e.g., `30s`)                | —                                |
| `multiStatements` | Allow multiple statements per query        | Do not enable                    |

## Connection pooling

MySQL uses Go's `database/sql` connection pool with the `go-sql-driver/mysql` driver.

```yaml
db:
  dsn: "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m"
```

Pool behavior:

- Connections are created on demand up to `max_conns`
- Idle connections are kept up to `max_idle_conns`
- Connections older than `max_conn_lifetime` are closed and replaced
- Connections idle longer than `max_conn_idle_time` are closed

### Pool sizing

Start with 25 connections per instance. The total pool across all instances should stay below MySQL's `max_connections` (default:
151).

| Deployment      | `max_conns`    | Notes                                       |
| --------------- | -------------- | ------------------------------------------- |
| Single instance | `25`           | Good starting point                         |
| 3 instances     | `25` each      | 75 total — within default `max_connections` |
| 5+ instances    | `15`–`20` each | Use ProxySQL or MySQL Router to multiplex   |

For large deployments, place [ProxySQL](https://proxysql.com/) or [MySQL Router](https://dev.mysql.com/doc/mysql-router/en/)
between Talos and MySQL for connection multiplexing.

## Database preparation

```sql
CREATE DATABASE talos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'talos'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON talos.* TO 'talos'@'%';
```

## Migrations

```bash
talos-commercial migrate up --database "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true"
```

## TLS / SSL

Use TLS parameters in the DSN for encrypted database connections:

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

```
mysql://talos:secret@tcp(localhost:3306)/talos?parseTime=true
```

**Production with pooling:**

```
mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&tls=true&max_conns=25&max_idle_conns=5&max_conn_lifetime=5m&max_conn_idle_time=1m
```

**With timeouts:**

```
mysql://talos:secret@tcp(db:3306)/talos?parseTime=true&tls=true&timeout=10s&readTimeout=30s&writeTimeout=30s&max_conns=25
```
