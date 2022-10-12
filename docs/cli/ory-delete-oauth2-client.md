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
{{ .CommandPath }} <client-1> <client-2> <client-3>

To delete OAuth 2.0 Clients with the owner of "foo@bar.com", run:

	{{ .CommandPath }} $({{ .Root.Name }} list oauth2-clients --format json | jq -r 'map(select(.contacts[] == "foo@bar.com")) | .[].client_id')
```

### Options

```
  -h, --help             help for oauth2-client
      --project string   The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

