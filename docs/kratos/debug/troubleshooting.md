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
browser from start to finish!  
Starting the flow in Safari and completing it in Chrome won't work. API Clients like Electron, Postman or Insomnia are browsers
themselves, which can cause requests to fail. For testing purposes [cURL](https://curl.se/) is a good choice.

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

### Cookies ignore lifespan setting

In Safari, cookies issued by Ory Identities sometimes expire after 7 days, ignoring the configured lifespan. This is due to
Safari's intelligent tracking protection (ITP), which limits cookies set on domains from origins that seem like they are
third-party. This can include Ory's APIs, if the IP address of your application is too different from Ory's IPs.

This might affect you, if your service is not running through Cloudflare and you're making direct API calls to the Ory
self-service APIs from your application to your project's CNAME, such as in an SPA based application.

Read more about CNAME cloaking here: https://www.cookiestatus.com/safari/#cname-cloaking
