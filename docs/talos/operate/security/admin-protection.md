---
title: Admin protection
---

Ory Talos exposes its admin surface (`/v2alpha1/admin/*`) **without any built-in authentication or
authorization**. Place the admin server behind a trusted proxy or network boundary that
authenticates and authorizes every request before it reaches Ory Talos.

Pick one of the deployment patterns below before sending admin traffic to an Ory Talos instance.

:::warning

Never expose `talos serve admin` directly to the public internet. Any request that reaches the admin
endpoints is treated as authorized.

:::

## Why Ory Talos has no built-in admin authentication

Ory Talos composes with the identity, access, and gateway tooling you already run. Embedding an
authentication layer would force every operator to either:

- Adopt Ory Talos's choice of identity provider, token format, and policy engine.
- Bypass the embedded layer with another proxy in front, doubling the attack surface.

Instead, Ory Talos accepts a hard contract: **the admin server trusts every incoming request.** You
enforce identity and policy in the layer you already operate.

## Deployment patterns

### Ory Network

Place Ory Talos behind an Ory Network deployment configured with API token policies or session-based
authorization for the admin paths. The Ory Network gateway authenticates and authorizes the caller,
then forwards only allowed requests. No extra infrastructure required.

### Reverse proxy with mTLS

Run a reverse proxy (Envoy, NGINX, HAProxy, Caddy) in front of `talos serve admin` and require
client certificates from every caller.

- Issue a private CA-signed client certificate to each operator and CI/CD identity that needs admin
  access.
- Terminate TLS and validate the client certificate at the proxy.
- Reject any request that does not present a valid certificate.

This pattern works well for internal-only admin access where every caller is known and certificate
distribution is automated.

### Cloud API gateway

Use a managed API gateway (AWS API Gateway, Google Cloud API Gateway, or Azure API Management)
configured with an authorizer (IAM, OIDC, or JWT) on the admin route prefix. Run Ory Talos in a
private subnet so the gateway is the only public ingress.

- Configure the authorizer for `/v2alpha1/admin/*` to require a valid IAM principal, OIDC token, or
  signed JWT.
- Restrict the gateway-to-Ory Talos network path to a private interface (VPC link, private service
  connect, or equivalent).

### Internal-only network

When Ory Talos serves only internal traffic, network controls alone can be enough:

- Bind `talos serve admin` to a private interface (no public listener).
- Restrict the network path with security groups, firewall rules, or a service mesh policy so only
  known internal services reach the admin port.
- Pair this with an internal authenticating proxy if internal traffic itself is not implicitly
  trusted.

## Combining admin and self-service

If you also run `talos serve public` for proof-of-possession self-revocation, place that server
behind your **public** edge — it receives untrusted traffic and validates credentials inline.

Expose the two surfaces on different hostnames, ports, or ingresses so admin paths stay unreachable
from the public side even if configuration is misapplied.

## Verifying your boundary

Before sending production traffic, confirm that the admin endpoints are unreachable from outside
your trusted boundary:

```shell
# From an unauthenticated network, this must be rejected at your proxy:
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://talos-admin.example.com/v2alpha1/admin/issuedApiKeys
# Expect: 401, 403, or a connection refused/network unreachable error.
```

Any response that comes from Ory Talos itself — for example `200`, `404`, or `501` — means the
request reached the admin server without authentication. Fix the boundary before going live.

## See also

- [Separate admin and public APIs](../deploy/deployment-modes.md) — admin-only, public-only, and
  all-in-one process layouts.
- [Security hardening](../security-hardening.md) — broader hardening guidance.
