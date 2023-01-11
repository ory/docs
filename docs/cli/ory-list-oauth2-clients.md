---
id: ory-list-oauth2-clients
title: ory list oauth2-clients
description: ory list oauth2-clients List OAuth 2.0 Clients
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory list oauth2-clients

List OAuth 2.0 Clients

### Synopsis

This command list an OAuth 2.0 Clients.

```
ory list oauth2-clients [flags]
```

### Examples

```
{{ .CommandPath }} --page-token eyJwYWdlIjoxfQ --page-size 10
```

### Options

```
      --format string       Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help                help for oauth2-clients
      --page-size int       maximum number of items to return (default 100)
      --page-token string   page token acquired from a previous response
      --project string      The project to use, either project ID or a (partial) slug.
  -q, --quiet               Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory list](ory-list)	 - List resources

