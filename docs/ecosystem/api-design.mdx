---
id: api-design
title: API Design
---

This document provides a summary of Ory's REST design with topics like pagination and date formats. If you're interested in Ory's
API design, check out the [REST API design guidelines](../open-source/guidelines/rest-api-guidelines.md).

## Date format

Ory's APIs use [rfc3339](https://tools.ietf.org/html/rfc3339) as the date format:

```
{
  "created_at": "2006-01-02T15:04:05+07:00"
}
```

## Pagination

On REST endpoints that are explicitly labeled as such, pagination information is available through the `Link` HTTP header.

The `Link` header contains a comma-delimited list of links to the following pages:

- First
- Next (if applicable)

Specify the desired page size with the query parameter `page_size`.

Example:

```
> GET /admin/clients?page_size=5 HTTP/1.1
> Host: $PROJECT_SLUG.projects.oryapis.com
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Link: </admin/clients?page_size=5&page_token=euKoY1BqY3J8GVax>; rel="first",</admin/clients?page_size=5&page_token=h9LfEKUiFoLH2R0A>; rel="next"
< Date: Mon, 22 Apr 2019 23:34:29 GMT
< Transfer-Encoding: chunked
<
[...]
```

To get the next page, follow the `next` path from the `Link` header:

```
> GET /admin/clients?page_size=5&page_token=h9LfEKUiFoLH2R0A HTTP/1.1
> Host: $PROJECT_SLUG.projects.oryapis.com
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Link: </admin/clients?page_size=5&page_token=euKoY1BqY3J8GVax>; rel="first",</admin/clients?page_size=5&page_token=QLux4Tu5gb8JfW70>; rel="next"
< Date: Mon, 22 Apr 2019 23:35:29 GMT
< Transfer-Encoding: chunked
<
[...]
```

Finally, if there are no further pages, the `next` link will be omitted indicating the last page:

```
> GET /admin/clients?page_size=5&page_token=QLux4Tu5gb8JfW70 HTTP/1.1
> Host: $PROJECT_SLUG.projects.oryapis.com
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Link: </admin/clients?page_size=5&page_token=euKoY1BqY3J8GVax>; rel="first"
< Date: Mon, 22 Apr 2019 23:36:29 GMT
< Transfer-Encoding: chunked
<
[...]
```
