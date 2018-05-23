# Securing ORY Hydra

<!-- toc -->

Most endpoints in ORY Hydra do not have any type of access control. Requests to endpoints like `/oauth2/auth/requests/login/{challenge}`
can be done with a simple GET request (e.g. via CURL) and do not impose any type of access control. This implies that
you have to take care of securing these endpoints. There are several ways to do it, but all involve an API Gateway:

- Hide the endpoints from the public internet and expose them only to your private network.
- Protect the endpoints with an API Key only you know.
- Protect the endpoints with HTTP Basic Auth and client/secret combinations only you know.
- Protect the endpoints with ORY Oathkeeper.

You can find exemplary configurations for some of those scenarios [here](https://github.com/ory/examples). We implore
you to protect the following APIs:

- Creating, updating, fetching, listing OAuth 2.0 Clients.
- Flushing expired OAuth 2.0 Tokens.
- Getting the ORY Hydra version, health status, and prometheus metrics.
- Managing (create, update, delete, get, list, ...) JSON Web Keys.
- Login and Consent Request management.

You might also want to protect the OAuth 2.0 Token Introspection endpoint if you do not want the outside world to be able
to see if a token is valid. It's probably also a good idea to have some type of rate limiting here to prevent brute-force
attacks.

There are some endpoints however which do have access restriction or must not have any type access restriction
as mandated by the OAuth 2.0 Specification:

* These endpoints do not need any access control restrictions per OAuth 2.0 or OpenID Connect specification:
  - `/oauth2/auth`
  - `/.well-known/jwks.json`
  - `/.well-known/openid-configuration`
* These endpoints already implement access control restrictions as mandated by the OAuth 2.0 or OpenID Connect specification:
  - `/oauth2/token`
  - `/oauth2/revoke`
  - `/userinfo`
