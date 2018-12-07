---
id: debugging
title: Debugging
---

Spec-compliant OAuth 2.0 and OpenID Connect is hard. Let's take a look how to resolve certain issues.

<!-- toc -->

## First Aid

There are three things you can do to quickly debug any issue:

1. Check the logs. ORY Hydra has extensive logging and you will find the issue most likely in the logs. Here is an example
log line for a client that requested a redirect URL that did not match the whitelisted redirect URLS: `time="2018-08-07T16:01:16Z" level=error msg="An error occurred" description="The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed" error=invalid_request hint="The \"redirect_uri\" parameter does not match any of the OAuth 2.0 Client's pre-registered redirect urls."`
2. Check the URL because of two reasons:
  1. ORY Hydra sends `error_hint`, `error`, `error_description`, `error_debug` in the URL. You will find the
  cause of the error most likely in there.
  2. You are maybe in the wrong URL. Make sure the host and port and path is correct. This happens often, especially
  when you're just starting out and experimenting
3. Set environment variable `OAUTH2_SHARE_ERROR_DEBUG=true`. Do not do this in production, it is possible, though unlikely,
that important data leaks with this. If set to true, ORY Hydra will set the `error_debug` query parameter if debug
information is available.
4. If you're just starting out and experimenting your docker set up does not work at all:
  1. Stop all containers
  2. Remove them (unless you have something important running)
  3. Retry. **This can help a lot if you are new to this!**

## OAuth 2.0 Authorize Code Flow fails

The most likely cause is misconfiguration, summarized in the next sections.

### Wrong or misconfigured OAuth 2.0 Client

You are using the wrong OAuth 2.0 Client or the OAuth 2.0 Client has a broken configuration. To check that
you're using the right client, run:

```
hydra clients get --endpoint http://ory-hydra <the-client-id>
```

The result shows you the whole client (excluding its secret). Check that the values are correct. Example:

```
{
        "client_id": "my-client",
        "grant_types": [
                "authorization_code"
        ],
        "jwks": {},
        "redirect_uris": [
                "http://127.0.0.1:5556/callback"
        ],
        "response_types": [
                "code"
        ],
        "scope": "openid offline",
        "subject_type": "pairwise",
        "token_endpoint_auth_method": "client_secret_basic",
        "userinfo_signed_response_alg": "none"
}
```

### Redirect URL is not whitelisted

A likely cause of your request failing is that you are using the wrong redirect URL. Assuming your OAuth 2.0
URL looks like `http://ory-hydra/oauth2/auth?client_id=my-client&...&redirect_uri=http://my-url/callback`

The redirect URL `http://my-url/callback` must be whitelisted in your client configuration. The URLs must match **exactly**.
URL `http://my-url/callback` and `http://my-url/callback?foo=bar` are different URLs!

To see the whitelisted redirect_uris, check the client:

```
hydra clients get --endpoint http://ory-hydra <the-client-id>

{
        // ...
        "redirect_uris": [
                "http://127.0.0.1:5556/callback"
        ],
        // ...
}
```

Here you see that `http://my-url/callback` is not in the list, which is why the request fails.

### OAuth 2.0 Client ID and secret are sent in body instead of header

There are multiple ways of authenticating OAuth 2.0 Clients at the `/oauth2/token`:

* HTTP Basic Authorization (`client_secret_basic`) - the OAuth 2.0 Client ID and secret are sent in the HTTP Header (`Authorization: basic ....`)
* HTTP Body (`client_secret_post`) - the OAuth 2.0 Client ID and secret are sent in the POST body (`Content-Type: application/x-www-form-urlencoded`)

Both are valid schemes. But the OAuth 2.0 Client has to be configured to allow either of the one. Per default, the OAuth 2.0
Client allows HTTP Basic Authorization only. You can check which method is allowed:

```
hydra clients get --endpoint http://ory-hydra <the-client-id>
{
        // ...
        "token_endpoint_auth_method": "client_secret_basic",
        // ...
}
```

