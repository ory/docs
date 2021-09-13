---
id: ory-proxy-api
title: ory proxy api
description: ory proxy api Proxy Ory's APIs.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory proxy api

Proxy Ory&#39;s APIs.

### Synopsis

This command starts a proxy for Ory&#39;s APIs without reverse proxying anything else.

	$ ory proxy api --port 4000

```
ory proxy api [flags]
```

### Options

```
      --api-endpoint string           Use a different endpoint. (default &#34;https://oryapis.com&#34;)
      --console-api-endpoint string   Use a different URL. (default &#34;https://api.console.ory.sh&#34;)
  -h, --help                          help for api
      --no-https                      Run the proxy without HTTPS. Useful if you have TLS termination or are handling HTTPS otherwise.
      --port int                      The port the proxy should listen on. (default 4000)
```

### SEE ALSO

* [ory proxy](ory-proxy)	 - Easily protect applications with the Ory Proxy

