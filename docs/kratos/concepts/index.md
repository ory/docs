---
id: index
title: Overview
---

ORY Kratos is a new software archetype  **Identity Infrastructure Service**. Traditional identity systems - sometimes
referred to as Identity and Access Management (IAM), Identity Management (IdM), Identity Provider (I(d)P),
or IDaaS (Identity as a Service) - have shortcomings that highlight the main differences betweeen ORY Kratos and other systems.

ORY Kratos solves identity on the network. It is not a on-device, for instance mobile phones, user database.
In Ory Kratos there is always an exchange of credentials. In the case of web applications and identity:
- Username + Password -> Cookie, Token, ...
- Email + Password -> Cookie, Token, ...
- Passwordless login -> Cookie, Token, ...

Even fo alternative use cases for example mobile, browser, or native application there is either a cookie, which accesses
the application directly through the browser, or a token that accesses the application using a programmatic client
via an API. While it is nowadays common - but bad practice - to use tokens for "Single Page Apps" or apps running on the client-side
browser, there is no real difference between these two approaches as both represent a set of credentials valid
for a certain domain or a number of domains.

Still there is a vast solution set available for OAuth2 and OpenID Connect. The reasons for this would perhaps include the following:

- Assumptions - companies offer complexity as security (In Ory's view pretty bad);
- Assumption - the nature of closed source does not allow for new, open and de-facto standards to emerge and instead uses a consenus driven feature set, even if it doesn't fit the use case 100%.

ORY Kratos tackles both assumptions as follows:
 
- With inspiration from the approach taken in the Kubernetes Project, Ory provides an open source project that hopefully becomes an open standard in the future.

- Prioritise simplicity and ease of use for developers. Ory Kratos integrates critical security components without relying
on complex flows and protocols.

Using Ory Kratos it is possible to consume
OAuth2 and OpenID Connect, and/or create an OAuth2 and OpenID Connect Provider
by combining ORY Kratos with [ORY Hydra](http://github.com/ory/hydra) .

With a primary developer audience, Ory designs, secures,
and tests critical network flows, system architectures, user flows, protocols, and business logic.

#Begin edits @tc

### Full-stack Identity and Access Management (IAM)

*Disclaimer: There are no product and projects names from this section because we do not believe that it is
the right place. However, all the problems we describe have been observed in real products and projects. If you're
interested how ORY Kratos compares to other projects and products, head over to [Comparison](../further-reading/comparison.md)*

Full-stack IAM is sold as a one-size-fits-all solution. Due to size and complexity, these full-stack solutions are typically written in an enterprise programming language
such as Java EE. They have rich feature sets that include:

- theming to customize the user experience, typically constrained to the anticipated theming use case;
- HTML Template Engines specific to the language used, such Java Server Pages or [Apache FreeMarker™](https://www.keycloak.org/docs/latest/server_development/#html-templates);
- plugin loaders and APIs to add custom logic or even custom API endpoints, specific to the language used by the project;
- feature bloat such as integrated Load Balancers, Service Discovery, and other features you would not expect to see
in a project that runs in a year 202x cloud architecture.

Full-stack software projects come with a cost:

- the software has a large disk, CPU, and memory footprint;
- while scaling and clustering (for High Availability) is certainly possible, it becomes more complex as inter-process-communication for caches
and other features is required - using protocols such as [JGroups](http://jgroups.org/);
- getting started with pre-defined use cases is easy, but customization becomes gruesome the more you diverge from these.

Most full-stack projects we've seen are in-house solutions for IAM problems. Imagine Google releasing their IAM as
an open source product. It's certainly great, and it covers a lot of ground, but it also comes with drawbacks:

- Data models are very strict and specific to the company developing the product: 
    - You can either have a username or an email for login (but not both or unable to change it later);
    - You may define additional attributes are stored as unstructured data,
        sometimes even as plain key/value pairs.
- Impossible or at least very complex build pipelines when using modern frontend frameworks like React or Angular in
    the HTML Rendering engine;
- The user model stays the same, even if you want to differentiate between customers and employees in your system;
- API consumption is usually an after-thought, because most flows are built around the user doing something in the browser.
This leads to added complexity in your application as you need to deal with session management, cookie management, CSRF protection,
and other mechanisms related to identity and security.

### Identity as a Service (IDaaS)

Several proprietary SaaS companies have established themselves over the past decade including Auth0 and Okta.
AWS Cognito and GCP CICP (Cloud Identity for Customers and Partners - it's basically Firebase on the Google Cloud Platform)
are the products provided by the big players.

Because of the nature of their product, they act as a third-party login. It's like "Login with Google" but you can
re-brand the "Google" part. Therefore, these systems typically choose OAuth2 and OpenID Connect as their primary
protocol. It fits the use case - the user logs in on a different system than your own. But are OAuth2 and OpenID Connect
really the best protocol at hand for this? Keep in mind that these protocols were designed for the "ACME Corp's Facebook
Photo Backups" and "GitHub Continuous Integrations" of the world - not for first-party login!

If you've ever used OAuth2 or OpenID Connect you probably know that it's no free lunch. As the authors of the most popular
OAuth2 and OpenID Connect server [ORY Hydra](https://github.com/ory/hydra) we know how frustrating this experience can
be for developers.

The main point you need to understand when dealing with OAuth2 and OpenID Connect is that they solve Federation - a problem
where you authenticate someone or authorize access by using a system you (within your company or when consuming third parties)
don't typically own. These protocols don't solve things like updating a user's profile, adding a secondary recovery email,
solving 2FA, storing and managing sessions, solving global logout. All of that is your responsibility, the protocols
simply offer a way to securely solve Federation over the Browser - they do not solve:

- Storage and management of all these tokens. Where do you store them? In the localStore? That makes them
vulnerable to XSS attacks! In a cookie issued by an HTTP server? You need to implement that!
- Managing and storing the user session. You need to create the cookie for the session, you need to delete that
cookie when the user logs out, and you need to make sure that the cookie implements secure best practices.
- You need to refresh tokens when they expire. That's easy for one request, but keeping those 15 concurrent
requests in sync? That's really difficult!

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
- How do you prevent [account enumeration attacks](https://wiki.owasp.org/index.php/Testing_for_User_Enumeration_and_Guessable_User_Account_(OWASP-AT-002))?
- How do you implement 2FA? What happens if the user looses access to his/her device? Do you use a fallback Phone Number for
SMS? Or security codes?
- Do you know all of the important rules around sending (activation, welcome, ...) emails that don't alert spam filters?
- How do you notify Stripe when a new customer signs up?
- ...

That list is really, really long but you get the gist.

## ORY Kratos

You've made it! You should now have enough context to understand why we started ORY Kratos and why it's different and better.
The decision if that's really the case is, of course, ultimately yours - but here's why we think it is!

### Solving a specific problem domain

ORY Kratos solves a clearly defined problem domain:

- managing credentials (passwords, recovery email addresses, security questions, ...)
- authentication (secure login, keeping track of sessions and devices, ...)
- selfservice account management (update profile, add/update email addresses, changing passwords, ...)
- account/identity administration (create, delete, update, import, get)
- managing identity data (first name, last name, profile picture, birthday, ...)

If you need OAuth2 or OpenID Connect, you can use one of our other projects [ORY Hydra](http://github.com/ory/hydra). If
you need a permission system, you can use [ORY Keto](http://github.com/ory/keto).
If you need a Reverse Proxy, use [ORY Oathkeeper](http://github.com/ory/oathkeeper)

### Software Architecture

You've probably seen our [Software Architecture and Philosophy](../../ecosystem/software-architecture-philosophy.md) document,
but to re-iterate:

- ~15mb binary running on all operating systems without any system, library, or VM dependencies.
- ~15mb docker image.
- exactly one binary for the server and the cli.
- works best on Kubernetes and provides fast and easy to use [Helm charts](https://github.com/ory/k8s).
- easy horizontal scaling. No etcd or memcached or adjacent tool required.

### Bring your own User Interface (Framework)

We understand that most businesses have a unique interaction concept. Some companies need [progressive profiling](https://blog.hubspot.com/blog/tabid/6307/bid/34155/how-to-capture-more-and-better-lead-intel-with-progressive-profiling.aspx)
and use a NodeJS app for that. Others want to capture everything in one go, using Client-Side JavaScript Framework like
Angular or React. Others want an iOS-native registration and login experience.

With ORY Kratos, we have defined flows that make it really easy for you to implement your custom user interface for
login, registration, profile management, account reset, ... - and equally easy to get started by using our reference
implementation [github.com/ory/kratos-selfservice-ui-node](https://github.com/ory/kratos-selfservice-ui-node).

For more details about each individual flow, head over to the [Self-Service Flows Chapter](../self-service/flows/index.md).

### Bring your own Identity Model(s)

You may want to store more than one type of identity in your system:

- A customer that uses email + password to log in and needs to set his/her birthdate;
- A employee that uses a unique username + password to log in, with a cost center attached to their profile.

This is possible in ORY Kratos by using [JSON Schemas for Identity Traits](./identity-user-model.md)

### Forget passport-js, oidc-client, ...

You can certainly write your own middleware to protect your API and Web endpoints but why should you? ORY Kratos
integrates natively with ORY Oathkeeper, our Reverse Proxy, and defining Access Rules is as easy as writing a few lines
of JSON / JSON5 / YAML!

If you haven't seen the [Quickstart](../quickstart.md), we highly recommend checking that out!


@aeneas
<!--
To be used in another place

## Approaches to solving Identity

Before going ahead let's look at the "Identity Landscape" of today. The disclaimer is probably obvious, but please take
our findings and arguments as an opinion. We do have lots of experience in this space, but every system has its use case
and place. We do want to bash other systems to gain competitive advantage, but it is important to understand what technology
to use and what drawbacks (and upsides) you get.

For a full comparison with other open and closed source systems, head over to the
[Comparison Chapter](../further-reading/comparison.md).
