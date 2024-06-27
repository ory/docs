---
id: ory-delete-access-tokens
title: ory delete access-tokens
description: ory delete access-tokens Delete all OAuth2 Access Tokens of an OAuth2 Client
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete access-tokens

Delete all OAuth2 Access Tokens of an OAuth2 Client

```
ory delete access-tokens <client-id> [flags]
```

### Examples

```
ory delete access-tokens <client-id>
```

### Options

```
  -e, --endpoint string    The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for access-tokens
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

