# Access Control: The Warden API

<!-- toc -->

## Overview

So far you learned how Access Control Policies work and how they are different from RBAC and ACL. Now, you will learn
how to use the Warden API to perform access control (decide if a request should be allowed or not).

Before making a decision, we have to authenticate the subject. ORY Keto supports different authentication mechanisms
explained in the later sections. But first we'll look at how access requests work if we use "plaintext" authentication.

Let's take a very simple policy:

```json
{
    "subjects": ["alice"],
    "resources": ["blog_posts:my-first-blog-post"],
    "actions": ["delete"]
    "effect": "allow"
}
```

By the way, you can create this policy with the ORY Keto CLI:

```
# We assume that your keto server runs at http://your-keto-server
$ keto policies create --endpoint http://your-keto-server \
    -a delete \
    -s alice \
    -r "blog_posts:my-first-blog-post"
    --allow
```

Ok, so let's say a request hits our blog post API. The subject (user) that made the request is `bob` and `bob` wants
to delete the blog post `blog_posts:my-first-blog-post`. You will make a REST request to ORY Keto's Warden API:

```
$ curl -X POST http://your-keto-server/warden/subjects/authorize \
    --header "Content-Type: application/json" \
    -d @- << EOF

{
  "subject": "bob",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
EOF
```

In this case, the response would be `{ "allowed": false }` because no policy matching `bob`, `delete`,
`blog_posts:my-first-blog-post` was found. If we were to make the same Warden API requests with alice

```
# curl -X POST http://your-keto-server/warden/subjects/authorize \
    --header "Content-Type: application/json" \
    -d @- << EOF

{
  "subject": "alice",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
EOF
```

the response would be true because a policy was found and the effect was `allow`: `{ "allowed": true }`. You can
use the ORY Keto CLI to make the same request:

```
$ keto warden authorize subject --endpoint http://your-keto-server \
    --action delete \
    --resource "blog_posts:my-first-blog-post" \
    --subject alice
```

## Authentication

ORY Keto supports different authentication methods at the Warden API. So far, we used the `subject` authenticator
which does not authenticate at all but simply takes the value of `subject` key in the request body. Currently supported
authenticators are:

* `/warden/subjects/authorize`: The subject ("plaintext") authenticator we already used.
* `/warden/oauth2/access-tokens/authorize`: Validates OAuth 2.0 Access Token using the OAuth 2.0 Token Introspection
standard to resolve Access Tokens to subjects.
* `/warden/oauth2/clients/authorize`: Validates OAuth 2.0 Client Credentials using the OAuth 2.0 Client Credentials
Grant to authenticate OAuth 2.0 Clients.

We intend on adding more authenticators such as JSON Web Tokens, SAML Assertions, and others in time.

Let's take a deeper look at all of the available authenticators

### Subject Authenticator

You know this one already. The endpoint is located at `/warden/subjects/authorize` and you use request bodies such
as:

```
{
  "subject": "alice",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

The `subject` key is used as `subject` when looking for policies. No magic here, it's like authenticating with just
a username.

### OAuth 2.0 Access Token Authenticator

This authenticator is located at `/warden/oauth2/access-tokens/authorize` and is able to validate OAuth 2.0 Access Tokens
using the OAuth 2.0 Token Introspection standard. Instead of supplying a `subject`, you add an OAuth 2.0 Token and
optionally the OAuth 2.0 Scope to the request payload:

```
{
  "token": "some.access.token.57jgoi19g",
  "scope": ["scope-a", "scope-b"],

  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

Let's assume for a second, that the token `some.access.token.57jgoi19g` was granted by subject `alice` with OAuth 2.0 Scope
`scope-a` and `scope-b`. In this case, the OAuth 2.0 Token Introspection endpoint would return a positive response (the token
is valid) and also the subject `alice`. So this authenticator looks for a policy that matches:

```
{
  "subject": "alice",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

#### Configuration

You can configure this authenticator using the following environment variables:

* `AUTHENTICATOR_OAUTH2_INTROSPECTION_CLIENT_ID`: The OAuth 2.0 Client ID that should be used to make the OAuth 2.0
Introspection request.
* `AUTHENTICATOR_OAUTH2_INTROSPECTION_CLIENT_SECRET`: The OAuth 2.0 Client Secret that should be used to make the OAuth 2.0
Introspection request.
* `AUTHENTICATOR_OAUTH2_INTROSPECTION_TOKEN_URL`: The URL of the OAuth 2.0 Token Endpoint (usually `/oauth2/token`).
* `AUTHENTICATOR_OAUTH2_INTROSPECTION_URL`: The URL of the OAuth 2.0 Introspection Endpoint (usually `/oauth2/introspection`).
* `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE`: If an OAuth 2.0 Scope is required to access the introspection URL, add that here.
You can define a list using the comma delimiter: `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE=scope-a,scope-b`.
* `AUTHENTICATOR_OAUTH2_INTROSPECTION_SCOPE_STRATEGY`: Since you can include a `scope` in the request body, ORY Keto
allows you to configure a OAuth 2.0 strategy that defines how to compare OAuth 2.0 Scope:
  * `hierarchic`: Scope `foo` matches `foo`, `foo.bar`, `foo.baz` but not `bar`
  * `wildcard`: Scope `foo.*` matches `foo`, `foo.bar`, `foo.baz` but not `bar`. Scope `foo` matches `foo` but not `foo.bar` nor `bar`
  * `exact`: Scope `foo` matches `foo` but not `bar` nor `foo.bar`

### OAuth 2.0 Client Credentials Authenticator

This authenticator is located at `/warden/oauth2/clients/authorize` and is able to authenticate OAuth 2.0 Clients
using the OAuth 2.0 Client Credentials grant. A request payload looks as follows:

```
{
  "client_id": "client-id",
  "client_secret": "client-secret",
  "scope": ["scope-a", "scope-b"],

  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

If the OAuth 2.0 Token endpoint returns an access token, the OAuth 2.0 Clients is considered authenticated. The OAuth 2.0
Client ID is used as subject when querying for ACPs:

```
{
  "subject": "client-id",
  "action" : "delete",
  "resource": "blog_posts:my-first-blog-post"
}
```

#### Configuration

This endpoint needs only one environment variable:

* `AUTHENTICATOR_OAUTH2_CLIENT_CREDENTIALS_TOKEN_URL`: The URL of the OAuth 2.0 Token Endpoint (usually `/oauth2/token`).