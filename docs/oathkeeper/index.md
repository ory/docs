---
id: index
title: Introduction
---

ORY Oathkeeper authorizes incoming HTTP requests.
It can be the Policy Enforcement Point in your cloud architecture, 
i.e. a reverse proxy in front of your upstream API or web server 
that forwards authorized requests and rejects unauthorized ones.
If you want to use another API Gateway (Kong, Nginx, Envoy, AWS API Gateway, ...),
Oathkeeper can also plug into that and act as its Policy Decision Point.

The implemented problem domain and scope is part of [attribute-based access control](https://en.wikipedia.org/wiki/Attribute-based_access_control), 
sometimes also called Zero-Trust Network
Architecture, [BeyondCorp](https://www.beyondcorp.com), and Identity And Access
Proxy (IAP).

While ORY Oathkeeper works well with ORY Hydra and ORY Keto, ORY Oathkeeper can
be used completely standalone and alongside other stacks with adjacent problem
domains (Keycloak, Gluu, Vault, ...). ORY Oathkeeper's Access Control Decision
API works with

- [Ambassador](https://github.com/datawire/ambassador) via
  [auth service](https://www.getambassador.io/reference/services/auth-service)
- [Envoy](https://www.envoyproxy.io) via the
  [External Authorization HTTP Filter](https://www.envoyproxy.io/docs/envoy/latest/configuration/http_filters/ext_authz_filter#config-http-filters-ext-authz)
- AWS API Gateway via
  [Custom Authorizers](https://aws.amazon.com/de/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/)
- [Nginx](https://www.nginx.com) via
  [Authentication Based on Subrequest Result](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/)

among others.

## Dependencies

ORY Oathkeeper does not have any dependencies to other services. It can work
completely in isolation and does not require a database or any other type of
persistent storage. ORY Oathkeeper is configurable with yaml configuration
files, JSON files, and environment variables.

## Operating Modes

Starting Oathkeeper via `oathkeeper serve` exposes two ports: One port serves the reverse proxy,
the other ORY Oathkeeper's API.

### Reverse Proxy

The port exposing the reverse proxy forwards requests to the upstream server,
defined in the rule, if the request is allowed. If the request is not allowed,
ORY Oathkeeper does not forward the request and instead returns an error
message.

<a href="https://mermaidjs.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgQyBhcyBDbGllbnRcbiAgICBwYXJ0aWNpcGFudCBPIGFzIE9hdGhrZWVwZXIgUHJveHlcbiAgICBwYXJ0aWNpcGFudCBBIGFzIFByb3RlY3RlZCBTZXJ2ZXIvQVBJXG4gICAgQy0-Pk86IEhUVFAgUmVxdWVzdFxuICAgIE8tLT4-TzogQ2hlY2sgaWYgcmVxdWVzdCBpcyBhbGxvd2VkXG4gICAgYWx0IGlzIG5vdCBhbGxvd2VkXG4gICAgTy0-PkM6IFJldHVybiBIVFRQIEVycm9yIFxuICAgIGVsc2UgaXMgYWxsb3dlZFxuICAgIE8tPj5BOiBGb3J3YXJkIEhUVFAgUmVxdWVzdCBcbiAgICBBLT4-TzogUmV0dXJuIEhUVFAgUmVzcG9uc2VcbiAgICBPLT4-QzogUmV0dXJuIEhUVFAgUmVzcG9uc2VcbiAgICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ">
    <img src="/images/docs/oathkeeper/proxy.svg" alt="ORY Oathkeeper deployed as a Reverse Proxy" float="center">
</a>

#### Example

Assuming the following request

```
GET /my-service/whatever HTTP/1.1
Host: oathkeeper-proxy:4455
Authorization: bearer some-token
```

and you have the following rule defined (which allows this request)

```json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://oathkeeper-proxy:4455/my-service/whatever",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutator": {
    "handler": "noop"
  }
}
```

then the request will be forwarded by ORY Oathkeeper as follows:

```
GET /my-service/whatever HTTP/1.1
Host: my-backend-service:4455
Authorization: bearer some-token
```

The response of this request will then be sent to the client that made the
request to ORY Oathkeeper.

### Access Control Decision API

The ORY Oathkeeper Access Control Decision API follows best-practices and works with most (if not all) 
modern API gateways and reverse proxies.
To verify a request, send it to the `decision` endpoint.
It matches every sub-path and HTTP Method:

- `GET /decision/v1/api`
- `PUT /decision/my/other/api`
- `DELETE /decision/users?foo=?bar`

When matching a rule, the `/decision` prefix is stripped from the matching path.

<a href="https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgQyBhcyBDbGllbnRcbiAgICBwYXJ0aWNpcGFudCBBRyBhcyBBUEkgR2F0ZXdheVxuICAgIHBhcnRpY2lwYW50IE8gYXMgT2F0aGtlZXBlciBBUElcbiAgICBwYXJ0aWNpcGFudCBBIGFzIFByb3RlY3RlZCBTZXJ2ZXIvQVBJXG4gICAgQy0-PkFHOiBIVFRQIFJlcXVlc3RcbiAgICBBRy0-Pk86IEFzayBqdWRnZSBBUEkgZm9yIGF1dGhvcml6YXRpb25cblxuICAgIGFsdCBpcyBhbGxvd2VkXG4gICAgTy0-PkFHOiBSZXR1cm4gYXV0aCBpbmZvXG4gICAgQUctPj5BOiBGb3J3YXJkIEhUVFAgUmVxdWVzdFxuICAgIEEtPj5BRzogUmV0dXJuIEhUVFAgUmVzcG9uc2VcbiAgICBBRy0-PkM6IFJldHVybiBIVFRQIFJlc3BvbnNlXG4gICAgZWxzZSBpcyBub3QgYWxsb3dlZFxuICAgIE8tPj5BRzogRGVueSByZXF1ZXN0XG4gICAgQUctPj5DOiBSZXR1cm4gSFRUUCBFcnJvclxuICAgIGVuZCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19">
    <img src="/images/docs/oathkeeper/api.svg" alt="ORY Oathkeeper deployed as an Decision API" float="center">
</a>

#### Example

Assuming you are making the following request to ORY Oathkeeper's Access Control
Decision API

```
GET /decision/my-service/whatever HTTP/1.1
Host: oathkeeper-api:4456
Authorization: bearer some-token
```

and you have the following rule defined (which allows this request)

```json
{
  "id": "some-id",
  "match": {
    "url": "http://oathkeeper-api:4456/my-service/whatever",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "noop"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutator": {
    "handler": "noop"
  }
}
```

then this endpoint will directly respond with HTTP Status Code 200:

```
HTTP/1.1 200 OK
Authorization: bearer some-token
```

If any other status code is returned, the request must not be allowed, for
example:

```
HTTP/1.1 401 OK
Content-Length: 0
Connection: Closed
```

Depending on the mutator defined by the access rule, the HTTP Response might
contain additional or mutated HTTP Headers:

```
HTTP/1.1 200 OK
X-User-ID: john.doe
```

## Decision Engine

The decision engine allows to configure how ORY Oathkeeper authorizes HTTP requests.
Authorization happens in four steps, each of which can be configured:

1. **Access Rule Matching:** 
   Verifies that the HTTP method, path, and host of the incoming HTTP
   request conform to your access rules. 
   The request is denied if no access rules match.
   The configuration of the matching access rule becomes the input for the next steps. 
2. **Authentication:**
   Oathkeeper can validate credentials via a variety of methods like Bearer Token, Basic Authorization, or cookie. 
   Invalid credentials result in denial of the request.
   The "internal" session state (e.g. user ID) of valid (authenticated) credentials becomes input for the next steps. 
3. **Authorization:** 
   Access Rules can check permissions. 
   To secure, for example, an API that requires admin privileges, 
   configure the authorizer to check if the user ID from step 2 has the "admin" permission or role. 
   Oathkeeper supports a variety of authorizers. 
   Failed authorization (e.g. user does not have role "admin") results denial of the request.
4. **Mutation:**
   The Access Rule can add session data to the HTTP request that it forwards to the upstream API. 
   For example, the mutator could add `X-User-ID: the-user-id` to the HTTP headers or generate a
   JWT with session information and set it as
   `Authorization: Bearer the.jwt.token`.

<a href="https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblxucihIVFRQIFJlcXVlc3QpIC0tPiBhcm0oQWNjZXNzIFJ1bGUgTWF0Y2hlcilcbmFybSAtLWZvdW5kIG1hdGNoaW5nIGFjY2VzcyBydWxlLS0-IGFuKEF1dGhlbnRpY2F0b3IpXG5hcm0gLS1kaWQgbm90IGZpbmQgYWNjZXNzIHJ1bGUtLT4gNDA0KEhUVFAgRXJyb3IgNDA0KVxuYW4gLS1jcmVkZW50aWFscyBpbiByZXF1ZXN0IGFyZSB2YWxpZC0tPmF6KEF1dGhvcml6ZXIpXG5hbiAtLWNyZWRlbnRpYWxzIGluIHJlcXVlc3QgYXJlIGludmFsaWQtLT4gNDAxKEhUVFAgRXJyb3IgNDAxKVxuYXogLS1yZXF1ZXN0IGRvZXMgbm90IGhhdmUgcGVybWlzc2lvbi0tPiA0MDMoSFRUUCBFcnJvciA0MDMpXG5heiAtLXJlcXVlc3QgaGFzIHBlcm1pc3Npb24tLT5tdChNdXRhdG9yKVxubXQtLXRyYW5zZm9ybSBodHRwIHJlcXVlc3QtLT5yZXMoRm9yd2FyZCBIVFRQIFJlcXVlc3QpIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQiLCJ0aGVtZUNTUyI6Ii5sYWJlbCBmb3JlaWduT2JqZWN0IHsgb3ZlcmZsb3c6IHZpc2libGU7IGZvbnQtc2l6ZTogMTNweCB9In19">
    <img src="/images/docs/oathkeeper/pipeline.svg" alt="ORY Oathkeeper HTTP Authorization Pipeline">
</a>
