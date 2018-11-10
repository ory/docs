# Overview

We provide an open source ecosystem of services with clear boundaries that solve authentication and authorization:

- ORY Hydra is an OAuth 2.0 and OpenID Connect provider.
- ORY Oathkeeper is an Identity and Access Proxy.
- ORY Keto is an access control server.
- *TBA is an identity management server.*

Each service works standalone but you can also combine them to get the full feature set. If you've never heard of an Identity & Access Proxy
before, or you want to learn more about the individual services and how they play together, stick with us through the
next paragraphs.

Almost every application has the concept of users and permissions. An anonymous user, for example, is allowed to
read blog posts while certain authenticated users are allowed to write blog posts. While this is the basis for most
applications out there, access control becomes increasingly complex as an application grows. What started out with
a user's username and password now shifted to machine-2-machine interaction, third party developers accessing your
user's data, and maybe even a micro service system architecture.

Our products solve the simplest use case and give you the ability to instantly ready the system for more complex scenarios without
painful and slow upgrade processes.

The first service, which is to be announced soon, focuses on identity management. Instead of re-writing login, logout,
activation emails, 2fa, and worring about GDPR, you spin up a docker image and write a simple UI for it in the language
or framework of your choice.

**ORY Hydra** enables you to become an OAuth 2.0 and OpenID Connect provider. If you're not writing a basic web app but something
that has to work on different devices, that has machine-2-machine interaction, or enables third-party developers to use
your API (and pay for it), then this is what you're looking for. ORY Hydra is not identity management, though. Instead,
it connects to your existing identity management (e.g. the one from the paragraph above, or your MySQL+PHP login service,
or your Federated SAML SSO) and is capable of issuing, in a secure and OpenID Certified manner, access, refresh, and ID tokens.
Of course, it's shipped as a 5MB Docker Image with almost no configuration required.

Now that your users access your application through, for example, a React/Angular app and a REST api, you need a way
to authenticate the user and to check if he/she has the necessary permissions (we call this "access control" from now on).
One way would be, of course, to add these checks in your code. Another is to deploy the 5MB **ORY Oathkeeper** Docker Image,
define access rules for your API endpoints (e.g. OAuth 2.0 Access Token + certain set of permissions, a valid JSON Web Token,
a valid SAML assertion, ...) and put it - like a firewall - in front of your services.

You might start out with a simple permission system. You've got different roles: anonymous users (not logged in),
authenticated users (logged in), and administrators. At some point however, the system gets more complex. You want
to distinct permissions based on the user's organization, the access time (think time lock in banking), or the billing
plan he/she's on. Big cloud providers such as Amazon Web Services or Google solve this using "Access Control Policies".
These policies represent flexible rules and allow you to express complex access control scenarios. You could, of course,
write your own system or spend a bit of time educating yourself about RBAC, ACL, ABAC, ACP - or (you probably already guessed it) -
boot up the 5MB **ORY Keto** Docker Image. ORY Keto is able to authenticate different types of credentials (e.g. OAuth 2.0 Access
Tokens, SAML Assertions, JSON Web Tokens, ...) and allows you to define advanced permission rules ("Access Control Policies").
And there's of course an endpoint that tells you if a certain set of credentials (e.g. an OAuth 2.0 Access Token) is allowed
to modify that blog post.

![The full ORY Ecosystem](../images/ory-ecosystem.png)
If you were to use the full ORY Ecosystem, it would probably look something like this. Keep in mind that any component
shown here can be replaced or removed, depending on your use case.

Now you know what this ecosystem has to offer you. To get some more information on the services, read the developer guide by
selecting the software of your choice from the navigation on the left!

Contact us at [hi@ory.sh](hi@ory.sh) if you need consulting with your specific project.
