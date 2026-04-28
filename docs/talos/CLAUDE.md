# Documentation Instructions

## JSON Processing

Use `jq` instead of `python3` for all JSON operations in code examples:

- **Pretty-print:** `| jq .` not `| python3 -m json.tool`
- **Extract fields:** `| jq -r '.field'` not
  `| python3 -c "import json,sys; print(json.load(sys.stdin)['field'])"`

**Never write curl output to temporary files.** Capture responses in shell variables instead.
File-based operations fail when `/tmp` doesn't exist or isn't writable.

```bash
# Good: variable-based
RESPONSE=$(curl -s -X POST "$URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-key"}')
echo "$RESPONSE" | jq .
KEY_ID=$(echo "$RESPONSE" | jq -r '.key_id')

# Bad: file-based
curl -s ... -o /tmp/response.json
jq . /tmp/response.json
KEY_ID=$(jq -r '.key_id' /tmp/response.json)
rm -f /tmp/response.json
```

## API Field Documentation

Integration guides under `integrate/` must NOT duplicate API field tables, error code tables, or
enum tables. These are maintained in the canonical references:

- **Field tables** -> auto-generated API reference at `reference/api/*.api.mdx`
- **Error codes** -> `reference/error-codes.md`

### What belongs in integration guides

- **Workflow and examples**: curl commands, step-by-step instructions, the "how" and "why"
- **Brief inline mentions**: 1-3 sentences highlighting the most important fields (e.g., "The
  response includes a `secret` field -- store it securely")
- **Conceptual comparisons**: tables comparing patterns, trade-offs, or usage scenarios (e.g., JWT
  vs macaroon)
- **Operational constraints**: limits, cache control headers, retry strategies
- **Links to reference**: always link to the canonical source for complete field/error details

### What does NOT belong in integration guides

- Full request/response field tables (use API reference link instead)
- Error code enum tables (use error codes reference link instead)
- Query parameter tables (use API reference link instead)
- Revocation reason enum tables (use API reference link instead)

### Link format

**All links MUST be relative links to markdown/mdx files with the file extension.** Never use
absolute links (starting with `/`) or links without a file extension. Hashbang anchors are allowed
after the file extension.

- Links to `.md` files: `[text](../reference/error-codes.md#section)`
- Links to `.api.mdx` files: `[text](../reference/api/admin-issue-api-key.api.mdx)`
- Links to directory index pages: `[text](../operate/cache/index.md)` (never `../operate/cache/`)
- Links within the same directory: `[text](./sibling-page.md)`

```text
# Good: relative links with file extensions
For the complete field reference, see the [IssueAPIKey API reference](../reference/api/admin-issue-api-key.api.mdx).
For the full list of error codes, see the [error codes reference](../reference/error-codes.md#verification-error-codes).

# Bad: absolute links without file extensions
For the complete field reference, see the [IssueAPIKey API reference](/reference/api/admin-issue-api-key).
For the full list of error codes, see the [error codes reference](/reference/error-codes#verification-error-codes).
```

### API reference URL pattern

API reference pages are `.api.mdx` files at `reference/api/{plane}-{method}.api.mdx` where:

- `{plane}` is `admin` or `data`
- `{method}` is the kebab-case method name (e.g., `issue-api-key`, `verify-api-key`)

The API overview page is `reference/api/ory-talos-api.info.mdx`.

### Notes and callouts

Ensure that notes / callouts have two line breaks, or they will get formatted incorrectly.

**Incorrect:**

```md
:::note Internal package The Go client is in an `internal/` package and cannot be imported by
external Go modules. :::
```

```md
:::note Internal package The Go client is in an `internal/` package and cannot be imported by
external Go modules. :::
```

Correct:

```md
:::note

Internal package The Go client is in an `internal/` package and cannot be imported by external Go
modules.

:::
```
