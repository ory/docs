---
title: Troubleshooting
---

# Troubleshooting

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Common issues

### Connection refused on port 4420

The server is not running or is bound to a different interface.

<!-- doctest:exec -->

```bash
# Check if Talos is listening
curl -sf "$TALOS_URL/health/alive"
```

Verify `serve.http.host` and `serve.http.port` in your config.

### Migration failures

```bash
# Check migration status
talos migrate status --database "sqlite:///path/to/db"
```

If a migration failed partway through, inspect the database schema and retry with
`talos migrate up`.

### Secret too short

```
Error: secret must be at least 32 characters
```

Set `secrets.default.current` to a string of at least 32 characters.

### Key verification returns not found

1. Verify the key was issued on the same Talos instance (or shared database)
2. Check if the key has been revoked: `GET /v2alpha1/admin/issuedApiKeys/{key_id}`
3. If using caching, try with `Cache-Control: no-cache` header
4. For multi-tenant deployments, verify the request hostname matches the tenant where the key was
   issued

### Invalid API key format

The credential does not match the `prefix_v1_identifier_checksum` format. Check that the full secret
(not the key_id) is being sent.

## Debug logging

Enable debug logs for more detail:

```yaml
log:
  level: "debug"
  format: "json"
```

Or via environment variable:

```bash
export TALOS_LOG_LEVEL=debug
```

## Health check debugging

<!-- doctest:exec -->

```bash
# Liveness
curl -s "$TALOS_URL/health/alive" | jq .

# Readiness
curl -s "$TALOS_URL/health/ready" | jq .
```

If readiness fails, the database connection may be down.
