---
title: Multi-tenancy
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

# Multi-tenancy

Talos supports multi-tenancy through Network IDs (NID) derived from the request hostname.

## How it works

1. Each tenant is assigned a unique Network ID
2. The hostname middleware extracts the NID from the incoming request's hostname
3. All database operations are scoped to the NID via composite primary keys `(nid, key_id)`
4. Keys created in one tenant cannot be accessed or verified in another

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

Each entry maps a hostname to a network. The `hostname` is matched against the incoming request's
`Host` / `X-Forwarded-Host` header (port is stripped before comparison). The `id` is the tenant's
UUID. The `config_path` points to a network-specific configuration file (absolute or relative to the
working directory).

## Database isolation

Both `api_keys` and `imported_api_keys` tables use composite primary keys `(nid, key_id)`. Every
query includes the NID, ensuring complete data isolation at the SQL level.

## Defense-in-depth

Token claims embed the NID at derivation time. During verification, the claim NID is validated
against the context NID (from hostname). A mismatch returns `VERIFICATION_ERROR_NOT_FOUND`,
preventing cross-tenant token replay.
