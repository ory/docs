---
id: ory-perform-client-credentials
title: ory perform client-credentials
description: ory perform client-credentials Perform the OAuth2 Client Credentials Flow
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory perform client-credentials

Perform the OAuth2 Client Credentials Flow

### Synopsis

Performs the OAuth 2.0 Client Credentials Flow. Useful to exchange a client_id and client_secret for an access_token.
using the CLI.

```
ory perform client-credentials [flags]
```

### Examples

```
{{ .CommandPath }} --client-id ... --client-secret
```

### Options

```
      --audience strings       Request a specific OAuth 2.0 Access Token Audience.
      --client-id string       Use the provided OAuth 2.0 Client ID, defaults to environment variable OAUTH2_CLIENT_ID.
      --client-secret string   Use the provided OAuth 2.0 Client Secret, defaults to environment variable OAUTH2_CLIENT_SECRET.
      --format string          Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help                   help for client-credentials
      --project string         The project to use, either project ID or a (partial) slug.
  -q, --quiet                  Be quiet with output printing.
      --scope strings          OAuth2 scope to request.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory perform](ory-perform)	 - Perform a flow

