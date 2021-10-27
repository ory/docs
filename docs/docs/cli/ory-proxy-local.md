---
id: ory-proxy-local
title: ory proxy local
description:
  ory proxy local Develop an application locally and integrate it with Ory
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## ory proxy local

Develop an application locally and integrate it with Ory

### Synopsis

This command starts a reverse proxy which can be deployed in front of your
application. This works best on local (your computer) environments, for example
when developing a React, NodeJS, Java, PHP app.

    $ ory proxy local --port 4000 \
    	http://localhost:3000

If the request is not authenticated, the HTTP Authorization Header will be
empty:

    GET / HTTP/1.1
    Host: localhost:3000

If the request was authenticated, a JSON Web Token will be sent in the HTTP
Authorization Header containing the Ory Session:

    GET / HTTP/1.1
    Host: localhost:3000
    Authorization: Bearer &lt;the-json-web-token&gt;

The JSON Web Token claims contain:

- The &#34;sub&#34; field which is set to the Ory Identity ID.
- The &#34;session&#34; field which contains the full Ory Session.

The JSON Web Token is signed using the ES256 algorithm. The public key can be
found by fetching the /.ory/jwks.json path when calling the proxy - for example
http://127.0.0.1:4000/.ory/jwks.json

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
ory proxy local [upstream] [flags]
```

### Options

```
      --api-endpoint string           Use a different endpoint. (default &#34;https://oryapis.com&#34;)
      --console-api-endpoint string   Use a different URL. (default &#34;https://api.console.ory.sh&#34;)
      --dont-install-cert             If set will not try to add the HTTPS certificate to your certificate store.
  -h, --help                          help for local
      --no-https                      Run the proxy without HTTPS. Useful if you have TLS termination or are handling HTTPS otherwise.
      --no-jwt                        Do not create a JWT from the Ory Kratos Session. Useful if you need fast start up times of the Ory Proxy.
      --no-open                       Do not open the browser when the proxy starts.
      --port int                      The port the proxy should listen on. (default 4000)
```

### SEE ALSO

- [ory proxy](ory-proxy) - Easily protect applications with the Ory Proxy
