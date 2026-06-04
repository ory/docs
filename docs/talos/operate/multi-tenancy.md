---
title: Multi-tenancy
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

Ory Talos routes each request to a tenant based on the request hostname. Each tenant has fully
isolated data and its own configuration overlay.

## How it works

- You map each tenant to one or more hostnames.
- Ory Talos resolves the request hostname to a tenant and scopes all data, credentials, and
  configuration overlays to that tenant.
- Ory Talos rejects requests to an unrecognized hostname.

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

| Field         | Required | Description                                                                                                                       |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `hostname`    | Yes      | Tenant hostname matched against the normalized request hostname (see below).                                                      |
| `id`          | Yes      | Tenant UUID. Immutable once issued. Reuse the same `id` to map several hostnames to one tenant.                                   |
| `config_path` | Yes      | Path to a YAML or JSON file with per-tenant business-logic overrides (see below). Absolute, or relative to the working directory. |

Hostnames must be unique after normalization. A single duplicate makes the whole `networks` list
unresolvable: every request then fails with a `500` until you fix it. Verify uniqueness before you
deploy the config.

## Hostname source and normalization

Ory Talos routes on the HTTP `Host` header by default. To prefer `X-Forwarded-Host`, set:

```yaml
serve:
  http:
    trust_forwarded_host: true
```

This setting is immutable, so a restart is required to change it. Set it **only** when Ory Talos
runs behind a reverse proxy that strips the client-supplied `X-Forwarded-Host` and rewrites it to
the canonical edge hostname. In front of an unfiltered ingress, a forged `X-Forwarded-Host` lets
external callers spoof tenant identity.

Ory Talos normalizes hostnames before lookup:

- Lowercases them: `Tenant1.Example.com` → `tenant1.example.com`.
- Strips the port: `tenant1.example.com:8443` → `tenant1.example.com`.
- Strips IPv6 brackets: `[2001:db8::1]:443` → `2001:db8::1`.
- Treats the hostname as unknown if the bare value exceeds 253 characters (the DNS maximum),
  contains null bytes, or contains non-printable runes.

## Unknown hostname behavior

A request whose normalized hostname matches no configured network returns HTTP `404` with
`id: not_found` and reason `network not found`. Ory Talos has no default tenant and no wildcard or
catch-all matcher. List every hostname explicitly in `multitenancy.networks`.

## Per-tenant configuration overlays

Ory Talos merges the file at `config_path` on top of the base server configuration at request time.
Only an allow-list of business-logic keys supports per-tenant overrides. It strips everything else
silently:

| Allowed override     | Purpose                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `credentials.*`      | Per-tenant issuer, signing keys, and API key prefixes.                                                 |
| `secrets.*`          | Per-tenant default, HMAC, and pagination secrets.                                                      |
| `rate_limit.enabled` | Toggle rate limiting per tenant. The backend (`memory`/`redis`) is infrastructure-only.                |
| `cache.ttl`          | Override the cache TTL per tenant. The backend (`type`, `memory.*`, `redis.*`) is infrastructure-only. |

All other settings — `db.*`, `serve.*`, `multitenancy.*`, `tracing.*`, `cache.type`,
`rate_limit.backend`, and any unlisted key — are **always global** and dropped from tenant overlays.

## Tenant isolation

Tenants are isolated at the storage layer. The application cannot read or write across tenants, and
it always derives tenant identity from the request hostname, never from request parameters or
response bodies. A credential issued for one tenant cannot be verified in another: an API key from
another tenant fails verification as not found, and a derived token fails with a signature error
because each tenant signs with its own keys.

## Where tenant identity lives

Tenant identity lives in two independent places, and provisioning touches both:

- **`multitenancy.networks` in the base configuration.** Maps hostnames to network IDs. The
  `multitenancy` block is immutable (`x-immutable`), so restart Ory Talos after you change this
  list.
- **The `networks` table in the Ory Talos database.** Both `issued_api_keys` and `imported_api_keys`
  have a foreign key on `nid → networks.id`. A tenant needs a row in `networks` before it can issue
  or import keys. The request path never writes to this table, so provision rows out of band when
  you add a tenant.

Adding a hostname needs both a config change (followed by a restart) and a `networks` row. Until the
row exists, the tenant's first key issue or import fails with a foreign-key violation.

## Provisioning a new tenant

1. **Generate a tenant ID.** Use a lowercase UUID: `uuidgen | tr 'A-Z' 'a-z'`. The config schema
   accepts only lowercase hex, so uppercase UUIDs (the macOS `uuidgen` default) are rejected.
2. **Pick a hostname** that resolves to your Ory Talos admin process (for example,
   `tenant3.talos.example.com`) and add a DNS record or load-balancer rule for it.
3. **Create the tenant overlay** at `/etc/talos/tenant3.yaml` with any per-tenant business settings:

   ```yaml
   credentials:
     issuer: "https://api.tenant3.example.com"
     api_keys:
       prefix:
         current: "t3"
   ```

4. **Create the network row in the Ory Talos database.** Both `issued_api_keys` and
   `imported_api_keys` reference `networks (id)`, so without this row every key issue or import for
   the tenant fails with a foreign-key violation. Run once against the Ory Talos database,
   substituting the UUID from step 1:

   ```sql
   -- PostgreSQL / CockroachDB
   INSERT INTO networks (id, created_at, updated_at)
   VALUES ('550e8400-e29b-41d4-a716-446655440003', NOW(), NOW())
   ON CONFLICT (id) DO NOTHING;

   -- MySQL
   INSERT INTO networks (id, created_at, updated_at)
   VALUES ('550e8400-e29b-41d4-a716-446655440003', UTC_TIMESTAMP(6), UTC_TIMESTAMP(6))
   ON DUPLICATE KEY UPDATE id = id;
   ```

5. **Add the network entry** to the base config:

   ```yaml
   multitenancy:
     networks:
       - hostname: "tenant3.talos.example.com"
         id: "550e8400-e29b-41d4-a716-446655440003"
         config_path: "/etc/talos/tenant3.yaml"
   ```

6. **Restart Ory Talos.** The `multitenancy` block is immutable, so the new `multitenancy.networks`
   entry takes effect only after a restart. Ory Talos re-reads the overlay file at `config_path` on
   the next request, so editing an overlay needs no restart.
7. **Verify the route** with a curl against the admin process:

   ```shell
   curl -sf -X POST "https://tenant3.talos.example.com/v2alpha1/admin/issuedApiKeys" \
     -H "Content-Type: application/json" \
     -d '{"name":"smoketest","actor_id":"system"}' | jq
   ```

   The returned `secret` carries the tenant's prefix (`t3_v1_…`). A `500` that wraps a foreign-key
   error means step 4 is missing.

To deprovision a tenant, delete its keys through the admin API first, then remove the entry from
`multitenancy.networks` and restart. Remove the `networks` row afterward; the `ON DELETE CASCADE`
foreign key drops any residual key rows for that tenant.
