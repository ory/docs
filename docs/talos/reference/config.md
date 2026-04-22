---
title: Configuration reference
description: Auto-generated configuration reference from JSON Schema
---

# Configuration reference

This page is auto-generated from the [configuration schema](https://github.com/ory/talos/blob/main/spec/config.schema.json).

Required top-level keys: `credentials`, `secrets`

## Environment variables

Every configuration key can be set via an environment variable. Talos uses the `TALOS_` prefix and converts dot-separated config
paths to uppercase with underscores:

```
TALOS_<SECTION>_<KEY>
```

Replace dots (`.`) with underscores (`_`) and convert to uppercase. For example, `serve.http.port` becomes
`TALOS_SERVE_HTTP_PORT`.

### Array values

For array-typed config keys (like `secrets.hmac.retired`), use comma separation or indexed variables:

```bash
# Comma-separated
export TALOS_SECRETS_HMAC_RETIRED="old-secret-1,old-secret-2"

# Or indexed
export TALOS_SECRETS_HMAC_RETIRED_0="old-secret-1"
export TALOS_SECRETS_HMAC_RETIRED_1="old-secret-2"
```

### Precedence

Configuration sources are applied in this order (highest priority first):

1. Environment variables
2. Configuration file (`--config` flag)
3. Default values

Environment variables always override file-based configuration.

### Required variables

At minimum, these must be set (via env var or config file):

| Variable                        | Description                                       |
| ------------------------------- | ------------------------------------------------- |
| `TALOS_SECRETS_DEFAULT_CURRENT` | Default secret for HMAC operations (min 32 chars) |
| `TALOS_CREDENTIALS_ISSUER`      | Token issuer (`iss` claim) for derived tokens     |

## `cache` Commercial

Cache configuration.

| Key                              | Type                      | Default              | Env Var                                | Description                                                                                   |
| -------------------------------- | ------------------------- | -------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `cache.memory.max_size`          | integer                   | `104857600`          | `TALOS_CACHE_MEMORY_MAX_SIZE`          | Maximum memory usage in bytes. (restart required, Commercial)                                 |
| `cache.memory.num_counters`      | integer                   | `10000`              | `TALOS_CACHE_MEMORY_NUM_COUNTERS`      | Number of counters for frequency estimation. (restart required, Commercial)                   |
| `cache.redis.addrs`              | string[]                  | `["localhost:6379"]` | `TALOS_CACHE_REDIS_ADDRS`              | Redis server addresses (supports cluster/sentinel). (restart required, Commercial)            |
| `cache.redis.conn_max_idle_time` | string                    | `5m`                 | `TALOS_CACHE_REDIS_CONN_MAX_IDLE_TIME` | Maximum duration a connection may be idle before being closed. (restart required, Commercial) |
| `cache.redis.conn_max_lifetime`  | string                    | `30m`                | `TALOS_CACHE_REDIS_CONN_MAX_LIFETIME`  | Maximum duration a connection may be reused. (restart required, Commercial)                   |
| `cache.redis.db`                 | integer                   | `0`                  | `TALOS_CACHE_REDIS_DB`                 | Redis database number. (restart required, Commercial)                                         |
| `cache.redis.min_idle_conns`     | integer                   | `2`                  | `TALOS_CACHE_REDIS_MIN_IDLE_CONNS`     | Minimum number of idle connections kept open. (restart required, Commercial)                  |
| `cache.redis.password`           | string                    | —                    | `TALOS_CACHE_REDIS_PASSWORD`           | Redis password. (restart required, Commercial)                                                |
| `cache.redis.pool_size`          | integer                   | `100`                | `TALOS_CACHE_REDIS_POOL_SIZE`          | Connection pool size (Commercial)                                                             |
| `cache.redis.timeout`            | string                    | `3s`                 | `TALOS_CACHE_REDIS_TIMEOUT`            | Redis operation timeout (duration string) (Commercial)                                        |
| `cache.redis.tls.enabled`        | boolean                   | `false`              | `TALOS_CACHE_REDIS_TLS_ENABLED`        | Enable TLS using the system certificate pool. (restart required, Commercial)                  |
| `cache.ttl`                      | string                    | `5m`                 | `TALOS_CACHE_TTL`                      | Default cache TTL (duration string). (Commercial)                                             |
| `cache.type`                     | `memory`, `redis`, `noop` | `noop`               | `TALOS_CACHE_TYPE`                     | Cache implementation type. (restart required, Commercial)                                     |

## `credentials`

Credential configuration for API keys and derived tokens (JWT, macaroon).

| Key                                                  | Type             | Default  | Env Var                                                    | Description                                                                                                                         |
| ---------------------------------------------------- | ---------------- | -------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `credentials.api_keys.default_ttl`                   | string           | —        | `TALOS_CREDENTIALS_API_KEYS_DEFAULT_TTL`                   | Default API key TTL (duration string).                                                                                              |
| `credentials.api_keys.max_ttl`                       | string           | `8760h`  | `TALOS_CREDENTIALS_API_KEYS_MAX_TTL`                       | Maximum age for API keys with timestamps.                                                                                           |
| `credentials.api_keys.prefix.current`                | string           | `ory_ak` | `TALOS_CREDENTIALS_API_KEYS_PREFIX_CURRENT`                | Current prefix used for new API key generation.                                                                                     |
| `credentials.api_keys.prefix.public_current`         | string           | —        | `TALOS_CREDENTIALS_API_KEYS_PREFIX_PUBLIC_CURRENT`         | Current prefix used for new PUBLIC API key generation.                                                                              |
| `credentials.api_keys.prefix.public_retired`         | string[]         | `[]`     | `TALOS_CREDENTIALS_API_KEYS_PREFIX_PUBLIC_RETIRED`         | Retired public prefixes accepted during verification for migration purposes.                                                        |
| `credentials.api_keys.prefix.retired`                | string[]         | `[]`     | `TALOS_CREDENTIALS_API_KEYS_PREFIX_RETIRED`                | Retired prefixes accepted during verification for migration purposes.                                                               |
| `credentials.clock_skew`                             | string           | `5m`     | `TALOS_CREDENTIALS_CLOCK_SKEW`                             | Maximum clock skew tolerance for timestamp and token validation.                                                                    |
| `credentials.derived_tokens.default_ttl`             | string           | `1h`     | `TALOS_CREDENTIALS_DERIVED_TOKENS_DEFAULT_TTL`             | Default derived token TTL applied to both JWT and macaroon tokens when no explicit TTL is provided in the request (duration string) |
| `credentials.derived_tokens.jwt.algorithm`           | `EdDSA`, `RS256` | `EdDSA`  | `TALOS_CREDENTIALS_DERIVED_TOKENS_JWT_ALGORITHM`           | Token signing algorithm.                                                                                                            |
| `credentials.derived_tokens.jwt.signing_keys.urls`   | string[]         | `[]`     | `TALOS_CREDENTIALS_DERIVED_TOKENS_JWT_SIGNING_KEYS_URLS`   | List of JWKS resources.                                                                                                             |
| `credentials.derived_tokens.macaroon.prefix.current` | string           | `mc`     | `TALOS_CREDENTIALS_DERIVED_TOKENS_MACAROON_PREFIX_CURRENT` | Current prefix used for new macaroon token generation.                                                                              |
| `credentials.derived_tokens.macaroon.prefix.retired` | string[]         | `[]`     | `TALOS_CREDENTIALS_DERIVED_TOKENS_MACAROON_PREFIX_RETIRED` | Retired prefixes accepted during macaroon verification for rotation purposes.                                                       |
| `credentials.issuer`                                 | string           | —        | `TALOS_CREDENTIALS_ISSUER`                                 | Token issuer (iss claim) for derived tokens. (min 1 chars)                                                                          |
| `credentials.issuer_retired`                         | string[]         | `[]`     | `TALOS_CREDENTIALS_ISSUER_RETIRED`                         | Retired issuer URLs accepted during token verification.                                                                             |

## `db` (restart required)

Database configuration.

| Key      | Type   | Default | Env Var        | Description                                                                                           |
| -------- | ------ | ------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `db.dsn` | string | —       | `TALOS_DB_DSN` | Database connection string with scheme and optional query parameters. (restart required, min 1 chars) |

## `last_used` (restart required)

Configuration for batched last_used_at timestamp updates.

| Key                        | Type    | Default | Env Var                          | Description                                                                     |
| -------------------------- | ------- | ------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `last_used.flush_interval` | string  | `30s`   | `TALOS_LAST_USED_FLUSH_INTERVAL` | Maximum time between batch flushes (Go duration string, e.g. (restart required) |
| `last_used.flush_size`     | integer | `100`   | `TALOS_LAST_USED_FLUSH_SIZE`     | Number of updates per shard that triggers a batch flush. (restart required)     |
| `last_used.num_workers`    | integer | `4`     | `TALOS_LAST_USED_NUM_WORKERS`    | Number of goroutines processing last-used batches. (restart required)           |
| `last_used.queue_size`     | integer | `10000` | `TALOS_LAST_USED_QUEUE_SIZE`     | Buffer size for the async last-used update queue. (restart required)            |

## `log` (restart required)

Logging configuration.

| Key          | Type                             | Default | Env Var            | Description                    |
| ------------ | -------------------------------- | ------- | ------------------ | ------------------------------ |
| `log.format` | `json`, `text`                   | `json`  | `TALOS_LOG_FORMAT` | Log format. (restart required) |
| `log.level`  | `debug`, `info`, `warn`, `error` | `info`  | `TALOS_LOG_LEVEL`  | Log level. (restart required)  |

## `multitenancy` Commercial (restart required)

Multi-tenancy configuration.

| Key                     | Type     | Default | Env Var                       | Description                                                   |
| ----------------------- | -------- | ------- | ----------------------------- | ------------------------------------------------------------- |
| `multitenancy.enabled`  | boolean  | `false` | `TALOS_MULTITENANCY_ENABLED`  | Enable multi-tenancy support. (restart required, Commercial)  |
| `multitenancy.networks` | object[] | `[]`    | `TALOS_MULTITENANCY_NETWORKS` | Network routing configuration. (restart required, Commercial) |

## `rate_limit` Commercial

Rate limit enforcement for API keys with a RateLimitPolicy.

| Key                  | Type              | Default  | Env Var                    | Description                                     |
| -------------------- | ----------------- | -------- | -------------------------- | ----------------------------------------------- |
| `rate_limit.backend` | `memory`, `redis` | `memory` | `TALOS_RATE_LIMIT_BACKEND` | Counter backend. (restart required, Commercial) |
| `rate_limit.enabled` | boolean           | `false`  | `TALOS_RATE_LIMIT_ENABLED` | Enable rate limit enforcement. (Commercial)     |

## `secrets`

Centralized secrets management.

| Key                          | Type     | Default | Env Var                            | Description                                                                                                         |
| ---------------------------- | -------- | ------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `secrets.default.current`    | string   | —       | `TALOS_SECRETS_DEFAULT_CURRENT`    | Current default secret for all components without specific overrides (min 32 chars)                                 |
| `secrets.default.retired`    | string[] | `[]`    | `TALOS_SECRETS_DEFAULT_RETIRED`    | Retired default secrets that remain valid for verification during rotation                                          |
| `secrets.hmac.current`       | string   | —       | `TALOS_SECRETS_HMAC_CURRENT`       | Current HMAC secret for new key generation and checksum verification (min 32 chars)                                 |
| `secrets.hmac.retired`       | string[] | `[]`    | `TALOS_SECRETS_HMAC_RETIRED`       | Retired HMAC secrets that remain valid for verification during rotation                                             |
| `secrets.pagination.current` | string   | —       | `TALOS_SECRETS_PAGINATION_CURRENT` | Secret used to sign and encrypt pagination tokens. (min 32 chars)                                                   |
| `secrets.pagination.retired` | string[] | `[]`    | `TALOS_SECRETS_PAGINATION_RETIRED` | List of retired pagination secrets that should remain valid for decoding legacy page tokens during secret rotation. |

## `serve`

Server configuration for HTTP and metrics endpoints.

| Key                                               | Type                                                                                                                                                                                                     | Default                                 | Env Var                                                 | Description                                                                                                                                                                                                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `serve.http.client_ip_source`                     | `CLIENT_IP_SOURCE_UNSPECIFIED`, `CLIENT_IP_SOURCE_REMOTE_ADDR`, `CLIENT_IP_SOURCE_CF_CONNECTING_IP`, `CLIENT_IP_SOURCE_X_FORWARDED_FOR`, `CLIENT_IP_SOURCE_X_REAL_IP`, `CLIENT_IP_SOURCE_TRUE_CLIENT_IP` | `CLIENT_IP_SOURCE_UNSPECIFIED`          | `TALOS_SERVE_HTTP_CLIENT_IP_SOURCE`                     | Determines which HTTP header or connection property is used to resolve the client IP for IP restriction checks. Must match your infrastructure topology. Default (unspecified) uses the TCP remote address. Hot-reloadable: read dynamically per request. |
| `serve.http.cors.allow_credentials`               | boolean                                                                                                                                                                                                  | `false`                                 | `TALOS_SERVE_HTTP_CORS_ALLOW_CREDENTIALS`               | Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.                                                                                                                             |
| `serve.http.cors.allowed_headers`                 | string[]                                                                                                                                                                                                 | `["Authorization","Content-Type"]`      | `TALOS_SERVE_HTTP_CORS_ALLOWED_HEADERS`                 | A list of non simple headers the client is allowed to use with cross-domain requests. (min 1 chars)                                                                                                                                                       |
| `serve.http.cors.allowed_methods`                 | string[]                                                                                                                                                                                                 | `["GET","POST","PUT","PATCH","DELETE"]` | `TALOS_SERVE_HTTP_CORS_ALLOWED_METHODS`                 | A list of methods the client is allowed to use with cross-domain requests.                                                                                                                                                                                |
| `serve.http.cors.allowed_origins`                 | string[]                                                                                                                                                                                                 | `["*"]`                                 | `TALOS_SERVE_HTTP_CORS_ALLOWED_ORIGINS`                 | A list of origins a cross-domain request can be executed from.                                                                                                                                                                                            |
| `serve.http.cors.debug`                           | boolean                                                                                                                                                                                                  | `false`                                 | `TALOS_SERVE_HTTP_CORS_DEBUG`                           | Set to true to debug server side CORS issues.                                                                                                                                                                                                             |
| `serve.http.cors.enabled`                         | boolean                                                                                                                                                                                                  | `false`                                 | `TALOS_SERVE_HTTP_CORS_ENABLED`                         | If set to true, CORS will be enabled and preflight-requests (OPTION) will be answered.                                                                                                                                                                    |
| `serve.http.cors.exposed_headers`                 | string[]                                                                                                                                                                                                 | `["Content-Type"]`                      | `TALOS_SERVE_HTTP_CORS_EXPOSED_HEADERS`                 | Indicates which headers are safe to expose to the API of a CORS API specification (min 1 chars)                                                                                                                                                           |
| `serve.http.cors.max_age`                         | number                                                                                                                                                                                                   | `0`                                     | `TALOS_SERVE_HTTP_CORS_MAX_AGE`                         | Indicates how long (in seconds) the results of a preflight request can be cached.                                                                                                                                                                         |
| `serve.http.host`                                 | string                                                                                                                                                                                                   | `0.0.0.0`                               | `TALOS_SERVE_HTTP_HOST`                                 | The host (interface) that the endpoint listens on. (restart required)                                                                                                                                                                                     |
| `serve.http.port`                                 | integer                                                                                                                                                                                                  | `4420`                                  | `TALOS_SERVE_HTTP_PORT`                                 | The port that the endpoint listens on. (restart required)                                                                                                                                                                                                 |
| `serve.http.request_log.exclude_health_endpoints` | boolean                                                                                                                                                                                                  | `false`                                 | `TALOS_SERVE_HTTP_REQUEST_LOG_EXCLUDE_HEALTH_ENDPOINTS` | Exclude /health/alive and /health/ready endpoints from request logs                                                                                                                                                                                       |
| `serve.http.trust_forwarded_host`                 | boolean                                                                                                                                                                                                  | `false`                                 | `TALOS_SERVE_HTTP_TRUST_FORWARDED_HOST`                 | Trust the X-Forwarded-Host header for tenant routing. (restart required)                                                                                                                                                                                  |
| `serve.metrics.host`                              | string                                                                                                                                                                                                   | `0.0.0.0`                               | `TALOS_SERVE_METRICS_HOST`                              | The host (interface) that the metrics endpoint listens on. (restart required)                                                                                                                                                                             |
| `serve.metrics.port`                              | integer                                                                                                                                                                                                  | `4422`                                  | `TALOS_SERVE_METRICS_PORT`                              | The port that the metrics endpoint listens on. (restart required)                                                                                                                                                                                         |

## `tracing` (restart required)

OpenTelemetry tracing configuration.

| Key                       | Type    | Default       | Env Var                         | Description                                                        |
| ------------------------- | ------- | ------------- | ------------------------------- | ------------------------------------------------------------------ |
| `tracing.enabled`         | boolean | `false`       | `TALOS_TRACING_ENABLED`         | Enable tracing. (restart required)                                 |
| `tracing.endpoint`        | string  | —             | `TALOS_TRACING_ENDPOINT`        | Trace collector endpoint. (restart required)                       |
| `tracing.environment`     | string  | `development` | `TALOS_TRACING_ENVIRONMENT`     | Deployment environment tag in trace attributes. (restart required) |
| `tracing.exporter`        | `otlp`  | —             | `TALOS_TRACING_EXPORTER`        | Trace exporter type. (restart required)                            |
| `tracing.sample_rate`     | number  | `0.001`       | `TALOS_TRACING_SAMPLE_RATE`     | Sampling rate (0.0 to 1.0). (restart required)                     |
| `tracing.service_name`    | string  | `talos`       | `TALOS_TRACING_SERVICE_NAME`    | Service name reported to OpenTelemetry. (restart required)         |
| `tracing.service_version` | string  | `0.0.0`       | `TALOS_TRACING_SERVICE_VERSION` | Service version reported to OpenTelemetry. (restart required)      |
