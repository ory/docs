---
id: 5min-tutorial
title: 5 Minute Tutorial
---

To get started quickly, we provide a Docker Compose based example for setting up ORY Hydra, a PostgreSQL instance
and an exemplary User Login & Consent App. You need to have the latest Docker as well as Docker Compose version installed.

<img src="../../images/docs/hydra/oauth2-flow.gif" alt="OAuth2 Flow">

Next, clone (`git clone https://github.com/ory/hydra.git`), [download](https://github.com/ory-am/hydra/archive/master.zip),
or use `go get -d github.com/ory/hydra` - if you have Go (1.12+) installed on you system - to download the Docker Compose
set up.

Finally, run `docker-compose` to start the needed containers. 

```
$ git clone https://github.com/ory/hydra.git
$ cd hydra

$ docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml \
    up --build
Starting hydra_postgresd_1
Starting hydra_hydra_1
[...]
```

The command above will set up a base ORY Hydra configuration and attach it to a PostgreSQL database backend.
You may also use MySQL as a database backend by running the following command instead:

```
$ docker-compose -f quickstart.yml \
    -f quickstart-mysql.yml \
    up --build
```

The above command would start the containers using mysql instead of postgres and activating tracing capabilities. 
If you need more details on this, you could examine the ``scripts/5-min-tutorial.sh`` and ``docker-compose*.yml`` files.

You may also extend the command above to enable distributed tracing (Tracing UI will be exposed at [http://localhost:16686/search](localhost:16686/search)):

```
$ docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml \
    -f quickstart-tracing.yml \
    up --build
```

Everything should running now! Let's confirm that everything is working by creating our first OAuth 2.0 Client.
The following commands will use Docker wizardry. You can obviously install the ORY Hydra CLI locally and avoid using
Docker here. If you do use the CLI locally, you can omit `docker-compose -f quickstart.yml exec /hydra` completely.

You will notice that two ports are being used. Port `4444` and port `4445`. The former is for request to ORY Hydra's public
endpoints. The latter to its administrative endpoints. For more information on this, head over to
[Exposing Administrative and Public API Endpoints](hydra/production.md).

Ok, let's continue by creating a new OAuth 2.0 Client.

```
# Creates a new OAuth 2.0 client
$ docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://localhost:4445 \
    --id my-client \
    --secret secret \
    -g client_credentials

OAuth2 client my-client
OAuth2 client secret: secret

# Let's perform the client credentials grant.
$ docker-compose -f quickstart.yml exec hydra \
    hydra token client \
    --endpoint http://localhost:4444 \
    --client-id my-client \
    --client-secret secret

UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY

# Let's perform token introspection on that token. Make sure to copy the token you just got and not the dummy value.
$ docker-compose -f quickstart.yml exec hydra \
    hydra token introspect \
    --endpoint http://localhost:4445 \
    --client-id my-client \
    --client-secret secret \
    UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY

{
        "active": true,
        "client_id": "my-client",
        "exp": 1527078658,
        "iat": 1527075058,
        "iss": "http://localhost:4444",
        "sub": "my-client",
        "token_type": "access_token"
}
```

Next, we will perform the OAuth 2.0 Authorization Code Grant. For that, we must first create a client that is capable
of performing that grant:

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://localhost:4445 \
    --id auth-code-client \
    --secret secret \
    --grant-types authorization_code,refresh_token \
    --response-types code,id_token \
    --scope openid,offline \
    --callbacks http://127.0.0.1:5555/callback
```

Note that you need to add `--token-endpoint-auth-method none` if your clients are public (such as SPA apps and native apps) because the public clients could not provide client secret.


The next command starts a server that serves an example web application. The application will perform the OAuth 2.0
Authorization Code Flow using ORY Hydra. The web server runs on [http://127.0.0.1:5555](http://127.0.0.1:5555).

```
$ docker-compose -f quickstart.yml exec hydra \
    hydra token user \
    --client-id auth-code-client \
    --client-secret secret \
    --endpoint http://localhost:4444/ \
    --port 5555 \
    --scope openid,offline

Setting up home route on http://127.0.0.1:4445/
Setting up callback listener on http://127.0.0.1:4445/callback
Press ctrl + c on Linux / Windows or cmd + c on OSX to end the process.
If your browser does not open automatically, navigate to:

        http://127.0.0.1:5555/
```

Open the URL [http://127.0.0.1:5555/](http://127.0.0.1:5555/), log in, and authorize the application. Next, you should
see at least an access token in the response. If you granted the `offline` scope, you will also see a refresh token.
If you granted the `openid` scope, you will get an ID Token as well.

Great! You installed hydra, connected the CLI, created a client and completed two authentication flows!
Before you continue, clean up this set up in order to avoid conflicts with other tutorials form this guide:

```
$ docker-compose kill
$ docker-compose rm -f
```
