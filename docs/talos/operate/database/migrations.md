---
title: Migrations
---

# Migrations

Talos includes built-in database migrations. Run them before first use and after each upgrade.

## Commands

```bash
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

1. **Back up the database.** For PostgreSQL or CockroachDB, take a logical backup with `pg_dump` or `BACKUP INTO`; for MySQL, use
   `mysqldump`. SQLite users can simply copy the file.
2. **Drain admin traffic.** Run `talos migrate up` from a single instance — concurrent migration runners race against each other
   and can leave the schema dirty.
3. **Apply migrations.** Run `talos migrate up`. Watch stderr; the command exits non-zero on failure.
4. **Resolve dirty state if needed.** If migration fails partway through, `migrate up` and `migrate down` will refuse to run with
   `Error: Database is in dirty state at version N`. Inspect the schema, complete or revert the partial change manually, then run
   `talos migrate force <version>` to mark the migration tracker. Never rerun on top of a dirty state.
5. **Verify with `talos migrate status`.** Confirm the version matches the new binary's expected schema and that `STATUS` reports
   `OK`, not `DIRTY`.
6. **Roll the application.** Start replicas of the new binary in a rolling deploy. Old replicas continue serving against the new
   schema until they are replaced.

## Production safety

- Run `talos migrate up` from a Job, init container, or operator — never from inside the application's startup path. Concurrent
  migration runners can deadlock or corrupt the migration tracker.
- Pin the migration image to the same version as the application image. Do not use mutable tags (`latest`, `staging`) for
  migration jobs.
- Talos commercial migrations live under `commercial/persistence/migrations/{postgres,mysql,cockroach}/`; the OSS image only ships
  SQLite migrations and cannot apply them. Use the `oryd/talos-commercial` image for PostgreSQL, MySQL, and CockroachDB.

## DSN examples

```bash
# SQLite (OSS)
talos migrate up --database "sqlite:///var/lib/talos/data.db"

# PostgreSQL (Commercial)
talos-commercial migrate up --database "postgres://talos:secret@db:5432/talos"

# MySQL (Commercial)
talos-commercial migrate up --database "mysql://talos:secret@tcp(db:3306)/talos?parseTime=true"

# CockroachDB (Commercial)
talos-commercial migrate up --database "cockroach://talos@crdb:26257/talos"
```

## Kubernetes

Use a Job to apply migrations once, then start the application Deployment. The OSS image (`oryd/talos:latest`) only ships SQLite
migrations; for PostgreSQL, MySQL, or CockroachDB use `oryd/talos-commercial:latest`.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: talos-migrate
spec:
  backoffLimit: 0 # Do not retry — a failed migration leaves the schema dirty.
  template:
    spec:
      containers:
        - name: migrate
          image: oryd/talos-commercial:latest # Pin to the same tag as the application image.
          command: ["talos", "migrate", "up"]
          env:
            - name: TALOS_DB_DSN
              valueFrom:
                secretKeyRef:
                  name: talos-secrets
                  key: dsn
      restartPolicy: Never
```
