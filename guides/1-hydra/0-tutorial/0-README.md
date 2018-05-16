# 5 Minute Tutorial

<!-- toc -->

To start off easy, ORY Hydra provides a docker-compose based example for setting up ORY Hydra, a PostgreSQL instance
and an exemplary consent app (identity provider). You need to have the latest Docker version installed.

<img src="../images/oauth2-flow.gif" alt="OAuth2 Flow">

Install [Docker and Docker Compose](https://github.com/ory-am/hydra#installation) and either clone the Hydra git repository,
download [this zip file](https://github.com/ory-am/hydra/archive/master.zip) or use `go get github.com/ory/hydra` if you have Go (1.10+) installed on you system.

```
$ git clone https://github.com/ory/hydra.git
$ cd hydra
$ git checkout tags/v1.0.0-alpha.1
$ docker-compose -p hydra up --build
Starting hydra_mysqld_1
Starting hydra_postgresd_1
Starting hydra_hydra_1

[...]
```

Perfect, everything is running now! Let's confirm that everything is working by creating our first OAuth 2.0 Client.
The following commands will use Docker wizardry. You can obviously install the ORY Hydra CLI locally and avoid using
Docker here. If you do use the CLI locally, you can omit `docker exec -it hydra_hydra_1 \` completely.

Please be aware that docker-compose sets up a port `4445`. If you use a locally available ORY Hydra CLI, the command
`hydra token user` will fail because it also needs to listen on port `4445`. There is currently no workaround for that
in this example, so please use `docker` for that specific command.

```
# Creates a new OAuth 2.0 client
$ docker exec -it hydra_hydra_1 \
    hydra clients create \
    --endpoint http://localhost:4444 \
    --id my-client \
    --secret secret \
    -g client_credentials

OAuth2 client id: my-client
OAuth2 client secret: secret

# Let's perform the client credentials grant.
$ docker exec -it hydra_hydra_1 \
    hydra token client \
    --endpoint http://localhost:4444 \
    --client-id my-client \
    --client-secret secret

UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY

# Let's perform token introspection on that token. Make sure to copy the token from above, and not this dummy value.
$ docker exec -e TOKEN=$token -it hydra_hydra_1 \
    hydra token introspect \
    --endpoint http://localhost:4444 \
    --client-id my-client \
    --client-secret secret \
    UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY
```

Next, we will perform the OAuth 2.0 Authorization Code Grant. For that, we must first create a client that is capable
of performing that grant:

```
$ docker exec -it hydra_hydra_1 \
    hydra clients create \
    --endpoint http://localhost:4444 \
    --id auth-code-client \
    --secret secret \
    --grant-types authorization_code,refresh_token \
    --response-types code,id_token \
    --scope openid,offline \
    --callbacks http://localhost:4445/callback
```

```
$ docker exec -it hydra_hydra_1 \
    hydra token user \
    --client-id auth-code-client \
    --client-secret secret \
    --endpoint http://localhost:4444/ \
    --scope openid,offline

Setting up callback listener on http://localhost:4445/callback
Press ctrl + c on Linux / Windows or cmd + c on OSX to end the process.
If your browser does not open automatically, navigate to:

    https://localhost:4444/oauth2/...
```

Click on the link, and you will be redirect to the User Login Provider first, and then to the User Consent Provider.
After logging in successfully and granting the scopes (you can try out granting different scopes and see how the response
changes), you should see at least an access token in the response.

Great! You installed hydra, connected the CLI, created a client and completed two authentication flows!
Before you continue, clean up this set up in order to avoid conflicts with other tutorials form this guide:

```
$ docker-compose kill
$ docker-compose rm -f
```
