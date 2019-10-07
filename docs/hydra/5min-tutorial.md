---
id: 5min-tutorial
title: 5 Minute Tutorial
---

This tutorial walks you through a quick setup of ORY Hydra, a PostgreSQL
instance and an exemplary User Login & Consent App based on Docker Compose. You
need to have the latest [Docker](https://www.docker.com) and
[Docker Compose](https://docs.docker.com/compose) version installed.

<img src="/images/docs/hydra/oauth2-flow.gif" alt="OAuth2 Flow">

We will use the Docker Compose configuration in the ORY Hydra code base. Getting
the Hydra source code is easy:

- if you have Go 1.12+ installed: `go get -d github.com/ory/hydra`
- if you have Git installed: `git clone https://github.com/ory/hydra.git`
- otherwise: download the
  [Hydra source code](https://github.com/ory-am/hydra/archive/master.zip). and
  extract it somewhere

Change into the directory with the Hydra source code and run the following
command to start the needed containers:

```
$ docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml \
    up --build
Starting hydra_postgresd_1
Starting hydra_hydra_1
[...]
```

If you prefer to use MySQL as the database backend, run this command instead:

```
$ docker-compose -f quickstart.yml \
    -f quickstart-mysql.yml \
    up --build
```

This command makes Docker Compose start up a database server and a basic base
ORY Hydra server that uses this database. If you need more details on this,
please examine the `scripts/5-min-tutorial.sh` and `docker-compose*.yml` files.

You may also extend the command above to enable distributed tracing. The tracing
UI is exposed at [http://127.0.0.1:16686/search](127.0.0.1:16686/search):

```
$ docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml \
    -f quickstart-tracing.yml \
    up --build
```

Hydra provides an endpoint for Prometheus to scrape as a target. You can run the
following command to start the needed containers, and status of Hydra is exposed
at targets page in Prometheus
[http://localhost:9090/tarets](http://localhost:9090/targets):

```
docker-compose -f quickstart.yml \
  -f quickstart-prometheus.yml \
  up --build
```

Let's confirm that everything is working by creating an OAuth 2.0 Client.

Note: The following commands run Hydra inside Docker. If you have the ORY Hydra
CLI installed locally, you can omit
`docker-compose -f quickstart.yml exec /hydra` in front of each command.

The OAuth 2.0 client uses port `4444` and `4445`. The former is ORY Hydra's
public endpoint, the latter its administrative endpoint. For more information
head over to
[Exposing Administrative and Public API Endpoints](hydra/production.md).

Let's create the OAuth 2.0 Client:

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://127.0.0.1:4445/ \
    --id my-client \
    --secret secret \
    -g client_credentials

OAuth2 client my-client
OAuth2 client secret: secret
```

Let's perform the client credentials grant:

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra token client \
    --endpoint http://127.0.0.1:4444/ \
    --client-id my-client \
    --client-secret secret

UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY
```

Let's perform token introspection on that token. Make sure to copy the token you
just got and not the dummy value.

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra token introspect \
    --endpoint http://127.0.0.1:4445/ \
    --client-id my-client \
    --client-secret secret \

UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY

{
    "active": true,
    "client_id": "my-client",
    "exp": 1527078658,
    "iat": 1527075058,
    "iss": "http://127.0.0.1:4444/",
    "sub": "my-client",
    "token_type": "access_token"
}
```

Next, we will perform the OAuth 2.0 Authorization Code Grant. For that, we must
first create a client that is capable of performing that grant:

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://127.0.0.1:4445 \
    --id auth-code-client \
    --secret secret \
    --grant-types authorization_code,refresh_token \
    --response-types code,id_token \
    --scope openid,offline \
    --callbacks http://127.0.0.1:5555/callback
```

Note that you need to add `--token-endpoint-auth-method none` if your clients
are public (such as SPA apps and native apps) because the public clients cannot
provide client secrets.

The following command starts a server that serves an example web application.
The application will perform the OAuth 2.0 Authorization Code Flow using ORY
Hydra. The web server runs on [http://127.0.0.1:5555](http://127.0.0.1:5555).

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra token user \
    --client-id auth-code-client \
    --client-secret secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 5555 \
    --scope openid,offline

Setting up home route on http://127.0.0.1:4445/
Setting up callback listener on http://127.0.0.1:4445/callback
Press ctrl + c on Linux / Windows or cmd + c on OSX to end the process.
If your browser does not open automatically, navigate to:

        http://127.0.0.1:5555/
```

Open the URL [http://127.0.0.1:5555](http://127.0.0.1:5555), log in, and
authorize the application. Next, you should see at least an access token in the
response. If you granted the `offline` scope, you will also see a refresh token.
If you granted the `openid` scope, you will get an ID Token as well.

Great! You installed Ory Hydra, connected the CLI, created a client and
completed two authentication flows! Before you continue, clean up this set up in
order to avoid conflicts with other tutorials from this guide:

```
$ docker-compose kill
$ docker-compose rm -f
```
