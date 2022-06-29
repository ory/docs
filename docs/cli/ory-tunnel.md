---
id: ory-tunnel
title: ory tunnel
description: ory tunnel Tunnel Ory on a subdomain of your app or a separate port your app's domain
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory tunnel

Tunnel Ory on a subdomain of your app or a separate port your app's domain

### Synopsis

This command runs an HTTP Server which is connected to Ory's APIs, in order for your application and Ory's
APIs to run on the same top level domain (for example yourapp.com, localhost). Having Ory on your domain
is required for cookies to work.

The first argument `application-url` points to the location of your application. This location
will be used as the default redirect URL for the tunnel, for example after a successful login.

    $ ory tunnel --project <your-project-slug> https://www.example.org
    $ ORY_PROJECT_SLUG=<your-project-slug> ory tunnel http://localhost:3000

### Connecting to Ory

Before you start, you need to have a running Ory Cloud project. You can create one with the following command:

	$ ory create project --name "Command Line Project"

Pass the project's slug as a flag to the tunnel command:

	$ ory tunnel --project <your-project-slug> ...
	$ ORY_PROJECT_SLUG=<your-project-slug> ory tunnel ...

### Developing Locally

When developing locally we recommend to use the `--dev` flag, which uses a lax security setting:

    $ ory tunnel --dev --project <your-project-slug> \
		http://localhost:3000

### Running on a Server

To go to production set up a custom domain (CNAME) for Ory. If you can not set up a custom
domain - for example because you are developing a staging environment - using the Ory Tunnel is an alternative.

To run on a server, you need to set the optional second argument  `[tunnel-url]`. It tells the Ory Tunnel
on which domain it will run (for example https://ory.example.org).

	$ ory tunnel --project <your-project-slug> \
		https://www.example.org \
		https://auth.example.org \
		--cookie-domain example.org \
		--allowed-cors-origins https://www.example.org \
		--allowed-cors-origins https://api.example.org

Please note that you can not set a path in the `[tunnel-url]`!

### Ports

Per default, the tunnel listens on port 4000. If you want to listen on another port, use the
port flag:

	$ ory tunnel --port 8080 --project <your-project-slug> \
		https://www.example.org

If your application URL is available on a non-standard HTTP/HTTPS port, you can set that port in the `application-url`:

	$ ory tunnel --project <your-project-slug> \
		https://example.org:1234

### Cookies

We recommend setting the `--cookie-domain` value to your top level domain:

	$ ory tunnel  -project <your-project-slug> \
		--cookie-domain example.org \
		https://www.example.org \
		https://auth.example.org

### Redirects

TO use a different default redirect URL, use the `--default-redirect-url` flag:

    $ ory tunnel --project <your-project-slug> \
		--default-redirect-url /welcome \
		https://www.example.org


```
ory tunnel application-url [tunnel-url] [flags]
```

### Examples

```
ory tunnel http://localhost:3000 --dev
ory tunnel https://app.example.com \
	--allowed-cors-origins https://www.example.org \
	--allowed-cors-origins https://api.example.org \
	--allowed-cors-origins https://www.another-app.com

```

### Options

```
      --allowed-cors-origins strings   A list of allowed CORS origins. Wildcards are allowed.
      --cookie-domain string           Set a dedicated cookie domain.
      --debug                          Use this flag to debug, for example, CORS requests.
      --default-redirect-url string    Set the URL to redirect to per default after e.g. login or account creation.
      --dev                            Use this flag when developing locally.
  -h, --help                           help for tunnel
      --port int                       The port the proxy should listen on. (default 4000)
      --project string                 The slug of your Ory Cloud Project.
```

### SEE ALSO

* [ory](ory)	 - The ORY CLI

