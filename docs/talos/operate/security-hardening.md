---
title: Security hardening
---

Get three things right before you expose Ory Talos to traffic: protect the admin endpoints,
terminate TLS in front of every listener, and generate the secrets Ory Talos needs at startup. This
page is the operator checklist; each topic links to its full reference.

## Protect the admin endpoints

**Ory Talos ships no built-in authentication for the admin plane.** Any caller that reaches the
admin HTTP listener can issue, update, and revoke keys for any tenant. Treat the admin plane as a
trusted internal service and put authentication in front of it.

Choose one of these patterns:

- **Identity-aware proxy (IAP)**: terminate authentication at a gateway (Google Cloud IAP, AWS ALB
  with Cognito, Cloudflare Access, oauth2-proxy) and forward only authenticated requests to the
  admin plane. Pin the admin listener to a private network so requests cannot bypass the gateway.
- **mTLS at the load balancer**: require client certificates issued by an internal CA. Reject
  unauthenticated TLS handshakes at the LB, then forward plain HTTP to the admin plane on a private
  network.
- **Service mesh policy**: in Kubernetes, use Istio `AuthorizationPolicy` or Linkerd authorization
  policies to allow only specific service accounts to call the admin plane.

Whichever pattern you choose:

- Bind the admin listener to a non-routable address (`127.0.0.1`, `10.x`, or a Kubernetes
  `ClusterIP`); never expose it to the public internet.
- If credential holders need to revoke their own keys, run `talos serve public` as a separate
  process on a public-facing listener. The public API exposes only
  `POST /v2alpha1/apiKeys:selfRevoke` (and the JWKS endpoint) — no admin endpoints — and validates
  proof of possession on the credential itself. See
  [Separate admin and public APIs](deploy/deployment-modes.md).
- Audit-log every admin call at the gateway. Ory Talos itself doesn't record caller identity.

## Terminate TLS in front of every listener

Ory Talos has no HTTP-level TLS configuration. It listens on plain HTTP and expects you to terminate
TLS at a load balancer, ingress controller, or edge proxy on a private network.

- **HTTP listeners** (`serve.http`, `serve.metrics`): terminate TLS at the load balancer or ingress,
  then forward plain HTTP to Ory Talos on a private subnet, ClusterIP, or loopback.
- **Database connections**: encrypt them end to end. Set `sslmode=verify-full` on PostgreSQL and
  CockroachDB DSNs, and the equivalent TLS options on MySQL.
- **Redis cache (commercial)**: set `cache.redis.tls.enabled` to `true` so cached credentials never
  cross the network in plaintext.

Never expose an Ory Talos listener without TLS termination in front of it. Terminate TLS even on a
private VPC subnet: plaintext credentials on an internal network are still exposed to anything that
shares it.

## Generate the secrets Ory Talos needs at startup

Ory Talos refuses to start without an HMAC secret. Generate the secrets once, store them in a
secrets manager, and inject them as environment variables.

### `secrets.hmac.current` (required)

A raw string of 32 or more characters that keys the API-key checksum and derives the macaroon root
key. No fallback exists — Ory Talos exits with `project has no HMAC key configured` if it's unset.

```shell
openssl rand -base64 48 | tr -d '\n+/=' | cut -c1-64
```

Inject as `TALOS_SECRETS_HMAC_CURRENT`. Don't use `talos jwk generate hmac` for this field: it
produces a JWK JSON object, not a raw string.

### Pagination cursor key (derived automatically)

List endpoints encrypt opaque `next_page_token` values with a key Ory Talos derives from
`secrets.hmac.current` using domain-separated HMAC-SHA256. There's no separate secret to configure
or inject — rotating `secrets.hmac.current` rotates the pagination cursor key too.

### JWT signing key (required for derived tokens)

Derived JWTs are signed against the JWKS at `credentials.derived_tokens.jwt.signing_keys.urls`.
Generate an Ed25519 signing key with the Talos CLI:

```shell
talos jwk generate eddsa --kid prod-signing-1 --jwks -o signing-key.jwks.json
```

Each entry in `signing_keys.urls` is a JWKS resource. Load the generated set with a `base64://`
literal (`file://` and `https://` work in self-hosted builds, but the Ory Network platform accepts
only `base64://`):

```shell
echo "base64://$(base64 < signing-key.jwks.json | tr -d '\n')"
```

Set the result as `credentials.derived_tokens.jwt.signing_keys.urls` and set
`credentials.derived_tokens.jwt.signing_key_id` to the same `kid`, so rotation is a config swap
instead of a JWKS-ordering side effect. RSA (`talos jwk generate rsa`) is supported for legacy
interop.

For zero-downtime rotation of any of the above, see [Secret management](secrets.md).
