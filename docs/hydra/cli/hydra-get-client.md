---
id: hydra-get-client
title: hydra get client
description: hydra get client Get one or more OAuth 2.0 Clients by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra get client

Get one or more OAuth 2.0 Clients by their ID(s)

### Synopsis

This command gets all the details about an OAuth 2.0 Client. You can use this command in combination with jq.

```
hydra get client id-1 [id-2] [id-n] [flags]
```

### Examples

```
To get the OAuth 2.0 Client's secret, run:

	hydra get client <your-client-id> | jq -r '.client_secret'
```

### Options

```
  -h, --help   help for client
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra get](hydra-get)	 - Get resources

