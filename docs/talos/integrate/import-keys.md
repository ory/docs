---
title: Import existing keys
description: Import API keys from external systems into Talos
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Import existing keys

Talos can manage API keys that were created outside the system. Import lets you migrate from a legacy key management solution or
centralize keys from multiple providers without rotating credentials. For large migrations, use the batchImport API to import up
to 1000 keys in a single request.

## How import works

When you import a key, Talos stores a cryptographic hash (HMAC-SHA256) of the raw key. The original key is never stored.
Verification works by computing the same hash and looking it up in the database.

Imported keys support the same features as issued keys: scopes, metadata, expiration, token derivation (JWT/macaroon), and
revocation.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Import a single key

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys imported import "Stripe production key" \
  --raw-key "sk_live_test_51OxAM2Qly" \
  --actor payment-service \
  --scopes "payments:read,payments:write" \
  --ttl 8760h \
  --metadata '{"source": "stripe", "environment": "production"}' \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

IMPORTED_KEY_ID=$(echo "$RESPONSE" | jq -r '.imported_api_key.key_id')
echo "export IMPORTED_KEY_ID=$IMPORTED_KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/importedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "raw_key": "sk_live_test_51OxAM2Qly",
    "name": "Stripe production key",
    "actor_id": "payment-service",
    "scopes": ["payments:read", "payments:write"],
    "ttl": "8760h",
    "metadata": {"source": "stripe", "environment": "production"}
  }')

echo "$RESPONSE" | jq .

IMPORTED_KEY_ID=$(echo "$RESPONSE" | jq -r '.key_id')
echo "export IMPORTED_KEY_ID=$IMPORTED_KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

### Request fields

The key fields are `raw_key` (the actual API key string), `name`, `actor_id`, and optional `scopes`, `ttl`, and `metadata`. For
the complete field reference, see the [ImportAPIKey API reference](../reference/api/admin-plane-service-import-api-key.api.mdx).

The response returns an `imported_api_key` object. The `raw_key` is **never returned** after import.

## Verify an imported key

Imported keys use the same verification endpoint as issued keys. The data plane automatically detects the credential type:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "sk_live_test_51OxAM2Qly" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d '{"credential":"sk_live_test_51OxAM2Qly"}' | jq .
```

</TabItem>
</Tabs>

## Batch import

Import up to 1000 keys in a single request:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys imported batch-import --file - -e "$TALOS_URL" <<'JSON'
[
  {"raw_key": "ghp_batch_key_001", "name": "GitHub PAT 1", "actor_id": "dev-team"},
  {"raw_key": "ghp_batch_key_002", "name": "GitHub PAT 2", "actor_id": "dev-team"}
]
JSON
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/importedApiKeys:batchImport" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {"raw_key": "ghp_batch_key_001", "name": "GitHub PAT 1", "actor_id": "dev-team"},
      {"raw_key": "ghp_batch_key_002", "name": "GitHub PAT 2", "actor_id": "dev-team"}
    ]
  }' | jq .
```

</TabItem>
</Tabs>

### Batch response

The response includes a `results` array with per-item outcomes (`imported_api_key` on success, `error_code` and `error_message` on
failure), plus `success_count` and `failure_count` counters. If at least one key succeeds, the HTTP response is `200 OK`.

For the complete response field reference, see the
[BatchImportAPIKeys API reference](../reference/api/admin-plane-service-batch-import-api-keys.api.mdx). For batch import error
codes, see the [error codes reference](../reference/error-codes.md#batch-import-error-codes).

## List imported keys

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys imported list -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s "$TALOS_URL/v2/admin/importedApiKeys?actor_id=payment-service&page_size=10" | jq .
```

</TabItem>
</Tabs>

## Revoke an imported key

Imported keys are revoked through the same unified endpoint as issued keys:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys revoke "$IMPORTED_KEY_ID" --reason superseded -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys/$IMPORTED_KEY_ID:revoke" \
  -H "Content-Type: application/json" \
  -d '{"reason": "REVOCATION_REASON_SUPERSEDED"}'
echo ""
echo "Imported key revoked"
```

</TabItem>
</Tabs>

## Delete an imported key

For permanent removal (no audit trail), use the delete endpoint:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys imported delete "$IMPORTED_KEY_ID" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X DELETE "$TALOS_URL/v2/admin/importedApiKeys/$IMPORTED_KEY_ID"
echo ""
echo "Imported key deleted"
```

</TabItem>
</Tabs>

:::caution Delete is permanent and irreversible. Prefer revocation for audit trail. :::

## Next steps

- [Batch operations](batch-operations.md) -- batch verify and batch import in detail
- [Key lifecycle](key-lifecycle.md) -- update, rotate, and revoke keys
- [Derive tokens](derive-tokens.md) -- mint JWTs or macaroons from imported keys
