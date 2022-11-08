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
{{ .CommandPath }} <client-id>
```

### Options

```
      --format string    Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help             help for access-tokens
      --project string   The project to use
  -q, --quiet            Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

