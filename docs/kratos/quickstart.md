---
id: quickstart
title: Quickstart
---

ORY Kratos has several moving parts and getting everything right from the
beginning can be challenging. This getting started guide will help you install
ORY Kratos and some additional dependencies so that you can see how ORY Kratos
works.

Please be aware that this guide is not a replacement for studying the docs. You
must understand core concepts and APIs to use ORY Kratos productively. This is
merely a guide to get you set up with some examples.

## Use case: You want login and registration for your Application

This section gives you some context on what we want to achieve and what tools we
need for that. You will also learn about the network set up we picked for this
guide.

This quickstart guide operates on the assumption that we are writing a NodeJS
app called **SecureApp**. This app is using nothing fancy - some ExpressJS and a
bit of HTML Templating using Handlebars. We do want to use TypeScript but only
because it's more readable - not because we're doing anything out of the
ordinary!

You could pick any technology here, of course. This works with Swift, ReactJS,
or Angular (client side) as well as with PHP, Ruby, Python, Java (server side) -
you name it! We picked NodeJS + TypeScript because we believe it is the easiest
to understand, and because JavaScript and NodeJS are universally understood and
easy to install.

We don't really know what SecureApp should do one day. But we do know that it
will have some type of dashboard and that it needs users, therefore we need:

- Login
- Logout
- Registration
- Profile management ("update first name", "update avatar ...")
- Credentials Management ("add a new recovery email", "change password", "...")
- Account Recovery ("password reset")
- Two Factor Authentication with Google Authenticator
- "Sign in with Google" and "Sign in with GitHub"

and of course:

- A dashboard that shows "Hello {{ firstName }} {{ lastName }}, your birthday is
  on {{ birthday }}!". It is only visible when the user is signed in!

## Setup

As you might already know, ORY Kratos is API-only. It does not have a UI or HTML
Templating Engine. We will implement the all the user-facing UIs (dashboard,
login, registration, ...) in our NodeJS SecureApp!

