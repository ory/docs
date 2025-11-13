---
id: hydra-delete-oauth2-client
title: hydra delete oauth2-client
description: hydra delete oauth2-client
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra delete oauth2-client

Delete one or more OAuth 2.0 Clients by their ID(s)

### Synopsis

This command deletes one or more OAuth 2.0 Clients by their respective IDs.

```
hydra delete oauth2-client <id-1> [<id-2> ...] [flags]
```

### Examples

```
hydra delete oauth2-client <client-1> <client-2> <client-3>

To delete OAuth 2.0 Clients with the owner of "foo@bar.com", run:

	hydra delete oauth2-client $(hydra list oauth2-clients --format json | jq -r 'map(select(.contacts[] == "foo@bar.com")) | .[].client_id')
```

### Options

```
  -h, --help   help for oauth2-client
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra delete](hydra-delete) Delete resources

