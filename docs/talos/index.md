---
title: Ory Talos
---

# Ory Talos

Ory Talos is a high-performance API key management service. It handles the full lifecycle of API credentials: issuing keys,
verifying them at low latency, deriving short-lived tokens (JWT and macaroon), and revoking access.

Talos separates **admin operations** (issue, rotate, revoke, derive) from **data-plane operations** (verify, self-revoke) so you
can scale and secure each path independently.

## Choose your path

### I want to integrate Talos into my application

You're a developer building an application that needs API key authentication. Start here:

- **[Quickstart](./quickstart/index.md)** — issue and verify your first API key in 5 minutes
- **[Integration guide](./integrate/index.md)** — full API walkthrough for issuing, verifying, importing keys, and deriving tokens
- **[Error handling](./integrate/error-handling.md)** — error codes and retry strategies

### I want to run Talos in production

You're a platform engineer responsible for deploying and operating Talos. Start here:

- **[Install](./operate/install.md)** — binary install or build from source
- **[Configure](./operate/configure.md)** — configuration file, environment variables, and hot-reload behavior
- **[Deploy](./operate/deploy/index.md)** — Docker, Kubernetes, and split admin/data plane topologies
- **[Monitor](./operate/monitoring/index.md)** — Prometheus metrics, OpenTelemetry tracing, and health endpoints

## Editions

**Ory Talos OSS** (Apache 2.0) runs on a single node with a SQLite backend. It includes the full key lifecycle, token derivation,
and CLI.

**Ory Talos Commercial** adds multi-tenancy, PostgreSQL/MySQL/CockroachDB backends, distributed caching (Redis, in-memory), edge
proxy nodes, and the admin UI. Pages that cover commercial-only features are marked with a "Commercial" badge.

## Learn more

- **[Concepts](./concepts/index.md)** — architecture, credential types, security model, and caching behavior
- **[API reference](./reference/api/ory-talos-api.info.mdx)** — full admin and data plane endpoint documentation
- **[CLI reference](./reference/index.md)** — command-line tool documentation
- **[Configuration reference](./reference/config.md)** — all configuration keys and their defaults
