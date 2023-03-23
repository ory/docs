---
id: deployment
title: Database
---

## Integrates with Kubernetes

Ory technology is cloud first and runs natively on Docker and Kubernetes and naturally supports Kubernetes Helm Charts. Head over
to our [Kubernetes Helm Chart Repository](https://k8s.ory.sh/helm) for Charts and accompanying Documentation.

## Data Storage and persistence

All Ory projects support storing data in memory and in relational databases such as PostgreSQL, MySQL, SQLite and CockroachDB.

### In-memory (ephemeral)

Storing data in-memory helps you get started quickly without worrying about setting up a database first. Keep in mind that all
data is ephemeral and will be removed when the service is killed.

Using in-memory storage is usually achieved by setting configuration key `dsn` to `memory`.

### SQL (persistent)

All Ory projects support PostgreSQL, MySQL, SQLite and CockroachDB as first-class citizens.

##### SQLite

If configuration key `dsn` (Data Source Name) is prefixed with `sqlite://`, then SQLite will be used as storage backend.

An exemplary configuration would look like this: `DSN=sqlite:///tmp/some-db.sqlite?_fk=true`

The following DSN parameters are required:

- `_fk` (bool): Must be set to `true` (`?_fk=true`) for foreign keys to work.

For a list of all supported query parameters, head over to
[github.com/mattn/go-sqlite3](https://github.com/mattn/go-sqlite3#connection-string).

##### PostgreSQL

If configuration key `dsn` (Data Source Name) is prefixed with `postgres://`, then PostgreSQL will be used as storage backend. An
exemplary configuration would look like this: `DSN=postgres://user:password@host:123/database`

All parameters [supported by `libpq`](https://www.postgresql.org/docs/9.6/libpq-connect.html) are supported by Ory Kratos as well.
In particular:

- `max_conns` (number): Sets the maximum number of open connections to the database. Defaults to the number of CPU cores times 2.
- `max_idle_conns` (number): Sets the maximum number of connections in the idle. Defaults to the number of CPU cores.
- `max_conn_lifetime` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection may be reused.
- `max_conn_idle_time` (duration): Sets the maximum amount of time ("ms", "s", "m", "h") a connection can be kept alive.
- `sslmode` (string): Whether or not to use SSL (default is require)
  - `disable` - No SSL
  - `require` - Always SSL (skip verification)
  - `verify-ca` - Always SSL (verify that the certificate presented by the `server` was signed by a trusted CA)
  - `verify-full` - Always SSL (verify that the certification presented by the server was signed by a trusted CA and the server
    host name matches the one in the certificate)
- `fallback_application_name` (string): An application_name to fall back to if one isn't provided.
- `connect_timeout` (number): Maximum wait for connection, in seconds. Zero or not specified means wait indefinitely.
- `search_path` (string): specifies the [search path](https://www.postgresql.org/docs/12/ddl-schemas.html), such as the schema.
- `sslcert` (string): Cert file location. The file must contain PEM encoded data.
- `sslkey` (string): Key file location. The file must contain PEM encoded data.
- `sslrootcert` (string): The location of the root certificate file. The file must contain PEM encoded data.

To set such a parameter, append it to the DSN query, for example: `postgres://user:password@host:123/database?sslmode=verify-full`

##### MySQL

If configuration key `dsn` (Data Source Name) is prefixed with `mysql://`, then MySQL will be used as storage backend. An
exemplary configuration would look like this: `DSN=mysql://user:password@tcp(host:123)/database?parseTime=true`

Additionally, the following DSN parameters are supported:

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
`mysql://user:password@tcp(host:123)/database?parseTime=true&writeTimeout=123s`

###### AWS Aurora / MySQL 8.0+ not completing migrations

If you encounter errors such as

```
An error occurred while connecting to SQL: error executing migrations/sql/20210817181232000006_unique_credentials.mysql.up.sql, sql: ALTER TABLE `identity_credential_identifiers` MODIFY `identity_credential_type_id` char(36) NOT NULL;: Error 1832: Cannot change column 'identity_credential_type_id': used in a foreign key constraint 'identity_credential_identifiers_type_id_fk_idx'
```

set `sql_mode=TRADITIONAL` to resolve the issue.

See also:

- https://github.com/ory/hydra/issues/3363
- https://github.com/ory/kratos/issues/2167

##### CockroachDB

If configuration key `dsn` (Data Source Name) is prefixed with `cockroach://`, then CockroachDB will be used as storage backend.
An exemplary configuration would look like this: `DSN=cockroach://user:password@host:123/database`

Additionally, the following DSN parameters are supported:

- `sslmode` (string): Whether or not to use SSL (default is require)
  - `disable` - No SSL
  - `require` - Always SSL (skip verification)
  - `verify-ca` - Always SSL (verify that the certificate presented by the `server` was signed by a trusted CA)
  - `verify-full` - Always SSL (verify that the certification presented by the server was signed by a trusted CA and the server
    host name matches the one in the certificate)
- `application_name` (string): An initial value for the application_name session variable.
- `sslcert` (string): Cert file location. The file must contain PEM encoded data.
- `sslkey` (string): Key file location. The file must contain PEM encoded data.
- `sslrootcert` (string): The location of the root certificate file. The file must contain PEM encoded data.

To set such a parameter, append it to the DSN query, for example:
`cockroach://user:password@host:123/database?sslmode=verify-full`