As you can see, this client is allowed to authorize using HTTP Basic Authorization. If you try to authorize with the client
credentials in the POST body, the authentication process will fail. To allow a client to perform the POST authorization
scheme, you must set `"token_endpoint_auth_method": "client_secret_post"`. You can do this in the CLI with the
`--token-endpoint-auth-method` flag.

## Distributed Tracing

### What is this?

Configuring Distributed Tracing (DT) will enable you to obtain a visualization of the call paths that take place in order to process a request made to Hydra. It's yet another tool that you can use to aid you in profiling, debugging and ultimately understanding your deployment of Hydra better. Hydra currently supports the following tracing options:

- Tracing backend(s): Jaeger - _Note: adding support for other [opentracing compliant backends](https://opentracing.io/docs/supported-tracers) is planned. To aid in priority, please [create an issue](https://github.com/ory/hydra/issues) with your feature request._
- Following existing traces: If you have deployed Hydra behind a proxy that has initiated a trace, Hydra will attempt to join that trace by examining the request headers for tracing context.

### What a Hydra trace includes

In DT speak, a trace is comprised of one or more spans which are logical units of work. Each Hydra span is encapsulated with the following state:

- A name
- A start time
- A finish time
- A set of zero or more tags

Hydra currently creates the following spans:

- Top level span (_named after the request path_) for the requested endpoint. Span tags:
	- http method
	- http status code
	- error IFF status code >= 400
- Child span will be created if bcrypt (_e.g. when the token endpoint is called_) is called. Span tags:
	- bcrypt work factor
- All SQL database interactions. Spans/tags will vary depending on the database driver used.

This is still evolving and subject to change as tracing support continues to expand in Hydra. If you see something that is missing/wrong, please create an issue.

### Alright, how can I set this up locally?

The [provided docker-compose file](https://github.com/ory/hydra/blob/master/docker-compose.yml) in the project repository has tracing configuration w/ jaeger added which you can use to play around with. Simply uncomment the configurations associated with tracing as so:

**Under the Hydra service definition `depends_on` configs, uncomment the following:**

```
- jaeger
```

**Under the Hydra service definition `environment` configs, uncomment the following:**

```
- TRACING_PROVIDER
- TRACING_PROVIDER_JAEGER_SAMPLING_SERVER_URL
- TRACING_PROVIDER_JAEGER_LOCAL_AGENT_ADDRESS
- TRACING_PROVIDER_JAEGER_SAMPLING_TYPE
- TRACING_PROVIDER_JAEGER_SAMPLING_VALUE
```

**Uncomment the Jaeger service definition:**

```
jaeger:
  image: jaegertracing/all-in-one:1.7.0
  ports:
  - "5775:5775/udp"
  - "6831:6831/udp"
  - "6832:6832/udp"
  - "5778:5778"
  - "16686:16686"
  - "14268:14268"
  - "9411:9411"
```

Then simply run `docker-compose up`. Grab a coffee or stretch while you wait for everything to come up. You will then be able to navigate to the Jaeger UI
which you have exposed on port `16686` at http://localhost:16686/search. You can now start making requests to Hydra and inspect traces!

As an example, here is a trace created by making a bad request to the `POST /clients` endpoint:

![Sample Trace](../../images/docs/hydra/sample_trace.png)

At a glance, you are able to see that:

- The request failed
- The request took ~80ms
- It resulted in a 409
- The hash comparison to validate the client's credentials took a whopping 70ms. Bcrypt is expensive!
- The various database operations performed

*Note: in order to see spans around database interactions, you must be using a SQL backend (i.e. MySQL or Postgres).*

### Tracing configurations

The CLI will provide you with the list of Hydra tracing configurations and their supported values. Simply run:

```
docker exec -it hydra_hydra_1 hydra serve --help
```

And read the section on `DEBUG CONTROLS`.