To ensure that no one can access the dashboard without prior authentication
(login), we will use a reverse proxy
([ORY Oathkeeper](https://github.com/ory/oathkeeper)) to deny all
unauthenticated traffic to `http://secure-app/dashboard` and redirect the user
to the login page at `http://secure-app/auth/login`. Further, we will configure
access to `http://secure-app/auth/login` in such a way that access only works if
one is not yet authenticated.

ORY Kratos does not ship with an administrative user interface. You must
implement that yourself or choose the ORY Cloud offering (to be announced). In
this quickstart, we will use ORY Kratos CLI (Command Line Interface) to interact
with ORY Kratos' Administrative APIs.

### Clone ORY Kratos and run it in Docker

To get this example working, you will need Git and
[Docker, and Docker Compose](https://docs.docker.com/get-docker/) installed on
your system. No other dependencies are required. Let's clone ORY Kratos and run
`docker-compose`:

```shell script
git clone https://github.com/ory/kratos.git
# or if you have git+ssh set up:
#  git clone https://github.com/ory/kratos.git
cd kratos
make quickstart

# or if you don't have make installed:
docker pull oryd/kratos:latest
docker pull oryd/kratos-selfservice-ui-node:latest
docker-compose -f quickstart.yml up --build --force-recreate
```

This might take a minute or two. Once the output slows down and logs indicate a
healthy system you're ready to roll! A healthy system will show something along
the lines of (the order of messages might be reversed):

```
kratos_1                      | time="2020-01-20T14:52:13Z" level=info msg="Starting the admin httpd on: 0.0.0.0:4434"
kratos_1                      | time="2020-01-20T14:52:13Z" level=info msg="Starting the public httpd on: 0.0.0.0:4433"

oathkeeper_1                  | {"level":"info","msg":"TLS has not been configured for api, skipping","time":"2020-01-20T09:22:09Z"}
oathkeeper_1                  | {"level":"info","msg":"Listening on http://:4456","time":"2020-01-20T09:22:09Z"}
oathkeeper_1                  | {"level":"info","msg":"TLS has not been configured for proxy, skipping","time":"2020-01-20T09:22:09Z"}
oathkeeper_1                  | {"level":"info","msg":"Listening on http://:4455","time":"2020-01-20T09:22:09Z"}

mailhog_1                     | [APIv1] KEEPALIVE /api/v1/events
```

> There are two important factors to get a fully functional system:
>
> - You need to make sure that ports `4435`, `4455`, `4456`, `4433`, `4434`,
>   `4436` >
>   [are free](https://serverfault.com/questions/309052/check-if-port-is-open-or-closed-on-a-linux-server).
> - Make sure to always use `127.0.0.1` as the hostname, never use `localhost`!
>   This is important because browsers treat these two as separate domains and
>   will therefore have issues with setting and using the right cookies.

#### Mitigating Docker Errors

If you encounter build errors (e.g. network timeout), make sure that the network
is running correctly and run `docker-compose -f quickstart.yml up --build`
again. If the problem persists, feel free to
[open an issue](https://github.com/ory/kratos/issues/new/choose).

### Network Architecture

This demo makes use of several services / Docker Images:

1. [ORY Kratos](https://github.com/ory/kratos)
2. The **SecureApp** - an
   [example application written in NodeJS](http://github.com/ory/kratos-selfservice-ui-node)
   that implements the login, registration, logout, ..., and dashboard screen.
3. A reverse proxy ([ORY Oathkeeper](https://github.com/ory/oathkeeper)) to
   protect the **SecureApp**.
4. An SMTP server with which ORY Kratos can send E-Mails with. We will use
   [MailHog](https://github.com/mailhog/MailHog), a minimalistic SMTP throaway
   server with an easy UI.

To better understand how everything is wired, let's take a look at the network
configuration. This assumes that you have at least some understanding of how
Docker (Compose) Networks work:

[![User Login and Registration Network Topology](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcblxuc3ViZ3JhcGggaG5bSG9zdCBOZXR3b3JrXVxuICAgIEJbQnJvd3Nlcl1cbiAgICBCLS0-fENhbiBhY2Nlc3MgVVJMcyB2aWEgMTI3LjAuMC4xOjQ0NTV8T0tQSE5cbiAgICBCLS0-fENhbiBhY2Nlc3MgVUkgdmlhIDEyNy4wLjAuMTo0NDM2fFNNVFBVSVxuICAgIE9LUEhOKFtSZXZlcnNlIFByb3h5IGV4cG9zZWQgYXQgOjQ0NTVdKVxuICAgIFNNVFBVSShbU01UUCBVSSBleHBvc2VkIGF0IDo0NDM2XSlcbmVuZFxuXG5zdWJncmFwaCBkbltcIkludGVybmFsIERvY2tlciBOZXR3b3JrIChpbnRyYW5ldClcIl1cbiAgICBPS1BITi0tPk9PXG4gICAgU01UUFVJLS0-U01UUFxuICAgIE9PLS0-fFByb3hpZXMgVVJMc3MgLy5vcnkva3JhdG9zL3B1YmxpYy8qIHRvfE9LXG4gICAgT08tLT58XCJQcm94aWVzIC9hdXRoL2xvZ2luLCAvYXV0aC9yZWdpc3RyYXRpb24sIC9kYXNoYm9hcmQsIC4uLiB0b1wifFNBXG4gICAgU0EtLT58VGFsa3MgdG98T0tcbiAgICBPSy0tPnxUYWxrcyB0b3xTTVRQXG4gICAgT08tLT58VmFsaWRhdGVzIGF1dGggc2Vzc2lvbnMgdXNpbmd8T0tcblxuICAgIE9LW09SWSBLcmF0b3NdXG4gICAgT09bXCJSZXZlcnNlIFByb3h5IChPUlkgT2F0aGtlZXBlcilcIl1cbiAgICBTQVtcIlNlY3VyZUFwcCAoT1JZIEtyYXRvcyBTZWxmU2VydmljZSBVSSBOb2RlIEV4YW1wbGUpXCJdXG4gICAgU01UUFtcIlNNVFAgU2VydmVyIChNYWlsSG9nKVwiXVxuZW5kXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsImZsb3djaGFydCI6eyJyYW5rU3BhY2luZyI6NjUsIm5vZGVTcGFjaW5nIjozMCwiY3VydmUiOiJiYXNpcyJ9fX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblxuc3ViZ3JhcGggaG5bSG9zdCBOZXR3b3JrXVxuICAgIEJbQnJvd3Nlcl1cbiAgICBCLS0-fENhbiBhY2Nlc3MgVVJMcyB2aWEgMTI3LjAuMC4xOjQ0NTV8T0tQSE5cbiAgICBCLS0-fENhbiBhY2Nlc3MgVUkgdmlhIDEyNy4wLjAuMTo0NDM2fFNNVFBVSVxuICAgIE9LUEhOKFtSZXZlcnNlIFByb3h5IGV4cG9zZWQgYXQgOjQ0NTVdKVxuICAgIFNNVFBVSShbU01UUCBVSSBleHBvc2VkIGF0IDo0NDM2XSlcbmVuZFxuXG5zdWJncmFwaCBkbltcIkludGVybmFsIERvY2tlciBOZXR3b3JrIChpbnRyYW5ldClcIl1cbiAgICBPS1BITi0tPk9PXG4gICAgU01UUFVJLS0-U01UUFxuICAgIE9PLS0-fFByb3hpZXMgVVJMc3MgLy5vcnkva3JhdG9zL3B1YmxpYy8qIHRvfE9LXG4gICAgT08tLT58XCJQcm94aWVzIC9hdXRoL2xvZ2luLCAvYXV0aC9yZWdpc3RyYXRpb24sIC9kYXNoYm9hcmQsIC4uLiB0b1wifFNBXG4gICAgU0EtLT58VGFsa3MgdG98T0tcbiAgICBPSy0tPnxUYWxrcyB0b3xTTVRQXG4gICAgT08tLT58VmFsaWRhdGVzIGF1dGggc2Vzc2lvbnMgdXNpbmd8T0tcblxuICAgIE9LW09SWSBLcmF0b3NdXG4gICAgT09bXCJSZXZlcnNlIFByb3h5IChPUlkgT2F0aGtlZXBlcilcIl1cbiAgICBTQVtcIlNlY3VyZUFwcCAoT1JZIEtyYXRvcyBTZWxmU2VydmljZSBVSSBOb2RlIEV4YW1wbGUpXCJdXG4gICAgU01UUFtcIlNNVFAgU2VydmVyIChNYWlsSG9nKVwiXVxuZW5kXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsImZsb3djaGFydCI6eyJyYW5rU3BhY2luZyI6NjUsIm5vZGVTcGFjaW5nIjozMCwiY3VydmUiOiJiYXNpcyJ9fX0)

As you can see, most requests are proxied through the Reverse Proxy
([ORY Oathkeeper](https://github.com/ory/oathkeeper)). The `quickstart.yml` file
also defines additional ports such as `4434`, `4456`, and others. These ports
are only there for debugging and playing around with and are not actually
required for the demo to work.

The next diagram shows how we've configured the routes in our Reverse Proxy
([ORY Oathkeeper](https://github.com/ory/oathkeeper)):

[![User Login and Registration Routes](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcblxuc3ViZ3JhcGggcGlbUHVibGljIEludGVybmV0XVxuICAgIEJbQnJvd3Nlcl1cbmVuZFxuXG5zdWJncmFwaCB2cGNbVlBDIC8gQ2xvdWQgLyBEb2NrZXIgTmV0d29ya11cbnN1YmdyYXBoIFwiRGVtaWxpdGFyaXplZCBab25lIC8gRE1aXCJcbiAgICBPS1tPUlkgT2F0aGtlZXBlciA6NDQ1NV1cbiAgICBCIC0tPiBPS1xuZW5kXG5cbiAgICBPSyAtLT58XCJGb3J3YXJkcyB7LywvZGFzaGJvYXJkfSB0b1wifCBTQURcbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvYXV0aC9sb2dvdXQgdG9cInwgU0FMVVxuICAgIE9LIC0tPnxcIkZvcndhcmRzIC9hdXRoL2xvZ2luIHRvXCJ8IFNBTElcbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvYXV0aC9yZWdpc3RyYXRpb24gdG9cInwgU0FSXG4gICAgT0sgLS0-fFwiRm9yd2FyZHMgL2F1dGgvKiB0b1wifCBTQUFcbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvLm9yeS9rcmF0b3MvcHVibGljLyogdG9cInwgS1BcblxuICAgIHN1YmdyYXBoIFwiUHJpdmF0ZSBTdWJuZXQgLyBJbnRyYW5ldFwiXG4gICAgS1sgT1JZIEtyYXRvcyBdXG5cbiAgICBLUChbIE9SWSBLcmF0b3MgUHVibGljIEFQSSBdKVxuICAgIEtBKFsgT1JZIEtyYXRvcyBBZG1pbiBBUEkgXSlcbiAgICBTQSAtLT4gS0FcbiAgICBLQSAtLmJlbG9uZ3MgdG8uLT4gS1xuICAgIEtQIC0uYmVsb25ncyB0by4tPiBLXG5cbiAgICBzdWJncmFwaCBzYVtcIlNlY3VyZUFwcCAvIGtyYXRvcy1zZXJsZnNlcnZpY2UtdWktbm9kZSBFeGFtcGxlXCJdXG5cbiAgICAgICAgU0FbU2VjdXJlQXBwXVxuICAgICAgICBTQUQgLS5iZWxvbmdzIHRvLi0-IFNBXG4gICAgICAgIFNBTFUgLS5iZWxvbmdzIHRvLi0-IFNBXG4gICAgICAgIFNBTEkgLS5iZWxvbmdzIHRvLi0-IFNBXG4gICAgICAgIFNBUiAtLmJlbG9uZ3MgdG8uLT4gU0FcbiAgICAgICAgU0FBIC0uYmVsb25ncyB0by4tPiBTQVxuXG4gICAgICAgIHN1YmdyYXBoIFwiSGFzIGFjdGl2ZSBsb2dpbiBzZXNzaW9uXCJcbiAgICAgICAgICAgIFNBRChbUm91dGUgL2Rhc2hib2FyZF0pXG4gICAgICAgICAgICBTQUxVKFtSb3V0ZSAvYXV0aC9sb2dvdXRdKVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIk5vIGFjdGl2ZSBsb2dpbiBzZXNzaW9uXCJcbiAgICAgICAgICAgIFNBTEkoW1JvdXRlIC9hdXRoL2xvZ2luXSkgXG4gICAgICAgICAgICBTQVIoW1JvdXRlIC9hdXRoL3JlZ2lzdHJhdGlvbl0pIFxuICAgICAgICAgICAgU0FBKFtSb3V0ZSAvYXV0aC8uLi5dKVxuICAgICAgICBlbmRcbiAgICBlbmRcbiAgICBlbmRcblxuZW5kXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsImZsb3djaGFydCI6eyJyYW5rU3BhY2luZyI6NzAsIm5vZGVTcGFjaW5nIjozMCwiY3VydmUiOiJiYXNpcyJ9fX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblxuc3ViZ3JhcGggcGlbUHVibGljIEludGVybmV0XVxuICAgIEJbQnJvd3Nlcl1cbmVuZFxuXG5zdWJncmFwaCB2cGNbVlBDIC8gQ2xvdWQgLyBEb2NrZXIgTmV0d29ya11cbnN1YmdyYXBoIFwiRGVtaWxpdGFyaXplZCBab25lIC8gRE1aXCJcbiAgICBPS1tPUlkgT2F0aGtlZXBlciA6NDQ1NV1cbiAgICBCIC0tPiBPS1xuZW5kXG5cbiAgICBPSyAtLT58XCJGb3J3YXJkcyB7LywvZGFzaGJvYXJkfSB0b1wifCBTQURcbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvYXV0aC9sb2dvdXQgdG9cInwgU0FMVVxuICAgIE9LIC0tPnxcIkZvcndhcmRzIC9hdXRoL2xvZ2luIHRvXCJ8IFNBTElcbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvYXV0aC9yZWdpc3RyYXRpb24gdG9cInwgU0FSXG4gICAgT0sgLS0-fFwiRm9yd2FyZHMgL2F1dGgvKiB0b1wifCBTQUFcbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvLm9yeS9rcmF0b3MvcHVibGljLyogdG9cInwgS1BcblxuICAgIHN1YmdyYXBoIFwiUHJpdmF0ZSBTdWJuZXQgLyBJbnRyYW5ldFwiXG4gICAgS1sgT1JZIEtyYXRvcyBdXG5cbiAgICBLUChbIE9SWSBLcmF0b3MgUHVibGljIEFQSSBdKVxuICAgIEtBKFsgT1JZIEtyYXRvcyBBZG1pbiBBUEkgXSlcbiAgICBTQSAtLT4gS0FcbiAgICBLQSAtLmJlbG9uZ3MgdG8uLT4gS1xuICAgIEtQIC0uYmVsb25ncyB0by4tPiBLXG5cbiAgICBzdWJncmFwaCBzYVtcIlNlY3VyZUFwcCAvIGtyYXRvcy1zZXJsZnNlcnZpY2UtdWktbm9kZSBFeGFtcGxlXCJdXG5cbiAgICAgICAgU0FbU2VjdXJlQXBwXVxuICAgICAgICBTQUQgLS5iZWxvbmdzIHRvLi0-IFNBXG4gICAgICAgIFNBTFUgLS5iZWxvbmdzIHRvLi0-IFNBXG4gICAgICAgIFNBTEkgLS5iZWxvbmdzIHRvLi0-IFNBXG4gICAgICAgIFNBUiAtLmJlbG9uZ3MgdG8uLT4gU0FcbiAgICAgICAgU0FBIC0uYmVsb25ncyB0by4tPiBTQVxuXG4gICAgICAgIHN1YmdyYXBoIFwiSGFzIGFjdGl2ZSBsb2dpbiBzZXNzaW9uXCJcbiAgICAgICAgICAgIFNBRChbUm91dGUgL2Rhc2hib2FyZF0pXG4gICAgICAgICAgICBTQUxVKFtSb3V0ZSAvYXV0aC9sb2dvdXRdKVxuICAgICAgICBlbmRcblxuICAgICAgICBzdWJncmFwaCBcIk5vIGFjdGl2ZSBsb2dpbiBzZXNzaW9uXCJcbiAgICAgICAgICAgIFNBTEkoW1JvdXRlIC9hdXRoL2xvZ2luXSkgXG4gICAgICAgICAgICBTQVIoW1JvdXRlIC9hdXRoL3JlZ2lzdHJhdGlvbl0pIFxuICAgICAgICAgICAgU0FBKFtSb3V0ZSAvYXV0aC8uLi5dKVxuICAgICAgICBlbmRcbiAgICBlbmRcbiAgICBlbmRcblxuZW5kXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsImZsb3djaGFydCI6eyJyYW5rU3BhY2luZyI6NzAsIm5vZGVTcGFjaW5nIjozMCwiY3VydmUiOiJiYXNpcyJ9fX0)

You might notice that we're also proxying requests to ORY Kratos' Public API. We
are doing this because that way all requests are going to and coming from the
same hostname. This avoids common cross-domain issues with cookies.

## Perform registration, logout, login

Enough theory, it's time to get this thing going! Let's start by trying to open
the dashboard - **go to
[127.0.0.1:4455/dashboard](http://127.0.0.1:4455/dashboard)**. You will probably
notice that you're ending up at the login endpoint:

![Login screen of your secured app](assets/images/kratos/secureapp-login.png)

Looking at the network stack, you can see two redirects happening:

![Login screen of your secured app](assets/images/kratos/secureapp-login-ntrace.png)

The first redirect from `http://127.0.0.1:4445/dashboard` to
`http://127.0.0.1:4455/.ory/kratos/public/auth/browser/login` is initiated by
the Reverse Proxy ([ORY Oathkeeper](https://github.com/ory/oathkeeper)) because
the browser does not have a valid authentication (login) session yet. The
redirect points to one of ORY Krato's APIs used for logging in browser-based
applications. ORY Kratos does some security checks and prepares form data and
redirects the browser to `http://127.0.0.1:4445/auth/login`, appending a
`?request=...` query parameter. The endpoint at `/auth/login` (which belongs to
our SecureApp) then fetches data important for rendering the forms from ORY
Krato's Admin API:

```shell script
$ curl http://127.0.0.1:4433/auth/browser/requests/login?request=<request-id>
{
    "id": "27aa98bc-a074-418f-96fa-8b8146050209",
    "expires_at": "2020-01-20T21:10:12.7365393Z",
    "issued_at": "2020-01-20T21:00:12.7365532Z",
    "request_url": "http://127.0.0.1:4455/auth/browser/login",
    "methods": {
        "password": {
            "method": "password",
            "config": {
                "action": "http://127.0.0.1:4455/.ory/kratos/public/auth/browser/methods/password/login?request=27aa98bc-a074-418f-96fa-8b8146050209",
                "method": "POST",
                "fields": {
                    "csrf_token": {
                        "name": "csrf_token",
                        "type": "hidden",
                        "required": true,
                        "value": "Ii8iIEdnn12vVQ2vyz2YaHjmXMUK5eSQgw9pgENGxPjXi1PHC9gOG51x61o2GT9LGvC81ddvmNXYeLvlPxA04g=="
                    },
                    "identifier": {
                        "name": "identifier",
                        "type": "text",
                        "required": true
                    },
                    "password": {
                        "name": "password",
                        "type": "password",
                        "required": true
                    }
                }
            }
        }
    }
}
```

This data is then rendered as an HTML form. This flow also works with Single
Page Apps (SPA) and Frameworks like Angular or ReactJS. For more details about
the specific flows (login, registration, logout, ...), head over to the
[concept](./concepts/index.md) chapter.

Let's move on to the next flow - registration! Click on "Create an account",
which initiates a flow similar to the one we just used:

![Registration screen of your secured app](assets/images/kratos/secureapp-registration.png)

The network trace looks familiar by now:

![Registration screen of your secured app](assets/images/kratos/secureapp-registration-ntrace.png)

If we try to sign up using a password like `123456`, ORY Krato's password policy
will complain:

# NEED SCREENSHOT

The error message is coming directly from ORY Krato's API:

```shell script
$ curl http://127.0.0.1:4433/auth/browser/requests/registration?request=<request-id>
{
    "id": "79349cbd-c785-476a-8db8-d0d71c5b003c",
    "expires_at": "2020-01-20T21:17:00.5077381Z",
    "issued_at": "2020-01-20T21:07:00.5077527Z",
    "request_url": "http://127.0.0.1:4455/auth/browser/registration",
    "methods": {
        "password": {
            "method": "password",
            "config": {
                "action": "http://127.0.0.1:4455/.ory/kratos/public/auth/browser/methods/password/registration?request=79349cbd-c785-476a-8db8-d0d71c5b003c",
                "method": "POST",
                "fields": {
                    "csrf_token": {
                        "name": "csrf_token",
                        "type": "hidden",
                        "required": true,
                        "value": "+ZQ8x5cVgdtt4xtPIRJXQPKMVU5c/S2Mj2MuudP32vsMME0g26oQnV/H/brcNvBjkJq1XoF3UcnUFPzcr6Eq4Q=="
                    },
                    "password": {
                        "name": "password",
                        "type": "password",
                        "required": true
                    },
                    "request": {
                        "name": "request",
                        "type": "hidden",
                        "required": true,
                        "value": ""
                    },
                    "traits.email": {
                        "name": "traits.email",
                        "type": "text",
                        "value": "hello@ory.sh"
                    },
                    "traits.full_name": {
                        "name": "traits.full_name",
                        "type": "text"
                    }
                }
            }
        }
    }
}
```

Setting a password that doesn't violate these policies, we will be immediately
redirected to the Dashboard:

# NEEDS SCREENSHOT

By using "logout" you will be redirected to the log in screen again an will be
able to use the credentials just set up to log in!

### Understanding how Login and Registration works

Head over to the [Self-Service Flows Chapter](./self-service/flows/index.md) for
a in-depth explanation of how the individual flows work.

#### Configuration Used

You can find all configuration files for this quickstart guide in
`./contrib/quickstart` and `./quickstart.yml`. To understand what each of those
individual configuration files are doing, you must consult the other chapters of
this documentation.

In the future, this guide will support more use cases such as:

- Activate account after sign up and before log in
- Use GitHub to login in and sign up
- Use PostgreSQL / MySQL instead of SQLite

## Cleaning up Docker

To clean everything up, you need to bring down the Docker Compose environment
and remove all mounted volumes.

```shell script
docker-compose -f quickstart.yml down -v
docker-compose -f quickstart.yml rm -f -s -v
```
