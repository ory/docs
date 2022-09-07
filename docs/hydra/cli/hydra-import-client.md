---
id: hydra-import-client
title: hydra import client
description: hydra import client Import OAuth 2.0 Clients from files or STDIN
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra import client

Import OAuth 2.0 Clients from files or STDIN

### Synopsis

This command reads in each listed JSON file and imports their contents as a list of OAuth 2.0 Clients.

The format for the JSON file is:

[
  {
    "client_secret": "...",
    // ... all other fields of the OAuth 2.0 Client model are allowed here
  }
]

Please be aware that this command does not update existing clients. If the client exists already, this command will fail.

```
hydra import client [file-1.json] [file-2.json] [file-3.json] [file-n.json] [flags]
```

### Examples

```
Create an example OAuth2 Client:
	cat > ./file.json <<EOF
	[
      {
	    "grant_types": ["implicit"],
	    "scope": "openid"
	  },
      {
	    "grant_types": ["authorize_code"],
	    "scope": "openid"
	  }
    ]
	EOF

	hydra import client file.json

Alternatively:

	cat file.json | hydra import client

To encrypt an auto-generated OAuth2 Client Secret, use flags `--pgp-key`, `--pgp-key-url` or `--keybase` flag, for example:

  hydra create client -n "my app" -g client_credentials -r token -a core,foobar --keybase keybase_username

```

### Options

```
  -h, --help                 help for client
      --keybase string       Keybase username for encrypting client secret.
      --pgp-key string       Base64 encoded PGP encryption key for encrypting client secret.
      --pgp-key-url string   PGP encryption key URL for encrypting client secret.
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

* [hydra import](hydra-import)	 - Import resources

