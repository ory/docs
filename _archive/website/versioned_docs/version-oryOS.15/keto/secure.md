---
id: version-oryOS.15-secure
title: Secure
original_id: secure
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

Similar to other services in our ecosystem, ORY Keto's APIs have no integrated
access control on their own. Any request made to any Keto API is considered
authenticated, authorized, and is thus being executed. However, these endpoints
are very sensitive as they define who is allowed to do what in your system.

Please protect these endpoints using
[ORY Oathkeeper](https://github.com/ory/oathkeeper) or a comparable API Gateway.
How you protect them, is up to you.

If you require support for this, consider [asking us](mailto:hi@ory.sh).
