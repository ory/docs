---
title: Integrate
description: Add API key authentication to your application
---

# Integrate Ory Talos

Ory Talos exposes two HTTP APIs that map to distinct responsibilities:

- **Admin plane** (`/v2/admin/...`) — Create, update, rotate, and revoke API keys. Deploy behind
  your internal network or VPN.
- **Data plane** (`/v2/apiKeys:...`) — Verify credentials at the edge. Designed for sub-millisecond
  latency with caching enabled.

Most integrations follow a simple pattern: issue keys on the admin plane, then verify them on the
data plane every time a request arrives.

## Common workflows

| Task                                    | Endpoint                                                        | Guide                                   |
| --------------------------------------- | --------------------------------------------------------------- | --------------------------------------- |
| Issue a key and verify it               | `POST /v2/admin/issuedApiKeys`, `POST /v2/admin/apiKeys:verify` | [Issue and verify](issue-and-verify.md) |
| Import keys from another system         | `POST /v2/admin/importedApiKeys`                                | [Import keys](import-keys.md)           |
| Mint short-lived JWT or macaroon tokens | `POST /v2/admin/apiKeys:derive`                                 | [Derive tokens](derive-tokens.md)       |
| Verify many credentials at once         | `POST /v2/admin/apiKeys:batchVerify`                            | [Batch operations](batch-operations.md) |
| Update, rotate, or revoke a key         | `PATCH`, `:rotate`, `:revoke`                                   | [Key lifecycle](key-lifecycle.md)       |
| Enforce per-key rate limits             | `rate_limit_policy` on issue/update                             | [Rate limiting](rate-limiting.md)       |
| Let key holders revoke their own key    | `POST /v2/apiKeys:selfRevoke`                                   | [Self-revocation](self-revocation.md)   |
| Handle errors and retries               | All endpoints                                                   | [Error handling](error-handling.md)     |

## Authentication

The admin plane does not enforce authentication by default. Protect it at the infrastructure level
(VPN, service mesh, reverse proxy with mTLS). The data plane is public-facing and requires no
authentication — callers supply the credential they want to verify.

## Request format

All endpoints accept and return JSON with `Content-Type: application/json`. Field names use
`snake_case` (for example `actor_id`, `key_id`, `expire_time`).

Durations accept both Go format (`168h`, `30m`, `1h30m`) and protobuf format (`604800s`).

Timestamps follow RFC 3339 in UTC (`2025-06-15T10:30:00Z`).

## SDK and examples

- [curl cheat sheet](sdk/curl.md) — every endpoint as a copy-paste curl command
- [Go SDK](sdk/go.md) — using the generated Go client
