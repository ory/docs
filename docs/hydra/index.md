---
id: index
title: Introduction to ORY Hydra, OAuth 2.0, and OpenID Connect
---

Welcome to the Hydra documentation. This documentation will

1. teach you what OAuth2 and OpenID Connect are and how ORY Hydra fits in the
   picture.
2. help you run a ORY Hydra installation on your system using Docker.
3. teach you how to install, configure, run and use ORY Hydra.

Let us begin with the first part, understanding what OAuth2 and OpenID Connect
are.

## What is ORY Hydra?

ORY Hydra is an OAuth 2.0 and OpenID Connect Provider. As such, it is capable of
issuing access, refresh, and ID Tokens. Unlike other OAuth 2.0 implementations,
ORY Hydra does not offer built-in user management (login, logout, profile
management, registration). Instead, it allows you to implement user management
and login your way, in your technology stack, with authentication mechanisms
required by your use case (token-based 2FA, SMS 2FA, etc).

This support of third-party user management makes ORY Hydra the most flexible
OAuth 2.0 and OpenID Connect provider. It gives you freedom to implement your
business logic while getting all the benefits from OAuth 2.0 and OpenID Connect.

In addition to the OAuth 2.0 functionality, ORY Hydra offers a safe storage for
cryptographic keys (used for example to sign JSON Web Tokens) and can manage
OAuth 2.0 Clients.

ORY Hydra is OpenID Connect certified (pending) and implements all the
requirements stated by the OpenID Foundation. In particular, it correctly
implements the various OAuth 2.0 and OpenID Connect flows specified by the IETF
and OpenID Foundation.

## Introduction to OAuth 2.0 and OpenID Connect

