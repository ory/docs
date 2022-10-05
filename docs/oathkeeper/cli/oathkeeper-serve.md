---
id: oathkeeper-serve
title: oathkeeper serve
description: oathkeeper serve Starts the HTTP/2 REST API and HTTP/2 Reverse Proxy
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## oathkeeper serve

Starts the HTTP/2 REST API and HTTP/2 Reverse Proxy

### Synopsis

Opens two ports for serving both the HTTP/2 Rest API and the HTTP/2 Reverse Proxy.

## Configuration

ORY Oathkeeper can be configured using environment variables as well as a configuration file. For more information
on configuration options, open the configuration documentation:

&gt;&gt; https://www.ory.sh/oathkeeper/docs/configuration &lt;&lt;


```
oathkeeper serve [flags]
```

### Options

```
      --disable-telemetry   Disable anonymized telemetry reports - for more information please visit https://www.ory.sh/docs/ecosystem/sqa
  -h, --help                help for serve
      --sqa-opt-out         Disable anonymized telemetry reports - for more information please visit https://www.ory.sh/docs/ecosystem/sqa
```

### Options inherited from parent commands

```
  -c, --config strings   Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
```

### SEE ALSO

* [oathkeeper](oathkeeper)	 - A cloud native Access and Identity Proxy

