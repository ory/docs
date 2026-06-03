---
id: talos-jwk-get
title: talos jwk get
description: talos jwk get
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos jwk get

Fetch the server's JSON Web Key Set (JWKS)

### Synopsis

Fetch the public signing keys used to verify derived JWT tokens.

The JWKS is served at GET /v2alpha1/admin/derivedKeys/jwks.json and includes the active signing key plus any retired keys still
inside the verification window.

Clients verifying derived tokens should cache the response for 5 to 15 minutes and refetch when they encounter a token with an
unknown 'kid'. Polling more aggressively does not shorten the practical revocation window — that window is bounded by the longest
issued token TTL, not by the JWKS cache.

```
talos jwk get [flags]
```

### Examples

```
  # Pretty-print the JWKS served by a local Talos
  talos jwk get -e http://localhost:4420 | jq .
```

### Options

```
  -h, --help   help for get
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos jwk](talos-jwk.md) Generate JSON Web Keys (JWK/JWKS)
