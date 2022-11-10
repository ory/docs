---
id: hydra-get-oauth2-client
title: hydra get oauth2-client
description: hydra get oauth2-client Get one or more OAuth 2.0 Clients by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra get oauth2-client

Get one or more OAuth 2.0 Clients by their ID(s)

### Synopsis

This command gets all the details about an OAuth 2.0 Client. You can use this command in combination with jq.

```
hydra get oauth2-client <id-1> [<id-2> ...] [flags]
```

### Examples

```
To get the OAuth 2.0 Client's secret, run:

	{{ .CommandPath }} <your-client-id> --json | jq -r '.client_secret'
```

### Options

```
  -h, --help   help for oauth2-client
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra get](hydra-get)	 - Get resources

