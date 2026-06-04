---
title: Token format reference
description: Structure of Ory Talos API keys and derived tokens
---

This page describes the structure of Ory Talos API keys, imported keys, and derived tokens, and how
Ory Talos routes a submitted credential to the correct verification path.

## API key format

Generated API keys use a versioned format:

```text
<prefix>_v1_<identifier>_<checksum>
```

Example:

```text
prod_v1_QixobFgVufjZNuoYXKtn78NAqFVroyN518nRaK3WD3nxTNufzwJq9sjdrDMrcyP2_3wyBJBd2KxqXK117oqGWZzJU85Nv7C9vKWj9nVSqbEby
```

### Components

| Component    | Length     | Description                                                                                                       |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `prefix`     | 1-16 chars | User-defined label (for example, `prod`, `dev`, `test`). Set via `credentials.api_keys.prefix.current` in config. |
| `v1`         | 2 chars    | Format version identifier                                                                                         |
| `identifier` | ~64 chars  | Base58-encoded `timestamp:uuid` payload                                                                           |
| `checksum`   | ~44 chars  | Full 32-byte HMAC-SHA256 over `prefix_v1_identifier_`, Base58-encoded                                             |

### Identifier encoding

The identifier is the Base58 encoding of `timestamp:uuid`:

- **Timestamp**: Unix epoch seconds (int64), set at key creation time.
- **UUID**: UUID v4 (36 chars with hyphens). Used as the `key_id` for database lookup.

Base58 uses the Bitcoin alphabet (`123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`),
which omits the visually ambiguous characters `0`, `O`, `I`, and `l`.

### Checksum verification

The checksum is computed over the payload `prefix_v1_identifier_`:

1. Compute HMAC-SHA256 with the current HMAC secret (`secrets.hmac.current`).
2. Base58-encode the full 32-byte digest (no truncation).

During verification, Ory Talos tries all configured secrets in order, current
(`secrets.hmac.current`) first, then retired (`secrets.hmac.retired`). This supports secret rotation
without invalidating existing keys.

### Credential routing

When a credential is submitted for verification, Ory Talos checks its format in this order and stops
at the first match:

| Order | Format match                                                                                                                          | Credential type   | Lookup method                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------- |
| 1     | JWT format (`eyJ...`)                                                                                                                 | Derived JWT       | Claims extracted during verification     |
| 2     | Token starts with a configured macaroon prefix followed by `_v1_` (`credentials.derived_tokens.macaroon.prefix.current` or `retired`) | Derived macaroon  | Identifier extracted during verification |
| 3     | `<prefix>_v1_<id>_<checksum>` matches the API key shape                                                                               | Generated API key | UUID extracted from identifier           |
| 4     | None of the above                                                                                                                     | Imported key      | SHA-512/256 hash with tenant scope       |

Macaroons share the `<prefix>_v1_...` shape with generated API keys; routing distinguishes them by
checking the configured macaroon-prefix list before falling through to the API key regex.

## Imported key format

Imported keys have no format requirements: any string credential can be imported. Ory Talos stores a
tenant-scoped hash instead of the raw key:

```text
SHA-512/256(network_id + 0x00 + raw_key)
```

The null-byte separator prevents ambiguity between the network ID and the key content. Including the
network ID in the hash input makes the same raw key resolve to a different hash in each tenant.

## Derived token formats

### JWT

Derived tokens produced as JWTs follow the standard JWT format:

```text
eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature
```

The `sub` claim holds the parent key's ID. Other claims include `act` (actor ID), `scp` (scopes),
and `exp` (expiration). The signing algorithm follows the JWK key type: Ed25519 keys produce EdDSA
signatures, RSA keys produce RS256. The `alg` header on the issued JWT reflects this choice.

#### Signing key selection (`kid` hint)

Ory Talos resolves the active signing key on every derive request. The `kid` header in the issued
JWT identifies which JWK from the configured JWKS produced the signature.

Resolution order:

1. If `credentials.derived_tokens.jwt.signing_key_id` is set, Ory Talos selects the JWK whose `kid`
   matches. If no JWK has that `kid`, signing fails with `InternalError`, and the error details
   include the requested `signing_key_id`.
2. Otherwise, Ory Talos selects the first key with `"use": "sig"`.
3. Otherwise, Ory Talos selects the first key in the JWKS.

Set `signing_key_id` explicitly in production so that rotating signing material is a config change
rather than a side effect of JWKS ordering. In multi-tenant deployments, the JWKS resolves per
tenant through the contextualizer, so the `kid` hint is also per-tenant.

### Macaroon

Macaroon tokens use a configurable prefix:

```text
<prefix>_v1_<base64url_data>
```

Set the prefix with `credentials.derived_tokens.macaroon.prefix.current` (default: `mc`, 1-8
alphanumeric characters or underscores). The data section is the base64url-encoded binary macaroon:
its identifier, location, JSON caveat (the claims), and signature.

## ID formats

| Context            | Format                  | Length    | Example                                                            |
| ------------------ | ----------------------- | --------- | ------------------------------------------------------------------ |
| Database storage   | UUID v4 string          | 36 chars  | `550e8400-e29b-41d4-a716-446655440000`                             |
| API key identifier | Base58-encoded          | ~64 chars | `QixobFgVufjZNuoYXKtn78NAqFVroyN518nRaK3WD3nxTNufzwJq9sjdrDMrcyP2` |
| Imported key hash  | Hex-encoded SHA-512/256 | 64 chars  | `a1b2c3d4...`                                                      |
