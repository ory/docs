---
id: index
title: Overview
---

ORY Kratos is a new archetype of software we call **Identity Infrastructure**. Traditional identity systems - sometimes
referred to Identity Provider (IP), Identity and Access Management (IAM), and IDaaS (Identity as a Service) - have
several shortcomings which we'd like to explain before revealing what we have done differently in ORY Kratos and why.

First of all, ORY Kratos solves identity on the network. It is not a on-device user database. When we talk
about web applications and identity, there is always an exchange of credentials happening:

- Username + Password -> Cookie, Token, ...
- Email + Password -> Cookie, Token, ...
- Passwordless login -> Cookie, Token, ...

Regardless of your use case (mobile, browser, native application, ...) you either use a cookie (usually when accessing
the application directly through the browser) or a token (when accessing the application using a programmatic client
via an API). While it is common - but bad practice - to use tokens for Single Page Apps (apps running on the client-side
browser), there is no real difference between these approaches.

So you may ask yourself: **Why the heck is everyone selling me OAuth2 and OpenID Connect?** Well, we have some assumptions
(selling complexity as security) but we obviously ca not back those up. In any case, we will dig deeper into why OAuth2
and OpenID Connect (or "protocols looking something like OAuth2 but actually not following spec" - looking at you AWS Cognito)
are so popular amongst IaaS (Auth0, Okta, AWS Cognito, ...).

A primary differentiator is that ORY Kratos is simple to use and does not sell complexity as security. To the contrary,
**ORY Kratos is easy to use because that removes potential configuration and implementation errors, greatly reducing
attack surface.** You will not need to learn about OAuth2 Authorization Code Flows, Implicit Grants, Hybrid Flows,
ID Tokens or any of that, because really - it's not that difficult!

In the background of course, we use highly sophisticated protocols, based on open standards and research, to provide
simplicity. We do not expose that to you however!

## Approaches to solving Identity

There are several approaches to solving identity today. Let's take a look at them.

### Full-stack Identity and Access Management (IAM)

Full-stack IAM is sold a one-size-fits-all silver bullet. Want to use LDAP? *No problem!* Need OAuth 2.0 and OpenID
Connect? *We support that!* These products are usually written in a stack that's rarely useful in modern cloud
architectures. Because it supports all of the things (ui templates, loading plugins, connecting to a cache cluster,
uploading and serving images, ...), they become large in size, hard to scale, and expensive to restart.

And that's just the beginning. While full-stack solutions provide you with all the features you can imagine, they
also limit you in how to use those features: Want to write your login UI in React? *Yeah well that doesn't really work
with our template engine but you could use our APIs in which case you would have to manage all of the session state
and security mechanisms (e.g. CSRF) yourself and stuff.* Want to bring your own identity data model? *Yeah well you
can save that in this unstructured field but all of your users still need a mandatory (verified) email address,
first, last, and middle name, a phone number - oh and login with just a username is not supported.* Do you
have Docker Images? *Not really, sorry.*

There are plenty of proprietary full-stack IAM solutions out there, usually with $100k+ installation fees, $500k+
recurring fees and no way of knowing what goes on under the hood. While we all like bashing outdated, expensive,
and bad enterprise software let's not go there and focus on open source.

The Open Source world knows two full-stack IAM solutions. One is Keycloak and the other is Gluu. We will provide
a direct comparison between ORY Kratos and these two, but for now let's focus on what ORY Kratos has to offer 

- ~15mb binary running on all operating systems without any system, library, or VM dependencies (except for PostgreSQL).
- ~5mb docker image.
- exactly one binary for the server and cli.
- works best on Kubernetes and provides fast and easy to use helm charts.
- unlimited horizontal scaling. No etcd or memcached or any adjacent tool required.

### Identity as a Service (IDaaS)

Several proprietary SaaS companies have established themselves over the past decade including Auth0 and Okta.
AWS Cognito and GCP CICP (Cloud Identity for Customers and Partners - it's basically Firebase on the Google Cloud Platform)
are the products provided by the big players.

Because of the nature of their product, they act as a third-party login. It's like "Login with Google" but you can
re-brand the "Google" part. Therefore, these systems typically choose OAuth2 and OpenID Connect as their primary
protocol. It fits the use case - the user logs in on a different system than your own. But are OAuth2 and OpenID Connect
really the best protocol at hand for this? Keep in mind that these protocols were designed for the "ACME Corp's Facebook
Photo Backups" and "GitHub Continuous Integrations" of the world - not for first-party login!

On top of that, OAuth2 and OpenID Connect are really, really complex to provide and consume. You can trust us, we wrote
the most popular open source OAuth2 and OpenID Connect server [ORY Hydra](https://github.com/ory/hydra). It was
actually the primary driver for ORY Ketos. So why are these protocols complex?

- You need to know where to store all related tokens. Do you store them in the localStore? That makes them
vulnerable to XSS attacks! In a dedicated proxy? You need to implement that!
- You need to manage the user session! You need to make sure to delete the session cookie that you created
after the OAuth2 flow was completed!
- You need to refresh tokens when they expire. That's easy for one request, but keeping those 15 concurrent
requests in sync? That's kinda difficult.

The list goes on. OAuth2 is hard. It has to be hard because the intended use case (again, "Facebook Photo Backups") is
very specific and several mechanisms need to be in place to deal with malicious third parties. But user login is not that,
and it does not have to be hard.

### Use a library

There are terrific libraries out there for solving most of the hard parts around identity. In fact, they are very similar
to how ORY Kratos was designed - the major difference being that ORY Kratos works for any programming language, not just
e.g. Ruby.

As your team scales, requirements change. Things need to scale (humans, servers, code), and you will slowly decouple
the original project into smaller, more manageable chunks. And here's where it get's tricky. Maybe the library
doesn't run on the newest version of your programming language. Maybe you decide to move away from the programming language
or framework as a whole. But your identity system is so interlinked with all of the source code (middlewares, annotations,
shared state, ...) - it becomes an absolute nightmare to decouple.

### Roll your own

You're very ambitious, we'll just leave you with some of the decisions we had to make:

- How do you manage changing user models?
- So do you use BCrypt, PBKDF2, Argon2, Scrypt, Argon2? Jesus, there's Argon2i, Argon2id, Argon2d now? And they
have different versions too?? And what the heck is a "Salt length parameter" and what's the most secure setting?
- If a user signs up via email, and later uses "Sign up with Google" that has the same email. What happens?
- If a user that's already signed up hits "Sign up with Google" (and vice versa), what happens?
- How do you add 2FA?
- Do you know all of the important rules around sending (activation, welcome, ...) emails that don't alert spam filters?
- How do you notify Stripe when a new customer has registered?
- ...

That list is really, really long but you get the gist.

## ORY Kratos

Well, that was a long and intense rant. So is ORY Kratos really that much different and better? That decision is ultimately
yours but here's why we think it is!

# (yeah this section is tbd)