# OAuth 2.0 & OpenID Connect

ORY Hydra's primary feature is implementing the OAuth 2.0 and OpenID Connect spec, as well as related specs by the IETF
and OpenID Foundation.

This section explains how to connect your existing user management (user login, registration, logout, ...) with ORY Hydra
in order to become an OAuth 2.0 and OpenID Connect provider like Google, Dropbox, or Facebook.

Please be aware that you must know how OAuth 2.0 and OpenID Connect work. This documentation will not teach you how
these protocols work.

<!-- toc -->

## Glossary

Before we get into the gritty details of how everything fits together, let's get some terminologies out of the way. You will
find these terminologies scattered across the OAuth2 and OpenID Connect ecosystem.

We decided, for this guide, to use simpler and easier to use terminologies like, for example, *user* instead of *resource owner*.
If you are familiar with OAuth2 details, you will find it easier to navigate these docs if you have read the glossary.

1. The **resource owner** is the user who authorizes an application to access their account. The application's access to
the user's account is limited to the "scope" of the authorization granted (e.g. read or write access). We will refer to
the resource owner as a *user* or *end user* on this page.
2. The **OAuth 2.0 Authorization Server** implements the OAuth 2.0 protocol (and optionally OpenID Connect) and serves
endpoints such as `/oauth2/auth` or `/oauth2/token`. In our case, this is **ORY Hydra**.
3. The **resource provider** is a service that - well - provides resources. These resources (e.g. a blog article, printer, todo list)
are owned by a resource owner (user) mentioned above.
3. The **OAuth 2.0 Client** is the *application* that wants access to a resource owner's resources (a.k.a. get write access to a user's images).
Such a client can ask the authorization server to issue an access token on a resource owner's behalf. Typically, the authorization server
will ask the user if he/she "is ok with" giving that application e.g. write access to personal images.
4. The **Identity Provider** is a service ("application"/"website") with a login interface. An identity provider typically
allows users to register as well and might also have an administrative interface in order to manage the identities (delete user, ban user, create user, ...).
5. **User Agent** is usually a browser.
6. **OpenID Connect** is a protocol built on top of OAuth 2.0 which is capable of federating authentication.

A typical OAuth 2.0 flow looks as follows:

1. A developer registers an OAuth 2.0 Client at the Authorization Server (ORY Hydra) with the intention of obtaining information on behalf of a user.
2. The application UI asks the user to authorize the application to access information/data on his/her behalf.
3. The user is redirected to the Authorization Server.
4. The Authorization Server confirms the user's identity and asks the user to grant the OAuth 2.0 Client certain permissions.
5. The Authorization Server issues tokens that the OAuth 2.0 client uses to access resources on the user's behalf.

## Authenticating Users and Requesting Consent

As you already know by now, ORY Hydra does not come with any type of user management (login, registration, ...).
Instead, it relies on the so-called User Login and Consent Flow. This flow describes a series of redirects where the user's
user agent is redirect to your Login Provider and, once the user is authenticated, to the Consent Provider. The Login
and Consent provider is implemented by you in a programming language of your choice. You could write, for example, a
NodeJS app that handles HTTP requests to `/login` and `/consent` and it would thus be your Login & Consent provider.

The flow itself works as follows:

