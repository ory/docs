---
id: oauth2
title: OAuth 2.0 and OpenID Connect
sidebar_label: OAuth 2.0
---

This section describes on a high level what OAuth 2.0 and OpenID Connect 1.0 are
for and how they work.

### OAuth 2.0

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

1. ORY Hydra does not manage user accounts. Your application does that. Hydra
   exposes an OAuth 2.0 and OpenID Connect endpoint for the user accounts of
   your application.
2. OAuth Scopes are not access permissions to resources. They entitle an
   external application to act in the name of a user on a particular type of
   resource.

### OAuth 2.0 Scope != Permission

A second important concept is the OAuth 2.0 Scope. Many people confuse OAuth 2.0
Scope with internal Access Control like for example Role Based Access Control
(RBAC) or Access Control Lists (ACL). Both concepts cover different aspects of
access control.

Internal access control (RBAC, ACL, etc) decides what a user can do in your
system. An administrator might be allowed to modify everything. A regular user
might only be allowed to read their own messages.

OAuth 2.0 Scopes, on the other hand, describe what a user allowed an external
application (OAuth 2.0 client) to do on his/her behalf. For example, an access
token might grant the external application to see a user's pictures, but not
upload new pictures on his/her behalf (which we assume a user could do herself).

In an extreme case, the user could lie and grant an external application OAuth
scopes that he himself doesn't have permission to ("read all classified
documents"). The OAuth Access Token with those scopes wouldn't help the external
application read those documents because it can only act in the name of the
user, and that user doesn't have these access privileges.

To recap, ORY Hydra's primary feature is implementing the OAuth 2.0 and OpenID
Connect spec, as well as related specs by the IETF and OpenID Foundation.

The next sections explain how to connect your existing user management (user
login, registration, logout, ...) with ORY Hydra in order to become an OAuth 2.0
and OpenID Connect provider like Google, Dropbox, or Facebook.

Again, please be aware that you must know how OAuth 2.0 and OpenID Connect work.
This documentation will not teach you how these protocols work.

### Terminology

To read more natural, this guide uses simpler terminologies like _user_ instead
of _resource owner_. Here is a full list of terms.

1. A **resource owner** is the user account who authorizes an external
   application to access their account. This access is limited (scoped) to
   particular actions (the granted "scopes" like read photos or write messages).
   This guide refers to resource owners as _users_ or _end users_.
2. The **OAuth 2.0 Authorization Server** implements the OAuth 2.0 protocol (and
   optionally OpenID Connect). In our case, this is **ORY Hydra**.
3. The **resource provider** is the service that hosts (provides) the resources.
   These resources (e.g. blog articles, printers, todo lists) are owned by a
   resource owner (user) mentioned above.
4. The **OAuth 2.0 Client** is the _external application_ that wants to access a
   resource owner's resources (read a user's images). To do that, it asks the
   OAuth 2.0 Authorization Server for an access token in a resource owner's
   behalf. The authorization server will ask the user if he/she "is ok with"
   giving that external application e.g. write access to personal images.
5. The **Identity Provider** is a service that allows users to register
   accounts, log in, etc.
6. **User Agent** is usually a browser.
7. **OpenID Connect** is a protocol built on top of OAuth 2.0 for just
   authentication (instead of authorizing access to resources).

A typical OAuth 2.0 flow looks as follows:

1. A developer registers an OAuth 2.0 Client (external application with the
   Authorization Server (ORY Hydra) the intention to obtain information on
   behalf of a user.
2. The application UI asks the user to authorize the application to access
   information/data on his/her behalf.
3. The user is redirected to the Authorization Server.
4. The Authorization Server confirms the user's identity and asks the user to
   grant the OAuth 2.0 Client certain permissions.
5. The Authorization Server issues tokens that the OAuth 2.0 client uses to
   access resources on the user's behalf.
