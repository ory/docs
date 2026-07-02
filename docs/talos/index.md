---
id: index
title: Ory Talos
sidebar_label: Introduction to Ory Talos
slug: /talos
---

Ory Talos is an API key management service. It handles the full lifecycle of API credentials: issuing keys, verifying them,
deriving short-lived tokens (JWT and macaroon), and revoking access.

Ory Talos exposes two HTTP surfaces. The admin API (`/v2alpha1/admin/*`) covers issue, import, rotate, revoke, derive, and verify.
It has no built-in authentication, so put it behind a network boundary or an authenticating proxy. The public API
(`POST /v2alpha1/apiKeys:selfRevoke`) validates proof of possession inline and is safe to expose publicly. In production, run them
as two processes. See [Separate admin and public APIs](./operate/deploy/deployment-modes.md).

## Choose your path

### Integrate Ory Talos into your application

Building an application that needs API key authentication? Start here:

- [Quickstart](./quickstart/open-source.mdx) — issue and verify your first API key in five minutes
- [Integration guide](./integrate/index.md) — API walkthrough for issuing, verifying, importing keys, and deriving tokens
- [Error handling](./integrate/error-handling.mdx) — error codes and retry strategies

### Run Ory Talos in production

Deploying and operating Ory Talos? Start here:

- [Install](./operate/install.md) — install with Homebrew or Scoop, pull the Docker image, or download a binary
- [Configure](./operate/configure.md) — configuration file, environment variables, and hot-reload behavior
- [Deploy](./operate/deploy/index.md) — Docker, binary, and split admin and public API topologies
- [Monitor](./operate/monitoring/index.md) — Prometheus metrics, OpenTelemetry tracing, and health endpoints

## Editions

Ory Talos OSS (Apache 2.0) runs on a single node with a SQLite backend. It includes the full key lifecycle, token derivation, and
CLI.

Ory Talos Commercial adds multi-tenancy, PostgreSQL, MySQL, and CockroachDB backends, in-memory and Redis caching, rate-limit
enforcement, and edge proxy nodes. Pages that cover commercial-only features are marked with a "Commercial" badge.

### Web console

Ory Talos has no built-in web UI. Manage API keys with the [admin API](./integrate/index.md) or the
[CLI](./reference/cli/talos.md). For a web console, use the Ory Console:

- On the [Ory Network](https://www.ory.com/), the Ory Console is available for Ory Talos.
- To use the Ory Console with a self-hosted deployment, [contact us](https://www.ory.com/contact).

## Learn more

- [Concepts](./concepts/index.md) — architecture, credential types, security model, and caching behavior
- [API reference](./reference/api/ory-talos-api.info.mdx) — full admin and self-service endpoint documentation
- [CLI reference](./reference/cli/talos.md) — command-line tool documentation
- [Configuration reference](./reference/config.mdx) — all configuration keys and their defaults
