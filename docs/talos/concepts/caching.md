---
title: Caching and consistency
---

Talos caches verification results to reduce database load and improve latency. The OSS edition ships
a no-op cache. In-memory and Redis backends are commercial-only — see
[Caching](../operate/cache/index.md) for backend selection.

## How it works

When you enable caching, the first verification request for a key hits the database. Talos serves
later requests from the cache until the TTL expires, without a database lookup.

Derived JWT and macaroon tokens are never cached. Talos verifies them on every request.

## Cache types

| Type   | Scope       | Use case                            |
| ------ | ----------- | ----------------------------------- |
| Memory | Per-process | Single node or per-instance caching |
| Redis  | Shared      | Multi-instance deployments          |

## Invalidation on admin changes

Admin mutations invalidate the cached verification result for the affected key immediately, so a
change takes effect without waiting for the cache TTL. This covers revoke, update, rotate, and
delete of both issued and imported keys.

How immediate the change is depends on the cache backend:

| Backend  | Invalidation scope                                                                     |
| -------- | -------------------------------------------------------------------------------------- |
| `redis`  | Cluster-wide and immediate — every instance shares the same store.                     |
| `memory` | Immediate on the instance that processed the change; other instances wait for the TTL. |

For a multi-instance deployment that needs immediate admin revocation across all instances, use the
shared `redis` backend. With the per-process `memory` backend, a revoked key can still verify on
other instances until their cached entry expires (bounded by `cache.ttl`).

Self-service revocation uses the same invalidation path as admin changes: the cached entry is
evicted by `key_id`, so the same backend scope applies — immediate on the instance that handles it
and cluster-wide with `redis`, bounded by the TTL on other instances with the `memory` backend.

## Eventual consistency with the memory backend

With the `memory` backend across multiple instances, revocation is still bounded by the cache TTL on
instances other than the one that processed the change:

1. An admin revokes a key through `POST /v2alpha1/admin/issuedApiKeys/{key_id}:revoke` (or
   `POST /v2alpha1/admin/importedApiKeys/{key_id}:revoke` for imported keys).
2. The revocation takes effect in the database immediately.
3. The instance that processed the request evicts its cached entry immediately.
4. Other instances keep their own cached result until the entry expires.
5. After the TTL expires, the next verification hits the database and returns `is_valid: false` with
   a verification error code.

To get immediate consistency for a single request on any instance, bypass the cache with
`Cache-Control: no-cache`.

## Cache bypass

Talos honors three bypass directives on verify requests:

| Header                    | Effect                                                    |
| ------------------------- | --------------------------------------------------------- |
| `Cache-Control: no-cache` | Skips the cache read. Talos still writes the result back. |
| `Cache-Control: no-store` | Skips both the cache read and the write-back.             |
| `Pragma: no-cache`        | HTTP/1.0 alias for `Cache-Control: no-cache`.             |

Talos matches directives case-insensitively, per RFC 7234. This request forces a database lookup:

```shell
curl -X POST http://localhost:4420/v2alpha1/admin/apiKeys:verify \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d '{"credential": "..."}'
```

See the [quickstart revocation check](../quickstart/open-source.mdx) and the
[curl SDK reference](../integrate/sdk/curl.md) for tested examples using cache bypass.

## TTL guidelines

The `cache.ttl` setting accepts a Go duration string (default `5m`). Talos ships no presets. The
values below are advisory starting points for the trade-off between revocation latency and database
load. Tune them to your workload.

| TTL   | Trade-off                                         |
| ----- | ------------------------------------------------- |
| `1m`  | Fast revocation propagation, higher database load |
| `5m`  | Balanced starting point                           |
| `30m` | Low database load, slower revocation propagation  |

See the [cache operations guide](../operate/cache/index.md) for configuration details.
