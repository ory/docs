---
title: Security model
description:
  How Ory Talos protects credentials with keyed hashing, signed tokens, and tenant isolation
---

## Cryptographic primitives

| Purpose                      | Algorithm                                                                                              | Keyed by                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| API key checksum             | HMAC-SHA256 (full 32-byte digest, base58-encoded)                                                      | `secrets.hmac.current`                                     |
| Imported key hashing         | SHA-512/256 over `nid \|\| 0x00 \|\| raw_key`                                                          | Tenant `nid` (no shared secret)                            |
| Macaroon root-key derivation | HMAC-SHA256 with domain `"talos/macaroon/v1/root-key"`                                                 | `secrets.hmac.current`                                     |
| Macaroon caveat binding      | HMAC-SHA256 (libmacaroons V2)                                                                          | Derived macaroon root key                                  |
| JWT signing                  | EdDSA (Ed25519) or RS256, inferred from JWKS key type                                                  | JWKS at `credentials.derived_tokens.jwt.signing_keys.urls` |
| Pagination-token encryption  | NaCl secretbox (XSalsa20-Poly1305) keyed by HMAC-SHA256 with domain `"talos/pagination/v1/cursor-key"` | `secrets.hmac.current`                                     |

`secrets.hmac.current` seeds the API key checksum, the macaroon root key, and the pagination cursor
key (each via domain-separated derivation). Rotating it rotates all three at once; verification
falls back through `secrets.hmac.retired` for all purposes. See
[Secret management](../operate/secrets.md).

## JWT signing key selection

Ory Talos resolves the active signing key on every derive request, in this order:

1. If `credentials.derived_tokens.jwt.signing_key_id` is set, Ory Talos selects the JWK with the
   matching `kid`. If no JWK in the configured JWKS has that `kid`, signing fails with
   `InternalError` and `signing_key_id` is included in the error details.
2. Otherwise, Ory Talos prefers the first key with `"use": "sig"`.
3. Otherwise, Ory Talos returns the first key in the JWKS.

Set `signing_key_id` explicitly in production so rotation becomes a config change rather than a
JWKS-ordering side effect. Multi-tenant deployments resolve the JWKS per tenant via the
contextualizer; the `kid` hint is also per-tenant.

## Secret rotation

Ory Talos supports zero-downtime secret rotation. Configure the new secret as `current` and move the
old one to `retired`. During verification, all secrets in the same family are tried in order.

- **HMAC rotation** (`secrets.hmac.*`) rotates the API key checksum, the macaroon root key, and the
  pagination cursor key at once. Existing API keys, macaroons, and outstanding `next_page_token`
  values remain valid as long as the previous secret is in `retired`.

## Tenant isolation

The commercial edition is multi-tenant; the OSS edition is single-tenant. In the commercial edition,
the tenant (Network ID, or NID) is derived from the request hostname before any handler runs. Every
subsequent read and write is scoped to that tenant.

Ory Talos prevents cross-tenant access at three layers:

- **Storage.** Every row carries the tenant identifier, and every query filters on it. No path reads
  or writes data outside the caller's tenant.
- **Derived tokens.** JWTs and macaroons issued for a tenant carry that tenant's identifier.
  Verifying a token under a different tenant returns the same `not found` result as an unknown key.
  Tokens never cross tenant boundaries.
- **Imported keys.** The hash stored for an imported key is bound to the tenant. The same raw
  credential imported into two tenants produces two unrelated records; verifying it in the wrong
  tenant fails.

For tenant routing and configuration, see [Multi-tenancy](../operate/multi-tenancy.md).

## Stateless derived-token verification

Derived JWTs and macaroons are stateless capability tokens. Ory Talos enforces every security
constraint when it signs the token: parent status, scope subset, TTL cap, inherited subject and
`actor_id`, CIDR allowlist, and visibility. Verification then only checks the signature,
`exp`/`nbf`, the issuer, the tenant (Network ID) claim, and the CIDR allowlist sealed into the
token. The verification path makes no database round-trip, which keeps verification cheap,
edge-deployable, and resilient to database outages.

