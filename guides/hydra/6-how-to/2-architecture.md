# Integrating ORY Hydra

This article explains how you to integrate ORY Hydra in your system.

<!-- toc -->

## Overview

A high-level overview of the interaction between a client, ORY Hydra (Authorization Server) and an API looks as follows:

[`sequenceDiagram
  participant Client
  participant ORY Hydra
  participant API

  Client->>ORY Hydra: Perform OAuth 2.0 Flow
  ORY Hydra->>Client: Access Token
  Client->>API: Request with Access Token
  API->ORY Hydra: Validates Access Token
  API->>Client: Response`](./images/basic-oauth2-system.png)

Most of what is explained here can also be seen as real-life examples in the [ory/examples](https://github.com/ory/examples)
repoistory!

### Interacting with OAuth 2.0

**Please, do not write your own code to interact with OAuth 2.0**. Use open source & battle-tested libraries instead. Here are some
examples.:

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