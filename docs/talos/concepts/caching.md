---
title: Caching and consistency
---

# Caching and consistency

Talos caches verification results to reduce database load and improve latency. The OSS edition ships a no-op cache; in-memory and
Redis backends are commercial-only — see [Caching](../operate/cache/index.md) for backend selection.

## How it works

When caching is enabled, the first verification request for a key hits the database. Subsequent requests within the cache TTL are
served from cache without a database lookup.

## Cache types

| Type   | Scope       | Use case                            |
| ------ | ----------- | ----------------------------------- |
| Memory | Per-process | Single node or per-instance caching |
| Redis  | Shared      | Multi-instance deployments          |

## Eventual consistency

Caching introduces eventual consistency for revocation:

1. Admin revokes a key via `POST /v2alpha1/admin/apiKeys/{key_id}:revoke`
2. The revocation takes effect in the database immediately
3. Cached verification results for that key remain valid until the cache entry expires
4. After TTL expiry, the next verification hits the database and returns `is_active: false`

## Cache bypass

To force a database lookup (bypassing cache), include the `Cache-Control: no-cache` header:

```bash
curl -X POST http://localhost:4420/v2alpha1/admin/apiKeys:verify \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d '{"credential": "..."}'
```

See the [quickstart revocation check](../quickstart/index.mdx) and the [curl SDK reference](../integrate/sdk/curl.md) for tested
examples using cache bypass.

## TTL guidelines

| TTL   | Trade-off                                         |
| ----- | ------------------------------------------------- |
| `1m`  | Fast revocation propagation, higher database load |
| `5m`  | Balanced (recommended default)                    |
| `30m` | Low database load, slower revocation propagation  |

See [Cache operations guide](../operate/cache/index.md) for configuration details.
