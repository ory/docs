---
id: oauth2-openid-connect
title: Understanding OAuth 2.0 And OpenID Connect
---

OAuth 2.0 and OpenID Connect are difficult concepts to grasp and have a steep learning curve. Our documentation assumes
that you have knowledge of those two protocols. If you have never used OAuth 2.0 or OpenID Connect extensively,
we highly recommend watching the following video. It's long, but it's worth it!

<iframe width="560" height="315" src="https://www.youtube.com/embed/996OiexHze0" frameborder="0" allowfullscreen></iframe>

## Supported Open Standards

ORY Hydra implements Open Standards set by the IETF:

* [The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
* [OAuth 2.0 Threat Model and Security Considerations](https://tools.ietf.org/html/rfc6819)
* [OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009)
* [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662)
* [OAuth 2.0 Dynamic Client Registration Protocol](https://tools.ietf.org/html/rfc7591)
* [OAuth 2.0 Dynamic Client Registration Management Protocol](https://tools.ietf.org/html/rfc7592)
* [OAuth 2.0 for Native Apps](https://tools.ietf.org/html/draft-ietf-oauth-native-apps-10)
* [Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)

and the OpenID Foundation:

* [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)
* [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
* [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
* [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html)
* [OpenID Connect Back-Channel Logout 1.0](https://openid.net/specs/openid-connect-backchannel-1_0.html)

## OpenID Certified™

ORY Hydra is an OpenID Foundation [certified OpenID Provider (OP)](http://openid.net/certification/#OPs).

<p align="center">
    <img src="https://raw.githubusercontent.com/ory/hydra/master/docs/images/oidc-cert.png" alt="ORY Hydra is a certified OpenID Providier" width="256px">
</p>

The following OpenID profiles are certified:

* [Basic OpenID Provider](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth) (response types `code`)
* [Implicit OpenID Provider](http://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth) (response types `id_token`, `id_token+token`)
* [Hybrid OpenID Provider](http://openid.net/specs/openid-connect-core-1_0.html#HybridFlowAuth) (response types `code+id_token`, `code+id_token+token`, `code+token`)
* [OpenID Provider Publishing Configuration Information](https://openid.net/specs/openid-connect-discovery-1_0.html)
* [Dynamic OpenID Provider](https://openid.net/specs/openid-connect-registration-1_0.html)

To obtain certification, we deployed the [reference user login and consent app](https://github.com/ory/hydra-login-consent-node)
(unmodified) and ORY Hydra v1.0.0.

## Common Misconceptions

### ORY Hydra does not manage Users

The first important concept to understand is that ORY Hydra is an OAuth 2.0 Authorization and OpenID Connect Server.
Some mistake these capabilities for systems that store user data and log you in. This is not the case. Instead, such a
server is responsible for "translating" user credentials (typically username and password) to OAuth 2.0 Access and Refresh Tokens
as well as OpenID Connect ID Tokens. It's basically like you storing cookies with session data, but more flexible and it also
works for third party applications.

ORY Hydra does not store user profiles, usernames, passwords. This capability is up to you. ORY Hydra uses something we
call a **User Login and Consent Flow**. This flow uses HTTP redirects to forward any incoming authorization request ("Please give
me an access token.") to the **Login Provider** and the **Consent Provider**. These applications are something you implement.
It can be a new app or your existing login system. On a high level, these providers can be summarized as:

- The **login provider** is responsible for authenticating the user ("login") by validating his or her credentials (e.g. username + password).
- The **consent provider** is responsible for allowing the OAuth 2.0 application to get a token on the user's behalf ("Do you want
to allow foobar-app access to all your personal messages and images?".
- The **logout provider** is responsible for showing the logout ui and accepting logout requests.

### OAuth 2.0 Scope is not a Permission System

A second important concept is the OAuth 2.0 Scope.

Often, developers confuse OAuth 2.0 Scope with regular Access Control. OAuth 2.0 Scope and, for example, Role Based Access
Control (RBAC) or Access Control Lists (ACL) cover different aspects of access control.

Your internal access control will tell you what a user can do in your system. An administrator might modify everything,
a regular user might only be allowed to read personal messages. The OAuth 2.0 Scope does not represent what a resource owner ("user") is able to
do in a system or not. They do not express things like administrative rights.

The OAuth 2.0 Scope expresses what a user allowed an OAuth 2.0 Client (read: "access token") to do on his/her behalf.
For example, an access token might be allowed to see a user's pictures, but not upload new pictures on his/her behalf.
The user him/herself however is generally allowed to view and upload pictures. **The OAuth 2.0 Scope do not express a user's permissions.**
They express what an OAuth 2.0 Client may do on the user's behalf - independently of whether or not the user is actually allowed
to do that. For example, the user could lie and say that the client is allowed to access some protected resource which
he does not have access to ("Read all classified documents", but he is not allowed to view any classified documents).

This concludes the overview of the two most important pieces of ORY Hydra.

To recap, ORY Hydra's primary feature is implementing the OAuth 2.0 and OpenID Connect spec, as well as related specs by the IETF
and OpenID Foundation.

The next sections explain how to connect your existing user management (user login, registration, logout, ...) with ORY Hydra
in order to become an OAuth 2.0 and OpenID Connect provider like Google, Dropbox, or Facebook.

Again, please be aware that you must know how OAuth 2.0 and OpenID Connect work. This documentation will not teach you how
these protocols work.

## Consuming OAuth 2.0

A high-level overview of the interaction between a client, ORY Hydra (Authorization Server) and an API looks as follows:

![`sequenceDiagram
  participant Client
  participant ORY Hydra
  participant API
  Client->>ORY Hydra: Perform OAuth 2.0 Flow
  ORY Hydra->>Client: Access Token
  Client->>API: Request with Access Token
  API->ORY Hydra: Validates Access Token
  API->>Client: Response`](/images/docs/hydra/basic-oauth2-system.png)

Most of what is explained here can also be seen as real-life examples in the [ory/examples](https://github.com/ory/examples)
repository!

### Interacting with OAuth 2.0

**Please, do not write your own code to interact with OAuth 2.0**. Use open source & battle-tested libraries instead. Here are some
examples:

* NodeJS
  * [passport](http://www.passportjs.org/)
  * [simple-oauth2](https://github.com/lelylan/simple-oauth2)
* Golang
  * [golang/oauth2](https://github.com/golang/oauth2) **recommended*
* PHP
  * [oauth2-client](https://github.com/thephpleague/oauth2-client)
* Java
  * [Sprint Security OAuth](https://spring.io/projects/spring-security-oauth)

For a full list of client libraries go [here](https://oauth.net/code/).

### Validating OAuth 2.0 Access Tokens

The best and easiest way to validate OAuth 2.0 Access Tokens is by performing OAuth 2.0 Token Introspection. You can
do this with the CLI `hydra token introspect <token>`.

#### NodeJS

```
const token = 'the access token'
const body = qs.stringify({ token })

fetch('http://ory-hydra/oauth2/introspect', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length
    },
    method: 'POST', body
}).then(body => {
    if (!body.active) {
        // Token is not active/valid
    } else if (body.token_type !== 'access_token') {
        // Token is not an access token (probably a refresh token)
    }

    // token is active
})
```

#### CURL

```bash
$ curl -X POST \
    -d 'token=<the-token>' \
    http://localhost:4445/oauth2/introspect
```
