---
title: Operate
description: Install, configure, and deploy Ory Talos
---

Run Ory Talos in production: install, configure, choose a database, and deploy.

## Get started

1. **[Install](install.md)** — install with Homebrew or Scoop, pull the Docker image, or download a
   binary
2. **[Configure](configure.md)** — set up the config file, environment variables, and secrets
3. **[Database](database/index.md)** — choose and configure a database backend
4. **[Deploy](deploy/index.md)** — run Talos with Docker, Kubernetes, or as a systemd service

## Production checklist

Review these guides before going to production:

- **[Secrets management](secrets.md)** — configure and rotate HMAC and pagination-token secrets
- **[TLS](tls.md)** — enable TLS termination or configure a reverse proxy
- **[Monitoring](monitoring/index.md)** — set up Prometheus metrics, OpenTelemetry tracing, and
  health checks
- **[Security hardening](security-hardening.md)** — production security checklist
- **[Benchmarks](benchmarks.md)** — performance baselines and load testing

## Commercial features

These features require the Commercial edition:

- **[PostgreSQL](database/postgresql.md)**, **[MySQL](database/mysql.md)**, and
  **[CockroachDB](database/cockroachdb.md)** SQL backends
- **[Caching](cache/index.md)** — in-memory and Redis caching to cut database load and verification
  latency
- **[Edge proxy](deploy/edge-proxy.mdx)** — cache key verification close to your application
- **[Multi-tenancy](multi-tenancy.md)** — serve multiple tenants from a single cluster

## Architecture

Talos exposes two surfaces in a single binary:

- **Admin** — manages the key lifecycle and serves verification. It has no built-in authentication,
  so run it behind a trusted proxy or on an internal-only network. See
  [Admin protection](security/admin-protection.md).
- **Self-service** — exposes proof-of-possession self-revocation to credential holders. It validates
  proof of possession inline, so it's safe on the public network.

Run both surfaces in one process (`talos serve`) or split them for production (`talos serve admin`,
`talos serve public`). See [Deployment modes](deploy/deployment-modes.md) for details.
