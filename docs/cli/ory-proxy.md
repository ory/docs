---
id: ory-proxy
title: ory proxy
description: ory proxy Secure Endpoint Using the Ory Reverse Proxy
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory proxy

Secure Endpoint Using the Ory Reverse Proxy

### Synopsis

This command starts a reverse proxy which can be deployed in front of your application.

To require login before accessing paths in your application, use the --protect-path-prefix flag:

	$ ory proxy -port 4000 http://localhost:3000 --protect-path-prefix /members --protect-path-prefix /admin

The --protect-path-prefix flag is currently using a string prefix match. Future versions will
include support for regular expressions and glob matching.

If the request is authenticated, a JSON Web Token will be sent in the HTTP Authorization Header containing the
Ory Session:

	GET / HTTP/1.1
	Host: www.example.com
	Authorization Bearer &lt;the-json-web-token&gt;

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
ory proxy [upstream] [flags]
```

### Options

```
      --dont-install-cert             If set will not try to add the HTTPS certificate to your certificate store.
      --endpoint string               Use a different endpoint. (default &#34;https://oryapis.com&#34;)
  -h, --help                          help for proxy
      --port int                      The port the proxy should listen on. (default 4000)
  -p, --project string                Must be set to your Ory Cloud Project Slug. Alternatively set using the ORY_PROJECT_ID environmental variable.
      --protect-path-prefix strings   Require authentication before accessing these paths.
```

### SEE ALSO

* [ory](ory)	 - The ORY CLI

