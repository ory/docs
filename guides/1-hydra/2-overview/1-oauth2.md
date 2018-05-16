# OAuth 2.0 & OpenID Connect

ORY Hydra's primary feature is implementing the OAuth 2.0 and OpenID Connect spec, as well as related specs by the IETF
and OpenID Foundation.

This section explains how to connect your existing user management (user login, registration, logout, ...) with ORY Hydra
in order to become an OAuth 2.0 and OpenID Connect provider like Google, Dropbox, or Facebook.

Please be aware that you must know how OAuth 2.0 and OpenID Connect work. This documentation will not teach you how to
use these specifications work.

<!-- toc -->

## Glossary

Before we get into the gritty details of how everything works, let's get some terminologies out of the way. You will
find these terminologies scattered across the OAuth2 and OpenID Connect ecosystem.

We decided, for this guide, to use simpler, easier to use terminologies like, for example, *user* instead of *resource owner*.
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
will ask the user if he/she "is ok with" giving away e.g. write access to the personal images to that application.
4. The **Identity Provider** is a service ("application"/"website") with a login interface. An identity provider typically
allows users to register as well and might also have an administrative interface in order to manage the identities ("users").
5. **User Agent** is usually a browser, for example the browser of a user agent.
6. **OpenID Connect** is a protocol built on top of OAuth 2.0 which is capable of federating authentication.

A typical OAuth 2.0 flow looks as followed:

1. A developer registers an OAuth 2.0 Client at the Authorization Server (ORY Hydra)
2. The client is used to obtain information on behalf of a user.
3. The client asks the user to authorize the client to access information/data on his/her behalf.
4. The client redirects the user to the Authorization Server.
5. The Authorization Server confirms the user's identity and asks the user to grant the access request.
6. The Authorization Server issues tokens that the client uses to access resources on the user's behalf.

## Authenticating Users and Requesting Consent

As you probably already know by now, ORY Hydra does not come with any type of user management (login, registration, ...).
Instead, it relies on the so-called User Login and Consent Flow. This flow describes a series of redirects where the user's
user agent is redirect to your Login Provider and, once the user is authenticated, to the Consent Provider:

1. The OAuth 2.0 Client initiates an Authorize Code, Hybrid, or Implicit flow. The user's user agent is redirect to
`http://hydra/oauth2/auth?client_id=...&...`.
2. ORY Hydra, if unable to authenticate the user using a previous login session, redirects the user's user agent to the Login Provider
URL. The application "sitting" at that URL is implemented by you and typically shows a login user interface ("Please enter
your username and password"). The URL the user is redirect to looks similar to `http://login-service/login?login_challenge=1234...`.
3. The Login Provider, once the user has successfully logged in, tells ORY Hydra some information about who the user is (e.g. the user's ID)
and also that the login attempt was succesful. This is done using a REST request which includes another redirect URL
along the lines of `http://hydra/oauth2/auth?client_id=...&...&login_verifier=4321`.
4. Once the user's user agent follows the redirect and lands back at ORY Hydra. Next, ORY Hydra redirects the user's user
agent to the Consent Provider, hosted at - for example - `http://consent-service/consent?consent_challenge=4567...`
5. The Consent Provider shows a user interface which asks the user if he/she would like to grant the OAuth 2.0 Client
the requested permissions ("OAuth 2.0 Scope"). You've probably seen this screen around, which is usually along the lines of:
*"Would you like to grant Facebook Image Backup access to all your private and public images?"*.
6. The Consent Provider makes another REST request to ORY Hydra to let it know which permissions the user authorized, and
if the user authorized the request at all. The user can usually choose to not grant an application any access to his/her
personal data. In the response of that REST request, another URL is included along the lines of `http://hydra/oauth2/auth?client_id=...&...&consent_verifier=7654...`.
7. Now, the user has successfully authenticated and authorized (or not) the application. Next, ORY Hydra will
run some checks and if everything works out, issue access, refresh, and ID tokens.

This flow allows you to take full control of the behaviour of your login system (e.g. 2FA, passwordless, ...) and
consent screen. A well-documented reference implementation for both the Login and [Consent Provider is available on GitHub](https://github.com/ory/hydra-login-consent-node).

### The flow from a user's point of view

{% youtube src="https://www.youtube.com/watch?v=txUmfORzu8Y" %}{% endyoutube %}

### The flow from a network perspective

![https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgT0F1dGgyIENsaWVudC0-Pk9SWSBIeWRyYTogSW5pdGlhdGVzIE9BdXRoMiBBdXRob3JpemUgQ29kZSBvciBJbXBsaWNpdCBGbG93XG4gICAgT1JZIEh5ZHJhLS0-Pk9SWSBIeWRyYTogTm8gZW5kIHVzZXIgc2Vzc2lvbiBhdmFpbGFibGUgKG5vdCBhdXRoZW50aWNhdGVkKVxuICAgIE9SWSBIeWRyYS0-PkxvZ2luIFByb3ZpZGVyOiBSZWRpcmVjdHMgZW5kIHVzZXIgd2l0aCBsb2dpbiBjaGFsbGVuZ2VcbiAgICBMb2dpbiBQcm92aWRlci0tPk9SWSBIeWRyYTogRmV0Y2hlcyBsb2dpbiBpbmZvXG4gICAgTG9naW4gUHJvdmlkZXItLT4-TG9naW4gUHJvdmlkZXI6IEF1dGhlbnRpY2F0ZXMgdXNlciB3aXRoIGNyZWRlbnRpYWxzXG4gICAgTG9naW4gUHJvdmlkZXItLT5PUlkgSHlkcmE6IFRyYW5zbWl0cyBsb2dpbiBpbmZvIGFuZCByZWNlaXZlcyByZWRpcmVjdCB1cmwgd2l0aCBsb2dpbiB2ZXJpZmllclxuICAgIExvZ2luIFByb3ZpZGVyLT4-T1JZIEh5ZHJhOiBSZWRpcmVjdHMgZW5kIHVzZXIgdG8gcmVkaXJlY3QgdXJsIHdpdGggbG9naW4gdmVyaWZpZXJcbiAgICBPUlkgSHlkcmEtLT4-T1JZIEh5ZHJhOiBGaXJzdCB0aW1lIHRoYXQgY2xpZW50IGFza3MgdXNlciBmb3IgcGVybWlzc2lvbnNcbiAgICBPUlkgSHlkcmEtPj5Db25zZW50IFByb3ZpZGVyOiBSZWRpcmVjdHMgZW5kIHVzZXIgd2l0aCBjb25zZW50IGNoYWxsZW5nZVxuICAgIENvbnNlbnQgUHJvdmlkZXItLT5PUlkgSHlkcmE6IEZldGNoZXMgY29uc2VudCBpbmZvICh3aGljaCB1c2VyLCB3aGF0IGFwcCwgd2hhdCBzY29wZXMpXG4gICAgQ29uc2VudCBQcm92aWRlci0tPj5Db25zZW50IFByb3ZpZGVyOiBBc2tzIGZvciBlbmQgdXNlcidzIHBlcm1pc3Npb24gdG8gZ3JhbnQgYXBwbGljYXRpb24gYWNjZXNzXG4gICAgQ29uc2VudCBQcm92aWRlci0tPk9SWSBIeWRyYTogVHJhbnNtaXRzIGNvbnNlbnQgcmVzdWx0IGFuZCByZWNlaXZlcyByZWRpcmVjdCB1cmwgd2l0aCBjb25zZW50IHZlcmlmaWVyXG4gICAgQ29uc2VudCBQcm92aWRlci0-Pk9SWSBIeWRyYTogUmVkaXJlY3RzIHRvIHJlZGlyZWN0IHVybCB3aXRoIGNvbnNlbnQgdmVyaWZpZXJcbiAgICBPUlkgSHlkcmEtLT4-T1JZIEh5ZHJhOiBWZXJpZmllcyBncmFudFxuICAgIE9SWSBIeWRyYS0-Pk9BdXRoMiBDbGllbnQ6IFRyYW5zbWl0cyBhdXRob3JpemF0aW9uIGNvZGUvdG9rZW4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ](../images/login-consent-flow.png)

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
