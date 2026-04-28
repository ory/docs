---
title: Secret management
---

# Secret management

Talos uses two independent secret families:

- `secrets.hmac.*` — keys API key checksums and derives the macaroon root key. **Required at startup**; Talos exits with
  `project has no HMAC key configured` if `secrets.hmac.current` is unset.
- `secrets.pagination.*` (preferred) or `secrets.default.*` (fallback) — encrypts opaque pagination tokens. Required to use list
  endpoints.

Each secret must be at least 32 characters. Use 64 random characters for new deployments.

## Configuration

```yaml
secrets:
  hmac:
    current: "use-a-random-64-char-hmac-secret-for-api-key-checksum-validation"
    retired:
      - "previous-hmac-secret-rotated-out-on-2026-03-01-padded-to-64chars-"
  pagination:
    current: "use-a-random-64-char-pagination-token-secret-generated-at-deploy"
    retired:
      - "previous-pagination-token-secret-rotated-out-on-2026-03-01--64chars"
```

If `secrets.pagination.current` is empty, Talos falls back to `secrets.default.current`. Use `secrets.pagination.*` for new
deployments; `secrets.default.*` is retained for backwards compatibility with earlier configurations.

## Secret types

| Secret                       | Purpose                                                           | Required                                              |
| ---------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| `secrets.hmac.current`       | API key checksum HMAC and macaroon root-key derivation            | Yes (min 32 chars)                                    |
| `secrets.hmac.retired`       | Older HMAC secrets accepted during verification only              | No                                                    |
| `secrets.pagination.current` | Pagination-token encryption (preferred over `secrets.default`)    | One of pagination/default required for list endpoints |
| `secrets.pagination.retired` | Older pagination secrets accepted during decryption only          | No                                                    |
| `secrets.default.current`    | Pagination-token fallback when `secrets.pagination.current` unset | No (use `pagination.*`)                               |
| `secrets.default.retired`    | Older fallback secrets accepted during decryption only            | No                                                    |

The HMAC and pagination secret families are independent. Rotate them on independent schedules and never reuse the same value
across families.

## Macaroon root-key derivation

Talos does not store a separate macaroon signing secret. The macaroon root key is derived deterministically from
`secrets.hmac.current` using a domain-separated HMAC-SHA256:

```
macaroon_root_key = HMAC-SHA256(secrets.hmac.current, "talos/macaroon/v1/root-key")
```

The fixed domain string `talos/macaroon/v1/root-key` prevents the derived key from colliding with other uses of the HMAC secret
(such as API key checksums). All admin and data plane processes configured with the same `secrets.hmac.current` derive the same
macaroon root key, so any node can verify macaroons issued by any other node without out-of-band key distribution.

Rotating `secrets.hmac.current` rotates both the API key checksum key and the macaroon root key at once. Verification falls back
through `secrets.hmac.retired` for both purposes.

## Pagination-token secret

List endpoints (`ListIssuedAPIKeys`, `ListImportedAPIKeys`, `ListBatchVerifications`, …) return an opaque `next_page_token` that
encrypts the cursor (key ID and tenant ID) with NaCl secretbox. The encryption key is derived from `secrets.pagination.current`
(or `secrets.default.current` as a fallback).

Page tokens are tenant-scoped: a token issued under tenant A returns `page token network mismatch` if replayed against tenant B.

Rotating the pagination secret invalidates outstanding tokens unless the previous secret remains in the `retired` list. Keep the
previous secret in `retired` for at least the longest paging session you expect (typically a few minutes).

## Secret rotation

1. Move the existing `current` value into the `retired` list.
2. Set a new `current` value generated with a cryptographically secure RNG.
3. Either restart Talos or wait for config hot-reload to pick up the change.

```yaml
secrets:
  hmac:
    current: "newly-rotated-hmac-secret-padded-to-64-random-chars--------"
    retired:
      - "previous-hmac-secret-still-trusted-during-verification-padded--"
```

During verification, Talos tries `current` first, then each entry in `retired` in order. New keys are always issued with
`current`. Remove a value from `retired` only after every key issued with it has expired or been rotated.

## Generating secrets

```bash
openssl rand -base64 48 | tr -d '\n+/=' | cut -c1-64
```

This emits a 64-character URL-safe value suitable for either secret family.

## Environment variables

```bash
export TALOS_SECRETS_HMAC_CURRENT="64-char-hmac-secret-required-for-startup"
export TALOS_SECRETS_HMAC_RETIRED="previous-hmac-secret-1,previous-hmac-secret-2"
export TALOS_SECRETS_PAGINATION_CURRENT="64-char-pagination-token-secret"
export TALOS_SECRETS_PAGINATION_RETIRED="previous-pagination-secret-1"
# Legacy fallback; prefer TALOS_SECRETS_PAGINATION_CURRENT
export TALOS_SECRETS_DEFAULT_CURRENT="64-char-fallback-pagination-secret"
```

Inject these from a secrets manager (HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, or Kubernetes `Secret`); never
check secrets into version control.
