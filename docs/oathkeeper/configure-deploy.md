---
id: configure-deploy
title: Configure and Deploy
---

The ORY Oathkeeper HTTP serve process `oathkeeper serve` opens two ports exposing the

* [reverse proxy](index.md#reverse-proxy)
* REST API which serves the [Access Control Decision API](index.md#access-control-decision-api) as well as other
API endpoints such as health checks, JSON Web Key Sets, and a list of available rules.

For this guide we are using Docker. ORY Oathkeeper however can be [installed in a variety of ways](install.md).

## Configure

ORY Oathkeeper can be configured via the filesystem as well as environment variables. For more information on
mapping the keys to environment variables please head over to the [configuration chapter](configuration.md).

First, create an empty directory and `cd` into it:

```shell
$ mkdir oathkeeper-demo
$ cd oathkeeper-demo
```

Create a file called `config.yaml` with the following content:

```shell
$ cat << EOF > config.yaml
serve:
  proxy:
    port: 4455 # run the proxy at port 4455
  api:
    port: 4456 # run the api at port 4456

access_rules:
  repositories:
    - file:///rules.json

mutators:
  header:
    enabled: true
  noop:
    enabled: true
  id_token:
    enabled: true
    issuer_url: http://localhost:4455/
    jwks_url: file:///jwks.json

authorizers:
  allow:
    enabled: true
  deny:
    enabled: true

authenticators:
  anonymous:
    enabled: true
    subject: guest
EOF
```

This configuration file will run the proxy at port 4455, the api at port 4456, and enable the anonymous authenticator,
the allow and deny authorizers, and the noop and id_token mutators.

### Access Rules

We will be using [httpbin.org](https://httpbin.org) as the upstream server. The service echoes incoming HTTP Requests
and is perfect for seeing how ORY Oathkeeper works. Let's define three rules:

1. An access rule that allowing anonymous access to `https://httpbin.org/anything/cookie` and using the `cookie` mutator.
2. An access rule denying every access to `https://httpbin.org/anything/deny`.
2. An access rule allowing anonymous access to `https://httpbin.org/anything/id_token` and using the `id_token` mutator.

```shell
$ cat << EOF > rules.json
[
  {
    "id": "allow-anonymous-with-header-mutator",
    "upstream": {
      "url": "https://httpbin.org/anything/header"
    },
    "match": {
      "url": "http://<127.0.0.1|localhost>:4455/anything/header",
      "methods": [
        "GET"
      ]
    },
    "authenticators": [
      {
        "handler": "anonymous"
      }
    ],
    "authorizer": {
      "handler": "allow"
    },
    "mutator": {
      "handler": "header",
      "config": {
        "headers": {
          "X-User": "{{ print .Subject }}"
        }
      }
    }
  },
  {
    "id": "deny-anonymous",
    "upstream": {
      "url": "https://httpbin.org/anything/deny"
    },
    "match": {
      "url": "http://<127.0.0.1|localhost>:4455/anything/deny",
      "methods": [
        "GET"
      ]
    },
    "authenticators": [
      {
        "handler": "anonymous"
      }
    ],
    "authorizer": {
      "handler": "deny"
    },
    "mutator": {
      "handler": "noop"
    }
  },
  {
    "id": "allow-anonymous-with-id-token-mutator",
    "upstream": {
      "url": "https://httpbin.org/anything/id_token"
    },
    "match": {
      "url": "http://<127.0.0.1|localhost>:4455/anything/id_token",
      "methods": [
        "GET"
      ]
    },
    "authenticators": [
      {
        "handler": "anonymous"
      }
    ],
    "authorizer": {
      "handler": "allow"
    },
    "mutator": {
      "handler": "id_token"
    }
  }
]
EOF
```

### Cryptographic Keys

The `id_token` mutator creates a signed JSON Web Token. For that to work, a public/private key is required. Luckily,
ORY Oathkeeper can assist you in creating such keys. All common JWT algorithms are supported (RS256, ES256, HS256, ...).

Before continuing with that step we need to pull the latest version of ORY Oathkeeper from Docker Hub:

```sh
$ docker pull oryd/oathkeeper:latest
```

Now let's generate a key for the RS256 algorithm that will be used by the id_token mutator:

```sh
$ docker run oryd/oathkeeper:latest credentials generate --alg RS256 > jwks.json
```

### Dockerfile

Next we will be creating a custom Docker Image that adds these configuration files to the image:

```shell
$ cat << EOF > Dockerfile
FROM oryd/oathkeeper:latest

ADD config.yaml /config.yaml
ADD rules.json /rules.json
ADD jwks.json /jwks.json
EOF
```

It would also be possible to mount the directory instead, but adding these definitions to the Dockerfile itself and
making the build process a part  of your CI pipeline is considered good practice!

## Build & Run

Before building the Docker Image, we need to make sure that the local ORY Oathkeeper Docker Image is on the most recent
version:

```sh
$ docker pull oryd/oathkeeper:latest
```

Next we will build our custom Docker Image

```sh
$ docker build -t ory-oathkeeper-demo .
```

and run it

```
$ docker run --rm \
  --name ory-oathkeeper-demo \
  -p 4455:4455 \
  -p 4456:4456 \
  ory-oathkeeper-demo \
  --config /config.yaml \
  serve
```

Let's open a new terminal and check if it is alive:

```
$ curl http://127.0.0.1:4456/health/alive
{"status":"ok"}

$ curl http://127.0.0.1:4456/health/ready
{"status":"ok"}
```

Let's also check if the rules have been imported properly:

```
$ curl http://127.0.0.1:4456/rules
[{"id":"allow-anonymous-with-header-mutator","description":"","match":{"methods":["GET"],...
```


## Authorizing Requests

Everything is up and running and configured! Let's make some requests:

```
$ curl -X GET http://127.0.0.1:4455/anything/header
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0", 
    "X-User": "guest"
  }, 
  "json": null, 
  "method": "GET", 
  "origin": "172.17.0.1, 82.135.11.242, 172.17.0.1", 
  "url": "https://httpbin.org/anything/header/anything/header"
}

$ curl -X GET http://127.0.0.1:4455/anything/deny
{
  "error": {
    "code": 403,
    "status": "Forbidden",
    "message": "Access credentials are not sufficient to access this resource"
  }
}

$ curl -X GET http://127.0.0.1:4455/anything/id_token
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3N2E2NWE0LTUzM2YtNDFhYi1hODI2LTgxNDliMDM2NDQ0MyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTgwMTg1MTcsImlhdCI6MTU1ODAxODQ1NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0NDU1LyIsImp0aSI6IjExNmRiNzhmLTQyMjEtNDU2ZC05OWIzLTY4NGJkMWVjYThjZSIsIm5iZiI6MTU1ODAxODQ1Nywic3ViIjoiZ3Vlc3QifQ.2VKW-oYtzkFGRPgK3sb4iRlObDSzW8PyHzgNiQubppFSlp0bzJLl4Rnt56orJndPqIa7hwsm8YIskf-Wp-FA1piv-aG_XljkUjgilKr3cncMXDP15yDRwZj8g0iVKEhnugQsw_zWf5gMU2YBev2Eyv4xciJxbhrKCat-X8xNT9SvAbwpY-VxQdu_rnpu1GKCA54DyIX6r-Qh5bQPrrT7NvIupA7jJQ23qq83m4C1cQfBgzlhm7dcCuPqKunYKRsc7NZuER3lT6TjkhsF1qhf7o7BZmCnhz6VuH8L8TwMZS8IJWKSjJd8dEKKwxwPkNXOcZO8A3hIO8SZx4Yd7jrONA", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "json": null, 
  "method": "GET", 
  "origin": "172.17.0.1, 82.135.11.242, 172.17.0.1", 
  "url": "https://httpbin.org/anything/id_token/anything/id_token"
}
```

