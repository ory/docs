---
title: Configure
description: Configuration reference for Ory Talos
---

# Configure

Talos is configured through a YAML file passed via the `--config` flag. All settings can also be set through environment variables
or CLI flags. See the [Configuration reference](../reference/config.mdx) for the complete list of keys, types, defaults,
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
- `serve.metrics.host` / `port` (Commercial only)
- `db.dsn`
- `cache.type` and all cache settings
- `rate_limit.backend`
- `log.level` / `format`
- `tracing.*` (Commercial only)

## Duration syntax

All duration values (TTLs, timeouts, intervals) are Go duration strings. Combine one or more unsigned numbers with a unit, no
spaces. Supported units:

| Unit | Meaning      |
| ---- | ------------ |
| `ns` | nanoseconds  |
| `us` | microseconds |
| `µs` | microseconds |
| `ms` | milliseconds |
| `s`  | seconds      |
| `m`  | minutes      |
| `h`  | hours        |

Examples: `500ms`, `30s`, `5m`, `1h30m`, `8760h` (one year). Days, weeks, months, and years are **not** supported — express them
in hours (`24h`, `168h`, `8760h`).

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
  metrics: # Commercial only
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
      signing_key_id: "" # Optional JWKS kid hint; defaults to the first usable signing key
      default_ttl: "1h"
      signing_keys:
        # Talos requires base64-encoded JWKS. To produce the value below, run:
        #   base64 < /etc/talos/jwks.json | tr -d '\n'
        urls:
          - "base64://eyJrZXlzIjpbXX0="

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

tracing: # Commercial only
  enabled: true
  service_name: "talos"
  exporter: "otlp"
  endpoint: "jaeger:4317"
  sample_rate: 0.01
```

See the [Configuration reference](../reference/config.mdx) for all available keys with types, defaults, and environment variable
mappings.
