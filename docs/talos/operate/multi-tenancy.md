---
title: Multi-tenancy
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# Multi-tenancy

Talos supports multi-tenancy through Network IDs (NID) derived from the request hostname. Each tenant runs on its own hostname and
has its own NID, configuration overlay, and isolated data.

## How it works

1. Each tenant is assigned a unique Network ID (UUID).
2. The hostname middleware extracts the hostname from the incoming request, normalizes it, and resolves it to a configured tenant.
3. The contextualizer attaches the NID and any per-tenant configuration overlay to the request context.
4. All database operations are scoped to the NID via composite primary keys `(nid, key_id)`. Keys created in one tenant cannot be
   accessed or verified in another.

## Configuration

```yaml
multitenancy:
  enabled: true
  networks:
    - hostname: "tenant1.talos.example.com"
      id: "550e8400-e29b-41d4-a716-446655440001"
      config_path: "/etc/talos/tenant1.yaml"
    - hostname: "tenant2.talos.example.com"
      id: "550e8400-e29b-41d4-a716-446655440002"
      config_path: "/etc/talos/tenant2.yaml"
```

| Field         | Required | Description                                                                    |
| ------------- | -------- | ------------------------------------------------------------------------------ |
| `hostname`    | Yes      | Tenant hostname matched against the normalized request hostname (see below)    |
| `id`          | Yes      | Tenant UUID written to the `nid` column of every row created on this tenant    |
| `config_path` | No       | Path to a YAML file containing per-tenant business-logic overrides (see below) |

Hostnames must be unique after normalization. Talos refuses to start if two entries normalize to the same value.

## Hostname source and normalization

By default Talos uses `r.Host` (the HTTP `Host` header) for tenant routing. To prefer `X-Forwarded-Host`, set:

```yaml
serve:
  http:
    trust_forwarded_host: true
```

Set this **only** when Talos runs behind a reverse proxy that strips the client-supplied `X-Forwarded-Host` and rewrites it to the
canonical edge hostname. Trusting the header in front of an unfiltered ingress lets external callers spoof tenant identity by
sending a forged `X-Forwarded-Host`.

Hostnames are normalized before lookup:

- Lowercased (`Tenant1.Example.com` → `tenant1.example.com`)
- Port stripped (`tenant1.example.com:8443` → `tenant1.example.com`)
- IPv6 brackets stripped (`[2001:db8::1]:443` → `2001:db8::1`)
- Rejected if the bare hostname exceeds 253 characters (DNS maximum), contains null bytes, or contains non-printable runes — these
  requests are treated as if the hostname is unknown.

## Unknown hostname behavior

Requests whose normalized hostname does not match any configured network return HTTP `404` with `code: NOT_FOUND` and reason
`network not found`. The middleware does not fall back to a default tenant. Configure a wildcard or catch-all hostname explicitly
if you need one.

## Per-tenant configuration overlays

`config_path` points to a YAML file merged on top of the base server configuration at request time. Per-tenant overlays are
**business-logic only**:

| Allowed override prefixes | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `talos.*`                 | Tenant-specific business logic             |
| `secrets.*`               | Per-tenant HMAC and pagination secrets     |
| `credentials.*`           | Per-tenant key prefixes, issuer, JWKS URLs |
| `cache.*`                 | Per-tenant cache backend selection         |

Server-wide settings — `db.*`, `serve.*` (`http`, `grpc`, `tls`), `multitenancy.*`, `tracing.*` — are **always global** and cannot
be overridden per tenant. Setting them in a tenant overlay has no effect.

## Database isolation

Both `api_keys` and `imported_api_keys` tables use composite primary keys `(nid, key_id)`. Every query includes the NID, ensuring
complete data isolation at the SQL level. Cross-tenant queries are impossible from application code because the NID is read from
the request context, never from request parameters or response bodies.

## Defense-in-depth

Token claims embed the NID at derivation time. During verification, the claim NID is validated against the context NID (from
hostname). A mismatch returns `VERIFICATION_ERROR_NOT_FOUND`, preventing cross-tenant token replay.

## Provisioning a new tenant

1. **Generate a tenant UUID:** `uuidgen` (or `python -c 'import uuid; print(uuid.uuid4())'`).
2. **Pick a hostname** that resolves to your Talos data plane (e.g., `tenant3.talos.example.com`) and add a DNS record or
   load-balancer rule for it.
3. **Create the tenant overlay** at `/etc/talos/tenant3.yaml` with any per-tenant business settings:

   ```yaml
   credentials:
     issuer: "https://api.tenant3.example.com"
     api_keys:
       prefix:
         current: "t3"
   ```

4. **Add the network entry** to the base config:

   ```yaml
   multitenancy:
     networks:
       - hostname: "tenant3.talos.example.com"
         id: "550e8400-e29b-41d4-a716-446655440003"
         config_path: "/etc/talos/tenant3.yaml"
   ```

5. **Reload or restart Talos.** The contextualizer picks up the new entry on the next request.
6. **Verify the route** with a curl against the admin plane:

   ```bash
   curl -sf -X POST "https://tenant3.talos.example.com/v2alpha1/admin/issuedApiKeys" \
     -H "Content-Type: application/json" \
     -d '{"name":"smoketest","actor_id":"system"}' | jq
   ```

   The response should include the new tenant's prefix (`t3_v1_…`).

To deprovision a tenant, remove the entry from `multitenancy.networks` and reload. Existing keys remain in the database under that
NID; delete them with a tenant-scoped admin call before removing the entry, or run a SQL
`DELETE FROM api_keys WHERE nid = '<uuid>'` after the entry is gone.
