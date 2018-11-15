# Proxy & Judge

ORY Oathkeeper has two methods of answering access requests: proxy and judge.

## Proxy

The proxy process (`oathkeeper serve proxy`) forwards requests to the upstream server, defined in the rule,
if the request is allowed. If the request is not allowed, ORY Oathkeeper does not forward the request and instead
returns an error message.

Assuming you are making the following request

```
GET /my-service/whatever HTTP/1.1
Host: oathkeeper-proxy:4455
Authorization: bearer some-token
```

and you have the following rule defined (which allows this request)

```
{
    "id": "some-id",
    "upstream": {
        "url": "http://my-backend-service"
    },
    "match": {
        "url": "http://oathkeeper-proxy:4455/my-service/whatever",
        "methods": [ "GET" ]
    },
    "authenticators": [{ "handler": "noop" }],
    "authorizer": { "handler": "allow" }
    "credentials_issuer": { "handler": "noop" }
}
```

then the request will be forwarded by ORY Oathkeeper as follows:


```
GET /my-service/whatever HTTP/1.1
Host: my-backend-service:4455
Authorization: bearer some-token
```

The response of this request will then be sent to the client that made the request to ORY Oathkeeper.

## Judge

The `/judge` endpoint served by `oathkeeper serve api` works in a similar fashion to the proxy, with the difference
of not forwarding the request to the upstream server but instead returning a response which indicates if the request
should be allowed to proceed or not.

Assuming you are making the following request

```
GET /judge/my-service/whatever HTTP/1.1
Host: oathkeeper-api:4456
Authorization: bearer some-token
```

and you have the following rule defined (which allows this request)

```
{
    "id": "some-id",
    "upstream": { "url": "" },
    "match": {
        "url": "http://oathkeeper-api:4456/my-service/whatever",
        "methods": [ "GET" ]
    },
    "authenticators": [{ "handler": "noop" }],
    "authorizer": { "handler": "allow" }
    "credentials_issuer": { "handler": "noop" }
}
```

then this endpoint will directly respond with HTTP Status Code 200:


```
HTTP/1.1 200 OK
Authorization: bearer-sometoken
```

If any other status code is returned, the request must not be allowed, for example:

```
HTTP/1.1 401 OK
Content-Length: 0
Connection: Closed
```

The judge endpoint automatically strips the `/judge` path prefix from the request URL so you don't need to add that
prefix to the `match.url` value of your rule (use `http://oathkeeper-api:4456/my-service/whatever`
instead of `http://oathkeeper-api:4456/judge/my-service/whatever`).
