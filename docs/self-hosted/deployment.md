---
id: deployment
title: Database
---

## Integrates with Kubernetes

Ory technology is cloud first and runs natively on Docker and Kubernetes and naturally supports Kubernetes Helm Charts. Head over
to our [Kubernetes Helm Chart Repository](https://k8s.ory.sh/helm) for Charts and accompanying Documentation.

## Data storage and persistence

All Ory projects support storing data in memory and in relational databases:

- PostgreSQL is recommended as the default database.
- MySQL is supported, some flavors like MariaDB and AWS Aurora may require additional work.
- CockroachDB is supported.
- SQLite is supported (in-memory and persistent) but must not be used for a production service.

### PostgreSQL

If configuration key `dsn` (Data Source Name) is prefixed with `postgres://`, then PostgreSQL will be used as storage backend. An
exemplary configuration would look like this:

```
DSN=postgres://user:password@host:123/database
```

Parameters are configured by appending them to the DSN query. For example, to set the `sslmode` parameter, you would append it to
the DSN query like this:

```
postgres://user:password@host:123/database?sslmode=verify-full
```

#### Supported parameters

- `sslmode` (string): Whether or not to use SSL (default is `require`)
  - `disable` - No SSL
  - `require` - Always SSL (skip verification)
  - `verify-ca` - Always SSL (verify that the certificate presented by the `server` was signed by a trusted CA)
  - `verify-full` - Always SSL (verify that the certification presented by the server was signed by a trusted CA and the server
    host name matches the one in the certificate)
- `application_name` (string): An initial value for the application_name session variable.
- `fallback_application_name` (string): An application_name to fall back to if one isn't provided.
- `search_path` (string): specifies the [search path](https://www.postgresql.org/docs/12/ddl-schemas.html), such as the schema.
- `sslcert` (string): Cert file location. The file must contain PEM encoded data.
- `sslkey` (string): Key file location. The file must contain PEM encoded data.
- `sslrootcert` (string): The location of the root certificate file. The file must contain PEM encoded data.

##### Standard pooling

- `max_idle_conns` (number): Sets the maximum number of connections in the idle. Defaults to the number of CPU cores.
- `max_conns` (number): Sets the maximum number of open connections to the database. Defaults to the number of CPU cores times 2.
- `max_conn_lifetime` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection may be reused.
- `max_conn_idle_time` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection can be kept alive.
- `connect_timeout` (number): Maximum wait for connection, in seconds. Zero or not specified means wait indefinitely.

##### High-performance pooling

:::note

These options are only supported in our Ory Enterprise License (OEL) images.

:::

High-performance pooling is built using [pgxpool](https://pkg.go.dev/github.com/jackc/pgx/v5/pgxpool) and provides additional
configuration options to the ones listed under "Standard pooling".

Using pool configuration overrides standard pool options. It is recommended to set both `pool_` and not `pool_` prefixed values to
ensure that the standard pool options are set as well (`postgres://...?max_conns=4&pool_max_conns=4`).

- `pool_max_conns` (number): Sets the maximum number of open connections to the database. Defaults to the number of CPU cores
  times 2. Overrides `max_conns`.
- `pool_max_conn_lifetime` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection may be reused. Overrides
  `max_conn_lifetime`.
- `pool_max_conn_idle_time` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection can be kept alive.
  Overrides `max_conn_idle_time`.
- `pool_min_conns` (number): The minimum size of the pool. After connection closes, the pool might dip below MinConns. A low
  number of MinConns might mean the pool is empty after MaxConnLifetime until the health check has a chance to create new
  connections. Defaults to 0.
- `pool_health_check_period` (duration): Sets the period for health checks to potentially kill stale
  connections.` Defaults to 1 minute.`
- `pool_max_conn_lifetime_jitter` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection may be reused.
  This is a random value that is added to the `pool_max_conn_lifetime` value. This is useful to avoid thundering herd problems
  when many connections are closed at the same time.

### CockroachDB

If configuration key `dsn` (Data Source Name) is prefixed with `cockroach://`, then CockroachDB will be used as storage backend.
CockroachDB supports the same parameters as PostgreSQL.

An exemplary configuration would look like this:

```
DSN=cockroach://user:password@host:123/database?sslmode=verify-full&...
```

### MySQL

If configuration key `dsn` (Data Source Name) is prefixed with `mysql://`, then MySQL will be used as storage backend. An
exemplary configuration would look like this: `DSN=mysql://user:password@tcp(host:123)/database?parseTime=true`

#### Supported parameters

The following DSN parameters are supported:

- `max_conns` (number): Sets the maximum number of open connections to the database. Defaults to the number of CPU cores times 2.
- `max_idle_conns` (number): Sets the maximum number of connections in the idle. Defaults to the number of CPU cores.
- `max_conn_lifetime` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection may be reused. Defaults to 0s
  (disabled).
- `max_conn_idle_time` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection can be kept alive.
- `collation` (string): Sets the collation used for client-server interaction on connection. In contrast to charset, collation
  doesn't issue additional queries. If the specified collation is unavailable on the target server, the connection will fail.
- `loc` (string): Sets the location for time.Time values. Note that this sets the location for time.Time values but doesn't change
  MySQL's time_zone setting. For that set the time_zone DSN parameter. Please keep in mind, that param values must be
  url.QueryEscape'ed. Alternatively you can manually replace the / with %2F. For example US/Pacific would be loc=US%2FPacific.
- `maxAllowedPacket` (number): Max packet size allowed in bytes. The default value is 4 MiB and should be adjusted to match the
  server settings. maxAllowedPacket=0 can be used to automatically fetch the max_allowed_packet variable from server on every
  connection.
- `readTimeout` (duration): I/O read timeout. The value must be a decimal number with a unit suffix ("ms", "s", "m", "h"), such as
  "30s", "0.5m" or "1m30s".
- `timeout` (duration): Timeout for establishing connections, aka dial timeout. The value must be a decimal number with a unit
  suffix ("ms", "s", "m", "h"), such as "30s", "0.5m" or "1m30s".
- `tls` (bool / string): tls=true enables TLS / SSL encrypted connection to the server. Use skip-verify if you want to use a
  self-signed or invalid certificate (server side).
- `writeTimeout` (duration): I/O write timeout. The value must be a decimal number with a unit suffix ("ms", "s", "m", "h"), such
  as "30s", "0.5m" or "1m30s".

To set such a parameter, append it to the DSN query, for example:

```
DSN=mysql://user:password@tcp(host:123)/database?parseTime=true&writeTimeout=123s
```

#### AWS Aurora / MySQL 8.0+ not completing migrations

If you encounter errors such as

```
An error occurred while connecting to SQL: error executing migrations/sql/20210817181232000006_unique_credentials.mysql.up.sql, sql: ALTER TABLE `identity_credential_identifiers` MODIFY `identity_credential_type_id` char(36) NOT NULL;: Error 1832: Cannot change column 'identity_credential_type_id': used in a foreign key constraint 'identity_credential_identifiers_type_id_fk_idx'
```

set `sql_mode=TRADITIONAL` to resolve the issue.

See also:

- https://github.com/ory/hydra/issues/3363
- https://github.com/ory/kratos/issues/2167

### SQLite

If configuration key `dsn` (Data Source Name) is prefixed with `sqlite://`, then SQLite will be used as storage backend. SQLite is
a great choice for development but has many drawbacks and should not be used in production.

An exemplary configuration would look like this: `DSN=sqlite:///tmp/some-db.sqlite?_fk=true`

The following DSN parameters are required:

- `_fk` (bool): Must be set to `true` (`?_fk=true`) for foreign keys to work.

For a list of all supported query parameters, head over to
[github.com/mattn/go-sqlite3](https://github.com/mattn/go-sqlite3#connection-string).

#### SQLite in-memory (ephemeral)

Storing data in-memory helps you get started quickly without worrying about setting up a database first. Keep in mind that all
data is ephemeral and will be removed when the service is killed.

Using in-memory storage is usually achieved by setting configuration key `DSN=memory`.
