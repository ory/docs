---
title: Key lifecycle
description: Update, rotate, and revoke API keys
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Key lifecycle

After issuing an API key, you can update its metadata, rotate the secret, or revoke it. All lifecycle operations use the admin
plane.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

First, issue a key to work with:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issue "lifecycle-test" \
  --actor user_1 \
  --scopes "read,write" \
  --metadata '{"team":"backend"}' \
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
ISSUE_RESP=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{"name":"lifecycle-test","actor_id":"user_1","scopes":["read","write"],"metadata":{"team":"backend"}}')

echo "$ISSUE_RESP" | jq .

API_SECRET=$(echo "$ISSUE_RESP" | jq -r '.secret')
KEY_ID=$(echo "$ISSUE_RESP" | jq -r '.key_id')
echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

## Update key metadata

Use `PATCH` to update a key's name, scopes, metadata, or rate limit policy without changing the secret:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued update "$KEY_ID" \
  --name "lifecycle-test-updated" \
  --scopes "read" \
  --metadata '{"team": "backend", "tier": "premium"}' \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X PATCH "$TALOS_URL/v2/admin/issuedApiKeys/$KEY_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "lifecycle-test-updated",
    "scopes": ["read"],
    "metadata": {"team": "backend", "tier": "premium"},
    "update_mask": {"paths": ["name", "scopes", "metadata"]}
  }' | jq .
```

</TabItem>
</Tabs>

### Update mask

The `update_mask` field controls which fields are modified. Only fields listed in `paths` are changed. This follows the
[AIP-134](https://google.aip.dev/134) standard for partial updates.

Updatable fields include `name`, `scopes`, `metadata`, and `rate_limit_policy`. For the complete field reference, see the
[UpdateIssuedAPIKey API reference](../reference/api/admin-plane-service-update-issued-api-key.api.mdx).

## Rotate a key

Rotation creates a new key with a new secret and immediately revokes the old one:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issued rotate "$KEY_ID" \
  --scopes "read,write,admin" \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

NEW_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
NEW_KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')
echo "export API_SECRET=$NEW_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$NEW_KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys/${KEY_ID}:rotate" \
  -H "Content-Type: application/json" \
  -d '{
    "scopes": ["read", "write", "admin"],
    "update_mask": {"paths": ["scopes"]}
  }')

echo "$RESPONSE" | jq .

NEW_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
NEW_KEY_ID=$(echo "$RESPONSE" | jq -r '.key_id')
echo "export API_SECRET=$NEW_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$NEW_KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

### Rotation response

The response includes the new `issued_api_key` (with a new `key_id`), the new `secret` (shown once), and `old_issued_api_key`
(status `KEY_STATUS_REVOKED`). For the complete field reference, see the
[RotateIssuedAPIKey API reference](../reference/api/admin-plane-service-rotate-issued-api-key.api.mdx).

### Zero-downtime rotation

The `:rotate` endpoint revokes the old key immediately. For zero-downtime rotation:

1. Issue a new key with `POST /v2/admin/issuedApiKeys`
2. Deploy the new secret to all services
3. Verify the new secret works everywhere
4. Revoke the old key with `POST /v2/admin/apiKeys/{old_key_id}:revoke`

## Revoke a key

Revocation is irreversible. Once revoked, the key fails verification immediately (subject to cache TTL):

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys revoke "$KEY_ID" --reason superseded -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys/${KEY_ID}:revoke" \
  -H "Content-Type: application/json" \
  -d '{"reason": "REVOCATION_REASON_SUPERSEDED"}'
echo ""
echo "Key revoked"
```

</TabItem>
</Tabs>

### Revocation reasons

Standard reasons include `REVOCATION_REASON_KEY_COMPROMISE`, `REVOCATION_REASON_SUPERSEDED`,
`REVOCATION_REASON_AFFILIATION_CHANGED`, and `REVOCATION_REASON_PRIVILEGE_WITHDRAWN` (admin only). For the complete list, see the
[RevokeAPIKey API reference](../reference/api/admin-plane-service-revoke-api-key.api.mdx).

When using `PRIVILEGE_WITHDRAWN`, you can include a `reason_text` field with a human-readable explanation.

### Revocation and caching

Revocation takes effect in the database immediately. However, if caching is enabled, previously cached verification results may
remain valid until the cache entry expires. To force immediate effect, use the `Cache-Control: no-cache` header on verification
requests.

## Verify after revocation

Confirm the key is no longer valid:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$API_SECRET" --no-cache -e "$TALOS_URL" || true
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d "{\"credential\":\"$API_SECRET\"}" | jq .
```

</TabItem>
</Tabs>

## Next steps

- [Self-revocation](self-revocation.md) -- let key holders revoke their own keys
- [Issue and verify](issue-and-verify.md) -- create new keys to replace revoked ones
- [Error handling](error-handling.md) -- handle revocation-related errors
