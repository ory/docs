---
title: Security hardening
---

# Security hardening

## Network

- **Restrict admin plane access** to internal networks only. The admin plane handles key issuance
  and revocation and should never be exposed to the public internet.
- **Use TLS** for all connections. Configure database `sslmode=verify-full` and serve HTTPS (or
  terminate TLS at the load balancer).
- **Separate admin and data planes** in production for independent security boundaries.

## Secrets

- **Configure both required secrets** before starting Talos: `secrets.default.current` (pagination
  tokens) and `secrets.hmac.current` (API key checksums and macaroon root keys). Both must be at
  least 32 characters; aim for 64 random characters.
- **Generate secrets cryptographically**: `openssl rand -base64 48 | tr -d '\n+/=' | cut -c1-64`.
- **Rotate secrets regularly** by promoting `current` to `retired` and setting a new `current`.
  Verification tries `current` first, then every value in `retired`, so existing keys keep
  working through the rotation window.
- **Never commit secrets** to version control. Inject them via environment variables
  (`TALOS_SECRETS_DEFAULT_CURRENT`, `TALOS_SECRETS_HMAC_CURRENT`) or a secrets manager.

## API keys

- **Set TTL on all keys** to limit exposure from leaked credentials.
- **Revoke compromised keys immediately** using
  `POST /v2alpha1/admin/issuedApiKeys/{key_id}:revoke` or
  `POST /v2alpha1/admin/importedApiKeys/{key_id}:revoke`.
- **Limit scopes** on issued and imported keys to the minimum required. Talos stores scopes as
  metadata on the key and returns them on verification; your application is responsible for
  enforcing them during request handling.
- **Bind keys to caller IPs** with `ip_restriction.allowed_cidrs` to reduce blast radius if a key
  leaks. See [IP restrictions](../integrate/ip-restrictions.md).

## Caching

- **Enable caching** to protect the database from verification floods (DoS).
- **Set appropriate TTL** balancing latency of revocation propagation vs. database load.

## Monitoring

- **Monitor verification error rates** for anomalous patterns (credential stuffing, brute force).
- **Enable tracing** to audit key usage and identify suspicious activity.
- **Set up alerts** on `http_requests_total{code=~"4.."}` and `http_requests_total{code=~"5.."}`.

## Admin plane authentication

**Talos ships no built-in authentication for the admin plane.** Any caller that can reach the admin
HTTP listener can issue, update, and revoke keys for any tenant. Treat the admin plane as a trusted
internal service and put authentication in front of it.

Recommended patterns:

- **Identity-aware proxy (IAP)**: terminate authentication at a gateway (Google Cloud IAP, AWS ALB
  with Cognito, Cloudflare Access, oauth2-proxy) and forward only authenticated requests to the
  admin plane. Pin the admin listener to a private network so requests cannot bypass the gateway.
- **mTLS at the load balancer**: require client certificates issued by an internal CA. Reject
  unauthenticated TLS handshakes at the LB, then forward plain HTTP to the admin plane on a
  private network.
- **Service mesh policy**: in Kubernetes, use Istio `AuthorizationPolicy` or Linkerd authorization
  policies to allow only specific service accounts to call the admin plane.

Whichever pattern you choose:

- Bind the admin listener to a non-routable address (`127.0.0.1`, `10.x`, or a Kubernetes
  `ClusterIP`); never expose it to the public internet.
- Run the data plane on a separate listener so verification traffic does not need to traverse the
  admin auth path. See [Separate admin and data planes](deploy/separate-planes.md).
- Audit-log every admin call at the gateway. Talos itself does not record caller identity.
