---
title: Operate
description: Install, configure, and deploy Ory Talos
---

# Operate Ory Talos

How to install, configure, deploy, and operate Talos. Pages tagged `[commercial]` apply to the
Commercial edition only — the OSS edition runs as a single-node binary with embedded SQLite and
covers the install, configure, secrets, TLS, monitoring, and security-hardening guides below.

## Getting started

1. **[Install](install.md)** — build from source or download a binary
2. **[Configure](configure.md)** — set up the config file, environment variables, and secrets
3. **[Database](database/index.md)** — choose and configure a database backend
4. **[Deploy](deploy/index.md)** — run Talos with Docker, Kubernetes, or as a systemd service

## Production checklist

Before going to production, review these guides (apply to OSS and Commercial):

- **[Secrets management](secrets.md)** — configure HMAC secrets and JWKS signing keys
- **[TLS](tls.md)** — enable TLS termination or configure a reverse proxy
- **[Monitoring](monitoring/index.md)** — set up Prometheus metrics, OpenTelemetry tracing, and
  health checks
- **[Security hardening](security-hardening.md)** — production security checklist, including admin
  plane authentication
- **[Benchmarks](benchmarks.md)** — performance baselines and load testing

## Commercial-only features

The OSS edition is single-node SQLite. Horizontal scale, SQL backends, distributed caching, edge
deployment, and multi-tenancy require the [Commercial edition](../index.md#editions):

- **[PostgreSQL](database/postgresql.md)**, **[MySQL](database/mysql.md)**,
  **[CockroachDB](database/cockroachdb.md)** — production-grade SQL backends
- **[Caching](cache/index.md)** — in-memory and Redis caching for sub-millisecond verification
- **[Edge proxy](deploy/edge-proxy.md)** — deploy data plane at the edge
- **[Multi-tenancy](multi-tenancy.md)** — serve multiple tenants from a single cluster

## Architecture

Talos separates administrative operations (issuing, revoking) from verification:

- **Admin plane** — manages key lifecycle. Runs behind your internal network.
- **Data plane** — verifies credentials at the edge. Horizontally scalable with caching.

You can run both planes in a single process (`talos serve`) or split them for production
(`talos serve admin`, `talos serve check`). See [Separate planes](deploy/separate-planes.md) for
details.
