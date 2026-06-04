---
title: Migrations
---

Ory Talos has built-in database migrations. Run them before first use and after each upgrade.

Migrations are **backward compatible**: a new schema coexists with the previous binary, so Ory Talos
commercial supports zero-downtime rolling upgrades. Apply the migration first, then roll the
application replicas. Old replicas keep serving against the new schema until they're replaced.

## Commands

```shell
# Apply all pending migrations
talos migrate up --database "sqlite:///var/lib/talos/data.db"

# Roll back the last migration (--steps defaults to 1)
talos migrate down --database "sqlite:///var/lib/talos/data.db"

# Roll back the last three migrations
talos migrate down --steps 3 --database "sqlite:///var/lib/talos/data.db"

# Check migration status
talos migrate status --database "sqlite:///var/lib/talos/data.db"

# Force a specific version after a partial migration left the schema dirty
talos migrate force 17 --database "sqlite:///var/lib/talos/data.db"
```

## Upgrade workflow

1. **Back up the database.** For PostgreSQL or CockroachDB, take a logical backup with `pg_dump` or
   `BACKUP INTO`. For MySQL, use `mysqldump`. SQLite users copy the file.
2. **Run migrations from a single instance.** Apply migrations from one Job, init container, or
   operator — never from inside the application's startup path. See
   [Production safety](#production-safety).
3. **Apply migrations.** Run `talos migrate up`. Watch stderr; the command exits non-zero on
   failure.
4. **Resolve dirty state if needed.** If a migration fails partway through, `migrate up` and
   `migrate down` refuse to run and report `Error: Database is in dirty state at version N`. Inspect
   the schema, complete or revert the partial change by hand, then run
   `talos migrate force <version>` to update the migration tracker. Never rerun on top of a dirty
   state.
5. **Verify with `talos migrate status`.** Confirm the version matches the new binary's expected
   schema and that `Database Status` reports `clean`, not `DIRTY`.
6. **Roll the application.** Start replicas of the new binary in a rolling deploy. You don't need to
   drain traffic, because the new schema stays compatible with the previous binary.

## Production safety

- Run `talos migrate up` from a Job, init container, or operator — never from inside the
  application's startup path. Concurrent migration runners deadlock or corrupt the migration
  tracker.
- Pin the migration image to the same version as the application image. Don't use mutable tags
  (`latest`, `staging`) for migration jobs.
- The OSS image (`oryd/talos`) ships only SQLite migrations and rejects any non-SQLite DSN. For
  PostgreSQL, MySQL, or CockroachDB, use the `oryd/talos-commercial` image. Commercial migrations
  live under `commercial/persistence/migrations/{postgres,mysql,cockroach}/`; SQLite migrations live
  under `internal/persistence/migrations/sqlite/`.

## DSN examples

```shell
# SQLite (OSS)
talos migrate up --database "sqlite:///var/lib/talos/data.db"

# PostgreSQL (commercial)
talos-commercial migrate up --database "postgres://talos:secret@db:5432/talos"

# MySQL (commercial)
talos-commercial migrate up --database "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true"

# CockroachDB (commercial)
talos-commercial migrate up --database "cockroach://talos@crdb:26257/talos"
```

## Kubernetes

Use a Job to apply migrations once, then start the application Deployment. The example below targets
a SQL backend, so it uses `oryd/talos-commercial`. For SQLite, use `oryd/talos`. Always pin the
image to a specific released version, never `latest`.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: talos-migrate
spec:
  backoffLimit: 0 # Don't retry — a failed migration leaves the schema dirty.
  template:
    spec:
      containers:
        - name: migrate
          image: oryd/talos-commercial:<version-you-want> # Pin to the same tag as the application image.
          args: ["migrate", "up"]
          env:
            - name: DB_DSN
              valueFrom:
                secretKeyRef:
                  name: talos-secrets
                  key: dsn
      restartPolicy: Never
```
