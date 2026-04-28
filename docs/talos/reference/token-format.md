---
title: Token format reference
description: API key and derived token structure
---

# Token format

Talos uses structured token formats that encode metadata for efficient routing and verification.

## API key format

Generated API keys follow a versioned format:

```
<prefix>_v1_<identifier>_<checksum>
```

Example:

```
prod_v1_5Z7Hn9K3mPqRtVwXyBcDeFgHiJkLmNoPqRsTuVwXyZ_AbC3XyZ789e
```

### Components

| Component    | Length      | Description                                                                                                 |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `prefix`     | 1-16 chars  | User-defined label (e.g., `prod`, `dev`, `test`). Set via `credentials.api_keys.prefix.current` in config.  |
| `v1`         | 2 chars     | Format version identifier                                                                                   |
| `identifier` | ~64 chars   | Base58-encoded `timestamp:uuid` payload                                                                     |
| `checksum`   | ~44 chars   | Full 32-byte HMAC-SHA256 over `prefix_v1_identifier_`, Base58-encoded                                       |

### Identifier encoding

The identifier is a Base58 encoding of `timestamp:uuid`:

- **Timestamp**: Unix epoch seconds (int64). Embedded at key creation time.
- **UUID**: UUID v4 (36 chars with hyphens). Used as the `key_id` for database lookup.

Base58 encoding uses the Bitcoin alphabet
(`123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`), which excludes visually ambiguous
characters (`0`, `O`, `I`, `l`).

### Checksum verification

The checksum is computed over the payload `prefix_v1_identifier_`:

1. Compute HMAC-SHA256 using the current HMAC secret (`secrets.hmac.current`)
2. Base58-encode the full 32-byte digest (no truncation)

During verification, all configured secrets (current + retired) are tried in order. This supports
secret rotation without invalidating existing keys.

### Credential routing

When a credential is submitted for verification, Talos identifies the credential type by format:

| Format match                        | Credential type   | Lookup method                            |
| ----------------------------------- | ----------------- | ---------------------------------------- |
| `<prefix>_v1_<id>_<checksum>`       | Generated API key | UUID extracted from identifier           |
| JWT format (`eyJ...`)               | Derived JWT       | Claims extracted during verification     |
| Macaroon prefix (`<prefix>_v1_...`) | Derived macaroon  | Identifier extracted during verification |
| None of the above                   | Imported key      | SHA-512/256 hash with tenant scope       |

## Imported key format

Imported keys have no format requirements. Any string credential can be imported. Talos stores a
tenant-scoped hash:

```
SHA-512/256(network_id + 0x00 + raw_key)
```

The null byte separator prevents ambiguity between network ID and key content.

## Derived token formats

### JWT

Derived tokens produced as JWTs follow the standard JWT format:

```
eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature
```

Claims include the parent key's `key_id`, `actor_id`, scopes, and expiration. The signing algorithm
is determined by the `alg` field in the JWK (EdDSA or RS256).

#### Signing key selection (`kid` hint)

The data plane resolves the active signing key on every derive request. The `kid` header in the
issued JWT identifies which JWK from the configured JWKS produced the signature.

Resolution order:

1. If `credentials.derived_tokens.jwt.signing_key_id` is set, Talos selects the JWK whose `kid`
   matches. If no JWK has that `kid`, signing fails with `InternalError` and the requested
   `signing_key_id` appears in the error details.
2. Otherwise, Talos prefers the first key with `"use": "sig"`.
3. Otherwise, Talos returns the first key in the JWKS.

Set `signing_key_id` explicitly in production so rotating signing material becomes a config change
rather than a JWKS-ordering side effect. In multi-tenant deployments the JWKS resolves per tenant
via the contextualizer; the `kid` hint is also per-tenant.

### Macaroon

Macaroon tokens use a configurable prefix:

```
<prefix>_v1_<base64url_data>
```

The prefix is configured via `credentials.derived_tokens.macaroon.prefix.current` (default: `mc`).
The data section contains the macaroon identifier and signature.

## ID formats

| Context            | Format                  | Length    | Example                                |
| ------------------ | ----------------------- | --------- | -------------------------------------- |
| Database storage   | UUID v4 string          | 36 chars  | `550e8400-e29b-41d4-a716-446655440000` |
| API key identifier | Base58-encoded          | ~64 chars | `5Z7Hn9K3mPqRtVwXyBcDeFgHiJkLmNoPqRsTuVwXyZ` |
| Imported key hash  | Hex-encoded SHA-512/256 | 64 chars  | `a1b2c3d4...`                          |
