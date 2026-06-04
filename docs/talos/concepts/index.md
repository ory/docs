---
title: Concepts
description: How Ory Talos works, from credential types to the security model.
---

The credential types, formats, and security model behind Ory Talos.

- [Architecture](architecture.mdx) — editions, deployment shapes, and the design choices that matter
  when you adopt or operate Talos
- [Credential types](credential-types.md) — issued keys, imported keys, derived JWTs, and derived
  macaroons
- [Token format](token-format.md) — the v1 format for issued API keys
- [Security model](security-model.md) — cryptographic primitives and tenant isolation
- [Caching and consistency](caching.md) — verification caching and revocation propagation
- [Rate limiting](rate-limiting.md) — per-key rate limit policies and enforcement by edition
- [IP restrictions](ip-restrictions.md) — CIDR allowlists that restrict which IPs can use a key
