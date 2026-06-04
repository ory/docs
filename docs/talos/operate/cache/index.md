---
title: Cache
---

Ory Talos caches verification results to reduce database load and lower latency.

## Backends

Set the backend with `cache.type`. The default is `noop`. `memory` and `redis` require a commercial
license.

| Backend             | Edition    | Shared | Description                             |
| ------------------- | ---------- | ------ | --------------------------------------- |
| `noop`              | OSS        | N/A    | No caching (default)                    |
| [Memory](memory.md) | Commercial | No     | Per-process in-memory cache (ristretto) |
| [Redis](redis.md)   | Commercial | Yes    | Shared cache across instances           |

## Configuration

```yaml
cache:
  type: "memory" # "noop", "memory", or "redis"
  ttl: "5m" # Cache entry lifetime
```

`cache.type` is immutable and requires a server restart to change. `cache.ttl` is hot-reloadable:
changes apply to new cache writes without a restart.

## Consistency

Caching introduces eventual consistency. A revoked key keeps passing verification until its cache
entry expires (default: 5 minutes).

To force a fresh lookup, send `Cache-Control: no-cache` on the verification request. This skips the
cache read for that request.
