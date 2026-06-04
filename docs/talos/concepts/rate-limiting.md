---
title: Rate limiting
description: Per-key rate limit policies with metadata-only (OSS) or server-side enforcement (Commercial)
---

Ory Talos supports per-key rate limit policies that control how many requests a key makes within a time window. A policy has a
**quota** (maximum count), a **window** (time period), and an optional **unit** that defaults to `requests` per the IETF
rate-limit-headers draft. Keys without a policy aren't rate limited.

Enforcement depends on your edition.

## OSS edition, metadata and headers

In the OSS edition, Ory Talos stores rate limit policies on keys and returns them in verification responses. It doesn't enforce
limits itself, so it never counts requests. Your API gateway or reverse proxy reads the policy from the response and applies
enforcement externally.

This keeps Ory Talos stateless and lets you use dedicated rate limiting infrastructure such as Envoy, NGINX, Kong, or a custom
service. When a verified key has a policy, the response includes the IETF-format **`RateLimit-Policy`** header that declares the
key's quota and window (for example, `"default";q=100;w=3600`). Because OSS doesn't count requests, it can't report a meaningful
remaining quota. Your gateway maintains its own counters.

## Commercial edition, server-side enforcement

The commercial edition enforces rate limits inside Ory Talos. When a key exceeds its quota, the verification response returns
`is_valid: false` with error code `VERIFICATION_ERROR_RATE_LIMITED`. The HTTP status stays **200** because the verification
endpoint always returns a structured response. The response body, not the HTTP status code, carries the rate limit status. This
lets gateways distinguish transport errors from application-level rate limiting decisions.

### Backends

The commercial edition supports two enforcement backends:

| Backend  | Algorithm | Scope                            | Persistence       |
| -------- | --------- | -------------------------------- | ----------------- |
| `memory` | GCRA      | Single process (not shared)      | Lost on restart   |
| `redis`  | GCRA      | Shared across all connected pods | Survives restarts |

Both backends use the GCRA (Generic Cell Rate Algorithm), a sliding-window algorithm without the boundary-burst problem of
fixed-window counters. GCRA tracks a single timestamp per key and allows requests as long as the average rate stays within the
configured quota.

**Memory** suits single-node deployments or development. Each process keeps independent per-key counters, so state isn't shared
across pods.

**Redis** maintains GCRA state with an atomic Lua script, shared across all pods connected to the same Redis instance. It uses the
Redis connection configured under `cache.redis`. State survives process restarts as long as Redis is available.

### Configuration

```yaml
rate_limit:
  enabled: true # Hot-reloadable: toggle per-request without restart
  backend: memory # Requires restart: changes the backend type
```

- **`rate_limit.enabled`** (default `false`) is checked on every verification request. Toggle it at runtime by editing the config
  file. Ory Talos picks up the change automatically. When disabled, policies are stored and returned as metadata but not enforced.
- **`rate_limit.backend`** (default `memory`) selects the enforcement backend (`memory` or `redis`). Changing it requires a
  restart because each backend initializes different infrastructure (in-memory maps or Redis connections).

## HTTP response headers

When a verified key has a rate limit policy, the response includes IETF draft-compliant headers:

| Header             | Description                                         | Example                | When                       |
| ------------------ | --------------------------------------------------- | ---------------------- | -------------------------- |
| `RateLimit-Policy` | Declares the policy: quota and window               | `"default";q=100;w=60` | Any edition                |
| `RateLimit`        | Reports remaining quota                             | `"default";r=42`       | Commercial, enforcement on |
| `Retry-After`      | Seconds to wait before retrying (only when limited) | `18`                   | Commercial, when limited   |

`RateLimit-Policy` lets a gateway enforce externally (OSS) or report the configured limit. The `RateLimit` and `Retry-After`
headers carry live counter state and appear only when the commercial edition enforces the limit; clients use them for backoff.

## Fail-open behavior

If the rate limiter encounters an error (for example, Redis is temporarily unavailable), Ory Talos **fails open**: verification
succeeds and Talos still reports the policy, but omits the dynamic counter fields (`rate_limit_remaining` and
`rate_limit_reset_time`, and the `RateLimit` HTTP header derived from them). This prevents limiter outages from blocking
legitimate traffic.

## Derived tokens

Talos doesn't propagate rate limit policies into derived token claims and doesn't evaluate them on the derived-token verification
path. Talos consults the parent key's policy only when verifying the parent key itself. Apply rate limits at the parent
verification step or at your gateway to bound the request volume of derived sessions. See
[Enforcement at derive time](../integrate/derive-tokens.mdx#enforcement-at-derive-time) for the full list of constraints checked
at sign time compared to verify time.

## Key concepts

- **Per-key isolation.** Each key has its own counter (commercial). Keys don't share rate limit budgets.
- **Policy fields.** `quota` (integer, must be greater than 0) and `window` (duration string greater than 0, for example `"60s"`).
  Both must be set for enforcement to apply.
- **No policy = no limit.** Keys without a `rate_limit_policy` field aren't subject to rate limiting.
- **`VERIFICATION_ERROR_RATE_LIMITED`.** The error code returned when a key exceeds its quota (Commercial only). See the
  [error codes reference](../reference/error-codes.md#verification-error-codes) for the full list.
- **Cache interaction.** The rate limiter runs on every verification, including cache hits. Talos reads the policy from the
  (possibly cached) key record, then consults the limiter. The limiter's counter state lives outside the verification cache, so
  the cache never bypasses it.

## Next steps

- [Rate limiting integration guide](../integrate/rate-limiting.mdx) attaches policies, verifies rate-limited keys, and handles
  quota exhaustion.
- [Configuration reference](../reference/config.mdx) lists all `rate_limit.*` settings.
- [Error codes reference](../reference/error-codes.md#verification-error-codes) lists verification error codes including
  `VERIFICATION_ERROR_RATE_LIMITED`.
