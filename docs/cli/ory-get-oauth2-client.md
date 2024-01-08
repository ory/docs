---
id: ory-get-oauth2-client
title: ory get oauth2-client
description: ory get oauth2-client Get one or more OAuth 2.0 Clients by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get oauth2-client

Get one or more OAuth 2.0 Clients by their ID(s)

### Synopsis

This command gets all the details about an OAuth 2.0 Client. You can use this command in combination with jq.

```
ory get oauth2-client <id-1> [<id-2> ...] [flags]
```

### Examples

```
To get the OAuth 2.0 Client's secret, run:

	ory get oauth2-client <your-client-id> --format json | jq -r '.client_secret'
```

### Options

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help              help for oauth2-client
      --project string    The project to use, either project ID or a (partial) slug.
  -q, --quiet             Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

