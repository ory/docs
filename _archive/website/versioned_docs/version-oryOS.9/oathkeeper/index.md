---
id: version-oryOS.9-index
title: Introduction
original_id: index
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

Welcome to the ORY Oathkeeper documentation!

ORY Oathkeeper is a reverse proxy which evaluates incoming HTTP requests based
on a set of rules (called "access rules"). The feature set ORY Oathkeeper
implements is referred to as an Identity and Access Proxy (IAP) in the context
of [BeyondCorp and ZeroTrust](https://www.beyondcorp.com).

In principal, ORY Oathkeeper inspects the `Authorization` header and the full
request url (e.g. `https://mydomain.com/api/foo`) of incoming HTTP requests,
applies a set of rules, and either grants access to the requested url or denies
access.
