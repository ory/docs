---
title: TLS configuration
---

Ory Talos has no built-in TLS for its HTTP server. Terminate TLS at a reverse proxy such as nginx,
Envoy, or Caddy:

```text
Client --[HTTPS]--> Load Balancer --[HTTP]--> Talos
```

The plain-HTTP hop from the load balancer to Ory Talos must terminate on a trusted network —
loopback, a private VPC, or a service mesh (Istio, Linkerd) that re-encrypts traffic between pods.
Do not run that hop across the public internet.

## Database TLS

To encrypt database connections, see the TLS section in each database guide:

- [PostgreSQL TLS](database/postgresql.md#tls--ssl)
- [MySQL TLS](database/mysql.md#tls-and-ssl)
- [CockroachDB TLS](database/cockroachdb.md#dsn-parameters-connection-pooling-and-tls)

## Redis TLS

To connect the commercial cache and rate-limit backends to Redis over TLS, set
`cache.redis.tls.enabled: true`. This uses the system certificate pool for verification. Talos does
not expose certificate-pinning or custom-CA options today.

```yaml
cache:
  type: redis
  redis:
    addrs: ["redis.internal:6380"]
    tls:
      enabled: true
```
