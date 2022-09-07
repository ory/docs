---
id: hydra-get-jwks
title: hydra get jwks
description: hydra get jwks Get a JSON Web Key Set by its ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra get jwks

Get a JSON Web Key Set by its ID(s)

### Synopsis

This command gets all the details about an JSON Web Key. You can use this command in combination with jq.

```
hydra get jwks set-1 [flags]
```

### Examples

```
To get the JSON Web Key Set's secret, run:

	hydra get jwks <set-id> | jq -r '.[].use'
```

### Options

```
  -h, --help   help for jwks
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

