---
id: hydra-delete-access-tokens
title: hydra delete access-tokens
description: hydra delete access-tokens
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra delete access-tokens

Delete all OAuth2 Access Tokens of an OAuth2 Client

```
hydra delete access-tokens <client-id> [flags]
```

### Examples

```
hydra delete access-tokens <client-id>
```

### Options

```
  -h, --help   help for access-tokens
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra delete](hydra-delete) Delete resources

