---
title: Troubleshooting
---

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Common issues

### Connection refused on port 4420 or 4422

The server is not running, is bound to a different interface, or another process holds the port. The
HTTP listener defaults to `:4420` and the metrics listener defaults to `:4422`. Both listeners serve
`/health/alive` and `/health/ready`; the metrics listener also serves Prometheus `/metrics` in the
commercial edition. If either port is already in use, startup fails with a bind error.

<!-- doctest:exec -->

```shell
# Check if Talos is listening
curl -sf "$TALOS_URL/health/alive"
```

Verify `serve.http.host` / `serve.http.port` and `serve.metrics.host` / `serve.metrics.port` in your
config, and check for port collisions with `lsof -i :4420 -i :4422`.

### Migration failures

```shell
# Check migration status
talos migrate status --database "sqlite3://./data/talos.db"
```

If a migration failed partway through, `migrate status` reports the version and whether the database
is in a dirty state. A failed migration leaves the database dirty at the version it was applying. To
recover, restore from backup, or take a verified backup and run `talos migrate force <version>` to
mark that version as resolved (this rewrites the `schema_migrations` table without inspecting the
schema, so the version must match the actual on-disk DDL). Then retry with `talos migrate up`.

For SQL errors during migration:

- **`database is locked` (SQLite):** another process holds a write lock. Stop concurrent writers;
  SQLite serializes writes internally.
- **`relation already exists` (Postgres):** a previous migration ran partially and left the database
  dirty. Recover as described above.
- **`permission denied`:** the DB user lacks DDL privileges. Migrations require `CREATE TABLE` /
  `CREATE INDEX` rights.

### Missing or short secrets

If `secrets.hmac.current` is unset, Ory Talos exits at startup with this message:

```
project has no HMAC key configured
```

Set `secrets.hmac.current` to a string of at least 32 characters. The schema enforces
`minLength: 32` on `secrets.hmac.current` and every entry in `secrets.hmac.retired`. Shorter values
fail config validation before startup with a schema error that references `minLength`.

### Key verification returns not found

1. Verify the key was issued on the same Ory Talos instance (or shared database).
2. Check if the key has been revoked: `GET /v2alpha1/admin/issuedApiKeys/{key_id}`.
3. If using caching, try with `Cache-Control: no-cache` header. Cached verification results lag
   revocations by up to `cache.ttl`; this is eventual consistency, not a bug.
4. For multi-tenant deployments, verify the request hostname matches the tenant where the key was
   issued.
5. After rotating `credentials.issuer`, ensure the previous issuer URL is listed under
   `credentials.issuer_retired` until every token signed with the old issuer has expired. Tokens
   whose `iss` claim matches neither `credentials.issuer` nor `credentials.issuer_retired` fail
   verification.

### Invalid API key format

The credential does not match the `prefix_v1_identifier_checksum` format. Check that the full secret
(not the key_id) is being sent. After rotating `credentials.api_keys.prefix.current`, the previous
prefix must remain in `credentials.api_keys.prefix.retired` until every key issued under the old
prefix has expired or been rotated. Keys whose prefix is not in the current or retired set fail
verification as not found.

## Debug logging

Enable debug logs for more detail:

```yaml
log:
  level: "debug"
  format: "json"
```

Or via environment variable:

```shell
export TALOS_LOG_LEVEL=debug
```

Ory Talos uses Go's `log/slog` and writes logs to stderr as JSON by default. There is no
pretty-print mode. Redirect stderr to `jq` for human-readable output:

```shell
talos serve --config config.yaml 2>&1 | jq -c .
```

## Health check debugging

<!-- doctest:exec -->

```shell
# Liveness
curl -s "$TALOS_URL/health/alive" | jq .

# Readiness
curl -s "$TALOS_URL/health/ready" | jq .
```

If readiness fails, the database connection may be down.
