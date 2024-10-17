---
id: ory-tunnel
title: ory tunnel
description: ory tunnel Mirror Ory APIs on your local machine for local development and testing
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory tunnel

Mirror Ory APIs on your local machine for local development and testing

### Synopsis

The Ory Tunnel mirrors Ory APIs on your local machine, allowing seamless development and testing. This setup is required for features such as CORS and cookie support, making it possible for Ory and your application to share the same top-level domain during development. To use the tunnel, authentication via `ORY_PROJECT_API_KEY` or browser-based sign-in is required.

The Ory Tunnel command connects your application and Ory's APIs through a local HTTP server. This enables both to run on the same domain or subdomain (for example, yourapp.com, localhost), which is required for cookies to function correctly.

The first argument, `application-url`, points to the location of your application and will be used as the default redirect URL after successful operations like login.

Example usage:

		$ ory tunnel --project <project-id-or-slug> https://www.example.org
		$ ORY_PROJECT=<project-id-or-slug> ory tunnel http://localhost:3000

### Connecting to Ory

Before using the Ory Tunnel, ensure that you have a running Ory Network project. You can create a new project with the following command:

		$ ory create project --name "Command Line Project"

Once your project is ready, pass the project's slug to the tunnel command:

		$ ory tunnel --project <project-id-or-slug> ...
		$ ORY_PROJECT=<project-id-or-slug> ory tunnel ...

### Connecting in automated environments

To connect the Ory Tunnel in automated environments, create a Project API Key for your project, set it as an environment variable, and use the `--quiet` flag:

		$ ORY_PROJECT_API_KEY=<project-api-key> ory tunnel -q ...

This will prevent the browser window from opening.

### Local development

For local development, use:

		$ ory tunnel --project <project-id-or-slug> http://localhost:3000

### CORS

You can restrict the CORS domains using the `--allowed-cors-origins` flag:

		$ ory tunnel http://localhost:3000 https://app.example.com \
			--allowed-cors-origins https://www.example.org \
			--allowed-cors-origins https://api.example.org \
			--allowed-cors-origins https://www.another-app.com

Per default, CORS is enabled for all origins.

### Running behind a gateway (development only)

Important: The Ory Tunnel is designed for development purposes only and should not be used in production environments.

If you need to run the tunnel behind a gateway during development, you can specify the optional second argument, tunnel-url, to define the domain where the Ory Tunnel will run (for example, https://ory.example.org).

Example:

		$ ory tunnel --project <project-id-or-slug> \
			https://www.example.org \
			https://auth.example.org \
			--cookie-domain example.org

Note: You cannot set a path in the `tunnel-url`.

### Ports

By default, the tunnel listens on port 4000. To change the port, use the --port flag:

		$ ory tunnel --port 8080 --project <project-id-or-slug> https://www.example.org

If your application runs on a non-standard HTTP or HTTPS port, include the port in the `application-url`:

		$ ory tunnel --project <project-id-or-slug> https://example.org:1234

### Cookies

For cookie support, set the `--cookie-domain` flag to your top-level domain:

		$ ory tunnel --project <project-id-or-slug> \
			--cookie-domain example.org \
			https://www.example.org \
			https://auth.example.org

### Redirects

To specify a custom redirect URL, use the `--default-redirect-url` flag:

$ ory tunnel --project <project-id-or-slug> \
	--default-redirect-url /welcome \
	https://www.example.org

```
ory tunnel <application-url> [<tunnel-url>] [flags]
```

### Examples

```
ory tunnel http://localhost:3000

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
  -h, --help                              help for tunnel
      --port int                          The port the proxy should listen on. (default 4000)
      --project string                    The project to use, either project ID or a (partial) slug.
  -q, --quiet                             Be quiet with output printing.
      --rewrite-host                      Use this flag to rewrite the host header to the upstream host.
      --workspace string                  The workspace to use, either workspace ID or a (partial) name.
  -y, --yes                               Confirm all dialogs with yes.
```

### SEE ALSO

* [ory](ory)	 - The Ory CLI

