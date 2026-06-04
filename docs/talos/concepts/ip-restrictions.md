---
title: IP restrictions
description: CIDR-based allowlists that restrict which client IPs can use an API key
---

Per-key IP restrictions limit which client IP addresses can use an API key. You define restrictions
as a list of CIDR ranges (for example, `192.168.1.0/24` or `2001:db8::/32`). Talos accepts only
requests from an IP within the allowlist. Keys without IP restrictions accept traffic from any
address.

## How IP restrictions work

IP restriction enforcement has two stages: **IP resolution** and **CIDR matching**.

### IP resolution

When a verification request arrives, middleware captures the IP-related headers from the HTTP
request into the request context. At verification time, the configured **client IP source**
(`serve.http.client_ip_source`) determines which header Talos uses to extract the client address.
The available sources are:

| Source                              | Header or value used         | Typical use case                       |
| ----------------------------------- | ---------------------------- | -------------------------------------- |
| `CLIENT_IP_SOURCE_REMOTE_ADDR`      | TCP remote address           | Direct connections without a proxy     |
| `CLIENT_IP_SOURCE_CF_CONNECTING_IP` | `Cf-Connecting-Ip`           | Behind Cloudflare                      |
| `CLIENT_IP_SOURCE_X_FORWARDED_FOR`  | `X-Forwarded-For` (leftmost) | Behind a standard reverse proxy        |
| `CLIENT_IP_SOURCE_X_REAL_IP`        | `X-Real-Ip`                  | Behind NGINX with `proxy_set_header`   |
| `CLIENT_IP_SOURCE_TRUE_CLIENT_IP`   | `True-Client-Ip`             | Behind Akamai or Cloudflare Enterprise |

If the selected header is empty, Ory Talos falls back to the TCP remote address. Talos reads the
client IP source for each verification request, so changes to `serve.http.client_ip_source` take
effect without a restart.

### CIDR matching

After resolving the client IP, Ory Talos parses the key's allowed CIDR list and checks whether the
IP falls within any of the ranges. Talos supports both IPv4 and IPv6 CIDR notation (for example,
`10.0.0.0/8` and `fd00::/8`). Express a single IP as a `/32` (IPv4) or `/128` (IPv6) range.

If the IP matches at least one CIDR range, verification proceeds. If no range matches, verification
fails with error code `VERIFICATION_ERROR_IP_NOT_ALLOWED`.

## Fail-closed behavior

IP restrictions are **fail-closed**. If Talos can't determine the client IP -- for example, because
the request context doesn't contain IP metadata -- it denies the verification request with
`VERIFICATION_ERROR_IP_NOT_ALLOWED`. This prevents accidental access when header forwarding is
misconfigured.

This is the opposite of [rate limiting](rate-limiting.md), which fails open to avoid blocking
legitimate traffic during limiter outages.

## Cache interaction

Cached verification results retain the key's allowed CIDR list. When Talos serves a key from cache,
it re-evaluates the IP restriction against the **current request's** client IP before returning a
success response. Talos enforces IP restrictions on every request, whether the result comes from
cache or the database.

The enforcement sequence is:

1. Resolve the key from cache or database.
2. Validate key status and expiration.
3. Resolve the client IP from the current request context.
4. Check the client IP against the key's allowed CIDR list.
5. Return the verification result.

`TestVerifyAPIKey_IPRestriction_AllCredentialTypes` in `internal/verifier/verifier_test.go` covers
this behavior. It exercises IP enforcement for issued, imported, derived JWT, and derived macaroon
credentials, checking that an allowed IP passes and a denied IP is rejected for each.

## Derived tokens

Talos evaluates IP restrictions when it verifies the parent API key and again at derive time. It
seals the parent's allowed CIDR list into the derived token's `acl` claim. The derived-token
verification path enforces that sealed list against the request's source IP without re-reading the
parent. A derived token issued from an unrestricted parent stays unrestricted even if the parent
later gains an allowlist. A derived token issued from a restricted parent keeps that allowlist for
its full lifetime. To make IP enforcement follow the caller across a session, derive a new token
whenever the network changes, or apply allowlisting at your gateway. For the full list of checks at
sign time and verify time, see
[Enforcement at derive time](../integrate/derive-tokens.mdx#enforcement-at-derive-time).

## IPv4 and IPv6 support

IP restrictions support both address families. Mix IPv4 and IPv6 CIDR ranges in the same allowlist.
Ory Talos parses client addresses with Go's `net.ParseIP` and matches them with
`net.IPNet.Contains`, which handle both formats. Go normalizes IPv4-mapped IPv6 addresses to IPv4
during matching, so an IPv4 range such as `10.0.0.0/8` matches the address `::ffff:10.0.0.1`.

## Key concepts

- **Allowlist model** -- IP restrictions define which IPs are permitted. Talos denies any IP not in
  the list. Keys without restrictions accept all IPs.
- **Per-key granularity** -- Each key has its own CIDR list. Keys don't share IP restrictions.
- **Fail-closed** -- If Talos can't resolve the client IP, it denies the request. Misconfigured
  proxies can't bypass restrictions.
- **CIDR notation** -- Ranges use standard CIDR format (`ip/prefix_length`). Single IPs use `/32`
  (IPv4) or `/128` (IPv6).
- **`VERIFICATION_ERROR_IP_NOT_ALLOWED`** -- The error code Talos returns when a request IP is
  outside the key's allowed ranges. See the
  [error codes reference](../reference/error-codes.md#verification-error-codes) for the full list.
- **Cache-safe** -- Talos enforces IP restrictions on every verification request, even when the key
  is served from cache.

## Next steps

- [Security model](security-model.md) -- cryptographic primitives and tenant isolation
- [Configuration reference](../reference/config.mdx) -- client IP source and related settings
- [Error codes reference](../reference/error-codes.md#verification-error-codes) -- verification
  error codes including `VERIFICATION_ERROR_IP_NOT_ALLOWED`
