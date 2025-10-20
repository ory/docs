---
id: deployment
title: Database
---

## Integrates with Kubernetes

Ory technology is cloud first and runs natively on Docker and Kubernetes and naturally supports Kubernetes Helm Charts. Head over
to our [Kubernetes Helm Chart Repository](https://k8s.ory.com/helm) for Charts and accompanying Documentation.

## Data storage and persistence

All Ory projects support storing data in memory and in relational databases:

- PostgreSQL is fully supported.
- MySQL is fully supported. Some flavors like MariaDB and AWS Aurora may require additional setup.
- CockroachDB is fully supported.
- SQLite is supported (in-memory and persistent) but must not be used in a production deployment.

### PostgreSQL

If configuration key `dsn` (Data Source Name) is prefixed with `postgres://`, then PostgreSQL will be used as storage backend. An
example configuration would look like this:

```
DSN=postgres://user:password@host:123/database
```

Parameters are configured by appending them to the DSN query. For example, to set the `sslmode` parameter, you would append it to
the DSN query like this:

```
DSN=postgres://user:password@host:123/database?sslmode=verify-full
```

#### Supported parameters

- `sslmode` (string): Whether or not to use SSL (default is `require`)
  - `disable` - No SSL
  - `require` - Always SSL (skip verification)
  - `verify-ca` - Always SSL (verify that the certificate presented by the `server` was signed by a trusted CA)
  - `verify-full` - Always SSL (verify that the certification presented by the server was signed by a trusted CA and the server
    host name matches the one in the certificate). This is the recommended setting.
- `application_name` (string): Set to your application name (.e.g. `ory_hydra`, `ory_kratos`). This identifier will show up in
  your database's metrics, allowing you to easily see which application performs which queries.
- `fallback_application_name` (string): An application_name to fall back to if one isn't provided.
- `search_path` (string): specifies the [search path](https://www.postgresql.org/docs/12/ddl-schemas.html), such as the schema.
- `sslcert` (string): TLS client certificate file location. The file must contain PEM encoded data.
- `sslkey` (string): TLS client certificate private key file location, matching `sslcert`. The file must contain PEM encoded data.
- `sslrootcert` (string): The location of the CA (root) certificate file. The file must contain PEM encoded data.

##### Standard pooling

- `max_conns` (number): Sets the maximum number of open (in use+idle) connections to the database. If this number is too low,
  operations will be blocked waiting for a database connection. For the database server, connections might be expensive (e.g.
  PostgreSQL without an intermediary connection pool), quite cheap (e.g. MySQL), or very cheap (e.g. CockroachDB). For the client
  (Ory Software), database connections are always very cheap.
- `max_idle_conns` (number): The maximum number of _idle_ (not currently in use) connections. Useful to lower resource consumption
  in your database if connections are expensive for the database server (primarily PostgreSQL without an intermediary connection
  pool such as `pgbouncer`).
- `max_conn_lifetime` (duration: for example "500ms", "5s", "30m", "1h"): Sets the time after which a connection will be closed,
  irrespective of how long it has been idle. This is useful for maintenance: most database systems will not close connections
  towards the client even if the database server is being drained (for example for a software upgrade). Instead, the server relies
  on the client to close the connection. In those scenarios, this value determines the drain time of your database nodes. Setting
  this too short will cause connections to be re-established very frequently, negatively impacting latency.
- `max_conn_idle_time` (duration: for example "500ms", "5s", "30m", "1h"): Database connections will be closed after idling for
  this duration. Potentially useful to reduce resource consumption on the database server (see `max_idle_conns`) after a traffic
  spike.
- `connect_timeout` (number): Maximum wait for connection, in seconds. Zero or not specified means wait indefinitely.

##### High-performance pooling

:::note

High-performance pooling is supported in Ory Enterprise License (OEL) images.

:::

High-performance pooling is built using [pgxpool](https://pkg.go.dev/github.com/jackc/pgx/v5/pgxpool) and provides additional
configuration options to the ones listed under "Standard pooling".

To activate high-performance pooling, you must set at least the `pool_min_conns` parameter; otherwise, high-performance pooling
will not be enabled.

- `pool_min_conns` (number): The minimum number of total (in-use and idle) database connections to keep open at all times. After a
  connection closes, the pool may dip below `pool_min_conns` momentarily. Defaults to 0.
- `pool_max_conns` (number): Sets the maximum number of open connections to the database. Overrides `max_conns`.
- `pool_max_conn_idle_time` (duration: for example "500ms", "5s", "30m", "1h"): Database connections will be closed after idling
  for this duration. Overrides `max_conn_idle_time`.
- `pool_max_conn_lifetime` (duration: for example "500ms", "5s", "30m", "1h"): Sets the time after which a connection will be
  closed, irrespective of how long it has been idle. Overrides `max_conn_lifetime`.
- `pool_max_conn_lifetime_jitter` (duration: for example "500ms", "5s", "30m", "1h"): Jitter to add to the
  `pool_max_conn_lifetime` value. This is useful to avoid thundering herd problems when many connections are closed and re-opened
  at the same time.
- `pool_health_check_period` (duration: for example "500ms", "5s", "30m", "1h"): Sets the period for health checks to potentially
  kill stale connections. Defaults to "1m".

### CockroachDB

If configuration key `dsn` (Data Source Name) is prefixed with `cockroach://`, then CockroachDB will be used as storage backend.
CockroachDB supports the same parameters as PostgreSQL.

An example configuration would look like this:

```
DSN=cockroach://user:password@host:123/database?sslmode=verify-full&...
```

In CockroachDB, database connections consume little resources server-side. By contrast, establishing a new TLS connection to a
cluster can take several hundred milliseconds in many scenarios. As a consequence, Ory recommends using
[high-performance pooling](#high-performance-pooling) and setting the minimum and maximum pool sizes equal, as well as disabling
termination of idle connections (`pool_max_conn_idle_time=0`).

In this configuration, a fixed-size pool of database connections is available at all times, preventing connection storms during
traffic spikes. This pool size should be oversized for normal use: you might see most connections seemingly idle in your database
metrics. Because connections are virtually free to keep around for both client and server, this is not a concern. An excessively
sized connection pool may overload your database during extreme traffic peaks, whereas an undersized pool will have requests
waiting unnecessarily.

We recommend setting `pool_max_conn_lifetime=30m&pool_max_conn_lifetime_jitter=5m` as a compromise between low drain times during
CockroachDB upgrades and re-establishing connections more frequently than necessary.

### MySQL

If configuration key `dsn` (Data Source Name) is prefixed with `mysql://`, then MySQL will be used as storage backend. An example
configuration would look like this:

```
DSN=mysql://user:password@tcp(host:123)/database?parseTime=true
```

#### Supported parameters

The following DSN parameters are supported:

- `max_conns` (number): Sets the maximum number of open (in use+idle) connections to the database. If this number is too low,
  operations will be blocked waiting for a database connection. For the database server, connections might be expensive (e.g.
  PostgreSQL without an intermediary connection pool), quite cheap (e.g. MySQL), or very cheap (e.g. CockroachDB). For the client
  (Ory Software), database connections are always very cheap.
- `max_idle_conns` (number): The maximum number of _idle_ (not currently in use) connections. Useful to lower resource consumption
  in your database if connections are expensive for the database server (primarily PostgreSQL without an intermediary connection
  pool such as `pgbouncer`).
- `max_conn_lifetime` (duration: for example "500ms", "5s", "30m", "1h"): Sets the time after which a connection will be closed,
  irrespective of how long it has been idle. This is useful for maintenance: most database systems will not close connections
  towards the client even if the database server is being drained (for example for a software upgrade). Instead, the server relies
  on the client to close the connection. In those scenarios, this value determines the drain time of your database nodes. Setting
  this too short will cause connections to be re-established very frequently, negatively impacting latency.
- `max_conn_idle_time` (duration: for example "500ms", "5s", "30m", "1h"): Database connections will be closed after idling for
  this duration. Potentially useful to reduce resource consumption on the database server (see `max_idle_conns`) after a traffic
  spike.
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

An example configuration would look like this:

```
DSN=sqlite:///tmp/some-db.sqlite?_fk=true
```

The following DSN parameters are required:

- `_fk` (bool): Must be set to `true` (`?_fk=true`) for foreign keys to work.

For a list of all supported query parameters, head over to
[github.com/mattn/go-sqlite3](https://github.com/mattn/go-sqlite3#connection-string).

#### SQLite in-memory (ephemeral)

Storing data in-memory helps you get started quickly without worrying about setting up a database first. Keep in mind that all
data is ephemeral and will be removed when the service is killed.

Using in-memory storage is usually achieved by setting configuration key `DSN=memory`.
