---
title: Redis cache
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

Redis gives every Ory Talos instance a shared cache. A cache hit on one instance serves all
instances, which cuts database load.

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

| Parameter            | Default              | Range / format                  | Description                                                                                     |
| -------------------- | -------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `addrs`              | `["localhost:6379"]` | One or more `host:port` entries | Redis server addresses. A single entry uses standalone mode; multiple entries use cluster mode. |
| `password`           | —                    | Any string                      | Redis password. Leave empty for unauthenticated Redis.                                          |
| `db`                 | `0`                  | `0`–`15`                        | Logical Redis database. Cluster mode only supports `0`.                                         |
| `pool_size`          | `100`                | `1`–`1000`                      | Maximum number of connections per address.                                                      |
| `min_idle_conns`     | `2`                  | `≥ 0`                           | Minimum idle connections kept open per address. Reduces cold-start latency.                     |
| `conn_max_idle_time` | `5m`                 | Go duration string              | Maximum time a connection sits idle before Talos closes it.                                     |
| `conn_max_lifetime`  | `30m`                | Go duration string              | Maximum time Talos reuses a connection before recycling it.                                     |
| `timeout`            | `3s`                 | Go duration string              | Applied to each dial, read, and write operation.                                                |
| `tls.enabled`        | `false`              | Boolean                         | Enable TLS using the system certificate pool. Required for TLS-only Redis.                      |

Most Redis parameters are immutable and take a server restart to change. Only `pool_size` and
`timeout` can change without a restart.

## Cluster topology

List every cluster node in `addrs`. A single entry uses standalone mode; multiple entries use
cluster mode:

```yaml
# Redis Cluster (3+ nodes)
addrs:
  - "redis-cluster-0.svc:6379"
  - "redis-cluster-1.svc:6379"
  - "redis-cluster-2.svc:6379"
```

In cluster mode, `db` must be `0` — Redis Cluster doesn't support multiple logical databases.

Talos doesn't support Sentinel topologies: the configuration doesn't expose a sentinel master name.
Front Sentinel with a stable hostname or load balancer and point `addrs` at that endpoint instead.

## TLS

Set `tls.enabled: true` when the Redis endpoint terminates TLS. Ory Talos verifies the server
certificate against the operating system's certificate pool and requires TLS 1.2 or higher. For
self-signed or private CA deployments, add the CA to the OS trust store on every Ory Talos node.
There's no per-process CA bundle option.

## Connection pool sizing

The defaults (`pool_size: 100`, `min_idle_conns: 2`, `conn_max_lifetime: 30m`) suit most
deployments. Tune them only when you can show a problem:

- **Saturated pool:** if Ory Talos logs show repeated `redis: connection pool timeout` errors,
  increase `pool_size` or lower the request rate per instance.
- **Connection churn:** if Redis logs show frequent connect and disconnect events from Ory Talos,
  increase `min_idle_conns`.
- **Stale connections after failover:** lower `conn_max_lifetime` to rotate connections sooner.

Keep `pool_size` at or below your Redis server's `maxclients` divided by the number of Ory Talos
instances. When Ory Talos can't reach Redis, verification falls back to the database for that
request and logs the failure.

## When to use

Use Redis when you run more than one Ory Talos instance, so a cache hit on any instance serves the
rest. The [edge proxy](../deploy/edge-proxy.mdx) does not use Redis; each proxy keeps its own local
in-memory cache.
