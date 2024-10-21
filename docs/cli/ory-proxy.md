---
id: ory-proxy
title: ory proxy
description: ory proxy Run your app and Ory on the same domain using a reverse proxy
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory proxy

Run your app and Ory on the same domain using a reverse proxy

### Synopsis

The Ory Proxy allows your application and Ory to run on the same domain by acting as a reverse proxy. It forwards all traffic to your application, ensuring that features like cookies and CORS function correctly during local development.

The first argument, `application-url`, points to the location of your application. The Ory Proxy will pass all traffic through to this URL.

Example usage:

		$ ory proxy --project <project-id-or-slug> https://www.example.org
		$ ORY_PROJECT=<project-id-or-slug> ory proxy proxy http://localhost:3000

### Connecting to Ory

Before using the Ory Proxy, you need to have an Ory Network project. You can create a new project with the following command:

		$ ory create project --name "Command Line Project"

Once your project is ready, pass the project’s slug to the proxy command:

		$ ory proxy --project <project-id-or-slug> ...

### Local development

For local development, use:

		$ ory proxy --project <project-id-or-slug> http://localhost:3000

The first argument, `application-url`, points to your application's location. If running both the proxy and your app on the same host, this could be `localhost`. All traffic sent to the Ory Proxy will be forwarded to this URL.

The second argument, `publish-url`, is optional and only necessary when the local app is not running on localhost. It specifies the public URL of your application (e.g., `https://www.example.org`). If `publish-url` is not set, it defaults to the host and port the proxy listens on.

**Important**: The Ory Proxy is intended for development use only and should not be used in production environments.

### CORS

You can restrict the CORS domains using the `--allowed-cors-origins` flag:

		$ ory proxy http://localhost:3000 https://app.example.com \
			--allowed-cors-origins https://www.example.org \
			--allowed-cors-origins https://api.example.org \
			--allowed-cors-origins https://www.another-app.com

Per default, CORS is enabled for all origins.

### Connecting in automated environments

To connect the Ory Tunnel in automated environments, create a Project API Key for your project, set it as an environment variable, and use the `--quiet` flag:

		$ %[2]s=<project-api-key> ory proxy -q ...

This will prevent the browser window from opening.

### Running behind a gateway (development only)

If you are using the Ory Proxy behind a gateway during development, you must set the `publish-url` argument:

		$ ory proxy --project <project-id-or-slug> \
			http://localhost:3000 \
			https://gateway.local:5000

Note: You cannot set a path in the `publish-url`.

### Ports

By default, the proxy listens on port 4000. To change this, use the `--port` flag:

		$ ory proxy --port 8080 --project <project-id-or-slug> http://localhost:3000

### Multiple domains

If the proxy runs on a subdomain and you want Ory’s cookies (e.g., session cookies) to be accessible across all your domains, use the `--cookie-domain` flag to customize the cookie domain. Additionally, allow your subdomains in the CORS headers:

		$ ory proxy --project <project-id-or-slug> \
			--cookie-domain gateway.local \
			http://127.0.0.1:3000 \
			https://ory.gateway.local

### Redirects

By default, all redirects will point to `publish-url`. You can customize this behavior using the `--default-redirect-url` flag:

		$ ory proxy --project <project-id-or-slug> \
			--default-redirect-url /welcome \
			http://127.0.0.1:3000 \
			https://ory.example.org

This ensures that all redirects (e.g., after login) go to `/welcome` instead of `/`, unless you’ve specified custom redirects in your Ory configuration or via the flow’s `?return_to=` query parameter.

### JSON Web Token

When a request is not authenticated, the HTTP `Authorization` header will be empty:

		GET / HTTP/1.1
		Host: localhost:3000

If the request is authenticated, a JSON Web Token (JWT) containing the Ory session will be sent in the HTTP `Authorization` header:

		GET / HTTP/1.1
		Host: localhost:3000
		Authorization: Bearer the-json-web-token

The JWT claims contain:
- The `sub` field, which is set to the Ory Identity ID.
- The `session` field, which contains the full Ory Session.

The JWT is signed using the ES256 algorithm. You can fetch the public key by querying the `/ory/jwks.json` endpoint, for example:

http://127.0.0.1:4000/.ory/jwks.json

An example JWT payload:

		{
		  "id": "821f5a53-a0b3-41fa-9c62-764560fa4406",
		  "active": true,
		  "expires_at": "2021-02-25T09:25:37.929792Z",
		  "authenticated_at": "2021-02-24T09:25:37.931774Z",
		  "issued_at": "2021-02-24T09:25:37.929813Z",
		  "identity": {
			"id": "18aafd3e-b00c-4b19-81c8-351e38705126",
			"schema_id": "default",
			"schema_url": "https://example.projects.oryapis.com/api/kratos/public/schemas/default",
			"traits": {
			  "email": "foo@bar"
			  // ... other identity traits
			}
		  }
		}


```
ory proxy <application-url> [<publish-url>] [flags]
```

### Examples

```
ory proxy http://localhost:3000

```

### Options

```
      --additional-cors-headers strings   A list of additional CORS headers to allow. Wildcards are allowed.
      --allowed-cors-origins strings      A list of allowed CORS origins. Wildcards are allowed.
  -c, --config string                     Path to the Ory Network configuration file.
      --cookie-domain string              Set a dedicated cookie domain.
      --debug                             Use this flag to debug, for example, CORS requests.
      --default-redirect-url url          Set the URL to redirect to per default after e.g. login or account creation.
      --dev                               This flag is deprecated as the command is only supposed to be used during development. (default true)
  -h, --help                              help for proxy
      --no-jwt                            Do not create a JWT from the Ory Session. Useful if you need fast start up times of the Ory Proxy.
      --open                              Open the browser when the proxy starts.
      --port int                          The port the proxy should listen on. (default 4000)
      --project string                    The project to use, either project ID or a (partial) slug.
  -q, --quiet                             Be quiet with output printing.
      --rewrite-host                      Use this flag to rewrite the host header to the upstream host.
      --workspace string                  The workspace to use, either workspace ID or a (partial) name.
  -y, --yes                               Confirm all dialogs with yes.
```

### SEE ALSO

* [ory](ory)	 - The Ory CLI

