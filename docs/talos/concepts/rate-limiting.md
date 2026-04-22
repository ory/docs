---
title: Rate limiting
description: Per-key rate limit policies with metadata-only (OSS) or server-side enforcement (Commercial)
---

# Rate limiting

Talos supports per-key rate limit policies that control how many requests a key can make within a time window. A rate limit policy
consists of two fields: a **quota** (maximum request count) and a **window** (time period in seconds). Keys without a policy are
never rate limited.

How enforcement works depends on your edition.

## OSS edition: metadata and headers

In the OSS edition, Talos stores rate limit policies on keys and returns them in verification responses. It does not enforce
limits itself. Your API gateway or reverse proxy reads the policy from the response headers and applies enforcement externally.

This keeps Talos stateless while letting you use purpose-built rate limiting infrastructure (Envoy, NGINX, Kong, or a dedicated
service). Verification responses include IETF-format headers that gateways can consume directly:

- **`RateLimit-Policy`** -- declares the key's quota and window (e.g., `"default";q=100;w=60`).
- **`RateLimit`** -- reports remaining quota (e.g., `"default";r=42`).

## Commercial edition: server-side enforcement

The commercial edition enforces rate limits inside Talos. When a key exceeds its quota, the verification response returns
`is_active: false` with error code `VERIFICATION_ERROR_RATE_LIMITED`. The HTTP status remains **200** because the verification
endpoint always returns a structured response — the rate limit status is conveyed through the response body, not the HTTP status
code. This design allows gateways to distinguish transport errors from application-level rate limiting decisions.

### Backends

The commercial edition supports two enforcement backends:

| Backend  | Algorithm | Scope                            | Persistence       |
| -------- | --------- | -------------------------------- | ----------------- |
| `memory` | GCRA      | Single process (not shared)      | Lost on restart   |
| `redis`  | GCRA      | Shared across all connected pods | Survives restarts |

Both backends use the GCRA (Generic Cell Rate Algorithm), which provides smooth, sliding-window rate limiting without the
boundary-burst problem of fixed-window counters. GCRA tracks a single timestamp per key and allows requests as long as the average
rate stays within the configured quota.

**Memory** is suited for single-node deployments or development. Each process maintains independent counters per key, so state is
not shared across pods.

**Redis** uses an atomic Lua script to maintain GCRA state shared across all pods connected to the same Redis instance. State
survives process restarts as long as Redis is available.

### Configuration

```yaml
rate_limit:
  enabled: true # Hot-reloadable: toggle per-request without restart
  backend: memory # Requires restart: changes the backend type
```

- **`rate_limit.enabled`** is checked on every verification request through the config provider. You can toggle it at runtime by
  editing the config file -- Talos picks up the change automatically.
- **`rate_limit.backend`** selects the enforcement backend (`memory` or `redis`). Changing this value requires a restart because
  it initializes different infrastructure (in-memory maps vs. Redis connections).

## HTTP response headers

When a key has a rate limit policy, verification responses include IETF draft-compliant headers regardless of edition:

| Header             | Description                                         | Example                |
| ------------------ | --------------------------------------------------- | ---------------------- |
| `RateLimit-Policy` | Declares the policy: quota and window               | `"default";q=100;w=60` |
| `RateLimit`        | Reports remaining quota                             | `"default";r=42`       |
| `Retry-After`      | Seconds to wait before retrying (only when limited) | `18`                   |

Gateways and clients can use these headers for both external enforcement (OSS) and client-side backoff (Commercial).

## Fail-open behavior

If the rate limiter encounters an error (for example, Redis is temporarily unavailable), Talos **fails open**: verification
succeeds but rate limit metadata is omitted from the response. This design prevents limiter outages from blocking legitimate
traffic.

## Key concepts

- **Per-key isolation** -- each key has its own counter. Keys do not share rate limit budgets.
- **Policy fields** -- `quota` (integer, maximum requests) and `window` (duration string, e.g. `"60s"`). Both must be set for
  enforcement to apply.
- **No policy = no limit** -- keys without a `rate_limit_policy` field are never subject to rate limiting.
- **`VERIFICATION_ERROR_RATE_LIMITED`** -- the error code returned when a key exceeds its quota (Commercial only). See the
  [error codes reference](../reference/error-codes.md#verification-error-codes) for the full list.
- **Cache interaction** -- rate limit checks happen after cache resolution. A cached verification result that is still valid will
  be returned without consulting the rate limiter.

## Next steps

- [Rate limiting integration guide](../integrate/rate-limiting.md) -- attach policies, verify rate-limited keys, and handle quota
  exhaustion
- [Configuration reference](../reference/config.md) -- all `rate_limit.*` settings
- [Error codes reference](../reference/error-codes.md#verification-error-codes) -- verification error codes including
  `VERIFICATION_ERROR_RATE_LIMITED`
