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
    addrs: ["redis-0:6379", "redis-1:6379", "redis-2:6379"]
    password: "secret"
    db: 0
    pool_size: 100
    min_idle_conns: 2
    conn_max_idle_time: "5m"
    conn_max_lifetime: "30m"
    timeout: "3s"
    tls:
      enabled: true
```

## Parameters

| Parameter            | Default              | Range / format                  | Description                                                                     |
| -------------------- | -------------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `addrs`              | `["localhost:6379"]` | One or more `host:port` entries | Redis server addresses. Multiple entries enable cluster or sentinel topologies. |
| `password`           | —                    | Any string                      | Redis password. Leave empty for unauthenticated Redis.                          |
| `db`                 | `0`                  | `0`–`15`                        | Logical Redis database. Cluster mode only supports `0`.                         |
| `pool_size`          | `100`                | `1`–`1000`                      | Maximum number of connections per address.                                      |
| `min_idle_conns`     | `2`                  | `≥ 0`                           | Minimum idle connections kept open per address. Reduces cold-start latency.     |
| `conn_max_idle_time` | `5m`                 | Go duration string              | Maximum time a connection can sit idle before being closed.                     |
| `conn_max_lifetime`  | `30m`                | Go duration string              | Maximum time a connection can be reused before being recycled.                  |
| `timeout`            | `3s`                 | Go duration string              | Timeout for individual Redis operations (`GET`, `SET`, etc.).                   |
| `tls.enabled`        | `false`              | Boolean                         | Enable TLS using the system certificate pool. Required for TLS-only Redis.      |

All Redis parameters are immutable: changing them requires a server restart. Only `pool_size` and `timeout` can be tuned without
restart.

## Cluster and sentinel topologies

Pass every node in `addrs`. The client auto-detects the topology:

```yaml
# Redis Cluster (3+ nodes)
addrs:
  - "redis-cluster-0.svc:6379"
  - "redis-cluster-1.svc:6379"
  - "redis-cluster-2.svc:6379"

# Redis Sentinel (3+ sentinels)
addrs:
  - "sentinel-0.svc:26379"
  - "sentinel-1.svc:26379"
  - "sentinel-2.svc:26379"
```

In cluster mode, `db` must be `0` — Redis Cluster does not support multiple logical databases.

## TLS

Set `tls.enabled: true` when the Redis endpoint terminates TLS. Talos uses the operating system's certificate pool to verify the
server certificate. Self-signed or private CA deployments must add the CA to the OS trust store on every Talos node — there is no
per-process CA bundle option.

## Connection pool sizing

The defaults (`pool_size: 100`, `min_idle_conns: 2`, `conn_max_lifetime: 30m`) suit most deployments. Tune them only when you can
show a problem:

- **Saturated pool:** if `redis_pool_wait_seconds` (when exposed by your client metrics) is consistently non-zero, increase
  `pool_size`.
- **Connection churn:** if Redis logs show frequent connect/disconnect from Talos, increase `min_idle_conns`.
- **Stale connections after failover:** lower `conn_max_lifetime` to force quicker rotation.

Do not set `pool_size` above your Redis server's `maxclients` divided by the number of Talos instances — running out of Redis
connections fails open with a cache miss but spams logs.

## When to use

Use Redis when running multiple Talos instances. A cache hit on one instance benefits all instances, reducing database load. Redis
is also required for [edge proxy](../deploy/edge-proxy.md) deployments where each edge node shares a regional Redis instance.
