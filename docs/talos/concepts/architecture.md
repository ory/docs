---
title: Architecture
---

# Architecture

Talos separates API key management into two planes.

## Admin plane

The admin plane handles all write operations: key issuance, rotation, revocation, token derivation, and JWKS. It is typically
exposed only to internal services.

Endpoints: `/v2/admin/`

## Data plane

The data plane handles high-throughput read operations: key verification, batch verification, and self-revocation. It is designed
for low-latency edge deployment.

Primary endpoints: `/v2/apiKeys:verify`, `/v2/apiKeys:batchVerify`, `/v2/apiKeys:selfRevoke`

Admin-scoped verification endpoints also exist for operator workflows, including `/v2/admin/apiKeys:verify` and
`/v2/admin/apiKeys:batchVerify`, but the self-service paths are the primary data-plane surface for credential holders.

## Request flow

```
Client --> Data Plane --> Cache (hit?) --> Database --> Response
                            |                            ^
                            +-- cache hit ---------------+
```

1. Client sends credential to `POST /v2/apiKeys:verify`
2. Talos identifies the credential type (generated, imported, JWT, macaroon)
3. For generated keys, the UUID is extracted from the token identifier
4. For imported keys, a tenant-scoped SHA-512/256 hash is computed
5. Database lookup (or cache hit) returns key metadata
6. Response includes key status, owner, scopes, and metadata

## Deployment topologies

| Topology     | Edition    | Description                                   |
| ------------ | ---------- | --------------------------------------------- |
| Single-node  | OSS        | One process serves both planes                |
| Split planes | Commercial | Admin and data planes as separate deployments |
| Edge proxy   | Commercial | Data plane at the edge with local cache       |

Both planes share the same database. The data plane can use caching (memory or Redis) to minimize database load.

## Ports

| Port | Purpose            |
| ---- | ------------------ |
| 4420 | HTTP API (default) |
| 4422 | Prometheus metrics |

## Design philosophy

### Separation of concerns

The system is divided into distinct layers:

- **Admin plane**: Management operations (CRUD for keys, rotation, import, token derivation)
- **Data plane**: High-throughput verification operations
- **Persistence layer**: Database abstraction with pluggable drivers
- **Cache layer**: Performance optimization with multiple backends

This separation allows independent scaling of components, different SLOs for different operations (admin targets \<100ms p99, data
plane targets \<3ms p99), and clear boundaries between responsibilities.

### Production-first design

Inspired by proven systems like SpiceDB and Kubernetes:

- Hard isolation between admin and data operations
- Comprehensive observability (metrics, traces, logs) built in from the start
- Graceful degradation and failure handling
- Zero-downtime deployments

### Performance by default

- Self-contained tokens (JWT/macaroon) enable stateless verification
- HMAC-SHA256 for fast revocation checks -- not bcrypt, which would limit throughput to ~10 req/sec per core
- LRU caching for hot paths
- Minimal allocations in the verification path

## System architecture

```
Clients (CLI, SDK, HTTP)
         |
         v
+----------------------------------+
|  HTTP Server (grpc-gateway)      |
|  Port: 4420                      |
+----------------------------------+
         |
         v
+----------------------------------+
|  Middleware                      |
|  Logging, Metrics, Tracing       |
+----------------------------------+
         |
   +-----+----------+
   |                 |
   v                 v
+-----------+  +-----------+
| Admin     |  | Data      |
| Plane     |  | Plane     |
| <100ms    |  | <3ms p99  |
+-----------+  +-----------+
   |                 |
   v                 v
+----------------------------------+
|  Service Layer                   |
|  Business logic, Validation      |
+----------------------------------+
         |
   +-----+----------+
   |                 |
   v                 v
+-----------+  +-----------+
| Persist.  |  | Cache     |
| SQLite    |  | Memory    |
| PG/MySQL  |  | LRU       |
| CRDB      |  | Redis     |
+-----------+  +-----------+
```

All requests enter through a single HTTP server built on grpc-gateway (port 4420) and pass through middleware for logging,
metrics, and tracing before being routed to the appropriate plane.

## Component overview

### HTTP server

The API layer uses grpc-gateway for HTTP/JSON routing with protobuf-based schemas. It serves both planes through a single port,
handles CORS and compression, and exposes OpenAPI documentation.

### Service layer

Business logic is split between the admin plane service (key lifecycle, import, token derivation, input validation) and the data
plane verifier (token parsing, signature verification, revocation checking, cache management). The verifier is optimized for the
hot path with minimal allocations.

### Persistence

Database access uses sqlc-generated type-safe queries with pluggable drivers:

- **SQLite** -- OSS edition, zero-config, suitable for millions of keys
- **PostgreSQL** -- production workloads
- **MySQL** -- production workloads
- **CockroachDB** -- distributed deployments

Schema changes are managed through versioned migrations using golang-migrate.

### Cache

The cache layer reduces database load on the verification path:

- **Memory LRU** (OSS) -- local to each instance, configurable size limits
- **Redis** (Commercial) -- distributed, supports cluster and sentinel modes
- **Hierarchical L1+L2** (Commercial) -- memory for speed, Redis for shared state

### Crypto

Talos supports multiple JWT signing algorithms and a separate API key hashing mechanism:

- **JWT signing algorithms**
- `Ed25519 (EdDSA)` -- default, fastest signing and smallest keys
- `RSA-2048/4096 (RS256)` -- legacy compatibility
- **API key hashing**
- `HMAC-SHA256` -- used for API key revocation checks (\<1ms with constant-time comparison)

The JWT signing algorithm is determined per JWK by its `alg` field, so one JWKS can contain keys for multiple signing algorithms
at the same time.

### Observability

Built-in instrumentation across three pillars:

- **Metrics** -- Prometheus exposition on port 4422 with request latency histograms and error rate counters
- **Tracing** -- OpenTelemetry with W3C Trace Context propagation, configurable sampling, OTLP and Jaeger exporters
- **Logging** -- structured JSON logging via slog with correlation IDs and contextual fields

## Scalability

### Small (\<1k RPS)

A single Talos instance handles both planes with SQLite and an in-memory LRU cache. No external dependencies required.

- OSS edition sufficient
- 1 CPU, 512MB RAM
- Cost: $5-10/month

### Medium (10-50k RPS)

Separate admin and data plane deployments behind a load balancer. PostgreSQL replaces SQLite for durability. Redis provides shared
caching across data plane instances.

- Commercial edition
- Auto-scaling for data plane
- Cost: $100-500/month

### Large (200k+ RPS)

A cluster of 10-50+ stateless data plane instances with auto-scaling, backed by a distributed Redis cache and PostgreSQL with read
replicas and connection pooling. Supports multi-region deployment.

- Commercial edition
- Regional data plane deployment
- Cost: $1-5k/month
