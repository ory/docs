# Securing ORY Hydra

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
