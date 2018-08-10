# Limitations

ORY Hydra tries to solve all of OAuth 2.0 and OpenID Connect uses. There are, however, some limitations.

<!-- toc -->

## Resource Owner Password Credentials Grant Type (ROCP)

ORY Hydra does not and will not implement the Resource Owner Password Credentials Grant Type. Read on for context.

### Overview

This grant type allows OAuth 2.0 Clients to exchange user credentials (username, password) for an access token.

**Request:**

```
POST /oauth2/token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=johndoe&password=A3ddj3w
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache

{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "token_type":"example",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
  "example_parameter":"example_value"
}
```

You might think that this is the perfect grant type for your first-party application. This grant type is most commonly
used in mobile authentication for first-party apps. If you plan on doing this, stop right now and read
[this blog article](https://www.ory.sh/oauth2-for-mobile-app-spa-browser).

### Legacy & Bad Security

The ROCP grant type is discouraged by developers, professionals, and the IETF itself. It was originally added because
big legacy corporations (not dropping any names, but they are part of the IETF consortium) did not want to migrate their authentication
infrastructure to the modern web but instead do what they've been doing all along "but OAuth 2.0" and for systems that
want to upgrade from OAuth (1.0) to OAuth 2.0.

There are a ton of good reasons why this is a bad flow, they are summarized in
[this excellent blog article as well](https://www.scottbrady91.com/OAuth/Why-the-Resource-Owner-Password-Credentials-Grant-Type-is-not-Authentication-nor-Suitable-for-Modern-Applications).
