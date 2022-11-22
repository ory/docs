---
id: api-design
title: REST Design
---

This document provides a summary of Ory's REST design with topics like pagination and date formats. If you're interested in Ory's
API design, check out the [REST API design guidelines](../../open-source/guidelines/rest-api-guidelines).

## Date format

Ory's APIs use [rfc3339](https://tools.ietf.org/html/rfc3339) as the date format:

```
{
  "created_at": "2006-01-02T15:04:05+07:00"
}
```

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
> GET /admin/clients?page_size=5&page_token=... HTTP/1.1
> Host: https://{project.slug}.projects.oryapis.com
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Link: <https://{project.slug}.projects.oryapis.com/admin/clients/clients?page_size=5&page_token=ey...>; rel="first",</clients?page_size=5&page_token=ez...>; rel="next",</clients?page_size=5&page_token=eb....>; rel="prev",</clients?page_size=5&page_token=ca...>; rel="last"
< X-Total-Count: 123
< Date: Mon, 22 Apr 2019 23:34:29 GMT
< Transfer-Encoding: chunked
<
[...]
```

### Total count

You can get the total item count from the `X-Total-Count` HTTP Header.
