---
id: judge
title: Decision Engine API
---

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
    "mutator": { "handler": "noop" }
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
