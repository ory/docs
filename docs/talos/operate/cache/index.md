---
title: Cache
---

# Cache

Talos can cache verification results to reduce database load and improve latency.

## Backends

| Backend             | Edition    | Shared | Description                   |
| ------------------- | ---------- | ------ | ----------------------------- |
| `noop`              | OSS        | N/A    | No caching (default)          |
| [Memory](memory.md) | Commercial | No     | Per-process LRU cache         |
| [Redis](redis.md)   | Commercial | Yes    | Shared cache across instances |

## Configuration

```yaml
cache:
  type: "memory" # "noop", "memory", or "redis"
  ttl: "5m" # Cache entry lifetime
```

## Consistency

Caching introduces eventual consistency. A revoked key may continue to pass verification until the
cache entry expires (default: 5 minutes).

**Bypass cache:** Use `Cache-Control: no-cache` on verification requests to bypass the cache for
individual requests when immediate consistency is required.
