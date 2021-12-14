---
id: ory-proxy
title: ory proxy
description: ory proxy Integrate your application with Ory using the Ory Proxy
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## ory proxy

Integrate your application with Ory using the Ory Proxy

### Synopsis

This command starts a reverse proxy which must be deployed in front of your
application. This proxy works both in development and in production, for example
when deploying a React, NodeJS, Java, PHP, ... app to a server / the cloud or
when developing it locally on your machine.

Before you start, you need to have a running instance of Ory Kratos / Ory Hydra
/ ... either locally or in Ory Cloud. Set the environment variable ORY_SDK_URL
to the path where Ory is available. For Ory Cloud, this is the &#34;SDK URL&#34;
which can be found in the &#34;API &amp; Services&#34; section of your Ory Cloud
Console.

    $ export ORY_SDK_URL=https://playground.projects.oryapis.com

Alternatively, you can set this using the --sdk-url flag:

    $ ory proxy --sdk-url https://playground.projects.oryapis.com \
    	...

The first argument [upstream] points to the location of your application. If you
are running the proxy and your app on the same host, this could be localhost.

The second argument [public-url] is optional. It refers to the public URL of
your application (e.g. https://www.example.org).

If [public-url] is not set, it will default to the default host and port this
proxy listens on:

    http://localhost:4000

You must set the [public-url] if you are not using the Ory Proxy in locally or
in development:

    $ ory proxy \
    	http://localhost:3000 \
    	https://example.org

Please note that you can not set a path in the [public-url]!

Per default, the proxy listens on port 4000. If you want to listen on another
port, use the port flag:

    $ ory proxy --port 8080 \
    	http://localhost:3000 \
    	https://example.org

If your public URL is available on a non-standard HTTP/HTTPS port, you can set
that port in the [public-url]:

    $ ory proxy \
    	http://localhost:3000 \
    	https://example.org:1234

If this proxy runs on a subdomain, and you want Ory&#39;s cookies (e.g. the
session cookie) to be available on all of your domain, you can use the following
CLI flag to customize the cookie domain:

    $ ory proxy \
    	--cookie-domain example.org \
    	http://127.0.0.1:3000 \
    	https://ory.example.org

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
ory proxy [upstream] &lt;[public-url]&gt; [flags]
```

### Options

```
      --cookie-domain string   Set a dedicated cookie domain.
  -h, --help                   help for proxy
      --no-jwt                 Do not create a JWT from the Ory Kratos Session. Useful if you need fast start up times of the Ory Proxy.
      --open                   Open the browser when the proxy starts.
      --port int               The port the proxy should listen on. (default 4000)
      --sdk-url string         Set the Ory SDK URL.
```

### SEE ALSO

- [ory](ory) - The ORY CLI
