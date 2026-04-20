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

| Component    | Length      | Description                                                                                                |
| ------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `prefix`     | 1-8 chars   | User-defined label (e.g., `prod`, `dev`, `test`). Set via `credentials.api_keys.prefix.current` in config. |
| `v1`         | 2 chars     | Format version identifier                                                                                  |
| `identifier` | ~32 chars   | Base58-encoded timestamp and UUID v4                                                                       |
| `checksum`   | 10-11 chars | HMAC-SHA256 truncated to 64 bits, Base58-encoded                                                           |

### Identifier encoding

The identifier is a Base58 encoding of `timestamp:uuid`:

- **Timestamp**: Unix epoch seconds (int64). Embedded at key creation time.
- **UUID**: UUID v4 (36 chars with hyphens). Used as the `key_id` for database lookup.

Base58 encoding uses the Bitcoin alphabet
(`123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`), which excludes visually ambiguous
characters (`0`, `O`, `I`, `l`).

### Checksum verification

The checksum is computed over the payload `prefix_v1_identifier_`:

1. Compute HMAC-SHA256 using the current HMAC secret
2. Truncate to 64 bits
3. Base58-encode the result

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
| API key identifier | Base58-encoded          | ~32 chars | `5Z7Hn9K3mPqRtVwXyBcDeFg`              |
| Imported key hash  | Hex-encoded SHA-512/256 | 64 chars  | `a1b2c3d4...`                          |
