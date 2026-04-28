---
title: Token derivation security
description: Stateless verification model and revocation semantics for derived tokens
---

# Token derivation security

## Overview

Talos derives short-lived JWTs and macaroons from long-lived API keys. These derived tokens are
**stateless capability tokens**: all security constraints are enforced at creation time, and
verification requires no database access. This design gives predictable sub-millisecond
verification, zero database load on the hot path, and straightforward edge deployment.

## Creation-time enforcement

When a token is derived via `POST /v2alpha1/tokens:derive`, all security constraints are enforced before
the token is signed:

- **Parent key must be ACTIVE.** A revoked or expired parent key cannot produce new tokens.
- **Scopes must be a subset of the parent.** The derived token can have equal or fewer scopes than
  the parent, never more.
- **TTL cannot exceed the parent's remaining lifetime.** The derived token expires at or before the
  parent key's expiration.
- **Subject and owner are inherited.** These fields are copied from the parent and cannot be
  overridden.

If any constraint is violated, the derivation request fails with an appropriate error code. No token
is issued.

## Verification-time behavior

Verifying a derived token is purely cryptographic. The system checks:

1. **Signature validity** -- the token was signed by a trusted JWK signing key.
2. **Expiration** -- the `exp` claim has not passed.

There are no database lookups, no parent key status checks, and no scope re-validation against the
parent. This produces:

- **Low latency.** Verification completes in 1-2 ms compared to 5-10 ms with database round-trips.
- **Zero database load.** Derived token verification never touches the database.
- **Edge deployability.** Verification nodes need only the public JWK set, not a database
  connection.
- **High availability.** Verification is unaffected by database outages.

## Revocation model

When a parent API key is revoked:

- **New derivations are blocked.** Any attempt to derive from the revoked parent returns an error.
- **Existing tokens remain valid until they expire.** The cryptographic signature is still valid and
  the token has not expired.
- **The parent key itself is immediately rejected.** Direct verification of the parent key returns a
  revocation error.

This behavior is intentional. It provides:

- **Predictable token lifetimes.** Applications can rely on tokens remaining valid for their full
  TTL.
- **No cascading failures.** Revoking a parent does not invalidate thousands of active sessions
  simultaneously.
- **Graceful degradation.** Downstream systems have time to transition before tokens expire.

## Immediate revocation strategies

If your threat model requires faster invalidation of derived tokens, use one or more of these
approaches:

- **Short TTLs.** Set derived token TTLs to 5-15 minutes. Services can re-derive tokens frequently
  with minimal overhead. This is the primary recommended approach.
- **External deny lists.** Maintain a deny list of revoked token IDs (`jti` claims) outside Talos.
  Check the deny list during your application's authorization step.
- **Key rotation.** Rotate the JWK signing keys. Tokens signed with the old key will fail signature
  verification immediately. This invalidates all derived tokens, not just those from one parent.

## TTL guidelines

| Use case                   | Recommended TTL         | Rationale                                          |
| -------------------------- | ----------------------- | -------------------------------------------------- |
| User sessions (web/mobile) | 15-60 min               | Balances user experience with security exposure    |
| Service-to-service auth    | 5-15 min                | Services re-derive easily; minimal exposure window |
| Sensitive operations       | 1-5 min                 | Limits damage from token theft                     |
| Long-running batch jobs    | Use parent key directly | Avoids re-derivation during long processes         |

Short TTLs are the simplest and most effective control. When combined with the stateless
verification model, they give security properties equivalent to stateful parent-status checks
without the latency or availability cost.

## Security properties

Derived tokens are capability tokens with time-bounded authority:

1. **All constraints enforced at creation.** The token can only be issued if the parent passes all
   checks.
2. **Cryptographically unforgeable.** Tokens are signed with EdDSA or RS256 and cannot be tampered
   with.
3. **Time-bounded exposure.** Short TTLs limit the window in which a compromised token is useful.
4. **Immutable claims.** Subject, owner, scopes, and expiry are sealed in the token.
5. **No privilege escalation.** Scopes can never exceed the parent's scopes at creation time.

## Next steps

- [Security model](security-model.md) -- cryptographic primitives and tenant isolation
- [Derive tokens](../integrate/derive-tokens.md) -- integration guide for the token derivation API
