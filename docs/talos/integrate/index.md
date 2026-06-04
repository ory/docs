---
title: Integrate
description: Add API key authentication to your application
---

Ory Talos exposes two surfaces:

- **Admin surface** — Manage API keys (issue, import, update, rotate, revoke, and derive tokens) and
  verify credentials. All these endpoints live under `/v2alpha1/admin/...`, including the
  verification endpoints `POST /v2alpha1/admin/apiKeys:verify` and
  `POST /v2alpha1/admin/apiKeys:batchVerify`. The admin surface has no built-in authentication, so
  deploy it behind your internal network, VPN, or an authenticating proxy.
- **Self-service surface** — Let key holders revoke their own keys with
  `POST /v2alpha1/apiKeys:selfRevoke`. The caller proves possession by presenting the credential, so
  this is the only endpoint safe to expose publicly without an extra auth layer.

Most integrations issue keys on the admin surface, then verify them on every incoming request.
Verification is the hot path, but it's still a high-trust operation — it confirms whether a
credential is valid and returns its metadata — so it stays on the admin surface. Keep verify behind
your auth boundary, or reach it through a caching [edge proxy](../operate/deploy/edge-proxy.mdx)
that presents the same admin credentials.

## Common workflows

| Task                                    | Endpoint                                                                    | Guide                                      |
| --------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------ |
| Issue a key and verify it               | `POST /v2alpha1/admin/issuedApiKeys`, `POST /v2alpha1/admin/apiKeys:verify` | [Issue and verify](./issue-and-verify.mdx) |
| Import keys from another system         | `POST /v2alpha1/admin/importedApiKeys`                                      | [Import keys](./import-keys.mdx)           |
| Mint short-lived JWT or macaroon tokens | `POST /v2alpha1/admin/apiKeys:derive`                                       | [Derive tokens](./derive-tokens.mdx)       |
| Verify many credentials at once         | `POST /v2alpha1/admin/apiKeys:batchVerify`                                  | [Batch operations](./batch-operations.mdx) |
| Update, rotate, or revoke a key         | `PATCH`, `:rotate`, `:revoke`                                               | [Key lifecycle](./key-lifecycle.mdx)       |
| Enforce per-key rate limits             | `rate_limit_policy` on issue/update                                         | [Rate limiting](./rate-limiting.mdx)       |
| Let key holders revoke their own key    | `POST /v2alpha1/apiKeys:selfRevoke`                                         | [Self-revocation](./self-revocation.mdx)   |
| Handle errors and retries               | All endpoints                                                               | [Error handling](./error-handling.mdx)     |

## Authentication

The admin API has no built-in authentication. Protect it at the infrastructure level (VPN, service
mesh, or reverse proxy with mTLS). The public API (`:selfRevoke`) needs no admin authentication:
callers supply the credential they want to revoke, and Ory Talos validates proof of possession
inline.

## Expose only the self-service endpoint publicly

The admin surface — including `apiKeys:verify` and `apiKeys:batchVerify` — has no built-in
authentication, so never put `/v2alpha1/admin/*` on the public internet. Verification is a
high-trust operation: it confirms whether a credential is valid and returns its metadata. Keep it
behind your auth boundary along with the rest of the admin surface.

Only `POST /v2alpha1/apiKeys:selfRevoke` is safe to expose publicly. The caller proves possession of
the credential, and Ory Talos validates it inline. The simplest way to expose just that endpoint is
to run the public process, which serves only self-revocation:

```shell
talos serve public
```

See [Separate admin and public APIs](../operate/deploy/deployment-modes.md) for the split-process
topology. If you run the all-in-one binary instead, front it with a reverse proxy that allows only
the public paths through and rejects the rest of `/v2alpha1/admin/*`:

| Path                                   | Method | Public | Reason                             |
| -------------------------------------- | ------ | ------ | ---------------------------------- |
| `/v2alpha1/apiKeys:selfRevoke`         | POST   | Yes    | Self-revocation by the key holder. |
| `/health/alive`, `/health/ready`       | GET    | Maybe  | Required for load-balancer probes. |
| Everything under `/v2alpha1/admin/...` | any    | No     | Key management and verification.   |

```nginx
location = /v2alpha1/apiKeys:selfRevoke  { proxy_pass http://talos_public; }
location = /health/alive                 { proxy_pass http://talos_public; }
location = /health/ready                 { proxy_pass http://talos_public; }
location /                               { return 404; }
```

## Request format

All endpoints accept and return JSON with `Content-Type: application/json`. Field names use
`snake_case` (for example, `actor_id`, `key_id`, and `expire_time`).

Durations accept both Go format (`168h`, `30m`, `1h30m`) and protobuf format (`604800s`).

Timestamps follow RFC 3339 in UTC (`2025-06-15T10:30:00Z`).

## SDK and examples

- [curl cheat sheet](./sdk/curl.md) — every endpoint as a copy-paste curl command
- [Go SDK](./sdk/go.md) — generate a Go HTTP client from the OpenAPI spec
