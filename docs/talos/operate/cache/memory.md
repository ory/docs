---
title: In-memory cache
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# In-memory cache

The in-memory cache stores verification results in the Talos process using a ristretto-based LRU cache.

## Configuration

```yaml
cache:
  type: "memory"
  ttl: "5m"
  memory:
    max_size: 104857600 # 100MB
    num_counters: 10000 # Frequency estimation counters
```

## Characteristics

- **Per-process**: Each Talos instance has its own cache. Not shared across instances.
- **LRU eviction**: Least-recently-used entries are evicted when the cache reaches `max_size`.
- **TTL-based expiry**: Entries expire after the configured `ttl`.
- **Zero network overhead**: No external dependencies.

## When to use

Use the in-memory cache for single-node deployments or when each Talos instance handles enough traffic to benefit from local
caching. For multi-instance deployments, consider [Redis](redis.md) for shared cache across all instances.
