ORY Kratos has several moving parts and getting everything right from the beginning can be challenging. This getting
started guide will help you install ORY Kratos and some additional dependencies so that you can see how ORY Kratos
works.

Please be aware that this guide is not a replacement for studying the docs. You must understand core concepts
and APIs to use ORY Kratos productively. This is merely a guide to get you set up with some examples.

## Context

This section gives you some context on what we want to achieve and what tools we need for that. You will also learn
about the network set up we picked for this guide.

### You want login and registration for your Application

This quickstart guide operates on the assumption that we are writing a NodeJS app called **SecureApp**. This app
is using nothing fancy - some ExpressJS and a bit of HTML Templating using Jade. We do want to use TypeScript but only
because it's more readable - not because we're doing anything out of the ordinary!

You could pick any technology here, of course. This works with Swift, ReactJS, or Angular (client side) as well as with PHP, Ruby, Python, Java
(server side) - you name it! We picked NodeJS + TypeScript because we believe it is the easiest to understand, and because JavaScript
and NodeJS are universally understood and easy to install.

We don't really know what SecureApp should do one day. But we do know that it will have some type of dashboard and that it
needs users, therefore we need:

- Login
- Logout
- Registration
- Profile management ("update first name", "update avatar ...")
- Credentials Management ("add a new recovery email", "change password", "...")
- Account Recovery ("password reset")
- Two Factor Authentication with Google Authenticator
- "Sign in with Google" and "Sign in with GitHub"

and of course:

- A dashboard that shows "Hello {{ firstName }} {{ lastName }}, your birthday is on {{ birthday }}!". It is only
  visible when the user is signed in!

### Required Components

As you might already know, ORY Kratos is API-only. It does not have a UI or HTML Templating Engine. We will implement
the all the user-facing UIs (dashboard, login, registration, ...) in our NodeJS SecureApp!

To ensure that no one can access the dashboard without prior authentication (login), we will use a reverse proxy
([ORY Oathkeeper](https://github.com/ory/oathkeeper)) to deny all unauthenticated traffic to `http://secure-app/dashboard`
and redirect the user to the login page at `http://secure-app/auth/login`. Further, we will configure access to 
`http://secure-app/auth/login` in such a way that access only works if one is not yet authenticated.

ORY Kratos does not ship with an administrative user interface. You must implement that yourself or choose the ORY Cloud
offering (to be announced). In this quickstart, we will use ORY Kratos CLI (Command Line Interface) to interact
with ORY Kratos' Administrative APIs.



https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkJbQnJvd3Nlcl0gLS0-IFJQKFJldmVyc2UgUHJveHkpXG5SUCAtLT58T25seSB3aXRoIHZhbGlkIGxvZ2luIHNlc3Npb258IFNBRFtTZWN1cmVBcHAgRGFzaGJvYXJkXVxuUlAgLS0-fFJlZGlyZWN0cyB3aXRob3V0IGxvZ2luIHNlc3Npb24gdG98IFNBW1NlY3VyZUFwcCBMb2dpbiBSZWdpc3RyYXRpb24sIC4uLl0iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ


##

1. [ORY Kratos](https://github.com/ory/kratos)
2. A UI that shows the login, signup, password reset, ... screen - we will use our reference 
[ORY Kratos Selfservice UI](http://github.com/ory/kratos-selfservice-ui-node).
3. An example application (e.g. the blog) where we want to have our users. We will use our [SecureApp]() example.
4. A reverse proxy to protect our example application (SecureApp) which is done via [ORY Oathkeeper](https://github.com/ory/oathkeeper).
5. An SMTP server - we will use a throwaway SMTP server