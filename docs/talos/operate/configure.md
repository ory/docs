---
title: Configure
description: Configuration reference for Ory Talos
---

# Configure

Talos is configured through a YAML file passed via the `--config` flag. All settings can also be set through environment variables
or CLI flags. See the [Configuration reference](../reference/config.md) for the complete list of keys, types, defaults,
environment variable mappings, and precedence rules.

## Hot-reload

Talos watches the config file for changes. Some settings reload automatically, others require a restart.

**Hot-reloadable:**

- `credentials.api_keys.default_ttl` / `max_ttl`
- `credentials.api_keys.prefix.current` / `retired`
- `credentials.derived_tokens.default_ttl`
- `credentials.derived_tokens.macaroon.prefix.current` / `retired`
- `rate_limit.enabled`

**Requires restart** (marked with `x-immutable` in the schema):

- `serve.http.host` / `port`
- `serve.metrics.host` / `port`
- `db.dsn`
- `cache.type` and all cache settings
- `rate_limit.backend`
- `log.level` / `format`
- `tracing.*`

## Minimal configuration

```yaml
credentials:
  issuer: "https://api.example.com"
secrets:
  default:
    current: "a-32-byte-or-longer-secret-here!"
db:
  dsn: "sqlite:///var/lib/talos/data.db"
```

## Production configuration

```yaml
serve:
  http:
    host: "0.0.0.0"
    port: 4420
    cors:
      enabled: true
      allowed_origins: ["https://app.example.com"]
    request_log:
      exclude_health_endpoints: true
  metrics:
    host: "0.0.0.0"
    port: 4422

credentials:
  issuer: "https://api.example.com"
  api_keys:
    default_ttl: "2160h" # 90 days
    max_ttl: "8760h" # 1 year
    prefix:
      current: "talos"
  derived_tokens:
    jwt:
      algorithm: "EdDSA"
      default_ttl: "1h"
      signing_keys:
        urls:
          - "file:///etc/talos/jwks.json"

db:
  dsn: "postgres://talos:secret@db:5432/talos?max_conns=25&max_conn_lifetime=5m"

cache:
  type: "redis" # Commercial only
  ttl: "5m"
  redis:
    addrs: ["redis:6379"]
    password: "secret"
    pool_size: 100
    timeout: "3s"

rate_limit: # Commercial only
  enabled: true
  backend: redis # "memory" for single-pod, "redis" for multi-pod

secrets:
  default:
    current: "a-32-byte-or-longer-secret-here!"

log:
  level: "info"
  format: "json"

tracing:
  enabled: true
  service_name: "talos"
  exporter: "otlp"
  endpoint: "jaeger:4317"
  sample_rate: 0.01
```

See the [Configuration reference](../reference/config.md) for all available keys with types, defaults, and environment variable
mappings.
