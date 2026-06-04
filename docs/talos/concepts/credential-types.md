---
title: Credential types
description:
  Compare the four Ory Talos credential types — issued and imported API keys, derived JWTs, and
  derived macaroons — and pick the right one for your use case.
---

Ory Talos manages four credential types. Issued and imported API keys are long-lived parents that
you create, manage, and revoke. Derived JWTs and macaroons are short-lived children minted from a
parent key for a specific request, session, or downstream consumer.

Pick a type by what you need to do:

- Generate a new key for a customer or service: [issued API key](#issued-api-keys).
- Accept a key minted somewhere else: [imported API key](#imported-api-keys).
- Hand off a short-lived bearer token that other services verify locally:
  [derived JWT](#derived-jwts).
- Hand off a capability token that the holder can attenuate further:
  [derived macaroon](#derived-macaroons).

## Issued API keys

An issued API key is a credential that Ory Talos generates for you. The admin surface creates the
key, returns the full secret once in the create response, stores only a hash from then on, and gives
the secret a recognizable prefix so customers and support staff can identify it. Talos then verifies
the key on every request until you revoke or rotate it.

### When to use

- You're building a new API and want Ory Talos to own the full key lifecycle: generation, hashed
  storage, lookup, rotation, and revocation.
- Customers or operators create keys through your dashboard or CLI, and you want consistent
  formatting, scopes, and metadata.
- You need public-safe credentials that ship in client code. Mark the key as `KEY_VISIBILITY_PUBLIC`
  and Ory Talos uses a distinct prefix that distinguishes publishable keys from secret ones. Public
  keys require `credentials.api_keys.prefix.public_current` to be set.
- You want a predictable token format that your support team recognizes in logs, bug reports, and
  screenshots.

### How it works

Issued keys use the format `prefix_v1_identifier_checksum`. The identifier encodes the key's UUID,
so Talos looks the key up directly without scanning. Ory Talos returns the full secret once at
creation and never persists it — only a hash remains for verification.

Each issued key has a `visibility` field
([`KeyVisibility`](../reference/api/admin-issue-api-key.api.mdx)) that distinguishes
`KEY_VISIBILITY_SECRET` (server-only) from `KEY_VISIBILITY_PUBLIC` (client-safe). The two values use
different prefixes so callers can distinguish publishable credentials from secret ones.

**Lifecycle**: Issue, rotate, update metadata, revoke.

## Imported API keys

An imported API key is a credential that already exists somewhere else and that you hand to Ory
Talos for verification. Ory Talos accepts any string as the raw key, stores a hash, and from then on
verifies, scopes, and revokes the key the same way it does an issued key. Ory Talos never persists
the original key in plaintext and never re-issues it: it only verifies what it has already hashed.

### When to use

- You're migrating from a legacy or homegrown key store and can't rotate end-customer credentials
  during the cutover.
- Another system mints the keys (a partner, a payment processor, or a SaaS you proxy) and you want a
  single verification, scoping, and revocation surface inside Ory Talos.
- An upstream contract fixes the key format (for example `sk_live_*` or `ghp_*`) and the system
  accepts it verbatim.

### How it works

On each verification request, Talos computes `SHA-512/256(network_id + 0x00 + raw_key)` and looks
the key up by hash. The network ID scopes the hash per tenant in the commercial edition; the OSS
edition uses a fixed nil network ID. Ory Talos never persists the raw key. Imported keys support the
same metadata, scopes, and expiration as issued keys.

**Lifecycle**: Import, update metadata, revoke, delete.

## Derived JWTs

A derived JWT is a short-lived signed token minted from a parent API key. The holder of a parent
secret asks the admin surface to mint a JWT that carries a subset of the parent's permissions plus
any custom claims you supply. Ory Talos signs the JWT with its own keys and publishes the public
side at a JWKS endpoint, so any service that already verifies JWTs verifies a derived token locally
— no round-trip to Ory Talos required.

### When to use

- Downstream services already verify JWTs against a JWKS endpoint and you want them to validate
  signatures locally instead of calling Ory Talos on every request.
- You need to embed request-specific claims (tenant, role, session ID) without changing the parent
  key.
- You want to federate with third-party platforms that accept signed JWTs.
- You want to scope a request down to a subset of the parent key's permissions for a limited time.
- A gateway or edge proxy accepts a long-lived API key from the caller and exchanges it for a
  short-lived derived JWT, so backends behind the gateway verify locally against the JWKS without
  calling Ory Talos on every request.
- You're building an agentic system where an orchestrator holds the parent API key and mints a
  narrow, short-lived JWT for each agent or tool call, bounding a leaked or misbehaving agent to the
  derived token's scopes and TTL instead of the parent's full authority.

### How it works

Ory Talos resolves the signing setup at derive time. The request's `algorithm` field chooses JWT or
macaroon. For JWTs, Talos selects the active signing key from the configured JWKS: if
`credentials.derived_tokens.jwt.signing_key_id` is set, Talos uses the key whose `kid` matches and
fails if none does; otherwise it uses the first key marked `use: sig`, or the first key in the set.
The selected key's type sets the algorithm: an Ed25519 key signs with EdDSA, an RSA key with RS256.
Verifiers fetch the public keys from `GET /v2alpha1/derivedKeys/jwks.json`. The claims carry the
parent key ID, actor ID, scopes, and expiration, plus any custom claims you supply.

## Derived macaroons

A derived macaroon is a short-lived bearer token minted from a parent API key and signed with a
shared HMAC secret. Like a JWT, a macaroon carries the parent's scopes forward. The macaroon format
also supports caveats — restrictions such as "only valid for the next minute" that a holder adds
before passing the token on, without contacting Ory Talos.

### When to use

- You need capability-style delegation: hand a token to a component that further restricts it
  without ever seeing the parent key.
- You want fine-grained, context-bound tokens (time, scope, request) that downstream services verify
  cheaply with a shared HMAC secret.
- You prefer a compact, opaque token over a JWT — no JWKS round-trip, no public key infrastructure
  to operate.
- You're delegating in layers: an orchestrator mints a macaroon for an agent, and the agent
  attenuates it further before passing it to a sub-agent or tool, without contacting Ory Talos. Each
  layer can only narrow scope and lifetime.

### How it works

Macaroons use the format `prefix_v1_<base64url-data>` (see the
[token format reference](../reference/token-format.md)). Talos encodes the derived token's claims as
a first-party caveat and verifies time and issuer constraints with the shared HMAC secret.

## Credential routing

When you submit a credential to `/v2alpha1/admin/apiKeys:verify`, Ory Talos identifies the type from
its format and routes it to the matching verification handler. See the
[credential routing table](../reference/token-format.md#credential-routing) for the full
format-to-type mapping and lookup methods.
