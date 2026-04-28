---
title: Integrate
description: Add API key authentication to your application
---

# Integrate Ory Talos

Ory Talos exposes two logical planes that map to distinct responsibilities:

- **Admin plane** — Create, update, rotate, and revoke API keys. Deploy behind your internal
  network or VPN. All admin endpoints live under `/v2alpha1/admin/...`.
- **Data plane** — Verify credentials with low latency and let key holders revoke their own keys.
  The two public verification endpoints are `POST /v2alpha1/admin/apiKeys:verify` and
  `POST /v2alpha1/admin/apiKeys:batchVerify`; the self-service endpoint is
  `POST /v2alpha1/apiKeys:selfRevoke`.

Most integrations follow a simple pattern: issue keys on the admin plane, then verify them on the
data plane every time a request arrives.

The verify endpoints share the `/admin/` URL prefix for historical reasons. They are still safe to
expose publicly — they take a credential and return verification metadata only — but you must
restrict the rest of `/admin/` at your edge. See
[Exposing only the verify endpoints publicly](#exposing-only-the-verify-endpoints-publicly) below.

## Common workflows

| Task                                    | Endpoint                                                        | Guide                                   |
| --------------------------------------- | --------------------------------------------------------------- | --------------------------------------- |
| Issue a key and verify it               | `POST /v2alpha1/admin/issuedApiKeys`, `POST /v2alpha1/admin/apiKeys:verify` | [Issue and verify](issue-and-verify.md) |
| Import keys from another system         | `POST /v2alpha1/admin/importedApiKeys`                                | [Import keys](import-keys.md)           |
| Mint short-lived JWT or macaroon tokens | `POST /v2alpha1/admin/apiKeys:derive`                                 | [Derive tokens](derive-tokens.md)       |
| Verify many credentials at once         | `POST /v2alpha1/admin/apiKeys:batchVerify`                            | [Batch operations](batch-operations.md) |
| Update, rotate, or revoke a key         | `PATCH`, `:rotate`, `:revoke`                                   | [Key lifecycle](key-lifecycle.md)       |
| Enforce per-key rate limits             | `rate_limit_policy` on issue/update                             | [Rate limiting](rate-limiting.md)       |
| Let key holders revoke their own key    | `POST /v2alpha1/apiKeys:selfRevoke`                                   | [Self-revocation](self-revocation.md)   |
| Handle errors and retries               | All endpoints                                                   | [Error handling](error-handling.md)     |

## Authentication

The admin plane does not enforce authentication by default. Protect it at the infrastructure level
(VPN, service mesh, reverse proxy with mTLS). The data plane is public-facing and requires no
authentication — callers supply the credential they want to verify.

## Exposing only the verify endpoints publicly

Talos has no built-in admin authentication, so do not put `/v2alpha1/admin/*` on the public
internet. Instead, run a reverse proxy (NGINX, Envoy, HAProxy, an API gateway) in front of the
data-plane process and allow only the verify and self-revoke paths through:

| Path                                         | Method | Public | Reason                                |
| -------------------------------------------- | ------ | ------ | ------------------------------------- |
| `/v2alpha1/admin/apiKeys:verify`             | POST   | Yes    | Verification — credential in request. |
| `/v2alpha1/admin/apiKeys:batchVerify`        | POST   | Yes    | Batch verification.                   |
| `/v2alpha1/apiKeys:selfRevoke`               | POST   | Yes    | Self-revocation by the key holder.    |
| `/health/alive`, `/health/ready`             | GET    | Maybe  | Required for load-balancer probes.    |
| Everything else under `/v2alpha1/admin/...`  | any    | No     | Issuance, rotation, admin revocation. |

Example NGINX snippet that fronts the data plane:

```nginx
location = /v2alpha1/admin/apiKeys:verify       { proxy_pass http://talos_data; }
location = /v2alpha1/admin/apiKeys:batchVerify  { proxy_pass http://talos_data; }
location = /v2alpha1/apiKeys:selfRevoke         { proxy_pass http://talos_data; }
location = /health/alive                        { proxy_pass http://talos_data; }
location = /health/ready                        { proxy_pass http://talos_data; }
location /                                      { return 404; }
```

Run the admin plane on a separate listener (or a separate process — see
[Separate admin and data planes](../operate/deploy/separate-planes.md)) bound to an internal
network so it cannot be reached even if the public proxy is misconfigured.

## Request format

All endpoints accept and return JSON with `Content-Type: application/json`. Field names use
`snake_case` (for example `actor_id`, `key_id`, `expire_time`).

Durations accept both Go format (`168h`, `30m`, `1h30m`) and protobuf format (`604800s`).

Timestamps follow RFC 3339 in UTC (`2025-06-15T10:30:00Z`).

## SDK and examples

- [curl cheat sheet](sdk/curl.md) — every endpoint as a copy-paste curl command
- [Go SDK](sdk/go.md) — using the generated Go client
