---
id: ory-tunnel
title: ory tunnel
description:
  ory tunnel Tunnel Ory on a subdomain of your app or a seperate port your app's
  domain
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## ory tunnel

Tunnel Ory on a subdomain of your app or a seperate port your app's domain

### Synopsis

This command starts an HTTP tunnel to Ory on the domain `[tunnel-url]` you
specify. This allows to co-locate Ory&#39;s APIs and your application on the
same top-level-domain, which is required to get cookies and other security
features working.

This tunnel works both in development and in production, for example when
deploying a React, NodeJS, Java, PHP, ... app to a server / the cloud or when
developing it locally on your machine. It is similar to the `ory proxy` command,
but it does not require to route all your application&#39;s traffic through it!

Before you start, you need to have a running instance of Ory. Set the
environment variable ORY_SDK_URL to the path where Ory is available. For Ory
Cloud, this is the &#34;SDK URL&#34; which can be found in the &#34;API &amp;
Services&#34; section of your Ory Cloud Console.

    $ export ORY_SDK_URL=https://playground.projects.oryapis.com

The first argument `application-url` points to the location of your application.
This location will be used as the default redirect URL for the tunnel, for
example after a successful login.

    $ ory tunnel https://www.example.org

It has the same behavior as
`ory proxy --default-redirect-url https://example.org/...`.

You can change this behavior using the `--default-redirect-url` flag:

    $ ory tunnel --default-redirect-url /welcome \
    	https://www.example.org

The second argument `[tunnel-url]` is optional. It refers to the public URL of
this tunnel (e.g. https://auth.example.org).

If `[tunnel-url]` is not set, it will default to the default host and port the
tunnel listens on:

    http://localhost:4000

You must set the `[tunnel-url]` if you are not using the tunnel in local
development:

    $ ory tunnel \
    	https://www.example.org \
    	https://auth.example.org

Please note that you can not set a path in the `[tunnel-url]`!

Per default, the tunnel listens on port 4000. If you want to listen on another
port, use the port flag:

    $ ory tunnel --port 8080 \
    	https://www.example.org

If your application URL is available on a non-standard HTTP/HTTPS port, you can
set that port in the `application-url`:

    $ ory tunnel \
    	https://example.org:1234

If this tunnel runs on a subdomain, and you want Ory&#39;s cookies (e.g. the
session cookie) to be available on all of your domain, you can use the following
CLI flag to customize the cookie domain:

    $ ory tunnel \
    	--cookie-domain example.org \
    	https://www.example.org \
    	https://auth.example.org

In contrast to the `ory proxy`, the tunnel does not alter the HTTP headers
arriving at your application and it does not generate any JSON Web Tokens.

```
ory tunnel application-url [tunnel-url] [flags]
```

### Options

```
      --cookie-domain string          Set a dedicated cookie domain.
      --default-redirect-url string   Set the URL to redirect to per default after e.g. login or account creation.
  -h, --help                          help for tunnel
      --port int                      The port the proxy should listen on. (default 4000)
      --sdk-url string                Set the Ory SDK URL.
```

### SEE ALSO

- [ory](ory) - The ORY CLI
