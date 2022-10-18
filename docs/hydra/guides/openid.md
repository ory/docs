---
id: openid
title: OpenID Connect
---

## Subject identifier algorithms

Hydra supports two [Subject Identifier Algorithms](http://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes):

- `public`: This provides the same `sub` (subject) value to all Clients (default).
- `pairwise`: This provides a different `sub` value to each Client, so as not to enable Clients to correlate the End-User's
  activities without permission.

You can enable either one or both algorithms using the following configuration layout:

```yaml
oidc:
  subject_identifiers:
    supported_types:
      - public
      - pairwise
```

When `pairwise` is enabled, you must also set `oidc.subject_identifiers.pairwise.salt`. The salt is used to obfuscate the `sub`
value:

```yaml
oidc:
  subject_identifiers:
    supported_types:
      - public
      - pairwise
    pairwise:
      salt: some-salt
```

:::warning

This value shouldn't be changed once set in production. Changing it will cause all client applications to receive new user IDs
from Ory Hydra which will lead to serious complications with authentication on their side!

:::

Each OAuth 2.0 Client has a configuration field `subject_type`. The value of that `subject_type` is either `public` or `pairwise`.
If the identifier algorithm is enabled, Ory Hydra will choose the right strategy automatically.

While Ory Hydra handles `sub` obfuscation out of the box, you may also override this value with your own obfuscated `sub` value by
setting `force_subject_identifier` when accepting the login challenge in your user login app.

### Using login_hint with different subject

When a user already logged in with a subject(for example user-A), and she would like to log in as another user using
login_hint(for example login_hint=user-B), directly accepting the latter login request in your login provider will make hydra
reply: `Subject from payload doesn't match subject from previous authentication`

The suggested flow is:

Check the response from [GET login request](reference/api.mdx#get-a-login-request), if both the `subject` and `login_hint` are NOT
empty and also NOT the same user, redirect UserAgent to `request_url` which is appended with '?prompt=login'. This will make hydra
ignore the existing authentication, and allow your login provider to log in a different subject.

For more information on `prompt=login` and other options, please check
[Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
