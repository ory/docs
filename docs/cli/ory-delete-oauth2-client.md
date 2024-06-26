---
id: ory-delete-oauth2-client
title: ory delete oauth2-client
description: ory delete oauth2-client Delete one or more OAuth 2.0 Clients by their ID(s)
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete oauth2-client

Delete one or more OAuth 2.0 Clients by their ID(s)

### Synopsis

This command deletes one or more OAuth 2.0 Clients by their respective IDs.

```
ory delete oauth2-client <id-1> [<id-2> ...] [flags]
```

### Examples

```
ory delete oauth2-client <client-1> <client-2> <client-3>

To delete OAuth 2.0 Clients with the owner of "foo@bar.com", run:

	ory delete oauth2-client $(ory list oauth2-clients --format json | jq -r 'map(select(.contacts[] == "foo@bar.com")) | .[].client_id')
```

### Options

```
  -e, --endpoint string    The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for oauth2-client
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

