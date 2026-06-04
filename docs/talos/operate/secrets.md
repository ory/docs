---
title: Secret management
---

Ory Talos uses a single configured secret family, `secrets.hmac.*`. The HMAC secret signs API key checksums and seeds two derived
keys: the macaroon root key and the pagination cursor encryption key. Required for issuing and verifying keys. If
`secrets.hmac.current` is unset, the first issue or verify request fails with `project has no HMAC key configured`.

Each secret needs at least 32 characters. Use 64 random characters for new deployments.

## Configuration

```yaml
secrets:
  hmac:
    current: "use-a-random-64-char-hmac-secret-for-api-key-checksum-validation"
    retired:
      - "previous-hmac-secret-rotated-out-on-2026-03-01-padded-to-64chars-"
```

`secrets.hmac.current` is the only required secret. Talos derives the macaroon root key and the pagination cursor encryption key
from it, so you don't configure those separately.

## Secret types

| Secret                 | Purpose                                                                    | Required           |
| ---------------------- | -------------------------------------------------------------------------- | ------------------ |
| `secrets.hmac.current` | API key checksum HMAC, macaroon root-key derivation, pagination cursor key | Yes (min 32 chars) |
| `secrets.hmac.retired` | Older HMAC secrets accepted during verification only                       | No                 |

## Macaroon root-key derivation

Ory Talos doesn't store a separate macaroon signing secret. Talos derives the macaroon root key deterministically from
`secrets.hmac.current` using a domain-separated HMAC-SHA256:

```text
macaroon_root_key = HMAC-SHA256(secrets.hmac.current, "talos/macaroon/v1/root-key")
```

The fixed domain string `talos/macaroon/v1/root-key` prevents the derived key from colliding with other uses of the HMAC secret
(such as API key checksums). All processes configured with the same `secrets.hmac.current` derive the same macaroon root key, so
any node verifies macaroons issued by any other node without out-of-band key distribution.

Rotating `secrets.hmac.current` rotates both the API key checksum key and the macaroon root key at once. Verification falls back
through `secrets.hmac.retired` for both purposes.

## Pagination-token secret

The list endpoints (`AdminListIssuedApiKeys` and `AdminListImportedApiKeys`) return an opaque `next_page_token` that encrypts the
cursor (last item ID and network ID) with NaCl secretbox. Talos derives the encryption key from `secrets.hmac.current` using the
same domain-separated HMAC-SHA256 construction as the macaroon root key:

```text
pagination_cursor_key = HMAC-SHA256(secrets.hmac.current, "talos/pagination/v1/cursor-key")
```

The fixed domain string `talos/pagination/v1/cursor-key` keeps the cursor key independent from the checksum and macaroon uses of
the same secret.

Page tokens are network-scoped: a token issued under network A returns `page token network mismatch` if replayed against network
B.

Rotating `secrets.hmac.current` invalidates outstanding page tokens unless the previous secret remains in `secrets.hmac.retired`.
Verification re-derives the cursor key from each retired secret, so keep the previous secret in `retired` for at least the longest
paging session you expect (typically a few minutes).

## Secret rotation

1. Move the existing `current` value into the `retired` list.
2. Set a new `current` value generated with a cryptographically secure RNG.
3. Either restart Ory Talos or wait for config hot-reload to pick up the change.

Apply both changes (`current` and `retired`) in **one** atomic config reload — write a single updated YAML file or update both
env-vars together. Splitting the rotation across two reloads risks a window where signatures issued under the previous `current`
no longer verify because the value got replaced without yet being added to `retired`.

```yaml
secrets:
  hmac:
    current: "newly-rotated-hmac-secret-padded-to-64-random-chars--------"
    retired:
      - "previous-hmac-secret-still-trusted-during-verification-padded--"
```

During verification, Ory Talos tries `current` first, then each entry in `retired` in order. Talos always issues new keys with
`current`. Remove a value from `retired` only after every key issued with it has expired or been rotated.

## Generating secrets

```shell
openssl rand -base64 48 | tr -d '\n+/=' | cut -c1-64
```

This emits a URL-safe value of up to 64 characters. Stripping the `+`, `/`, and `=` characters can leave fewer than 64; the result
always stays well above the 32-char minimum.

## Environment variables

```shell
export TALOS_SECRETS_HMAC_CURRENT="64-char-hmac-secret-required-for-key-operations"
export TALOS_SECRETS_HMAC_RETIRED="previous-hmac-secret-1,previous-hmac-secret-2"
```

Inject these from a secrets manager (HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, or Kubernetes `Secret`). Never
check secrets into version control. See the [Configuration reference](../reference/config.mdx) for the complete env-var mapping
rules (`TALOS_`-prefix precedence, underscore-to-dot conversion, and list parsing).
