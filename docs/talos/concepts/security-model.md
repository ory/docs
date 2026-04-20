---
title: Security model
---

# Security model

## Cryptographic primitives

| Purpose              | Algorithm                                               |
| -------------------- | ------------------------------------------------------- |
| API key checksum     | HMAC-SHA256 (truncated to 64 bits)                      |
| Imported key hashing | SHA-512/256 with tenant salt                            |
| JWT signing          | EdDSA (Ed25519) or RS256, determined by JWK `alg` field |
| Macaroon binding     | HMAC-SHA256                                             |

## Secret rotation

Talos supports zero-downtime secret rotation. Configure the new secret as `current` and move the old
one to `retired`. During verification, all secrets are tried in order.

## Tenant isolation

Multi-tenant deployments use Network IDs (NID) for data isolation:

- **Database**: Composite primary keys `(nid, key_id)` prevent cross-tenant access
- **Token claims**: NID is embedded in derived tokens and validated during verification
- **Imported key hashing**: NID is included in the hash salt, so the same raw key produces different
  hashes per tenant

## Cache security

Cache keys use SHA-256 hashes of API credentials. Raw credentials never appear in cache keys, Redis
keys, or memory cache entries. This prevents credential leakage through cache inspection, Redis
`MONITOR` commands, or memory dumps.

- **Cache key format:** `namespace:nid:sha256(credential)` -- deterministic, no plaintext
- **Reverse index:** Stores `key_id → sha256(credential)` for invalidation lookups -- no raw secrets
- **Cached values:** Contain only non-sensitive metadata (status, scopes, owner, expiration)

## Admin/data plane separation

The admin plane (key management) and data plane (verification) can be deployed separately. The admin
plane should be restricted to internal networks. The data plane can be exposed publicly.

## Key lifecycle

Keys transition through defined states: `ACTIVE` -> `REVOKED` or `EXPIRED`. Revocation is
irreversible. Expired keys are rejected during verification.

## Why HMAC over bcrypt

Password hashing algorithms like bcrypt are designed for **low-entropy** inputs (human-chosen
passwords with ~40-60 bits of entropy). They use intentional slowness (~100ms per hash) to make
brute-force attacks against weak passwords expensive.

API keys are fundamentally different. They are **cryptographically random** with 128+ bits of
entropy, making dictionary attacks impossible. The key space of 2^128 (340 undecillion combinations)
renders brute force infeasible regardless of hashing speed.

HMAC-SHA256 is a **keyed** hash function. The HMAC secret is stored in a vault, never in the
database. A database breach alone is insufficient to verify candidate keys -- the attacker must also
compromise the secret. This provides a stronger security boundary than bcrypt, which stores
everything needed for verification in the database itself.

### Performance comparison

| Metric                  | bcrypt       | HMAC-SHA256      |
| ----------------------- | ------------ | ---------------- |
| Single verification     | ~100ms       | \<1ms            |
| Throughput (per core)   | ~10 ops/sec  | >100,000 ops/sec |
| 1,000 verifications     | ~100 seconds | \<1 second       |
| 10,000 req/sec capacity | ~1,000 cores | 1 core           |

This yields a roughly **1,000x cost reduction** in compute for verification workloads.

### Attack model

**Database breach:** The attacker obtains HMAC hashes but not the HMAC secret (stored in vault).
Without the secret, they cannot verify any candidate key against the stored hashes.

**Brute force with secret:** Even if the attacker obtains the HMAC secret, the 2^128 key space makes
exhaustive search computationally infeasible with current or foreseeable technology.

## Why Ed25519 for token signing

Talos uses Ed25519 (EdDSA over Curve25519) as the default signing algorithm for derived JWTs.

| Property           | Ed25519         | RSA-2048       |
| ------------------ | --------------- | -------------- |
| Signing speed      | ~40,000 ops/sec | ~4,000 ops/sec |
| Verification speed | ~15,000 ops/sec | ~7,500 ops/sec |
| Signature size     | 64 bytes        | 256 bytes      |
| Security level     | 128 bits        | 112 bits       |

Ed25519 is **deterministic** -- it does not require a random nonce, eliminating an entire class of
implementation vulnerabilities (unlike ECDSA P-256, where a weak nonce leaks the private key). It is
also constant-time by design, providing immunity to timing side-channel attacks.

RSA-2048 (RS256) is supported for **legacy compatibility** when integrating with systems that do not
support EdDSA. The signing algorithm is determined by the `alg` field in the JWK configuration.

## Security requirements

For the cryptographic model to hold, the following operational requirements must be met:

1. **HMAC secret management** -- The HMAC secret must be stored in a secrets manager or vault (e.g.,
   HashiCorp Vault, AWS Secrets Manager). It must never be stored in the database or committed to
   version control. Talos supports zero-downtime rotation by maintaining current and retired
   secrets.

2. **Key entropy** -- API keys must be generated using a cryptographically secure random number
   generator with at least 128 bits of entropy. Talos generates keys internally; user-provided key
   material is not accepted for issued keys.

3. **Transport security** -- All communication must use TLS. API key secrets must never appear in
   URLs, query parameters, or log output.

4. **Signing key protection** -- Ed25519 and RSA private keys used for JWT signing must be stored
   securely and never exposed through API responses or logs.

## Industry precedent

Major cloud providers use HMAC for API key authentication:

- **AWS** -- HMAC-SHA256 for Signature Version 4 request signing
- **Google Cloud** -- HMAC keys for Cloud Storage interoperability
- **Stripe** -- HMAC for API authentication and webhook signature verification
- **GitHub** -- HMAC-SHA256 for webhook payload signatures

These systems share the same rationale: high-entropy keys do not benefit from slow hashing, and
verification throughput is a critical operational requirement.
