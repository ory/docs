---
title: Migrations
---

# Migrations

Talos includes built-in database migrations. Run them before first use and after each upgrade.

## Commands

```bash
# Apply all pending migrations
talos migrate up --database "sqlite:///var/lib/talos/data.db"

# Roll back the last migration
talos migrate down --database "sqlite:///var/lib/talos/data.db"

# Check migration status
talos migrate status --database "sqlite:///var/lib/talos/data.db"
```

## Upgrade workflow

1. Back up your database
2. Stop the Talos server
3. Run `talos migrate up`
4. Verify with `talos migrate status`
5. Start the new server binary

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

Use an init container or Job:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: talos-migrate
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: oryd/talos:latest
          command: ["talos", "migrate", "up"]
          env:
            - name: TALOS_DB_DSN
              valueFrom:
                secretKeyRef:
                  name: talos-secrets
                  key: dsn
      restartPolicy: OnFailure
```
