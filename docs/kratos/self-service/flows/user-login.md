---
id: user-login
title: Login User Flow
---

ORY Kratos supports two login flows:

- Browser-based (easy): This flow works for all applications running on top of a
  browser. Websites, single-page apps, Cordova/Ionic, and so on.
- API-based (advanced): This flow works for native applications like iOS (Swift),
  Android (Java), Microsoft (.NET), React Native, Electron, and others.

## Self-Service User Login for Browser Applications

ORY Kratos supports browser applications that run on server-side (e.g. Java, NodeJS, PHP)
as well as client-side (e.g. JQuery, ReactJS, AngularJS, ...).

The browser-based login makes use of three core HTTP technologies:

- HTTP Redirects
- HTTP POST (`application/json`, `application/x-www-urlencoded`) and RESTful GET requests.
- HTTP Cookies to prevent CSRF and Session Hijaking attack vectors.

The browser flow is the easiest and most secure to set up and integrated with.
ORY Kratos takes care of all required session and CSRF cookies and ensures that
all security requirements are fulfilled.

Future versions of ORY Kratos will be able to deal with multi-domain environments
that require SSO. For example, one account would be used to sign into both `mydomain.com`
and `anotherdomain.org`. A common real-world example is using your Google account to seamlessly be signed
into YouTube and Google at the same time.

This flow is not suitable for scenarios where you use purely programmatic clients
that do not work well with HTTP Cookies and HTTP Redirects.

### The Login User Interface

In Browser Applications, the Login User Interface is typically rendered as an HTML Form:

```html
<form action="..." method="POST">
    <input type="text" name="identifier" placeholder="Enter your username">
    <input type="password" name="password" placeholder="Enter your password">
    <input type="submit">
</form>
```

Depending on the type of login flows you want to support, this might also be a "Sign in with GitHub" hyperlink

```html
<a href="https://github.com/login/oauth/authorize?...">Sign in with GitHub</a>
```

or some other interaction.

In stark contrast to other Identity Systems, ORY Kratos does not render this HTML. Instead, you need to implement
the HTML code in your application (e.g. NodeJS + ExpressJS, Java, PHP, ReactJS, ...), which gives you extreme flexibility
and customizability in your user interface flows and designs.

Each Login User Flow Strategy (e.g. [Username and Password](../strategies/username-email-password.md), [Social Sign In](../strategies/openid-connect-social-sign-in-oauth2.md), Passwordless, ...)
works a bit differently but they all boil down to the same abstract sequence:

[![Abstract Login User Flow](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IEIgYXMgQnJvd3NlclxuICBwYXJ0aWNpcGFudCBLIGFzIE9SWSBLcmF0b3NcbiAgcGFydGljaXBhbnQgQSBhcyBZb3VyIEFwcGxpY2F0aW9uXG5cblxuICBCLT4-SzogSW5pdGlhdGUgTG9naW5cbiAgSy0-PkI6IFJlZGlyZWN0cyB0byB5b3VyIEFwcGxpY2F0aW9uJ3MgL2xvZ2luIGVuZHBvaW50XG4gIEItPj5BOiBDYWxscyAvbG9naW5cbiAgQS0tPj5LOiBGZXRjaGVzIGRhdGEgdG8gcmVuZGVyIGZvcm1zIGV0Y1xuICBCLS0-PkE6IEZpbGxzIG91dCBmb3JtcywgY2xpY2tzIGUuZy4gXCJTdWJtaXQgTG9naW5cIlxuICBCLT4-SzogUE9TVHMgZGF0YSB0b1xuICBLLS0-Pks6IFByb2Nlc3NlcyBMb2dpbiBJbmZvXG5cbiAgYWx0IExvZ2luIGRhdGEgdmFsaWRcbiAgICBLLS0-PkI6IFNldHMgc2Vzc2lvbiBjb29raWVcbiAgICBLLT4-QjogUmVkaXJlY3RzIHRvIGUuZy4gRGFzaGJvYXJkXG4gIGVsc2UgTG9naW4gZGF0YSBpbnZhbGlkXG4gICAgSy0tPj5COiBSZWRpcmVjdHMgdG8geW91ciBBcHBsaWNhaXRvbidzIC9sb2dpbiBlbmRwb2ludFxuICAgIEItPj5BOiBDYWxscyAvbG9naW5cbiAgICBBLS0-Pks6IEZldGNoZXMgZGF0YSB0byByZW5kZXIgZm9ybSBmaWVsZHMgYW5kIGVycm9yc1xuICAgIEItLT4-QTogRmlsbHMgb3V0IGZvcm1zIGFnYWluLCBjb3JyZWN0cyBlcnJvcnNcbiAgICBCLT4-SzogUE9TVHMgZGF0YSBhZ2FpbiAtIGFuZCBzbyBvbi4uLlxuICBlbmRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJuZXV0cmFsIiwic2VxdWVuY2VEaWFncmFtIjp7ImRpYWdyYW1NYXJnaW5YIjoxNSwiZGlhZ3JhbU1hcmdpblkiOjE1LCJib3hUZXh0TWFyZ2luIjowLCJub3RlTWFyZ2luIjoxNSwibWVzc2FnZU1hcmdpbiI6NDUsIm1pcnJvckFjdG9ycyI6dHJ1ZX19fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IEIgYXMgQnJvd3NlclxuICBwYXJ0aWNpcGFudCBLIGFzIE9SWSBLcmF0b3NcbiAgcGFydGljaXBhbnQgQSBhcyBZb3VyIEFwcGxpY2F0aW9uXG5cblxuICBCLT4-SzogSW5pdGlhdGUgTG9naW5cbiAgSy0-PkI6IFJlZGlyZWN0cyB0byB5b3VyIEFwcGxpY2F0aW9uJ3MgL2xvZ2luIGVuZHBvaW50XG4gIEItPj5BOiBDYWxscyAvbG9naW5cbiAgQS0tPj5LOiBGZXRjaGVzIGRhdGEgdG8gcmVuZGVyIGZvcm1zIGV0Y1xuICBCLS0-PkE6IEZpbGxzIG91dCBmb3JtcywgY2xpY2tzIGUuZy4gXCJTdWJtaXQgTG9naW5cIlxuICBCLT4-SzogUE9TVHMgZGF0YSB0b1xuICBLLS0-Pks6IFByb2Nlc3NlcyBMb2dpbiBJbmZvXG5cbiAgYWx0IExvZ2luIGRhdGEgdmFsaWRcbiAgICBLLS0-PkI6IFNldHMgc2Vzc2lvbiBjb29raWVcbiAgICBLLT4-QjogUmVkaXJlY3RzIHRvIGUuZy4gRGFzaGJvYXJkXG4gIGVsc2UgTG9naW4gZGF0YSBpbnZhbGlkXG4gICAgSy0tPj5COiBSZWRpcmVjdHMgdG8geW91ciBBcHBsaWNhaXRvbidzIC9sb2dpbiBlbmRwb2ludFxuICAgIEItPj5BOiBDYWxscyAvbG9naW5cbiAgICBBLS0-Pks6IEZldGNoZXMgZGF0YSB0byByZW5kZXIgZm9ybSBmaWVsZHMgYW5kIGVycm9yc1xuICAgIEItLT4-QTogRmlsbHMgb3V0IGZvcm1zIGFnYWluLCBjb3JyZWN0cyBlcnJvcnNcbiAgICBCLT4-SzogUE9TVHMgZGF0YSBhZ2FpbiAtIGFuZCBzbyBvbi4uLlxuICBlbmRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJuZXV0cmFsIiwic2VxdWVuY2VEaWFncmFtIjp7ImRpYWdyYW1NYXJnaW5YIjoxNSwiZGlhZ3JhbU1hcmdpblkiOjE1LCJib3hUZXh0TWFyZ2luIjowLCJub3RlTWFyZ2luIjoxNSwibWVzc2FnZU1hcmdpbiI6NDUsIm1pcnJvckFjdG9ycyI6dHJ1ZX19fQ)

The exact data being fetched and the step *"Processes Login Info"* depend, of course, on the actual User Login Strategy
being used. But it is important to understand that **"Your Application"** is responsible for rendering the actual Login HTML.
You can of course implement one app for rendering all the Login, Registration, ... screens, and another app
(think "Service Oriented Architecture", "Micro-Services" or "Service Mesh") is responsible for rendering your Dashboards,
Management Screens, and so on.

> It is highly RECOMMENDED to all the applications (or "services"), including ORY Kratos, behind a common API Gateway
> or Reverse Proxy. This greatly reduces the amount of work you have to do to get all the Cookies working properly. We
> RECOMMEND using [ORY Oathkeeper](http://github.com/ory/oathkeeper) for this as it integrates best with the ORY Ecosystem
> and because all of our examples use ORY Oathkeeper. You MAY of course use any other reverse proxy (Envoy, AWS API Gateway, Ambassador,
> Nginx, Kong, ...), but we do not have examples or guides for those at this time.

### Server-Side Browser Applications

Let's take a look at the concrete network topologies, calls, and payloads. Here, we're assuming that you're running a server-side
browser application (written in e.g. PHP, Java, NodeJS) to render the login screen on the server and make all API calls
from that server code. The counterpart to this would be a client-side browser application (written in e.g. Vanilla JavaScript,
JQuery, ReactJS, AngularJS, ...) that uses AJAX requests to fetch data. For these type of applications, read this
section first and go to section [Client-Side Browser Applications](#client-side-browser-applications) next.

#### Network Topology

Your Server-Side Application and ORY Kratos are deployed in a Virtual Private Cluster that can not be accessed from
the public internet directly. Instead, only ORY Oathkeeper can be accessed from the public internet and proxies incoming
requests to the appropriate service:

- Public internet traffic to domain `example.org` is sent to ORY Oathkeeper which in turn:
    - proxies URLs matching `https://example.org/auth/login` to your Server-Side Application available at `https://your-service-side-application.example-org.vpc/auth/login`
    - `https://example.org/.ory/kratos/public/*` is proxied to `https://ory-kratos-public.example-org.vpc/`
- `https://ory-kratos-admin.example-org.vpc/` exposes ORY Kratos' Admin API and is not accessible by the open internet and ideally only by Your Server-Side Application.
- `https://ory-kratos-public.example-org.vpc` exposes ORY Kratos' Public API and is ideally only accessible by ORY Oathkeeper.
- `https://your-service-side-application.example-org.vpc` exposes your Server-Side Application and is ideally only accessible by ORY Oathkeeper.

The ORY Kratos Admin API is exposed only in the intranet and only the Server-Side Application should be able to talk
to it.

[![User Login for Server-Side Applications](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcblxuc3ViZ3JhcGggcGlbUHVibGljIEludGVybmV0XVxuICAgIEJbQnJvd3Nlcl1cbmVuZFxuXG5zdWJncmFwaCB2cGNbVlBDIC8gQ2xvdWQgLyBEb2NrZXIgTmV0d29ya11cbnN1YmdyYXBoIFwiRGVtaWxpdGFyaXplZCBab25lIC8gRE1aXCJcbiAgICBPS1tPUlkgT2F0aGtlZXBlciA6NDQ1NV1cbiAgICBCIC0tPiBPS1xuZW5kXG5cbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvYXV0aC9sb2dpbiB0b1wifCBTQUxJXG4gICAgT0sgLS0-fFwiRm9yd2FyZHMgLy5vcnkva3JhdG9zL3B1YmxpYy8qIHRvXCJ8IEtQXG5cbiAgICBzdWJncmFwaCBcIlByaXZhdGUgU3VibmV0IC8gSW50cmFuZXRcIlxuICAgIEtbIE9SWSBLcmF0b3MgXVxuXG4gICAgS1AoWyBPUlkgS3JhdG9zIFB1YmxpYyBBUEkgXSlcbiAgICBLQShbIE9SWSBLcmF0b3MgQWRtaW4gQVBJIF0pXG4gICAgU0EgLS0-fFwidGFsa3MgdG9cInwgS0FcbiAgICBLQSAtLmJlbG9uZ3MgdG8uLT4gS1xuICAgIEtQIC0uYmVsb25ncyB0by4tPiBLXG5cbiAgICBzdWJncmFwaCBzYVtcIllvdXIgQXBwbGljYXRpb25cIl1cblxuICAgICAgICBTQVtcIllvdXIgU2VydmVyLVNpZGUgQXBwbGljYXRpb25cIl1cbiAgICAgICAgU0FMSSAtLmJlbG9uZ3MgdG8uLT4gU0FcbiAgICAgICAgU0FMSShbUm91dGUgL2F1dGgvbG9naW5dKSBcbiAgICBlbmRcbiAgICBlbmRcblxuZW5kXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsImZsb3djaGFydCI6eyJyYW5rU3BhY2luZyI6NzAsIm5vZGVTcGFjaW5nIjozMCwiY3VydmUiOiJiYXNpcyJ9fX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblxuc3ViZ3JhcGggcGlbUHVibGljIEludGVybmV0XVxuICAgIEJbQnJvd3Nlcl1cbmVuZFxuXG5zdWJncmFwaCB2cGNbVlBDIC8gQ2xvdWQgLyBEb2NrZXIgTmV0d29ya11cbnN1YmdyYXBoIFwiRGVtaWxpdGFyaXplZCBab25lIC8gRE1aXCJcbiAgICBPS1tPUlkgT2F0aGtlZXBlciA6NDQ1NV1cbiAgICBCIC0tPiBPS1xuZW5kXG5cbiAgICBPSyAtLT58XCJGb3J3YXJkcyAvYXV0aC9sb2dpbiB0b1wifCBTQUxJXG4gICAgT0sgLS0-fFwiRm9yd2FyZHMgLy5vcnkva3JhdG9zL3B1YmxpYy8qIHRvXCJ8IEtQXG5cbiAgICBzdWJncmFwaCBcIlByaXZhdGUgU3VibmV0IC8gSW50cmFuZXRcIlxuICAgIEtbIE9SWSBLcmF0b3MgXVxuXG4gICAgS1AoWyBPUlkgS3JhdG9zIFB1YmxpYyBBUEkgXSlcbiAgICBLQShbIE9SWSBLcmF0b3MgQWRtaW4gQVBJIF0pXG4gICAgU0EgLS0-fFwidGFsa3MgdG9cInwgS0FcbiAgICBLQSAtLmJlbG9uZ3MgdG8uLT4gS1xuICAgIEtQIC0uYmVsb25ncyB0by4tPiBLXG5cbiAgICBzdWJncmFwaCBzYVtcIllvdXIgQXBwbGljYXRpb25cIl1cblxuICAgICAgICBTQVtcIllvdXIgU2VydmVyLVNpZGUgQXBwbGljYXRpb25cIl1cbiAgICAgICAgU0FMSSAtLmJlbG9uZ3MgdG8uLT4gU0FcbiAgICAgICAgU0FMSShbUm91dGUgL2F1dGgvbG9naW5dKSBcbiAgICBlbmRcbiAgICBlbmRcblxuZW5kXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsImZsb3djaGFydCI6eyJyYW5rU3BhY2luZyI6NzAsIm5vZGVTcGFjaW5nIjozMCwiY3VydmUiOiJiYXNpcyJ9fX0)

#### User Login Sequences

The Login User Flow has several steps:

[![User Login State Machine](https://mermaid.ink/img/eyJjb2RlIjoic3RhdGVEaWFncmFtXG4gIHMxOiBVc2VyIGJyb3dzZXMgYXBwXG4gIHMyOiBFeGVjdXRlIFwiQmVmb3JlIExvZ2luIFdvcmtmbG93KHMpXCJcbiAgczM6IExvZ2luIFVJIHJlbmRlcnMgXCJMb2dpbiBSZXF1ZXN0XCJcbiAgczQ6IEV4ZWN1dGUgXCJBZnRlciBMb2dpbiBXb3JrZmxvdyhzKVwiXG4gIHM1OiBVcGRhdGUgXCJMb2dpbiBSZXF1ZXN0XCIgd2l0aCBFcnJvciBDb250ZXh0KHMpXG4gIHM2OiBMb2dpbiBzdWNjZXNzZnVsXG5cblxuXG5cdFsqXSAtLT4gczFcbiAgczEgLS0-IHMyIDogVXNlciBjbGlja3MgXCJMb2cgaW5cIlxuICBzMiAtLT4gRXJyb3IgOiBBIGpvYiBmYWlsc1xuICBzMiAtLT4gczMgOiBVc2VyIGlzIHJlZGlyZWN0ZWQgdG8gTG9naW4gVUkgVVJMXG4gIHMzIC0tPiBzNCA6IFVzZXIgcHJvdmlkZXMgdmFsaWQgY3JlZGVudGlhbHNcbiAgczMgLS0-IHM1IDogVXNlciBwcm92aWRlcyBpbnZhbGlkIGNyZWRlbnRpYWxzXG4gIHM1IC0tPiBzMyA6IFVzZXIgaXMgcmVkaXJlY3RlZCB0byBMb2dpbiBVSSBVUkxcbiAgczQgLS0-IEVycm9yIDogQSBqb2IgZmFpbHNcbiAgczQgLS0-IHM2XG4gIHM2IC0tPiBbKl1cblxuICBFcnJvciAtLT4gWypdXG5cblxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic3RhdGVEaWFncmFtXG4gIHMxOiBVc2VyIGJyb3dzZXMgYXBwXG4gIHMyOiBFeGVjdXRlIFwiQmVmb3JlIExvZ2luIFdvcmtmbG93KHMpXCJcbiAgczM6IExvZ2luIFVJIHJlbmRlcnMgXCJMb2dpbiBSZXF1ZXN0XCJcbiAgczQ6IEV4ZWN1dGUgXCJBZnRlciBMb2dpbiBXb3JrZmxvdyhzKVwiXG4gIHM1OiBVcGRhdGUgXCJMb2dpbiBSZXF1ZXN0XCIgd2l0aCBFcnJvciBDb250ZXh0KHMpXG4gIHM2OiBMb2dpbiBzdWNjZXNzZnVsXG5cblxuXG5cdFsqXSAtLT4gczFcbiAgczEgLS0-IHMyIDogVXNlciBjbGlja3MgXCJMb2cgaW5cIlxuICBzMiAtLT4gRXJyb3IgOiBBIGpvYiBmYWlsc1xuICBzMiAtLT4gczMgOiBVc2VyIGlzIHJlZGlyZWN0ZWQgdG8gTG9naW4gVUkgVVJMXG4gIHMzIC0tPiBzNCA6IFVzZXIgcHJvdmlkZXMgdmFsaWQgY3JlZGVudGlhbHNcbiAgczMgLS0-IHM1IDogVXNlciBwcm92aWRlcyBpbnZhbGlkIGNyZWRlbnRpYWxzXG4gIHM1IC0tPiBzMyA6IFVzZXIgaXMgcmVkaXJlY3RlZCB0byBMb2dpbiBVSSBVUkxcbiAgczQgLS0-IEVycm9yIDogQSBqb2IgZmFpbHNcbiAgczQgLS0-IHM2XG4gIHM2IC0tPiBbKl1cblxuICBFcnJvciAtLT4gWypdXG5cblxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

1. The **Login User Flow** is initiated because a link was clicked or an action was performed that requires authentication (or authorization).
1. ORY Kratos executes Jobs defined in the **Before Login Workflow**. If a failure occurs, the **Login User Flow** is aborted.
1. The user's browser is redirected to `https://example.org/.ory/kratos/public/auth/browser/login`.
1. ORY Kratos does some internal processing (e.g. checks if a session cookie is set, generates payloads for form fields, sets CSRF token, ...) and redirects
the user's browser to the Login UI URL which is defined using the `urls.login_ui` config or `URLS_LOGIN_UI` environment variable, which is set to `https://example.org/auth/login`.
The user's browser is thus redirected to `https://example.org/auth/login?request=abcde`. The `request` query parameter includes a unique ID which will be used to fetch
contextual data for this login request.
1. Your Server-Side Application makes a `GET` request to `https://ory-kratos-admin.example-org.vpc/auth/browser/requests/login?request=abcde`. ORY Kratos responds with
a JSON Payload that contains data (form fields, error messages, ...) for all enabled User Login Strategies:
    ```json5
    {
        "id": "6917b3d4-ebb1-46c2-ad37-e4e1d8be008a",
        "expires_at": "2020-01-27T09:34:39.3249566Z",
        "issued_at": "2020-01-27T09:24:39.3249689Z",
        "request_url": "https://example.org/.ory/kratos/public/auth/browser/login",
        "methods": {
            "oidc": {
                "method": "oidc",
                "config": { /* ... */ }
            },
            "password": {
                "method": "password",
                "config": { /* ... */ }
            }
            // ...
        }
    }
    ```
1. Your Server-Side applications renders the data however you see fit. The User interacts with it an completes the Login
by clicking, for example, the "Login", the "Login with Google", ... button.
1. The User's browser makes a request to one of ORY Kratos' User Login Strategy URLs (e.g. `https://example.org/.ory/kratos/public/auth/browser/methods/password/login` or `https://example.org/.ory/kratos/public/auth/browser/methods/oidc/auth/abcde`).
ORY Kratos validates the User's credentials (e.g. Username and Password, by performing an OpenID Connect flow, ...):
   * If the credentials are invalid, the Login Request's JSON Payload is updated - for example with
       ```json5
       {
          "id": "c55ea690-a183-4bb2-81e5-1132f7a5a0d2",
          "expires_at": "2020-01-27T10:05:50.1678228Z",
          "issued_at": "2020-01-27T09:55:50.1678348Z",
          "request_url": "http://127.0.0.1:4455/auth/browser/login",
          "methods": {
              "oidc": {
                  "method": "oidc",
                   "config": { /* ... */ }
              },
              "password": {
                  "method": "password",
                  "config": {
                      "action": "http://127.0.0.1:4455/.ory/kratos/public/auth/browser/methods/password/login?request=c55ea690-a183-4bb2-81e5-1132f7a5a0d2",
                      /* ... */
                      "errors": [
                          {
                              "message": "The provided credentials are invalid. Check for spelling mistakes in your password or username, email address, or phone number."
                          }
                      ]
                  }
              }
          }
       }
       ```
       and the user's Browser is redirected back to the Login UI: `https://example.org/auth/login?request=abcde`.
   * If credentials are valid, ORY Kratos proceeds with the next step.
1. ORY Kratos executes Jobs (e.g. redirect somewhere) defined in the **After Login Workflow**. If a failure occurs, the **Login User Flow** is aborted.

[![User Login Sequence Diagram for Server-Side Applications](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IEIgYXMgQnJvd3NlclxuICBwYXJ0aWNpcGFudCBPIGFzIE9SWSBPYXRoa2VlcGVyXG4gIHBhcnRpY2lwYW50IEtQIGFzIE9SWSBLcmF0b3MgUHVibGljIEFQSVxuICBwYXJ0aWNpcGFudCBBIGFzIFlvdXIgU2VydmVyLVNpZGUgQXBwbGljYXRpb25cbiAgcGFydGljaXBhbnQgS0EgYXMgT1JZIEtyYXRvcyBBZG1pbiBBUElcblxuXG4gIEItPj4rTzogR0VUIC8ub3J5L2tyYXRvcy9wdWJsaWMvYXV0aC9icm93c2VyL2xvZ2luXG4gIE8tPj4rS1A6IEdFVCAvYXV0aC9icm93c2VyL2xvZ2luXG4gIEtQLS0-PktQOiBFeGVjdXRlIEpvYnMgZGVmaW5lZCBpbiBcIkJlZm9yZSBMb2dpbiBXb3JrZmxvdyhzKVwiXG4gIEtQLS0-Pi1POiBIVFRQIDMwMiBGb3VuZCAvYXBwL2F1dGgvbG9naW4_cmVxdWVzdD1hYmNkZVxuICBPLS0-Pi1COiBIVFRQIDMwMiBGb3VuZCAvYXBwL2F1dGgvbG9naW4_cmVxdWVzdD1hYmNkZVxuXG4gIEItPj4rTzogR0VUIC9hcHAvYXV0aC9sb2dpbj9yZXF1ZXN0PWFiY2RlXG4gIE8tPj4rQTogR0VUIC9hdXRoL2xvZ2luP3JlcXVlc3Q9YWJjZGVcbiAgQS0-PitLQTogR0VUIC9hdXRoL2Jyb3dzZXIvcmVxdWVzdHMvbG9naW4_cmVxdWVzdD1hYmNkZVxuICBLQS0-Pi1BOiBTZW5kcyBMb2dpbiBSZXF1ZXN0IEpTT04gUGF5bG9hZFxuICBOb3RlIG92ZXIgQSxLQTogIHtcIm1ldGhvZHNcIjp7XCJwYXNzd29yZFwiOi4uLixcIm9pZGNcIjouLn19XG4gIEEtLT4-QTogR2VuZXJhdGUgYW5kIHJlbmRlciBIVE1MXG4gIEEtLT4-LU86IFJldHVybiBIVE1MIChGb3JtLCAuLi4pXG4gIE8tLT4-LUI6IFJldHVybiBIVE1MIChGb3JtLCAuLi4pXG5cbiAgQi0tPj5COiBGaWxsIG91dCBIVE1MXG5cbiAgQi0-PitPOiBQT1NUIEhUTUwgRm9ybVxuICBPLT4-K0tQOiBQT1NUIEhUTUwgRm9ybVxuICBLUC0tPj5LUDogQ2hlY2tzIGxvZ2luIGRhdGFcblxuXG4gIGFsdCBMb2dpbiBkYXRhIGlzIHZhbGlkXG4gICAgS1AtLT4-LUtQOiBFeGVjdXRlIEpvYnMgZGVmaW5lZCBpbiBcIkFmdGVyIExvZ2luIFdvcmtmbG93KHMpXCJcbiAgICBLUC0tPj5POiBIVFRQIDMwMiBGb3VuZCAvYXBwL2Rhc2hib2FyZFxuICAgIE5vdGUgb3ZlciBLUCxCOiBTZXQtQ29va2llOiBhdXRoX3Nlc3Npb249Li4uXG4gICAgTy0tPj4tQjogSFRUUCAzMDIgRm91bmQgL2FwcC9kYXNoYm9hcmRcbiAgICBCLT4-TzogR0VUIC9hcHAvZGFzaGJvYXJkXG4gICAgTy0tPktBOiBWYWxpZGF0ZXMgU2Vzc2lvbiBDb29raWVcbiAgICBPLT4-QTogR0VUIC9kYXNoYm9hcmRcbiAgZWxzZSBMb2dpbiBkYXRhIGlzIGludmFsaWRcbiAgICBOb3RlIG92ZXIgS1AsQjogVXNlciByZXRyaWVzIGxvZ2luXG4gICAgS1AtLT4-TzogSFRUUCAzMDIgRm91bmQgL2FwcC9hdXRoL2xvZ2luP3JlcXVlc3Q9YWJjZGVcbiAgICBPLS0-PkI6IEhUVFAgMzAyIEZvdW5kIC9hcHAvYXV0aC9sb2dpbj9yZXF1ZXN0PWFiY2RlXG4gIGVuZFxuICAiLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsInNlcXVlbmNlRGlhZ3JhbSI6eyJkaWFncmFtTWFyZ2luWCI6MTUsImRpYWdyYW1NYXJnaW5ZIjoxNSwiYm94VGV4dE1hcmdpbiI6MSwibm90ZU1hcmdpbiI6MTAsIm1lc3NhZ2VNYXJnaW4iOjU1LCJtaXJyb3JBY3RvcnMiOnRydWV9fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IEIgYXMgQnJvd3NlclxuICBwYXJ0aWNpcGFudCBPIGFzIE9SWSBPYXRoa2VlcGVyXG4gIHBhcnRpY2lwYW50IEtQIGFzIE9SWSBLcmF0b3MgUHVibGljIEFQSVxuICBwYXJ0aWNpcGFudCBBIGFzIFlvdXIgU2VydmVyLVNpZGUgQXBwbGljYXRpb25cbiAgcGFydGljaXBhbnQgS0EgYXMgT1JZIEtyYXRvcyBBZG1pbiBBUElcblxuXG4gIEItPj4rTzogR0VUIC8ub3J5L2tyYXRvcy9wdWJsaWMvYXV0aC9icm93c2VyL2xvZ2luXG4gIE8tPj4rS1A6IEdFVCAvYXV0aC9icm93c2VyL2xvZ2luXG4gIEtQLS0-PktQOiBFeGVjdXRlIEpvYnMgZGVmaW5lZCBpbiBcIkJlZm9yZSBMb2dpbiBXb3JrZmxvdyhzKVwiXG4gIEtQLS0-Pi1POiBIVFRQIDMwMiBGb3VuZCAvYXBwL2F1dGgvbG9naW4_cmVxdWVzdD1hYmNkZVxuICBPLS0-Pi1COiBIVFRQIDMwMiBGb3VuZCAvYXBwL2F1dGgvbG9naW4_cmVxdWVzdD1hYmNkZVxuXG4gIEItPj4rTzogR0VUIC9hcHAvYXV0aC9sb2dpbj9yZXF1ZXN0PWFiY2RlXG4gIE8tPj4rQTogR0VUIC9hdXRoL2xvZ2luP3JlcXVlc3Q9YWJjZGVcbiAgQS0-PitLQTogR0VUIC9hdXRoL2Jyb3dzZXIvcmVxdWVzdHMvbG9naW4_cmVxdWVzdD1hYmNkZVxuICBLQS0-Pi1BOiBTZW5kcyBMb2dpbiBSZXF1ZXN0IEpTT04gUGF5bG9hZFxuICBOb3RlIG92ZXIgQSxLQTogIHtcIm1ldGhvZHNcIjp7XCJwYXNzd29yZFwiOi4uLixcIm9pZGNcIjouLn19XG4gIEEtLT4-QTogR2VuZXJhdGUgYW5kIHJlbmRlciBIVE1MXG4gIEEtLT4-LU86IFJldHVybiBIVE1MIChGb3JtLCAuLi4pXG4gIE8tLT4-LUI6IFJldHVybiBIVE1MIChGb3JtLCAuLi4pXG5cbiAgQi0tPj5COiBGaWxsIG91dCBIVE1MXG5cbiAgQi0-PitPOiBQT1NUIEhUTUwgRm9ybVxuICBPLT4-K0tQOiBQT1NUIEhUTUwgRm9ybVxuICBLUC0tPj5LUDogQ2hlY2tzIGxvZ2luIGRhdGFcblxuXG4gIGFsdCBMb2dpbiBkYXRhIGlzIHZhbGlkXG4gICAgS1AtLT4-LUtQOiBFeGVjdXRlIEpvYnMgZGVmaW5lZCBpbiBcIkFmdGVyIExvZ2luIFdvcmtmbG93KHMpXCJcbiAgICBLUC0tPj5POiBIVFRQIDMwMiBGb3VuZCAvYXBwL2Rhc2hib2FyZFxuICAgIE5vdGUgb3ZlciBLUCxCOiBTZXQtQ29va2llOiBhdXRoX3Nlc3Npb249Li4uXG4gICAgTy0tPj4tQjogSFRUUCAzMDIgRm91bmQgL2FwcC9kYXNoYm9hcmRcbiAgICBCLT4-TzogR0VUIC9hcHAvZGFzaGJvYXJkXG4gICAgTy0tPktBOiBWYWxpZGF0ZXMgU2Vzc2lvbiBDb29raWVcbiAgICBPLT4-QTogR0VUIC9kYXNoYm9hcmRcbiAgZWxzZSBMb2dpbiBkYXRhIGlzIGludmFsaWRcbiAgICBOb3RlIG92ZXIgS1AsQjogVXNlciByZXRyaWVzIGxvZ2luXG4gICAgS1AtLT4-TzogSFRUUCAzMDIgRm91bmQgL2FwcC9hdXRoL2xvZ2luP3JlcXVlc3Q9YWJjZGVcbiAgICBPLS0-PkI6IEhUVFAgMzAyIEZvdW5kIC9hcHAvYXV0aC9sb2dpbj9yZXF1ZXN0PWFiY2RlXG4gIGVuZFxuICAiLCJtZXJtYWlkIjp7InRoZW1lIjoibmV1dHJhbCIsInNlcXVlbmNlRGlhZ3JhbSI6eyJkaWFncmFtTWFyZ2luWCI6MTUsImRpYWdyYW1NYXJnaW5ZIjoxNSwiYm94VGV4dE1hcmdpbiI6MSwibm90ZU1hcmdpbiI6MTAsIm1lc3NhZ2VNYXJnaW4iOjU1LCJtaXJyb3JBY3RvcnMiOnRydWV9fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

### Client-Side Browser Applications

Because Client-Side Browser Applications do not have access to ORY Kratos' Admin API, they must use the ORY Kratos Public
API instead. The flow for a Client-Side Browser Application is almost the exact same as the one for Server-Side Applications,
with the small difference that `https://example.org/.ory/kratos/public/auth/browser/requests/login?request=abcde`
would be called via AJAX instead of making a request to `https://ory-kratos-admin.example-org.vpc/auth/browser/requests/login?request=abcde`.

> To prevent brute force, guessing, session injection, and other attacks, it is required that cookies are working
for this endpoint. The cookie set in the initial HTTP request made to `https://example.org/.ory/kratos/public/auth/browser/login` MUST
> be set and available when calling this endpoint!

## Self-Service User Login for API Clients

Will be addressed in a future release.

## Executing Jobs before User Login

ORY Kratos allows you to configure jobs that run before the Login Request is generated. This may be helpful
if you'd like to restrict logins to IPs coming from your internal network or other logic.

You can find available `before` jobs in [Self-Service Before Login Jobs](../workflows/jobs/before.md#user-login) and
configure them using the ORY Kratos configuration file:

```yaml
selfservice:
  login:
    before:
      - run: <job-name>
        config:
          # <job-config>
```

## Executing Jobs after User Login

ORY Kratos allows you to configure jobs that run before the Login Request is generated. This may be helpful
if you'd like to restrict logins to IPs coming from your internal network or other logic.


You can find available `after` jobs in [Self-Service After Login Jobs](../workflows/jobs/after.md#user-login) and
configure them using the ORY Kratos configuration file:

```yaml
selfservice:
  after:
    <strategy>:
      - run: <job-name>
        config:
          # <job-config>
```

It's possible to define jobs running after login for each individual User Login Flow Strategy (e.g. `password`, `oidc`).
