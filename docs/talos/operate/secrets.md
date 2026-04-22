---
title: Secret management
---

# Secret management

Talos uses HMAC secrets for API key checksum generation and verification.

## Configuration

```yaml
secrets:
  default:
    current: "a-32-byte-or-longer-secret-here!"
    retired:
      - "previous-secret-that-was-rotated"
  hmac:
    current: "optional-separate-hmac-secret-32chars"
    retired: []
```

## Secret types

| Secret                    | Purpose                                   | Required           |
| ------------------------- | ----------------------------------------- | ------------------ |
| `secrets.default.current` | Default secret for HMAC and pagination    | Yes (min 32 chars) |
| `secrets.hmac.current`    | Dedicated HMAC secret (overrides default) | No                 |

If `secrets.hmac.current` is not set, Talos falls back to `secrets.default.current`.

## Secret rotation

1. Add the current secret to the `retired` array
2. Set a new `current` secret
3. Restart Talos (or wait for config hot-reload)

```yaml
secrets:
  default:
    current: "new-secret-32-chars-minimum-here!"
    retired:
      - "old-secret-that-was-previously-current"
```

During verification, Talos tries the current secret first, then each retired secret in order. This ensures existing API keys
remain valid after rotation.

## Environment variables

```bash
export TALOS_SECRETS_DEFAULT_CURRENT="my-secret-32-chars-minimum"
export TALOS_SECRETS_DEFAULT_RETIRED="old-secret-1,old-secret-2"
export TALOS_SECRETS_HMAC_CURRENT="optional-hmac-secret"
```
