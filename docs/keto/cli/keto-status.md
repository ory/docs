---
id: keto-status
title: keto status
description: keto status
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto status

Get the status of the upstream Keto instance

### Synopsis

Get a status report about the upstream Keto instance. Can also block until the service is healthy.

```
keto status [flags]
```

### Options

```
      --authority string                      Set the authority header for the remote gRPC server.
      --block                                 Block until the connection is up.
      --endpoint string                       which endpoint to use; one of {read, write} (default "read")
  -h, --help                                  help for status
      --insecure-disable-transport-security   Disables transport security. Do not use this in production.
      --insecure-skip-hostname-verification   Disables hostname verification. Do not use this in production.
  -q, --quiet                                 Be quiet with output printing.
      --read-remote string                    Remote address of the read API endpoint. (default "127.0.0.1:4466")
      --write-remote string                   Remote address of the write API endpoint. (default "127.0.0.1:4467")
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto](keto) Global and consistent permission and authorization server

