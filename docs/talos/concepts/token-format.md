---
title: Token format
---

Issued API keys use a versioned format:

```text
{prefix}_v1_{identifier}_{checksum}
```

## Components

| Part       | Length     | Description                                                          |
| ---------- | ---------- | -------------------------------------------------------------------- |
| Prefix     | 1-16 chars | Configurable label (for example, `prod` or `dev`)                    |
| `v1`       | 2 chars    | Format version                                                       |
| Identifier | ~64 chars  | Base58-encoded ASCII string `"{unix_seconds}:{uuid-with-hyphens}"`   |
| Checksum   | ~44 chars  | Full HMAC-SHA256 digest (32 bytes), Base58-encoded — never truncated |

## How it works

The identifier is the Base58 encoding of the ASCII string `{unix_seconds}:{uuid-with-hyphens}` (the
timestamp and UUID v4 joined by a colon). Decoding it returns the timestamp and UUID; the UUID is
the `key_id` used for database lookup.

The checksum is the **full** HMAC-SHA256 digest over the payload `{prefix}_v1_{identifier}_`,
Base58-encoded. Talos never truncates the digest.

During verification, Talos tries each configured secret in order (current, then retired) to support
zero-downtime secret rotation.

See [Token format reference](../reference/token-format.md) for the full specification.
