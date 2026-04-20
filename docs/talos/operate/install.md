---
title: Install
description: Build Talos from source or download a pre-built binary
---

# Install

<!-- doctest:setup:file tools/doctest/setup-build.sh -->

## Build from source

Talos requires Go 1.23 or later.

### OSS edition

```bash
git clone https://github.com/ory/talos.git
cd talos
go build -o .bin/talos .
```

The binary is at `.bin/talos`. SQLite is the only supported database backend in the OSS edition.

### Commercial edition

The Commercial edition adds PostgreSQL, MySQL, CockroachDB, caching, multi-tenancy, and the admin
UI:

```bash
go build -tags commercial -o .bin/talos-commercial .
```

## Verify the installation

<!-- doctest:exec -->

```bash
./.bin/talos version
./.bin/talos help
```

## Run database migrations

Before starting the server, run migrations to create the database schema:

```bash
# SQLite (OSS)
./.bin/talos migrate up --database "sqlite:///path/to/talos.db"

# PostgreSQL (Commercial)
./.bin/talos-commercial migrate up --database "postgres://user:pass@localhost:5432/talos"

# MySQL (Commercial)
./.bin/talos-commercial migrate up --database "mysql://user:pass@tcp(localhost:3306)/talos"

# CockroachDB (Commercial)
./.bin/talos-commercial migrate up --database "cockroach://user@localhost:26257/talos"
```

## Start the server

```bash
./.bin/talos serve --config config.yaml
```

See [Configure](configure.md) for config file format and options.

## Docker

See [Docker deployment](deploy/docker.md) for running Talos in containers.
