---
title: TLS configuration
---

# TLS configuration

Talos does not have built-in TLS support for its HTTP server. Use a reverse proxy (nginx, Envoy,
Caddy) for TLS termination:

```
Client --[HTTPS]--> Load Balancer --[HTTP]--> Talos
```

For database connection encryption, see the TLS section in each database guide:

- [PostgreSQL TLS](database/postgresql.md#tls--ssl)
- [MySQL TLS](database/mysql.md#tls--ssl)
- [CockroachDB TLS](database/cockroachdb.md#dsn-parameters-connection-pooling-and-tls)
