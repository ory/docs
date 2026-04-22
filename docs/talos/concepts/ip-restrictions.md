---
title: IP restrictions
description: CIDR-based allowlists that restrict which client IPs can use an API key
---

# IP restrictions

Talos supports per-key IP restrictions that limit which client IP addresses can use an API key. Restrictions are defined as a list
of CIDR ranges (for example, `192.168.1.0/24` or `2001:db8::/32`). Only requests originating from an IP within the allowlist are
accepted. Keys without IP restrictions accept traffic from any address.

## How IP restrictions work

IP restriction enforcement has two stages: **IP resolution** and **CIDR matching**.

### IP resolution

When a verification request arrives, Talos captures all IP-related headers from the HTTP request into context through middleware.
At verification time, the configured **client IP source** determines which header to use for extracting the client address. The
available sources are:

| Source             | Header / value used          | Typical use case                       |
| ------------------ | ---------------------------- | -------------------------------------- |
| `REMOTE_ADDR`      | TCP remote address           | Direct connections without a proxy     |
| `CF_CONNECTING_IP` | `Cf-Connecting-Ip`           | Behind Cloudflare                      |
| `X_FORWARDED_FOR`  | `X-Forwarded-For` (leftmost) | Behind a standard reverse proxy        |
| `X_REAL_IP`        | `X-Real-Ip`                  | Behind NGINX with `proxy_set_header`   |
| `TRUE_CLIENT_IP`   | `True-Client-Ip`             | Behind Akamai or Cloudflare Enterprise |

If the selected header is empty, Talos falls back to the TCP remote address. The client IP source is set once at startup and
applies to all verification requests.

### CIDR matching

After resolving the client IP, Talos parses the key's allowed CIDR list and checks whether the IP falls within any of the ranges.
Both IPv4 and IPv6 CIDR notation are supported (for example, `10.0.0.0/8` and `fd00::/8`). A single IP can be expressed as a `/32`
(IPv4) or `/128` (IPv6) range.

If the IP matches at least one CIDR range, verification proceeds. If no range matches, verification fails with error code
`VERIFICATION_ERROR_IP_NOT_ALLOWED`.

## Fail-closed behavior

IP restrictions use a **fail-closed** design. If Talos cannot determine the client IP -- for example, because the request context
does not contain IP metadata -- the verification request is denied. This prevents accidental access when header forwarding is
misconfigured.

This is the opposite of [rate limiting](rate-limiting.md), which fails open to avoid blocking legitimate traffic during limiter
outages.

## Cache interaction

Cached verification results still contain the key's allowed CIDR list. When a cached key is returned, Talos re-evaluates the IP
restriction against the **current request's** client IP before returning a success response. This means IP restrictions are
enforced on every request, regardless of whether the result came from cache or the database.

The enforcement sequence is:

1. Resolve the key from cache or database.
2. Validate key status and expiration.
3. Resolve the client IP from the current request context.
4. Check the client IP against the key's allowed CIDR list.
5. Return the verification result.

## IPv4 and IPv6 support

IP restrictions support both address families. You can mix IPv4 and IPv6 CIDR ranges in the same allowlist. Talos parses client
addresses using Go's `net.ParseIP`, which handles both formats transparently. There is no implicit mapping between IPv4 and IPv6
-- a `10.0.0.0/8` range does not match the IPv4-mapped IPv6 address `::ffff:10.0.0.1`.

## Key concepts

- **Allowlist model** -- IP restrictions define which IPs are permitted. Any IP not in the list is denied. Keys without
  restrictions accept all IPs.
- **Per-key granularity** -- each key has its own CIDR list. Keys do not share IP restrictions.
- **Fail-closed** -- if the client IP cannot be resolved, the request is denied. Misconfigured proxies cannot bypass restrictions.
- **CIDR notation** -- ranges use standard CIDR format (`ip/prefix_length`). Single IPs use `/32` (IPv4) or `/128` (IPv6).
- **`VERIFICATION_ERROR_IP_NOT_ALLOWED`** -- the error code returned when a request IP is outside the key's allowed ranges. See
  the [error codes reference](../reference/error-codes.md#verification-error-codes) for the full list.
- **Cache-safe** -- IP restrictions are enforced on every verification request, even when the key is served from cache.

## Next steps

- [Security model](security-model.md) -- cryptographic primitives and tenant isolation
- [Configuration reference](../reference/config.md) -- client IP source and related settings
- [Error codes reference](../reference/error-codes.md#verification-error-codes) -- verification error codes including
  `VERIFICATION_ERROR_IP_NOT_ALLOWED`