The trade-off is the revocation model:

- New derivations from a revoked parent are blocked immediately.
- Already-issued derived tokens remain valid until `exp`. The signature is still valid, and Ory
  Talos doesn't consult the parent's current state when verifying a derived token.
- The parent key itself is rejected immediately on direct verification. That path is stateful and
  consults the database or a short-TTL cache.

Choose derived-token TTLs against your operational mean time to recovery: a TTL longer than your
MTTR means a token can outlive an incident response. For the checks performed before signing, see
[Enforcement at derive time](../integrate/derive-tokens.mdx#enforcement-at-derive-time). For the
checks performed at verify time, plus invalidation strategies, see
[What verification checks](../integrate/derive-tokens.mdx#what-verification-checks).

## Cache security

Ory Talos never stores raw credentials in any cache, in memory or in Redis. Cache entries hold only
verification metadata (status, scopes, actor, expiration). Cache lookups are tenant-scoped, so a
cached entry from one tenant can't satisfy a request from another. Ory Talos doesn't cache derived
tokens.

## Admin and public API separation

Split Ory Talos into two processes for independent scaling and security boundaries. The admin
process (`talos serve admin`) exposes `/v2alpha1/admin/*` — issue, rotate, revoke, derive, verify,
and batch verify. Bind it to an internal network and require an authenticating proxy in front; the
admin API has no built-in authentication. The public process (`talos serve public`) exposes only
`POST /v2alpha1/apiKeys:selfRevoke`. It validates proof of possession inline, so it's safe to expose
publicly without an extra auth layer.

For the underlying proto-service and mode mapping, see the
[architecture overview](./architecture.mdx). For deployment configuration, see
[separate admin and public APIs](../operate/deploy/deployment-modes.md).

## Key lifecycle

Keys transition through defined states: `KEY_STATUS_ACTIVE` -> `KEY_STATUS_REVOKED` or
`KEY_STATUS_EXPIRED`. Revocation is irreversible. Expired keys are rejected during verification.

## Why HMAC over bcrypt

API keys are cryptographically random with 128+ bits of entropy, so the slow hashing that bcrypt
applies to human-chosen passwords buys nothing against them. HMAC-SHA256 is a keyed hash: the HMAC
secret lives in a vault outside the database, so a database breach alone doesn't let an attacker
verify candidate keys against the stored hashes. That's a stronger security boundary than bcrypt,
which stores everything needed for verification in the database itself.

## Why Ed25519 for token signing

Use Ed25519 (EdDSA over Curve25519) for the JWT signing keys you configure. Ed25519 is
deterministic: it doesn't require a random nonce, eliminating the nonce-reuse failure mode that
breaks ECDSA P-256. The algorithm is also constant-time, so it's immune to timing side-channel
attacks.

Ory Talos also supports RSA keys (RS256) for compatibility with systems that don't understand EdDSA.
Ory Talos infers the signing algorithm from the private key type in the configured JWKS: Ed25519
keys sign with EdDSA, RSA keys with RS256. Ory Talos writes the resolved algorithm into the JWK
`alg` header on each signed token and overwrites any `alg` value in the source JWKS.

## Security requirements

For the cryptographic model to hold, meet the following operational requirements:

1. **HMAC secret management** -- Store the HMAC secret in a secrets manager or vault, for example
   HashiCorp Vault or AWS Secrets Manager. Never store it in the database or commit it to version
   control. Ory Talos supports zero-downtime rotation by maintaining current and retired secrets.

2. **Key entropy** -- Generate API keys with a cryptographically secure random number generator that
   provides at least 128 bits of entropy. Ory Talos generates keys internally and doesn't accept
   user-provided key material for issued keys.

3. **Transport security** -- Use TLS for all communication. Never expose API key secrets in URLs,
   query parameters, or log output.

4. **Signing key protection** -- Store Ed25519 and RSA private keys used for JWT signing securely,
   and never expose them through API responses or logs.
