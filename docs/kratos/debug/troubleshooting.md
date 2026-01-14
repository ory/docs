---
id: troubleshooting
title: General troubleshooting
---

:::info

Please add your troubleshooting tricks and other tips to this document, You can either open a
[discussion](https://github.com/ory/kratos/discussions) or
[edit the page directly](https://github.com/ory/docs/edit/master/docs/kratos/debug/troubleshooting.md).

:::

### `400: Bad Request` on self-service flows

Make sure you are starting and finishing the request in one browser. Self-service browser flows need to be executed in the same
browser from start to finish! Starting the flow in Safari and completing it in Chrome won't work. API Clients like Electron,
Postman or Insomnia are browsers themselves, which can cause requests to fail. For testing purposes [cURL](https://curl.se/) is a
good choice.

### How can I separate customers/employee data, but have them use the same login dialog

> We want to separate our customers and employees, so we store them in different databases. But we would like to have them use the
> same login dialog for our portal.

You can deploy Ory Kratos two times, and use the same login UI pointing to two different Kratos login endpoints -
`/login/customer` or `/login/employee`, either by having two different login routes, or by adding some logic to your login UI that
reroutes customers to `/login/customer` and employees to `/login/employee`. So you define the same login or registration UI URLs
in both of the Kratos configurations. You may need to tell your login/registration UI which Kratos it's supposed to talk to. The
instances are cheap to deploy and the databases are isolated from each other. For example something like `/login/customer` and
`/login/employee`.

### Automatic user migration from legacy system

> For example configure a callback to the legacy system when you can't find the corresponding user, and store the identity on
> successful legacy system response.

An alternative to callback and custom code is fronting the legacy system with Ory OAuth2 & OpenID Connect (Ory Hydra) and then
using that as an upstream in Ory Identities (Ory Kratos).

### Safari ITP limits cookies to 7 days

Safari's Intelligent Tracking Prevention (ITP) limits cookies to 7 days. If you set a cookie with a longer lifespan, Safari
ignores the configured duration and expires the cookie after 7 days. This behavior can affect Ory Identities, because the cookies
used for authentication and session management may expire sooner than expected.

This happens when an AJAX request is made from a URL that does not match the custom domain you configured for Ory.

For example, if your login UI runs on `ui.example.com`, Ory is available at `ory.example.com` via a CNAME, and you use AJAX to
submit the login form, Safari ITP will limit the cookie lifespan to 7 days.

To resolve this issue, you can either:

1. Use Cloudflare for the domain that makes the AJAX request to Ory. This makes Ory and your domain appear as the same party to
   Safari.
2. Change the form submission from AJAX to a normal form submission. Safari does not apply ITP restrictions to top-level
   navigations.

Read more about CNAME cloaking: https://www.cookiestatus.com/safari/#cname-cloaking

### Failing code flows

If an authentication flow using the one time code method was already passed, Ory Kratos will reject any further attempts to use
the same flow.

This can happen if the user clicks the submit button multiple times, and the frontend does not properly prevent multiple
submissions.

To fix this, ensure that your frontend disables the submit button after the first click, or otherwise prevents multiple
submissions of the same form.
