---
title: Configure
description: Configuration reference for Ory Talos
---

Configure Ory Talos through a YAML file passed with the `--config` flag. Override any setting with `TALOS_`-prefixed environment
variables (for example, `TALOS_DB_DSN` overrides `db.dsn`). The `--config` flag is the only configuration-related CLI flag;
per-key flags don't exist. See the [configuration reference](../reference/config.mdx) for every key, type, default, environment
variable mapping, and the precedence rules.

## Hot-reload

Ory Talos watches the config file for changes. Some settings reload automatically; others require a restart.

**Hot-reloadable** (read per request through the config provider):

- `credentials.api_keys.default_ttl` / `max_ttl`
- `credentials.api_keys.prefix.current` / `retired`
- `credentials.api_keys.prefix.public_current` / `public_retired`
- `credentials.derived_tokens.default_ttl`
- `credentials.derived_tokens.macaroon.prefix.current` / `retired`
- `credentials.issuer`, `credentials.issuer_retired`
- `credentials.clock_skew`
- `secrets.hmac.current` / `retired`
- `cache.ttl`
- `serve.http.cors.*`
- `serve.http.client_ip_source`
- `serve.http.request_log.exclude_health_endpoints`
- `rate_limit.enabled` (commercial; OSS exposes the metadata field but doesn't enforce it)

**Requires restart** (the configx immutable list, plus keys marked immutable in the schema):

- `db.dsn`, `tls.key`, `redis.password` (configx-enforced immutables)
- `serve.http.host` / `port`
- `serve.http.trust_forwarded_host`
- `serve.metrics.host` / `port` (Commercial only)
- `cache.type` and connection settings (entire `cache.memory.*` block; `cache.redis.*` except `pool_size` and `timeout`, which
  reload without restart)
- `multitenancy.enabled` / `multitenancy.networks` (Commercial only — adding tenants requires a restart; Talos hot-reloads
  per-tenant config files referenced by `config_path`)
- `rate_limit.backend`
- `last_used.queue_size` / `flush_size` / `flush_interval` / `num_workers`
- `log.level` / `format`
- `tracing.*` (Commercial only)

## Duration syntax

All duration values (TTLs, timeouts, and intervals) are Go duration strings. Combine one or more unsigned numbers with a unit,
with no spaces. Supported units:

| Unit | Meaning      |
| ---- | ------------ |
| `ns` | nanoseconds  |
| `us` | microseconds |
| `µs` | microseconds |
| `ms` | milliseconds |
| `s`  | seconds      |
| `m`  | minutes      |
| `h`  | hours        |

Examples: `500ms`, `30s`, `5m`, `1h30m`, and `8760h` (one year). Talos has no unit for days, weeks, months, or years. Express
those in hours: `24h` (one day), `168h` (one week), `8760h` (one year).

## Minimal configuration

```yaml
credentials:
  issuer: "https://api.example.com"
secrets:
  hmac:
    current: "change-me-to-a-32-or-more-character-hmac-secret"
db:
  dsn: "sqlite://./data/talos.db"
```

Schema validation rejects any `secrets.hmac.current` or `secrets.hmac.retired[]` value shorter than 32 characters
(`minLength: 32`). Generate one with:

```bash
openssl rand -base64 48 | tr -d '\n+/=' | cut -c1-64
```

## Production configuration

The `serve.metrics.*`, `cache.*`, `rate_limit.*`, and `tracing.*` blocks take effect only in commercial builds
(`-tags commercial`). The OSS edition serves health endpoints on the metrics listener but not Prometheus metrics.

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
    default_ttl: "1h" # Applies to both JWT and macaroon tokens
    jwt:
      signing_key_id: "" # Optional JWK kid hint; defaults to the first key with use="sig"
      signing_keys:
        # Talos accepts only base64:// JWKS literals; file://, https://, and http:// schemes are
        # rejected by schema validation. To produce the value below, run:
        #   base64 < /etc/talos/jwks.json | tr -d '\n'
        urls:
          - "base64://eyJrZXlzIjpbXX0="

db:
  # postgres/cockroach use pgxpool query parameters: pool_max_conns, pool_min_conns,
  # pool_max_conn_lifetime, pool_max_conn_idle_time.
  dsn: "postgres://talos:secret@db:5432/talos?pool_max_conns=25&pool_max_conn_lifetime=5m"

cache: # Commercial only
  type: "redis"
  ttl: "5m"
  redis:
    addrs: ["redis:6379"]
    password: "secret"
    pool_size: 100
    timeout: "3s"

rate_limit: # Commercial only — OSS exposes the field but does not enforce it
  enabled: true
  backend: redis # "memory" for single-pod, "redis" for multi-pod

secrets:
  # secrets.hmac.current and every secrets.hmac.retired[] entry must be at least
  # 32 characters (schema minLength: 32). Use 64 random characters for new
  # deployments.
  hmac:
    current: "change-me-64-chars-of-base64ish-randomness-do-not-reuse-elsewhere"

log:
  level: "info"
  format: "json"

tracing: # Commercial only
  enabled: true
  service_name: "talos"
  exporter: "otlp"
  endpoint: "otel-collector:4317"
  sample_rate: 0.01
```

For every key, type, default, and environment variable mapping, see the [configuration reference](../reference/config.mdx).
