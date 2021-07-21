---
id: ory-proxy-production
title: ory proxy production
description: ory proxy production Run an application in production mode with Ory integration
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory proxy production

Run an application in production mode with Ory integration

### Synopsis

This command starts a reverse proxy which can be deployed in front of your application. This command works for remote environments,
for example when deploying a React, NodeJS, Java, PHP, ... app to a server / the cloud.

	$ ory proxy remote --port 4000 \
		http://localhost:3000 \
		example.org

If you want to expose the application / proxy at a specific port, append the port to the domain name:

	$ ory proxy remote --port 4000 \
		http://127.0.0.1:3000 \
		example.org:8080


If the request is not authenticated, the HTTP Authorization Header will be empty:

	GET / HTTP/1.1
	Host: localhost:3000

If the request was authenticated, a JSON Web Token will be sent in the HTTP Authorization Header containing the
Ory Session:

	GET / HTTP/1.1
	Host: localhost:3000
	Authorization: Bearer &lt;the-json-web-token&gt;

The JSON Web Token claims contain:

* The &#34;sub&#34; field which is set to the Ory Identity ID.
* The &#34;session&#34; field which contains the full Ory Session.

The JSON Web Token is signed using the ES256 algorithm. The public key can be found by fetching the /.ory/jwks.json path
when calling the proxy - for example http://127.0.0.1:4000/.ory/jwks.json

An example payload of the JSON Web Token is:

	{
	  &#34;id&#34;: &#34;821f5a53-a0b3-41fa-9c62-764560fa4406&#34;,
	  &#34;active&#34;: true,
	  &#34;expires_at&#34;: &#34;2021-02-25T09:25:37.929792Z&#34;,
	  &#34;authenticated_at&#34;: &#34;2021-02-24T09:25:37.931774Z&#34;,
	  &#34;issued_at&#34;: &#34;2021-02-24T09:25:37.929813Z&#34;,
	  &#34;identity&#34;: {
		&#34;id&#34;: &#34;18aafd3e-b00c-4b19-81c8-351e38705126&#34;,
		&#34;schema_id&#34;: &#34;default&#34;,
		&#34;schema_url&#34;: &#34;https://example.projects.oryapis.com/api/kratos/public/schemas/default&#34;,
		&#34;traits&#34;: {
		  &#34;email&#34;: &#34;foo@bar&#34;,
		  // ... your other identity traits
		}
	  }
	}


```
ory proxy production [upstream] [host] [flags]
```

### Options

```
      --api-endpoint string           Use a different endpoint. (default &#34;https://oryapis.com&#34;)
      --console-api-endpoint string   Use a different URL. (default &#34;https://api.console.ory.sh&#34;)
  -h, --help                          help for production
      --port int                      The port the proxy should listen on. (default 4000)
```

### SEE ALSO

* [ory proxy](ory-proxy)	 - Easily protect applications with the Ory Proxy

