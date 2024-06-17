---
id: openid
title: Subject anonymization
---

Ory OAuth2 and OpenID Connect offers two subject identifier algorithms: `public` and `pairwise`. These algorithms are used to
provide a unique identifier for each user that can be used by the clients without revealing the user's identity. You can enable
either one or both algorithms and override the obfuscated `sub` value with your own value.

## Public algorithm

The public algorithm is the default algorithm in Ory OAuth2 and OpenID Connect. It provides the same subject value (sub) to all
clients. You can set this algorithm using the Ory CLI:

```shell
ory patch oauth2-config $PROJECT_ID \
  --replace "/oidc/subject_identifiers/supported_types=[\"public\"]"
```

## Pairwise algorithm

The `pairwise` algorithm provides a different subvalue to each client, ensuring that clients can't correlate user activity without
permission. To use the `pairwise` algorithm, you must enable it and set `/oidc/subject_identifiers/pairwise/salt`. The salt is
used to obfuscate the `sub` value.

To enable the `pairwise` algorithm, run this command:

```shell
ory patch oauth2-config $PROJECT_ID \
  --replace "/oidc/subject_identifiers/supported_types=[\"pairwise\"]" \
  --replace "/oidc/subject_identifiers/pairwise/salt=\"{16-character-long-salt}\""
```

:::warning

Don't change the salt value once it's set in production. When you change the salt, all client applications receive new user IDs
from Ory. This can cause serious complications with authentication in your system.

:::

Each OAuth 2.0 client has a `subject_type` configuration field that can take a `public` or `pairwise` value. If the identifier
algorithm is enabled, Ory automatically chooses the right strategy.

While Ory handles `sub` obfuscation out of the box, you can also override this value with your own obfuscated `sub` value by
setting `force_subject_identifier` when accepting the login request in your custom OAuth2 login app.

## Using 'login_hint' with a different subject

If a user has already logged in with a subject (for example, "user-A"), and she wants to log in as another user using `login_hint`
(for example, `login_hint=user-B`), directly accepting the latter login request in your login provider will cause an error:

```text
Subject from payload doesn't match subject from previous authentication
```

To solve this issue, follow these steps:

1. [Get the OAuth 2.0 Login Request](../../reference/api#tag/oAuth2/operation/getOAuth2LoginRequest).
2. Make sure that `subject` and `login_hint` aren't empty and don't point to the same user.
3. If they point to different users, redirect the browser to `request_url` and append `?prompt=login`.
4. Ory restarts the flow and ignores existing authentication which allows your login provider to log in a different subject.
