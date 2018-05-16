# Concepts and Theory

<!-- toc -->

Please read these chapters carefully, they are imperative to getting started and grasping all the concepts quickly. The
next sections will give you an overview of this chapter and explain some concepts. Do not skip the chapters. Seriously! :)

The first important concept to understand is that ORY Hydra is an OAuth 2.0 Authorization and OpenID Connect Server.
Some mistake these capabilities for systems that store user data and log you in. This is not the case. Instead, such a
server is responsible for "translating" user credentials (typically username and password) to OAuth 2.0 Access and Refresh Tokens
as well as OpenID Connect ID Tokens. It's basically like you storing cookies with session data, but more flexible and it also
works for third party applications.

ORY Hydra does not store user profiles, usernames, passwords. This capability is up to you. ORY Hydra uses something we
call a **User Login and Consent Flow**. This flow uses HTTP redirects to forward any incoming authorization request ("Please give
me an access token.") to the **Login Provider** and the **Consent Provider**. These applications are something you implement.
It can be a new app or your existing login system. On a high level, these providers can be summarized as:

- The login provider is responsible for authenticating the user ("login") by validating his or her credentials (e.g. username + password).
- The consent provider is responsible for allowing the OAuth 2.0 application to get a token on the user's behalf ("Do you want
to allow foobar-app access to all your personal messages and images?".

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
