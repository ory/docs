---
id: proxy
title: HTTP Reverse Proxy
---

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
    "mutator": { "handler": "noop" }
}
```

then the request will be forwarded by ORY Oathkeeper as follows:


```
GET /my-service/whatever HTTP/1.1
Host: my-backend-service:4455
Authorization: bearer some-token
```

The response of this request will then be sent to the client that made the request to ORY Oathkeeper.
