---
title: Rate limiting
description: Attach and enforce rate limit policies on API keys
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Rate limiting

Rate limit policies let you cap how many verification requests a key can serve within a time window. Talos stores the policy on
the key, returns it in verification responses, and -- in the Commercial edition -- enforces it server-side. For background on how
enforcement works in each edition, see the [rate limiting concepts page](../concepts/rate-limiting.md).

## Prerequisites

A running Talos server with rate limiting enabled. See the [quickstart](../quickstart/index.md) to start one locally.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Attach a rate limit policy

Set a rate limit policy when issuing a key. The policy defines a `quota` (maximum requests) and a `window` (time window as a
duration string, e.g. `"60s"`):

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issue "rate-limited-key" \
  --actor service_api \
  --rate-limit-quota 100 \
  --rate-limit-window "60s" \
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
    "name": "rate-limited-key",
    "actor_id": "service_api",
    "rate_limit_policy": {
      "quota": 100,
      "window": "60s"
    }
  }')

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.key_id')

echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

The response includes the full key metadata with the `rate_limit_policy` attached. For the complete request and response field
reference, see the [IssueAPIKey API reference](../reference/api/admin-plane-service-issue-api-key.api.mdx).

## Verify a rate-limited key

Verify the key as you would any other credential. When the key has a rate limit policy, the response includes the policy metadata:

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

When rate limiting is enabled (Commercial), the response also includes `rate_limit_remaining` (approximate requests available
before the limit is reached) and `rate_limit_reset_time` (when full capacity is recovered). For the complete response field
reference, see the [VerifyAPIKey API reference](../reference/api/data-plane-service-verify-api-key.api.mdx).

## Exceeding the limit

When a key's quota is exhausted, verification returns `is_active: false` with error code `VERIFICATION_ERROR_RATE_LIMITED`
(Commercial edition). The response body includes the error code and a human-readable message:

```json
{
  "is_active": false,
  "error_code": "VERIFICATION_ERROR_RATE_LIMITED",
  "error_message": "Rate limit exceeded"
}
```

The HTTP response also includes a `Retry-After` header indicating how many seconds the client should wait before retrying. In the
OSS edition, enforcement is external -- Talos always returns the policy metadata but does not reject requests based on quota.

For the complete list of verification error codes, see the
[error codes reference](../reference/error-codes.md#verification-error-codes).

## Update rate limit policy

Use `PATCH` to change a key's rate limit policy without rotating the secret. Include `rate_limit_policy` in the `update_mask`:

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued update "$KEY_ID" \
  --rate-limit-quota 500 \
  --rate-limit-window "120s" \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X PATCH "$TALOS_URL/v2/admin/issuedApiKeys/$KEY_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "rate_limit_policy": {
      "quota": 500,
      "window": "120s"
    },
    "update_mask": {"paths": ["rate_limit_policy"]}
  }' | jq .
```

</TabItem>
</Tabs>

The updated policy takes effect on the next verification request (subject to cache TTL). For the complete update field reference,
see the [UpdateIssuedAPIKey API reference](../reference/api/admin-plane-service-update-issued-api-key.api.mdx).

## Remove rate limit policy

To remove a rate limit policy entirely, set `rate_limit_policy` to an empty object:

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued update "$KEY_ID" \
  --rate-limit-quota 0 \
  --rate-limit-window "0s" \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X PATCH "$TALOS_URL/v2/admin/issuedApiKeys/$KEY_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "rate_limit_policy": {},
    "update_mask": {"paths": ["rate_limit_policy"]}
  }' | jq .
```

</TabItem>
</Tabs>

Once removed, the key is no longer subject to rate limiting.

## HTTP response headers

When a key has a rate limit policy, the HTTP gateway includes IETF draft-compliant headers in verification responses:

| Header             | When present         | Description                                        |
| ------------------ | -------------------- | -------------------------------------------------- |
| `RateLimit-Policy` | Always (with policy) | Declares the quota and window: `100;w=60`          |
| `RateLimit`        | Always (with policy) | Current state: `limit=100, remaining=42, reset=18` |
| `Retry-After`      | Only when limited    | Seconds to wait before the next allowed request    |

These headers are present in both editions. In the OSS edition, your API gateway can read them to apply enforcement. In the
Commercial edition, clients can use them for backoff and retry logic.

## Behavior notes

- **Fail-open on limiter errors** -- if the rate limiter backend is unavailable (e.g., Redis is down), verification succeeds but
  rate limit metadata is omitted. Limiter failures never block legitimate traffic.
- **Cache interaction** -- rate limit checks happen after cache resolution. If a verification result is served from cache, the
  rate limiter is not consulted. This means cached responses do not decrement the counter.
- **Per-key isolation** -- each key maintains its own counter. Keys do not share rate limit budgets, even if they belong to the
  same actor.
- **Policy changes** -- updated policies take effect on the next cache miss. To force immediate effect, use the
  `Cache-Control: no-cache` header on verification requests.

## Next steps

- [Rate limiting concepts](../concepts/rate-limiting.md) -- how enforcement works in OSS vs. Commercial
- [Key lifecycle](./key-lifecycle.md) -- update, rotate, and revoke keys
- [Error handling](./error-handling.md) -- error response format and retry logic
