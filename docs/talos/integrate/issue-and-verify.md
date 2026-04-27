---
title: Issue and verify API keys
description: Create API keys on the admin plane and verify them on the data plane
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Issue and verify API keys

This guide walks through the full lifecycle of issuing an API key and verifying it. All examples are executable and tested in CI.

## Prerequisites

A running Talos server and the `talos` CLI. See the [quickstart](../quickstart/index.md) to start one locally.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Issue an API key

Send a request to the admin plane to create a new key:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issue "backend-service" \
  --actor user_42 \
  --scopes "read:orders,write:orders" \
  --ttl 720h \
  --metadata '{"team": "payments", "environment": "staging"}' \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')

echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "backend-service",
    "actor_id": "user_42",
    "scopes": ["read:orders", "write:orders"],
    "ttl": "720h",
    "metadata": {"team": "payments", "environment": "staging"}
  }')

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.key_id')

echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

### Request fields

The key fields are `name` (human-readable label), `actor_id` (key actor), and optional `scopes`, `ttl`, `metadata`, and
`rate_limit_policy`. For the complete field reference, see the
[IssueAPIKey API reference](../reference/api/admin-issue-api-key.api.mdx).

### Response fields

The response contains two top-level fields:

- **`issued_api_key`** — The key metadata (ID, name, actor, scopes, status, timestamps).
- **`secret`** — The full API key credential. This value is returned **only once** and cannot be retrieved later. Store it
  securely.

For the complete metadata field reference, see the [IssueAPIKey API reference](../reference/api/admin-issue-api-key.api.mdx).

## Verify a key

Send the secret to the data plane to check whether a credential is valid:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$API_SECRET" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d "{\"credential\":\"$API_SECRET\"}" | jq .
```

</TabItem>
</Tabs>

### Verification response

The response includes `is_active` (boolean), `key_id`, `actor_id`, `scopes`, `metadata`, and `expire_time` when valid. When
`is_active` is `false`, `error_code` and `error_message` indicate the reason. When rate limit enforcement is enabled (Commercial),
the response also includes `rate_limit_remaining` and `rate_limit_reset_time` for keys with a rate limit policy. For the complete
field reference, see the [VerifyAPIKey API reference](../reference/api/admin-verify-api-key.api.mdx).

### Verification error codes

When `is_active` is `false`, the `error_code` field indicates why. Common codes include `VERIFICATION_ERROR_EXPIRED`,
`VERIFICATION_ERROR_REVOKED`, `VERIFICATION_ERROR_NOT_FOUND`, and `VERIFICATION_ERROR_RATE_LIMITED` (Commercial, when the key's
rate limit quota is exhausted). For the complete list, see the
[verification error codes reference](../reference/error-codes.md#verification-error-codes).

## Cache bypass

Verification results are cached for performance. After revoking a key, you can bypass the cache for immediate consistency:

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d '{"credential":"sk_..."}'
```

Cache control headers:

| Header                    | Effect                                      |
| ------------------------- | ------------------------------------------- |
| `Cache-Control: no-cache` | Bypass cache read, force fresh DB lookup    |
| `Cache-Control: no-store` | Bypass both cache read and write            |
| `Pragma: no-cache`        | Same as `no-cache` (HTTP/1.0 compatibility) |

## Retrieve a key by ID

Look up key metadata without the secret:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued get "$KEY_ID" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s "$TALOS_URL/v2/admin/issuedApiKeys/$KEY_ID" | jq .
```

</TabItem>
</Tabs>

The secret is never returned from `GET` requests.

## List keys

List all issued keys with optional filtering and pagination:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued list --actor user_42 --page-size 10 -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s "$TALOS_URL/v2/admin/issuedApiKeys?page_size=10&actor_id=user_42" | jq .
```

</TabItem>
</Tabs>

### Query parameters

Key parameters are `page_size`, `page_token` (cursor-based pagination), `actor_id`, and `status` (filtering). For the complete
parameter reference, see the [ListIssuedAPIKeys API reference](../reference/api/admin-list-issued-api-keys.api.mdx).

The response includes a `next_page_token` field. When empty, you have reached the last page.

## Next steps

- [Key lifecycle](key-lifecycle.md) — update, rotate, and revoke keys
- [Import keys](import-keys.md) — bring existing keys into Talos
- [Derive tokens](derive-tokens.md) — mint short-lived JWTs or macaroons
- [Error handling](error-handling.md) — error response format and retry logic
