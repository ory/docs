---
id: dependencies-environment
title: Database Setup and Configuration
---

Ory Hydra is built cloud native and implements
[12factor](https://www.12factor.net/) principles. The Docker Image is 5 MB light
and versioned with
[verbose upgrade instructions](https://github.com/ory/hydra/blob/master/UPGRADE.md)
and
[detailed changelogs](https://github.com/ory/hydra/blob/master/CHANGELOG.md).
Auto-scaling, migrations, health checks, it all works with zero additional work
required. It's possible to run Ory Hydra on any platform, including but not
limited to OSX, Linux, Windows, ARM, FreeBSD and more.

Ory Hydra has two operational modes:

- In-memory: This mode doesn't work with more than one instance ("cluster") and
  any state is lost after restarting the instance. Ory Hydra uses SQLite with
  in-memory mode to achieve this.
- SQL: This mode works with more than one instance and state isn't lost after
  restarts.

No further dependencies are required for a production-ready instance.

## Database Configuration

For more information on configuring

The SQL adapter supports PostgreSQL 9.6+, MySQL 5.7+ and SQLite. Please note
that older MySQL versions have issues with Ory Hydra's database schema. For more
information [go here](https://github.com/ory/hydra/issues/377).

If you do run the SQL adapter, you must first create the database schema. The
`hydra serve` command doesn't do this automatically, instead you must run
`hydra migrate sql` to create the schemas. The `hydra migrate sql` command also
runs database migrations in case of an upgrade. Please follow the
[upgrade instructions](https://github.com/ory/hydra/blob/master/UPGRADE.md) to
see when you need to run this command. Always create a backup before running
`hydra migrate sql`!

Running SQL migrations in Docker is very easy, check out the
[docker-compose](https://github.com/ory/hydra/blob/master/quickstart-postgres.yml)
example to see how we did it!

### Configuration

For more information on configuring the DSN (Data-Source-Name), head over to
[Deployment Fundamentals and Requirements](https://www.ory.sh/docs/ecosystem/deployment).
