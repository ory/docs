---
title: Redis cache
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# Redis cache

Redis provides a shared cache across all Talos instances.

## Configuration

```yaml
cache:
  type: "redis"
  ttl: "5m"
  redis:
    addrs: ["redis:6379"]
    password: "secret"
    db: 0
    pool_size: 100
    timeout: "3s"
```

## Parameters

| Parameter   | Default              | Description           |
| ----------- | -------------------- | --------------------- |
| `addrs`     | `["localhost:6379"]` | Redis addresses       |
| `password`  | —                    | Redis password        |
| `db`        | `0`                  | Redis database number |
| `pool_size` | `100`                | Connection pool size  |
| `timeout`   | `3s`                 | Operation timeout     |

## When to use

Use Redis when running multiple Talos instances. A cache hit on one instance benefits all instances, reducing database load. Redis
is also required for [edge proxy](../deploy/edge-proxy.md) deployments where each edge node shares a regional Redis instance.
