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

- **Use strong HMAC secrets** of at least 32 characters, generated with a cryptographically secure
  random generator.
- **Use separate HMAC secrets** (`secrets.hmac.current`) rather than relying on the default secret.
- **Rotate secrets regularly** using the retired array. Verification tries current + retired secrets
  automatically.
- **Never commit secrets** to version control. Use environment variables or a secrets manager.

## API keys

- **Set TTL on all keys** to limit exposure from leaked credentials.
- **Revoke compromised keys immediately** using `POST /v2/admin/apiKeys/{id}:revoke`.
- **Use scopes** to limit key permissions to the minimum required.

## Caching

- **Enable caching** to protect the database from verification floods (DoS).
- **Set appropriate TTL** balancing latency of revocation propagation vs. database load.

## Monitoring

- **Monitor verification error rates** for anomalous patterns (credential stuffing, brute force).
- **Enable tracing** to audit key usage and identify suspicious activity.
- **Set up alerts** on `http_requests_total{code=~"4.."}` and `http_requests_total{code=~"5.."}`.
