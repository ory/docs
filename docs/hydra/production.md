---
id: production
title: Production
---

This document summarizes things you will find useful when going to production.

## Configuration

All configuration of ORY Hydra is currently done via environment variables. Setting environment variables works
differently on each system, so we collected some to help you get started.

### Linux / OSX

```
$ export MY_ENV_VAR=foo
$ hydra ...
# or
$ MY_ENV_VAR=foo hydra ...
```

### Windows

#### Command Prompt

```
$ set MY_ENV_VAR=foo
$ hydra ...
```

#### Powershell

```
$ $env:MY_ENV_VAR="foo"
$ hydra ...
```

### Docker

```
$ docker run -e MY_ENV_VAR=foo oryd/hydra:...
```

## ORY Hydra behind an API Gateway

Although ORY Hydra implements all Go best practices around running public-facing production http servers, we discourage running
ORY Hydra facing the public net directly. We strongly recommend running ORY Hydra behind an API gateway or a load balancer.
It is common to terminate TLS on the edge (gateway / load balancer) and use certificates provided by your infrastructure
provider (e.g. AWS CA) for last mile security.

### TLS Termination

You may also choose to set Hydra to HTTPS mode without actually accepting TLS connections. In that case,
all Hydra URLs are prefixed with `https://`, but the server is actually accepting http. This makes sense if you don't want
last mile security using TLS, and trust your network to properly handle internal traffic. To use this setting, check
for `HTTPS_ALLOW_TERMINATION_FROM` in `hydra help host`.

With TLS termination enabled, ORY Hydra discards all requests unless:

* The request is coming from a trusted IP address set by `HTTPS_ALLOW_TERMINATION_FROM` and the header `X-Forwarded-Proto` is set to `https`.
* The request goes to `/health/status` which does not require TLS termination and that is used to check the health of an instance.

If you are unable to properly set up TLS Termination, you may want to set the `--dangerous-force-http` flag. But please be
aware that we discourage you from doing so and that you should know what you're doing.

### Routing

It is common to use a router, or API gateway, to route subdomains or paths to a specific service. For example, `https://myservice.com/hydra/`
is routed to `http://10.0.1.213:3912/` where `10.0.1.213` is the host running ORY Hydra. To compute the values for
the consent challenge, ORY Hydra uses the host and path headers from the HTTP request. Therefore, it is important
to set up your API Gateway in such a way, that it passes the public host (in this case `myservice.com`) and the path
without any prefix (in this case `hydra/`). If you use the Mashape Kong API gateway, you can achieve this by setting
`strip_request_path=true` and `preserve_host=true.`

## Exposing Administrative and Public API Endpoints

ORY Hydra exposes serves APIs via two ports:

- Public port (default 4444)
- Administrative port (default 4445)

The public port can and should be exposed to public internet traffic. That port handles requests to:

* `./well-known/jwks.json`
* `./well-known/openid-configuration`
* `/oauth2/auth`
* `/oauth2/token`
* `/oauth2/revoke`
* `/oauth2/fallbacks/consent`
* `/oauth2/fallbacks/error`
* `/userinfo`

The administrative port should not be exposed to public internet traffic. If you want to expose certain endpoints, such as the `/clients` endpoint for
OpenID Connect Dynamic Client Registry, you can do so but you need to properly secure these endpoints with an API Gateway or Authorization Proxy.
Administrative endpoints include:

* All `/clients` endpoints.
* All `/jwks` endpoints.
* All `/health`, `/metrics`, `/version` endpoints.
* All `/oauth2/auth/requests` endpoints.
* Endpoint `/oauth2/introspect`.
* Endpoint `/oauth2/flush`.

None of the administrative endpoints have any built-in access control. You can do simple `curl` or Postman requests to talk to them.

We generally advise to run ORY Hydra with `hydra serve all` which listens on both ports in one process. If you wish to have more granular control over
each endpoint's settings (e.g. CORS), you can run `hydra serve admin` and `hydra serve public` separately. Please be aware that the `memory` backend
will not work in this mode.
