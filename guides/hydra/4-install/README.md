# Install, Configure and Run ORY Hydra

The goal of this chapter is to introduce you to a fully functional set up that includes ORY Hydra as well as our
User Login & Consent Provider reference implementation.

<!-- toc -->

The goal of this section is to familiarize you with the specifics of setting up ORY Hydra in your environment.
Before starting with this section, please check out the [tutorial](../1-tutorial). It will teach you the most important flows
and settings for Hydra.

This guide will:

1. Download and run a PostgreSQL container in Docker.
2. Download and run ORY Hydra in Docker.
3. Download and run our reference User Login & Consent Provider.
4. Create an OAuth 2.0 Client to perform the OAuth 2.0 Authorize Code Flow.
5. Perform the OAuth 2.0 Authorize Code flow.

Before starting with this guide, please install the most recent version of [Docker](https://www.docker.com/community-edition#/download).
While docker is not required for running ORY Hydra, we recommend using it for this tutorial as it will greatly reduce
the complexity of setting up a database on your system without virtualization, installing Go, and compiling ORY Hydra.

## Create a Network

Before we can start, a network must be created which we will attach all our Docker containers to. That way, the containers
can talk to one another.

```
$ docker network create hydraguide
```

## Start a PostgreSQL Container

For the purpose of this tutorial, we will use PostgreSQL as a database. As you probably already know, don't run databases in Docker in production!
For the sake of this tutorial however, let's use Docker to quickly deploy the database.

```
$ docker run \
  --network hydraguide \
  --name ory-hydra-example--postgres \
  -e POSTGRES_USER=hydra \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=hydra \
  -d postgres:9.6
```

This command wil start a postgres instance with name `ory-hydra-example--postgres`, set up a database called `hydra`
and create a user `hydra` with password `secret`.

## Install and run ORY Hydra

We highly recommend using Docker to run Hydra, as installing, configuring and running Hydra is easiest with Docker.
ORY Hydra is available on [Docker Hub](https://hub.docker.com/r/oryd/hydra/).

```
# The system secret can only be set against a fresh database. Key rotation is currently not supported. This
# secret is used to encrypt the database and needs to be set to the same value every time the process (re-)starts.
# You can use /dev/urandom to generate a secret. But make sure that the secret must be the same anytime you define it.
# You could, for example, store the value somewhere.
$ export SYSTEM_SECRET=$(export LC_CTYPE=C; cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
#
# Alternatively you can obviously just set a secret:
# $ export SYSTEM_SECRET=this_needs_to_be_the_same_always_and_also_very_$3cuR3-._

# The database url points us at the postgres instance. This could also be an ephermal in-memory database (`export DATABASE_URL=memory`)
# or a MySQL URI.
$ export DATABASE_URL=postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable

# Before starting, let's pull the latest ORY Hydra tag from docker.
$ docker pull oryd/hydra:v1.0.0-beta.8

# This command will show you all the environment variables that you can set. Read this carefully.
# It is the equivalent to `hydra help serve`.
$ docker run -it --rm --entrypoint hydra oryd/hydra:v1.0.0-beta.8 help serve

Starts all HTTP/2 APIs and connects to a database backend.
[...]

# ORY Hydra does not do magic, it requires conscious decisions, for example running SQL migrations which is required
# when installing a new version of ORY Hydra, or upgrading an existing installation.
# It is the equivalent to `hydra migrate sql postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable`
$ docker run -it --rm \
  --network hydraguide \
  oryd/hydra:v1.0.0-beta.8 \
  migrate sql $DATABASE_URL

Applying `client` SQL migrations...
[...]
Migration successful!

# Let's run the server (settings explained below):
$ docker run -d \
  --name ory-hydra-example--hydra \
  --network hydraguide \
  -p 9000:4444 \
  -p 9001:4445 \
  -e SYSTEM_SECRET=$SYSTEM_SECRET \
  -e DATABASE_URL=$DATABASE_URL \
  -e OAUTH2_ISSUER_URL=https://localhost:9000/ \
  -e OAUTH2_CONSENT_URL=http://localhost:9020/consent \
  -e OAUTH2_LOGIN_URL=http://localhost:9020/login \
  oryd/hydra:v1.0.0-beta.8 serve all

# And check if it's running:
$ docker logs ory-hydra-example--hydra

time="2017-06-29T21:26:26Z" level=info msg="Connecting with postgres://*:*@postgres:5432/hydra?sslmode=disable"
time="2017-06-29T21:26:26Z" level=info msg="Connected to SQL!"
[...]
time="2017-06-29T21:26:34Z" level=info msg="Setting up http server on :4444"
```

Let's dive into the various settings:

* `--network hydraguide` connects this instance to the network and makes it possible to connect to the PostgreSQL database.
* `-p 9000:4444` exposes ORY Hydra's public API on `https://localhost:9000/`.
* `-p 9001:4444` exposes ORY Hydra's administrative API on `https://localhost:9001/`.
* `-e SYSTEM_SECRET=$SYSTEM_SECRET` sets the system secret environment variable **(required)**.
* `-e DATABASE_URL=$DATABASE_URL` sets the database url environment variable **(required)**.
* `-e OAUTH2_ISSUER_URL=https://localhost:9000/` this value must be set to the publicly available URL of ORY Hydra **(required)**.
* `-e OAUTH2_CONSENT_URL=http://localhost:9020/consent` this sets the URL of the consent provider **(required)**. We will set up the service
that handles requests at that URL in the next sections.
* `-e OAUTH2_LOGIN_URL=http://localhost:9020/login` this sets the URL of the login provider **(required)**. We will set up the service
that handles requests at that URL in the next sections.

Note: In this example we did not define a value for the optional setting `OAUTH2_ERROR_URL`. This URL can be used 
to provide an endpoint which will receive error messages from ORY Hydra that should be displayed 
to the end user. The URL receives `error` and `error_description` parameters. If this value is not set, 
Hydra uses the fallback endpoint `/oauth2/fallbacks/error` and displays a default error message. In order to obtain 
a uniform UI, you might want to include such an endpoint in your login or consent provider.

To confirm that the instance is running properly, [open the health check](https://localhost:9001/health/status). If asked,
accept the self signed certificate in your browser. You should simply see `ok`.

On start up, ORY Hydra is initializing some values. Let's take a look at the logs:

```
$ docker logs ory-hydra-example--hydra
time="2017-06-30T09:06:34Z" level=info msg="Connecting with postgres://*:*@postgres:5432/hydra?sslmode=disable"
time="2017-06-30T09:06:34Z" level=info msg="Connected to SQL!"
time="2017-06-30T09:06:34Z" level=info msg="Key pair for signing hydra.openid.id-token is missing. Creating new one."
time="2017-06-30T09:06:41Z" level=warning msg="No TLS Key / Certificate for HTTPS found. Generating self-signed certificate."
time="2017-06-30T09:06:41Z" level=info msg="Setting up http server on :4444"
```

As you can see, the following steps are performed when running ORY Hydra against a fresh database:

1. If no system secret was given (in our case we provided one), a random one is generated and emitted to the logs.
Note this down, otherwise you won't be able to restart Hydra.
2. Cryptographic keys are generated for the OpenID Connect ID Token, the consent challenge and response, and TLS encryption
using a self-signed certificate, which is why we need to run all commands using `--skip-tls-verify`.

ORY Hydra can be managed using the Hydra Command Line Interface (CLI), which is using ORY Hydra's REST APIs. To
see the available commands, run:

```
$ docker run --rm -it --entrypoint hydra oryd/hydra:v1.0.0-beta.8 help
Hydra is a cloud native high throughput OAuth2 and OpenID Connect provider

Usage:
  hydra [command]

[...]
```

### Install ORY Hydra without Docker

You can also install ORY Hydra without docker. For the purpose of this tutorial, [please skip this section for now](#configure-ory-hydra), and read
it later.

#### Download Binaries

The client and server **binaries are downloadable at the [releases tab](https://github.com/ory/hydra/releases)**.
There is currently no installer available. You have to add the Hydra binary to the PATH environment variable yourself or put
the binary in a location that is already in your `$PATH` (e.g. `/usr/bin`, ...).

Once installed, you should be able to run:

```
$ hydra help

Hydra is a cloud native high throughput OAuth2 and OpenID Connect provider

Usage:
  hydra [command]

Available Commands:
  clients     Manage OAuth2 clients
...
```

#### Build from Source

If you wish to compile ORY Hydra yourself, you need to install and set up [Go 1.10+](https://golang.org/) and add `$GOPATH/bin`
to your `$PATH` as well as [golang/dep](http://github.com/golang/dep).

The following commands will check out the latest release tag of ORY Hydra and compile it and set up flags so that `hydra version`
works as expected. Please note that this will only work with a linux shell like bash or sh.

```
```
go get -d -u github.com/ory/hydra
cd $(go env GOPATH)/src/github.com/ory/hydra
HYDRA_LATEST=$(git describe --abbrev=0 --tags)
git checkout $HYDRA_LATEST
dep ensure -vendor-only
go install \
    -ldflags "-X github.com/ory/hydra/cmd.Version=$HYDRA_LATEST -X github.com/ory/hydra/cmd.BuildTime=`TZ=UTC date -u '+%Y-%m-%dT%H:%M:%SZ'` -X github.com/ory/hydra/cmd.GitHash=`git rev-parse HEAD`" \
    github.com/ory/hydra
git checkout master
hydra help

...
```

### Setting up the Login & Consent Provider

The Login Provider and Consent Provider can be two separate web services. We provide a [reference implementation](https://github.com/ory/hydra-login-consent-node) which
combines both features in one app. Here, we will use deploy that app using Docker.

```
$ docker pull oryd/hydra-login-consent-node:v1.0.0-beta.8
$ docker run -d \
  --name ory-hydra-example--consent \
  -p 9020:3000 \
  --network hydraguide \
  -e HYDRA_URL=https://ory-hydra-example--hydra:4445 \
  -e NODE_TLS_REJECT_UNAUTHORIZED=0 \
  oryd/hydra-login-consent-node:v1.0.0-beta.8

# Let's check if it's running ok:
$ docker logs ory-hydra-example--consent
```

Let's take a look at the arguments:
* `-p 9020:3000` exposes this service at port 9020. If you remember, that's the port of the `OAUTH2_CONSENT_URL` and `OAUTH2_LOGIN_URL` value
from the ORY Hydra docker container (`OAUTH2_CONSENT_URL=http://localhost:9020/consent`, `OAUTH2_LOGIN_URL=http://localhost:9020/login`).
* `HYDRA_URL=http://hydra:4445` point to the ORY Hydra Administrative API.
* `NODE_TLS_REJECT_UNAUTHORIZED=0` disables TLS verification, because we are using self-signed certificates.

## Perform OAuth 2.0 Flow

Great! Our infrastructure is all set up! Next it's time to perform the OAuth 2.0 Authorize Code flow. For that purpose,
the ORY Hydra CLI has a feature that sets up an OAuth 2.0 Consumer and an OAuth 2.0 callback URL. Typically, this would
be a third-party application that requests access to a user's resources on your servers - for example a Facebook App you wrote
that backs up a user's photos and thus requires read access to the user's photos.

Before we go ahead, the OAuth 2.0 Client that performs the request has to be set up. Let's call the client `facebook-photo-backup`.
We have to specify which OAuth 2.0 Grant Types, OAuth 2.0 Scope, OAuth 2.0 Response Types, and Callback URLs the client may request:

```
$ docker run --rm -it \
  -e HYDRA_ADMIN_URL=https://ory-hydra-example--hydra:4445 \
  --network hydraguide \
  oryd/hydra:v1.0.0-beta.8 \
  clients create --skip-tls-verify \
    --id facebook-photo-backup \
    --secret some-secret \
    --grant-types authorization_code,refresh_token,client_credentials,implicit \
    --response-types token,code,id_token \
    --scope openid,offline,photos.read \
    --callbacks http://127.0.0.1:9010/callback

Client ID: facebook-photo-backup
Client Secret: some-secret
```

Let's dive into some of the arguments:
* `--skip-tls-verify` is supported by all management commands (create/delete/update/... OAuth 2.0 Client, JSON Web Key, ...)
    and tells the CLI to trust any certificate authority - even self-signed ones. We need this flag because the server
    uses a self-signed certificate. In production deployments, you would use a certificate signed by a trusted CA.
* `--grant-types authorize_code,refresh_token,client_credentials,implicit` we want to be able to perform all of these
OAuth 2.0 flows.
* `--response-types token,code,id_token` allows us to receive authorize codes, access and refresh tokens, and
OpenID Connect ID Tokens.
* `--scope openid,offline,fotos.read` allows the client to request various permissions:
  * `openid` allows the client to perform the OpenID Connect flow and request an OpenID Connect ID Token.
  * `offline` allows the client to request a refresh token. Because we want to continuously backup photos, the app must be
  able to refresh expired access tokens. This scope allows that.
  * `photos.read` this is an imaginary scope that is not handled by ORY Hydra but serves the purpose of making it clear that
  we could request read access to a user's photos. You can obviously omit this scope or use your own scope.
* `--callbacks http://localhost:9010/callback` allows the client to request this redirect uri.

Perfect, let's perform an exemplary OAuth 2.0 Authorize Code Flow! To make this easy, the ORY Hydra CLI provides
a helper command called `hydra token user`. Just imagine this being, for example, passport.js that is generating
an auth code url, redirecting the browser to it, and then exchanging the authorize code for an access token. The
same thing happens with this command:

```
$ docker run --rm -it \
  --network hydraguide \
  -p 9010:9010 \
  oryd/hydra:v1.0.0-beta.8 \
  token user --skip-tls-verify \
    --port 9010 \
    --auth-url https://localhost:9000/oauth2/auth \
    --token-url https://ory-hydra-example--hydra:4444/oauth2/token \
    --client-id facebook-photo-backup \
    --client-secret some-secret \
    --scope openid,offline,photos.read

Setting up callback listener on http://localhost:9010/callback
Press ctrl + c on Linux / Windows or cmd + c on OSX to end the process.
If your browser does not open automatically, navigate to:

        https://localhost:9010/
```

open the link, as prompted, in your browser, and follow the steps shown there. You might encounter a screen like the following
one:

![Insecure connection](../images/insecure-connection.jpg)

This happens because we run ORY Hydra with a self-signed TLS certificate. In production deployments, you would probably
use a certificate signed by a trusted CA and not see this screen.

When you see this screen, click on "Advanced" and "Add Exception" to continue. In some browsers, this might work differently,
but it's always possible to proceed.

When completed, you should land at a screen that looks like this one:

![OAuth 2.0 result](../images/install-result.png)
