---
title: Token format
---

# Token format

Issued API keys follow a structured v1 format:

```
{prefix}_v1_{identifier}_{checksum}
```

## Components

| Part       | Length      | Description                              |
| ---------- | ----------- | ---------------------------------------- |
| Prefix     | 1-8 chars   | Configurable label (e.g., `prod`, `dev`) |
| `v1`       | 2 chars     | Format version                           |
| Identifier | ~32 chars   | Base58-encoded timestamp + UUID          |
| Checksum   | 10-11 chars | HMAC-SHA256, truncated, Base58           |

## How it works

The identifier contains a Unix timestamp and UUID v4, Base58-encoded. The UUID is the `key_id` used for database lookup. The
checksum is HMAC-SHA256 over the payload, enabling tamper detection.

During verification, all configured secrets (current + retired) are tried, supporting zero-downtime secret rotation.

See [Token format reference](../reference/token-format.md) for the full specification.
