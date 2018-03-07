# Concepts and Theory

Please read these chapters carefully, they are imperative to getting started and grasping all the concepts quickly. The
next sections will give you an overview of this chapter and explain some concepts. Do not skip the chapters. Seriously! :)

The first important concept to understand is that ORY Hydra is an OAuth 2.0 Authorization and OpenID Connect Server.
Some mistake these capabilities for systems that store user data and log you in. This is not the case. Instead, such a
server is responsible for "translating" user credentials (typically username and password) to OAuth 2.0 Access and Refresh Tokens
as well as OpenID Connect ID Tokens. It's basically like you storing cookies with session data, but more flexible and
adoptable.

ORY Hydra does not store user profiles, usernames, passwords. This capability is up to you. ORY Hydra uses something we
call a consent flow. The consent flow uses HTTP redirects to forward any incoming authorization request ("Please give
me an access token.") to a consent app. The consent app is something you implement. It can be a new app, or your existing
login system. In the consent app, you must authenticate the user. Then you will make an HTTP REST call to ORY Hydra's API
and let the system know which user authenticated. Here you can add your custom session data, which will be included in the
access, refresh and ID tokens.

The consent app can be written in any programming language. So far, we have seen implementations in NodeJS, PHP, JSP, Rails,
and others.

Another important concept is access control. ORY Hydra supports two types of access control:

* OAuth 2.0 Scopes
* Access Control Policies

Often, developers confuse OAuth 2.0 Scopes with regular Access Control. OAuth 2.0 Scopes and Access Control Policies
cover different aspects of access control. OAuth 2.0 scopes do not represent what a resource owner ("user") is able to
do in a system or not. They do not express things like administrative rights.

OAuth 2.0 scopes express what a user allowed an OAuth 2.0 client (read: "access token") to do on his/her behalf. For example, an access token might be
allowed to see a user's pictures, but not upload new pictures on his/her behalf. The user him/herself however is
generally allowed to view and upload pictures. OAuth 2.0 scopes do not express a user's permissions. They express what
an OAuth 2.0 Client may do on the user's behalf - independently of whether or not the user is actually allowed
to do that. For example, the user could lie and say that the client is allowed to access some protected resource which
he does not have access to ("Read all classified documents", but he is not allowed to view any classified documents).

Access Control Policies say what permissions a user has. For example, a user may be allowed to upload and view pictures,
but not ban other users. The latter permission is only allowed if the user is an administrator. Access Control Policies
cover use cases where you would use RBAC or ACL - but are generally more powerful. A user may be an administrator and
thus allowed to ban user, but the user might choose to not grant this capability (OAuth 2.0 scope) to some OAuth 2.0 Client.

In ORY Hydra, almost all APIs are protected by Access Control Policies. To make requests, you will need to have a valid
access token with the right scopes. Additionally, the user who granted the token must also be allowed to access that API
and resource. What permissions you need for which endpoint can be seen [in the API docs](https://www.ory.sh/docs/api/hydra/).

Access Control Policies are very powerful. They are modeled after Amazon Web Service Identity and Access Management Policies (AWS IAM Policies),
and have tremendous flexibility.

This concludes the overview of the two most important pieces of ORY Hydra.
