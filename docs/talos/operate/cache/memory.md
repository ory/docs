---
title: In-memory cache
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

The in-memory cache stores verification results inside each Ory Talos process. It uses
[ristretto](https://github.com/dgraph-io/ristretto) with TinyLFU admission and sampled LFU eviction.

## Configuration

```yaml
cache:
  type: "memory"
  ttl: "5m"
  memory:
    max_size: 104857600 # Maximum cache size in bytes (100 MiB)
    num_counters: 10000 # Counters for TinyLFU frequency estimation
```

`cache.type` and the entire `cache.memory.*` block are immutable. Changes require a server restart
to take effect.

## Characteristics

- **Per-process**: Each Ory Talos instance has its own cache. It isn't shared across instances.
- **Bounded by `max_size`**: When the cache reaches `max_size` bytes, TinyLFU admission and sampled
  LFU eviction decide which entries to keep.
- **TTL-based expiry**: Entries expire after the configured `ttl`.
- **No external dependencies**: The cache runs in the Talos process, with no network round trips.

## When to use

Use the in-memory cache for single-node deployments, or when each instance handles enough traffic to
benefit from local caching on its own. For multi-instance deployments, use [Redis](redis.md) to
share a cache across all instances.