1. The OAuth 2.0 Client initiates an Authorize Code, Hybrid, or Implicit flow. The user's user agent is redirect to
`http://hydra/oauth2/auth?client_id=...&...`.
2. ORY Hydra, if unable to authenticate the user (= no session cookie exists), redirects the user's user agent to the Login Provider
URL. The application "sitting" at that URL is implemented by you and typically shows a login user interface ("Please enter
your username and password"). The URL the user is redirect to looks similar to `http://login-service/login?login_challenge=1234...`.
3. The Login Provider, once the user has successfully logged in, tells ORY Hydra some information about who the user is (e.g. the user's ID)
and also that the login attempt was successful. This is done using a REST request which includes another redirect URL
along the lines of `http://hydra/oauth2/auth?client_id=...&...&login_verifier=4321`.
4. The user's user agent follows the redirect and lands back at ORY Hydra. Next, ORY Hydra redirects the user's user
agent to the Consent Provider, hosted at - for example - `http://consent-service/consent?consent_challenge=4567...`
5. The Consent Provider shows a user interface which asks the user if he/she would like to grant the OAuth 2.0 Client
the requested permissions ("OAuth 2.0 Scope"). You've probably seen this screen around, which is usually something similar to:
*"Would you like to grant Facebook Image Backup access to all your private and public images?"*.
6. The Consent Provider makes another REST request to ORY Hydra to let it know which permissions the user authorized, and
if the user authorized the request at all. The user can usually choose to not grant an application any access to his/her
personal data. In the response of that REST request, a redirect URL is included along the lines of `http://hydra/oauth2/auth?client_id=...&...&consent_verifier=7654...`.
7. The user's user agent follows that redirect.
7. Now, the user has successfully authenticated and authorized the application. Next, ORY Hydra will
run some checks and if everything works out, issue access, refresh, and ID tokens.

This flow allows you to take full control of the behaviour of your login system (e.g. 2FA, passwordless, ...) and
consent screen. A well-documented reference implementation for both the Login and [Consent Provider is available on GitHub](https://github.com/ory/hydra-login-consent-node).

### The flow from a user's point of view

{% youtube %}https://www.youtube.com/watch?v=txUmfORzu8Y{% endyoutube %}

### The flow from a network perspective

![https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgT0F1dGgyIENsaWVudC0-Pk9SWSBIeWRyYTogSW5pdGlhdGVzIE9BdXRoMiBBdXRob3JpemUgQ29kZSBvciBJbXBsaWNpdCBGbG93XG4gICAgT1JZIEh5ZHJhLS0-Pk9SWSBIeWRyYTogTm8gZW5kIHVzZXIgc2Vzc2lvbiBhdmFpbGFibGUgKG5vdCBhdXRoZW50aWNhdGVkKVxuICAgIE9SWSBIeWRyYS0-PkxvZ2luIFByb3ZpZGVyOiBSZWRpcmVjdHMgZW5kIHVzZXIgd2l0aCBsb2dpbiBjaGFsbGVuZ2VcbiAgICBMb2dpbiBQcm92aWRlci0tPk9SWSBIeWRyYTogRmV0Y2hlcyBsb2dpbiBpbmZvXG4gICAgTG9naW4gUHJvdmlkZXItLT4-TG9naW4gUHJvdmlkZXI6IEF1dGhlbnRpY2F0ZXMgdXNlciB3aXRoIGNyZWRlbnRpYWxzXG4gICAgTG9naW4gUHJvdmlkZXItLT5PUlkgSHlkcmE6IFRyYW5zbWl0cyBsb2dpbiBpbmZvIGFuZCByZWNlaXZlcyByZWRpcmVjdCB1cmwgd2l0aCBsb2dpbiB2ZXJpZmllclxuICAgIExvZ2luIFByb3ZpZGVyLT4-T1JZIEh5ZHJhOiBSZWRpcmVjdHMgZW5kIHVzZXIgdG8gcmVkaXJlY3QgdXJsIHdpdGggbG9naW4gdmVyaWZpZXJcbiAgICBPUlkgSHlkcmEtLT4-T1JZIEh5ZHJhOiBGaXJzdCB0aW1lIHRoYXQgY2xpZW50IGFza3MgdXNlciBmb3IgcGVybWlzc2lvbnNcbiAgICBPUlkgSHlkcmEtPj5Db25zZW50IFByb3ZpZGVyOiBSZWRpcmVjdHMgZW5kIHVzZXIgd2l0aCBjb25zZW50IGNoYWxsZW5nZVxuICAgIENvbnNlbnQgUHJvdmlkZXItLT5PUlkgSHlkcmE6IEZldGNoZXMgY29uc2VudCBpbmZvICh3aGljaCB1c2VyLCB3aGF0IGFwcCwgd2hhdCBzY29wZXMpXG4gICAgQ29uc2VudCBQcm92aWRlci0tPj5Db25zZW50IFByb3ZpZGVyOiBBc2tzIGZvciBlbmQgdXNlcidzIHBlcm1pc3Npb24gdG8gZ3JhbnQgYXBwbGljYXRpb24gYWNjZXNzXG4gICAgQ29uc2VudCBQcm92aWRlci0tPk9SWSBIeWRyYTogVHJhbnNtaXRzIGNvbnNlbnQgcmVzdWx0IGFuZCByZWNlaXZlcyByZWRpcmVjdCB1cmwgd2l0aCBjb25zZW50IHZlcmlmaWVyXG4gICAgQ29uc2VudCBQcm92aWRlci0-Pk9SWSBIeWRyYTogUmVkaXJlY3RzIHRvIHJlZGlyZWN0IHVybCB3aXRoIGNvbnNlbnQgdmVyaWZpZXJcbiAgICBPUlkgSHlkcmEtLT4-T1JZIEh5ZHJhOiBWZXJpZmllcyBncmFudFxuICAgIE9SWSBIeWRyYS0-Pk9BdXRoMiBDbGllbnQ6IFRyYW5zbWl0cyBhdXRob3JpemF0aW9uIGNvZGUvdG9rZW4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ](../images/login-consent-flow.png)

### Implementing a Login & Consent Provider

You should now have a high-level idea of how the login and consent providers work. Let's get into the details of it.

#### OAuth 2.0 Authorize Code Flow

Before anything happens, the OAuth 2.0 Authorize Code Flow is initiated by an OAuth 2.0 Client. This usually works by
generating a URL in the form of `https://hydra/oauth2/auth?client_id=1234&scope=foo+bar&response_type=code&...`. Then,
the OAuth 2.0 Client points the end user's user agent to that URL.

Next, the user agent (browser) opens that URL.

#### User Login

As the user agent hits the URL, ORY Hydra checks if a session cookie is set containing information about a previously
successful login. Additionally, parameters such as `id_token_hint`, `prompt`, and `max_age` are evaluated and processed.

Next, the user will be redirect to the Login Provider which was set using the `OAUTH2_LOGIN_URL` environment
variable. For example, the user is redirected to `https://login-provider/login?login_challenge=1234` if `OAUTH2_LOGIN_URL=https://login-provider/login`.
This redirection happens *always* and regardless of whether the user has a valid login session or if the user needs
to authenticate.

The service which handles requests to `https://login-provider/login` must first fetch information on the authentication
request using a REST API call. Please be aware that for reasons of brevity, the following code snippets are pseudo-code.
For a fully working example, check out our reference [User Login & Consent Provider implementation](https://github.com/ory/hydra-login-consent-node).

The endpoint handler at `/login` **must not remember previous sessions**. This task is solved by ORY Hydra. If the
REST API call tells you to show the login ui, you **must show it**. If the REST API tells you to not show the login ui,
**you must not show it**. Again, **do not implement any type of session here**.

```
// This is node-js pseudo code and will not work if you copy it 1:1

router.get('/login', function (req, res, next) {
    challenge = req.url.query.login_challenge;

    fetch('https://hydra/oauth2/auth/requests/login/' + challenge).
        then(function (response) {
            // ...
        })
})
```

The server response is a JSON object with the following keys:

```
{
    // Skip, if true, let's us know that ORY Hydra has successfully authenticated the user and we should not show any UI
    "skip": true|false,

    // The user-id of the already authenticated user - only set if skip is true
    "subject": "user-id",

    // The OAuth 2.0 client that initiated the request
    "client": {"id": "...", ...},

    // The initial OAuth 2.0 request url
    "request_url": "https://hydra/oauth2/auth?client_id=1234&scope=foo+bar&response_type=code&...",

    // The OAuth 2.0 Scope requested by the client,
    "requested_scope": ["foo", "bar"],

    // Information on the OpenID Connect request - only required to process if your UI should support these values.
    "oidc_context": {"ui_locales": [...], ...}
}
```

For a full documentation on all available keys, please head over to the [API documentation](https://www.ory.sh/docs/api/hydra/)
(make sure to select the right API version).

Depending of whether or not `skip` is true, you will prompt the user to log in by showing him/her a username/password form,
or by using some other proof of identity.

If `skip` is true, you **should not** show a user interface but accept the login request directly by making a REST call.
You can use this step to update some internal count of how often a user logged in, or do some other custom business logic.
But again, do not show the user interface.

To accept the login request, do something along the lines of:

```
// This is node-js pseudo code and will not work if you copy it 1:1

const body = {
    // This is the user ID of the user that authenticated. If `skip` is true, this must be the `subject`
    // value from the `fetch('https://hydra/oauth2/auth/requests/login/' + challenge)` response:
    //
    // subject = response.subject
    //
    // Otherwise, this can be a value of your choosing:
    subject: "...",

    // If remember is set to true, then the authentication session will be persisted in the user's browser by ORY Hydra. This will set the `skip` flag to true in future requests that are coming from this user. This value has no effect if `skip` was true.
    remember: true|false,

    // The time (in seconds) that the cookie should be valid for. Only has an effect if `remember` is true.
    remember_for: 3600,

    // This value is specified by OpenID connect and optional - it tells OpenID Connect which level of authentication the user performed - for example 2FA or using some biometric data. The concrete values are up to you here.
    acr: ".."
}

fetch('https://hydra/oauth2/auth/requests/login/' + challenge + '/accept', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
}).
    then(function (response) {
        // The response will contain a `redirect_to` key which contains the URL where the user's user agent must be redirected to next.
        res.redirect(response.redirect_to);
    })
```

You may also choose to deny the login request. This is possible regardless of the `skip` value.

```
// This is node-js pseudo code and will not work if you copy it 1:1

const body = {
    error: "...", // This is an error ID like `login_required` or `invalid_request`
    error_description: "..." // This is a more detailed description of the error
}

fetch('https://hydra/oauth2/auth/requests/login/' + challenge + '/reject', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
}).
    then(function (response) {
        // The response will contain a `redirect_to` key which contains the URL where the user's user agent must be redirected to next.
        res.redirect(response.redirect_to);
    })
```

#### User Consent

Now that we know who the user is, we must ask the user if he/she wants to grant the requested permissions to the OAuth 2.0 Client.
To do so, we check if the user has previously granted that exact OAuth 2.0 Client the requested permissions. If the user
has never granted any permissions to the client, or the client requires new permissions not previously granted, the user
must visually confirm the request.

This works very similar to the User Login Flow.
First, the user will be redirect to the Consent Provider which was set using the `OAUTH2_CONSENT_PROVIDER` environment
variable. For example, the user is redirected to `https://consent-provider/consent?consent_challenge=1234` if `OAUTH2_CONSENT_PROVIDER=https://consent-provider/consent`.
This redirection happens *always* and regardless of whether the user has a valid login session or if the user needs
to authorize the application or not.

The service which handles requests to `https://consent-provider/consent` must first fetch information on the consent
request using a REST API call. Please be aware that for reasons of brevity, the following code snippets are pseudo-code.
For a fully working example, check out our reference [User Login & Consent Provider implementation](https://github.com/ory/hydra-login-consent-node).

```
// This is node-js pseudo code and will not work if you copy it 1:1

challenge = req.url.query.consent_challenge;

fetch('https://hydra/oauth2/auth/requests/consent/' + challenge).
    then(function (response) {
        // ...
    })
```

The server response is a JSON object with the following keys:

```
{
    // Skip, if true, let's us know that the client has previously been granted the requested permissions (scope) by the end-user
    "skip": true|false,

    // The user-id of the user that will grant (or deny) the request
    "subject": "user-id",

    // The OAuth 2.0 client that initiated the request
    "client": {"id": "...", ...},

    // The initial OAuth 2.0 request url
    "request_url": "https://hydra/oauth2/auth?client_id=1234&scope=foo+bar&response_type=code&...",

    // The OAuth 2.0 Scope requested by the client,
    "requested_scope": ["foo", "bar"],

    // Information on the OpenID Connect request - only required to process if your UI should support these values.
    "oidc_context": {"ui_locales": [...], ...}
}
```

If skip is true, you should not show any user interface to the user. Instead, you should accept (or deny) the consent request.
Typically, you will accept the request unless you have a very good reason to deny it (e.g. the OAuth 2.0 Client is banned).

If skip is false and you show the consent screen, you should use the `requested_scope` array to display a list of permissions
which the user must grant (e.g. using a checkbox). Some people choose to always skip this step if the OAuth 2.0 Client
is a first-party client - meaning that the client is used by you or your developers in an internal application.

Assuming the user accepts the consent request, the code looks very familiar to the User Login Flow.

```
// This is node-js pseudo code and will not work if you copy it 1:1

const body = {
    // A list of permissions the user granted to the OAuth 2.0 Client. This can be fewer permissions that initially requested, but are rarely more or other permissions than requested.
    grant_scope: ["foo", "bar"],

    // If remember is set to true, then the consent response will be remembered for future requests. This will set the `skip` flag to true in future requests that are coming from this user for the granted permissions and that particular client. This value has no effect if `skip` was true.
    remember: true|false,

    // The time (in seconds) that the cookie should be valid for. Only has an effect if `remember` is true.
    remember_for: 3600,

    // The session allows you to set additional data in the access and ID tokens.
    session: {
        // Sets session data for the access and refresh token, as well as any future tokens issued by the
        // refresh grant. Keep in mind that this data will be available to anyone performing OAuth 2.0 Challenge Introspection.
        // If only your services can perform OAuth 2.0 Challenge Introspection, this is usually fine. But if third parties
        // can access that endpoint as well, sensitive data from the session might be exposed to them. Use with care!
        access_token: { ... },

        // Sets session data for the OpenID Connect ID token. Keep in mind that the session'id payloads are readable
        // by anyone that has access to the ID Challenge. Use with care!
        id_token: { ... },
    }
}

fetch('https://hydra/oauth2/auth/requests/consent/' + challenge + '/accept', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
}).
    then(function (response) {
        // The response will contain a `redirect_to` key which contains the URL where the user's user agent must be redirected to next.
        res.redirect(response.redirect_to);
    })
```

You may also choose to deny the consent request. This is possible regardless of the `skip` value.

```
// This is node-js pseudo code and will not work if you copy it 1:1

const body = {
    // This is an error ID like `consent_required` or `invalid_request`
    error: "...",

    // This is a more detailed description of the error
    error_description: "..."
}

fetch('https://hydra/oauth2/auth/requests/consent/' + challenge + '/reject', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
}).
    then(function (response) {
        // The response will contain a `redirect_to` key which contains the URL where the user's user agent must be redirected to next.
        res.redirect(response.redirect_to);
    })
```

Once the user agent is redirected back, the OAuth 2.0 flow will be finalized.

### Revoking consent and login sessions

#### Login

You can revoke login sessions. Revoking a login session will remove all of the user's cookies at ORY Hydra and will require
the user to re-authenticate when performing the next OAuth 2.0 Authorize Code Flow. Be aware that this option will
remove all cookies from all devices.

Revoking the login sessions of a user is as easy as sending `DELETE to `/oauth2/auth/sessions/login/{user}`.

#### Consent

You can revoke a user's consent either on a per application basis or for all applications. Revoking the consent will
automatically revoke all related access and refresh tokens.

Revoking all consent sessions of a user is as easy as sending `DELETE to `/oauth2/auth/sessions/consent/{user}`.

Revoking the consent sessions of a user for a specific client is as easy as sending `DELETE to `/oauth2/auth/sessions/consent/{user}/{client}`.

## OAuth 2.0 Scope

The scope of an OAuth 2.0 scope defines the permission the token was granted by the user. For example, a specific
token might be allowed to access public pictures, but not private ones. The granted permissions are established during
the consent screen.

Additionally, ORY Hydra has pre-defined OAuth 2.0 Scope values:

* `offline` and `offline_access`: Include this scope if you wish to receive a refresh token
* `openid`: Include this scope if you wish to perform an OpenID Connect request.

## OAuth2 Token Introspection

OAuth2 Token Introspection is an [IETF](https://tools.ietf.org/html/rfc7662) standard.
It defines a method for a protected resource to query
an OAuth 2.0 authorization server to determine the active state of an
OAuth 2.0 token and to determine meta-information about this token.
OAuth 2.0 deployments can use this method to convey information about
the authorization context of the token from the authorization server
to the protected resource.

You can find more details on this endpoint in the [ORY Hydra API Docs](https://www.ory.sh/docs/). You can also use
the CLI command `hydra token introspect <token>`.

## OAuth 2.0 Clients

You can manage *OAuth 2.0 clients* using the cli or the HTTP REST API.

* **CLI:** `hydra help clients`
* **REST:** Read the [API Docs](https://www.ory.sh/docs)