This section describes on a high level what OAuth 2.0 and OpenID Connect 1.0 are
for and how they work. If you are already familiar with this, please skip to the
[introduction to Hydra](#introduction-to-hydra).

### What is OAuth 2.0?

[The OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749) is
specified in [IETF RFC 6749](https://tools.ietf.org/html/rfc6749). OAuth 2.0
enables a third-party application to obtain limited access to resources on an
HTTP server on behalf of the owner of those resources.

Why is this important? Without OAuth 2.0, a resource owner who wants to share
resources in their account with a third party would have to share their
credentials with that third party. As an example, let's say you (a resource
owner) have some photos (resources) stored on a social network (the resource
server). Now you want to print them using a third-party printing service. Before
OAuth 2.0 existed, you would have to enter your social network password into the
printing service so that it can access and print your photos. Sharing secret
passwords with third parties is obviously very problematic.

OAuth addresses this problem by introducing:

- the distinction between resource ownership and resource access for clients
- the ability to define fine-grained access privileges (called OAuth scopes)
  instead of full account access for third parties
- an authorization layer and workflow that allows resource owners to grant
  particular clients particular types of access to particular resources.

With OAuth, clients can request access to resources on a server, and the owner
of these resources can grant the requested access together with dedicated
credentials. In our example, you could grant the printing service read-only
access to your photos (only your photos, not your friend list) on the social
network. These credentials come in the form of an access token -- a string
denoting a specific scope, lifetime, and other access attributes. The client
(printing service) can use this access token to request the protected resources
(your photos) from the resource server (the social network).

### What is OpenID Connect 1.0?

OAuth 2.0 is a complex protocol for authorizing access to resources. If all you
need is authentication, OpenID Connect 1.0 enables clients to verify the
identity of the end user based on the authentication performed by an
Authorization Server and obtain basic profile information in an interoperable
and REST-like manner.

OpenID Connect allows clients of all types, including web and mobile, to receive
information about authenticated sessions and end users. The specification is
extensible, allowing participants to add encryption of identity data, discovery
of OpenID Providers, and session management as needed.

There are different work flows for OpenID Connect 1.0. We recommend checking out
the OpenID Connect sandbox at [openidconnect.net](https://openidconnect.net/).

A more detailed introduction of both OAuth 2.0 and OpenID Connect is available
in the following video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/996OiexHze0" frameborder="0" allowfullscreen></iframe>

More details about the various OAuth2 flows can be found in these articles:

- [DigitalOcean: An Introduction to OAuth 2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
- [Aaron Parecki: OAuth2 Simplified](https://aaronparecki.com/2012/07/29/2/oauth2-simplified)
- [Zapier: Chapter 5: Authentication, Part 2](https://zapier.com/learn/apis/chapter-5-authentication-part-2/)

## Introduction to Hydra

Hydra is a server implementation of the OAuth 2.0 authorization framework and
OpenID Connect Core 1.0. Existing OAuth 2.0 implementations usually ship as
libraries or SDKs such as
[node-oauth2-server](https://github.com/oauthjs/node-oauth2-server) or
[fosite](https://github.com/ory/fosite), or as fully featured identity solutions
with user management and user interfaces, such as
[Keycloak](https://www.keycloak.org/) or [Okta](https://www.okta.com/).

Implementing and using OAuth2 without understanding the whole specification is
challenging and prone to errors, even when using SDKs. The primary goal of Hydra
is to make OAuth 2.0 and OpenID Connect 1.0 less painful to set up and easier to
use.

Hydra implements the flows described in OAuth2 and OpenID Connect 1.0 without
forcing you to use a "Hydra User Management" or some template engine or a
predefined front-end. Instead, it relies on HTTP redirection and cryptographic
methods to verify user consent, allowing you to use Hydra with any
authentication endpoint like
[authboss](https://github.com/go-authboss/authboss),
[auth0.com](https://auth0.com/), or your proprietary PHP authentication.

Hydra incorporates many best practices:

1. Hydra ships as a single binary for all popular platforms including Linux, OSX
   and Windows, without any additional dependencies. For further simplicity,
   Hydra is available as a [Docker Image](https://hub.docker.com/r/oryd/hydra/).
2. Hydra is built security first: architecture and work flows are designed to
   neutralize various common (OWASP TOP TEN) and uncommon attack vectors.
   [Learn more](https://www.ory.sh/docs/guides/master/hydra/5-security/).
3. Hydra has a low CPU and memory footprint, short start-up time, and a
   developer-friendly CLI.
4. Hydra scales effortlessly up and down on many platforms including Heroku,
   Cloud Foundry, Docker, Google Container Engine etc.

Hydra has a few limitations too:

1. Hydra is not something that manages user accounts. Hydra does not offer user
   registration, password reset, user login, sending confirmation emails. This
   is what the _Identity Provider_ is responsible for. The communication between
   Hydra and the Identity Provider is called
   [_Login and Consent Flow_](hydra/oauth2.md).
2. If you are building a simple service for 50-100 registered users, OAuth 2.0
   and Hydra will probably be too sophisticated.
3. Hydra will not support the OAuth 2.0 Resource Owner Password Credentials
   flow. This flow is legacy, discouraged, and insecure.

OAuth 2.0 is used in many areas, for various purposes and supported by all well
known programming languages. It is, however, important to understand the vision
for OAuth 2.0. This non-exclusive list might help you decide if OAuth 2.0 and
Hydra are the right fit for you:

1. If you want to allow third-party developers accessing your APIs now or in the
   future, Hydra is the perfect fit. This is what an OAuth2 Provider does.
2. If you want to become a Identity Provider like Google, Facebook, or
   Microsoft, OpenID Connect and thus Hydra is a perfect fit.
3. Running an OAuth2 Provider works great with browser, mobile and wearable
   apps, as you can avoid storing passwords on the device, phone or wearable and
   revoke access tokens at any time.
4. If you have a lot of services and want to limit full access for those
   services, OAuth 2.0 might make sense for you. Example: The comment service is
   only allowed to fetch user profile updates but not allowed to read user
   passwords.

## OAuth 2.0 Case Study

OAuth2 and OpenID Connect are tricky to understand. It is important to keep in
mind that OAuth2 is a delegation protocol. Let's look at a use case to
understand how Hydra makes sense in new and existing projects.

Let's assume we are running todo24.com, a ToDo list app. ToDo24 has a login
endpoint (todo24.com/login). The login endpoint is written in Node.JS and uses
MongoDB to store user information (email + password + user profile). Of course,
ToDo24 has other services as well: list management (todo24.com/lists: create,
rename, close lists), item management (todo24.com/lists/{list-id}/items: add or
mark an item as solved), and so on. You are using cookie-based user sessions.

Now you decide to use OAuth2 on top of your current infrastructure. There are
many reasons to do this:

- You want to open your APIs to third-party developers. Their apps will be using
  OAuth2 Access Tokens to access your users todo lists.
- You want to build more client applications like a web app, mobile app,
  chat-bot, etc.
- You have cross-origin requests. Making cookies work with cross-origin requests
  weakens or even disables important anti-CSRF measures.

These are only a couple of reasons to use OAuth2. You might decide to use OAuth2
as your only authorization workflow, thus minimizing maintainance overhead while
always being able to support third party applications. With OpenID Connect, you
can delegate authentication as well!

So you decide to implement OAuth2 and use ORY Hydra to do the job. You run Hydra
by adding its Docker image to your cluster. Next, you set up some exemplary
OAuth2 clients. These clients need to access a user's todo lists. To do so, the
client initiates an OAuth2 request. This is where Hydra's
[user login & consent flow](hydra/oauth2.md) comes into play. Before Hydra can
issue an access token, we need to know which user is giving consent. To
determine this, Hydra redirects the user agent (browser, mobile device) to
ToDo24's login endpoint alongside with a challenge that contains important
request information. The login endpoint (todo24.com/login) authenticates the
user as usual, for example by username & password, session cookie or other
means. Upon successful authentication, the login endpoint redirects the user
back to ORY Hydra. Next, ORY Hydra needs the user's consent. It redirects the
user agent to the consent endpoint (todo24.com/consent) where the user is asked
something like _"Do you want to grant MyAnalyticsApp read access to your todo
lists? [Yes][no]"_. Once the user gives consent by clicking _Yes_, the consent
endpoint redirects back to ORY Hydra. Hydra validates the request and finally
issues the access, refresh, and ID tokens.

You can validate the access tokens which are sent to your API directly at ORY
Hydra, or use an Identity & Access Proxy like ORY Oathkeeper to do it for you.
