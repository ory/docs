---
title: Batch operations
description: Verify and import multiple credentials in a single request
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Batch operations

Talos supports batch endpoints for high-throughput scenarios. Batch operations process items in
parallel and return per-item results.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

First, issue two keys to use in batch operations:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
KEY1=$(talos keys issue "batch-key-1" \
  --actor user_1 --scopes "read" \
  --format json \
  -e "$TALOS_URL" 2>/dev/null | jq -r '.secret')

KEY2=$(talos keys issue "batch-key-2" \
  --actor user_2 --scopes "write" \
  --format json \
  -e "$TALOS_URL" 2>/dev/null | jq -r '.secret')

echo "export KEY1=$KEY1" >> "$DOCTEST_ENV_FILE"
echo "export KEY2=$KEY2" >> "$DOCTEST_ENV_FILE"
echo "Keys issued"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
KEY1=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{"name":"batch-key-1","actor_id":"user_1","scopes":["read"]}' | \
  jq -r '.secret')

KEY2=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{"name":"batch-key-2","actor_id":"user_2","scopes":["write"]}' | \
  jq -r '.secret')

echo "export KEY1=$KEY1" >> "$DOCTEST_ENV_FILE"
echo "export KEY2=$KEY2" >> "$DOCTEST_ENV_FILE"
echo "Keys issued"
```

</TabItem>
</Tabs>

## Batch verify

Verify up to 100 credentials in a single request:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys batch-verify "$KEY1" "$KEY2" "invalid-key-for-testing" \
  --format json \
  -e "$TALOS_URL" | jq .
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:batchVerify" \
  -H "Content-Type: application/json" \
  -d "{
    \"requests\": [
      {\"credential\": \"$KEY1\"},
      {\"credential\": \"$KEY2\"},
      {\"credential\": \"invalid-key-for-testing\"}
    ]
  }" | jq .
```

</TabItem>
</Tabs>

### Response format

The response contains a `results` array. Each element has the same fields as a single
[verify response](./issue-and-verify.md#verification-response). Results are returned in the same
order as the requests.

Invalid credentials return `active: false` with an `error_code` — they do not cause the batch
request to fail.

### Limits

| Constraint                      | Value |
| ------------------------------- | ----- |
| Maximum credentials per request | 100   |
| Minimum credentials per request | 1     |

## Batch import

Import up to 1000 keys in a single request:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys imported batch-import --file - -e "$TALOS_URL" <<'JSON'
[
  {"raw_key": "legacy_key_aaa", "name": "Legacy Key A", "actor_id": "migration"},
  {"raw_key": "legacy_key_bbb", "name": "Legacy Key B", "actor_id": "migration"},
  {"raw_key": "legacy_key_ccc", "name": "Legacy Key C", "actor_id": "migration", "scopes": ["read"]}
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
      {"raw_key": "legacy_key_aaa", "name": "Legacy Key A", "actor_id": "migration"},
      {"raw_key": "legacy_key_bbb", "name": "Legacy Key B", "actor_id": "migration"},
      {"raw_key": "legacy_key_ccc", "name": "Legacy Key C", "actor_id": "migration", "scopes": ["read"]}
    ]
  }' | jq .
```

</TabItem>
</Tabs>

### Response format

The response includes a `results` array with per-item outcomes, plus `success_count` and
`failure_count` counters. The HTTP response is `200 OK` if at least one key succeeds. Check
`failure_count` and individual `error_code` fields to detect partial failures.

For the complete field reference, see the
[BatchImportAPIKeys API reference](../reference/api/admin-plane-service-batch-import-api-keys.api.mdx).
For batch import error codes, see the
[error codes reference](../reference/error-codes.md#batch-import-error-codes).

### Limits

| Constraint               | Value |
| ------------------------ | ----- |
| Maximum keys per request | 1000  |

## Next steps

- [Import keys](import-keys.md) — single key import with full field reference
- [Issue and verify](issue-and-verify.md) — create and verify individual keys
