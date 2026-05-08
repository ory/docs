---
id: dependencies-environment
title: Database setup and configuration
---

Ory Hydra requires a database to store OAuth 2.0 clients, consent sessions, and access tokens. Choose between two operational
modes based on your deployment needs.

## In-memory mode

Set `DSN=memory` to run Hydra with an ephemeral SQLite database. This mode is useful for development and testing but has
limitations:

- Data is lost when the instance restarts
- Only single-instance deployments work (no clustering)

## SQL mode

For production deployments, configure Hydra with a persistent database. Hydra supports PostgreSQL 12.0+, MySQL 8.0+, CockroachDB,
and SQLite. Older MySQL versions have known issues with Hydra's database schema.

Set the database connection using the `DSN` environment variable or the `dsn` configuration key.

PostgreSQL:

```shell
DSN=postgres://user:password@host:5432/database
```

MySQL:

```shell
DSN=mysql://user:password@tcp(host:3306)/database?parseTime=true
```

CockroachDB:

```shell
DSN=cockroach://user:password@host:26257/database?sslmode=verify-full
```

SQLite (file-based):

```shell
DSN=sqlite:///path/to/hydra.sqlite?_fk=true
```

The `_fk=true` parameter is required for SQLite to enable foreign key constraints.

For additional DSN options including SSL/TLS configuration, see
[Deployment Fundamentals and Requirements](../../self-hosted/deployment).

## Running migrations

Hydra doesn't create the database schema automatically. You must run migrations before starting the server and after every
upgrade.

Always back up your database before running migrations. For upgrade-specific guidance, see the
[upgrade instructions](./upgrade.mdx).

```shell
hydra migrate sql -e
```

The `-e` flag reads the DSN from the environment variable.

For Docker deployments, see the [docker-compose example](https://github.com/ory/hydra/blob/master/quickstart-postgres.yml).
