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
ory ls identities --page-token eyJwYWdlIjoxfQ --page-size 10
```

### Options

```
  -h, --help                help for oauth2-clients
      --page-size int       maximum number of items to return (default 100)
      --page-token string   page token acquired from a previous response
      --project string      The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory list](ory-list)	 - List resources

