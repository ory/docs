---
id: api-design
title: API Design
---

This chapter contains generally applicable information on API design. When using Ory services, one can expect a consistent
experience when interacting with REST APIs.

## Pagination

On REST endpoints that are explicitly labeled as such, pagination information is available through the `Link` HTTP header.

The `Link` header contains a comma-delimited list of links to the following pages (where applicable):

- First
- Next
- Previous (prev)
- Last

Pages are created based on the values of `limit` and `offset` provided in the querystring, where `limit` is the page size, and
`offset` is the current item. The `limit` parameter always has an API specific upper bound to prevent DoS.

In most scenarios, the `offset` should be a multiple of the `limit`.

Example:

```
> GET hydra-admin/clients?limit=5&offset=10 HTTP/1.1
> Host: localhost:4445
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Link: <hydra-admin/clients?limit=5&offset=0>; rel="first",</clients?limit=5&offset=15>; rel="next",</clients?limit=5&offset=5>; rel="prev",</clients?limit=5&offset=20>; rel="last"
< X-Total-Count: 123
< Date: Mon, 22 Apr 2019 23:34:29 GMT
< Transfer-Encoding: chunked
<
[...]
```

### Total Count

You can get the total item count from the `X-Total-Count` HTTP Header.

## Date Format

Ory's APIs use [rfc3339](https://tools.ietf.org/html/rfc3339) as the date format:

```
{
  "created_at": "2006-01-02T15:04:05+07:00"
}
```
