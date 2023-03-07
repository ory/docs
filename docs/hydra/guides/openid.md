---
id: openid
title: Subject anonymization
---

Ory OAuth2 and OpenID Connect offer two subject identifier algorithms: `public` and `pairwise`. These algorithms are used to
provide a unique identifier for each user that can be used by the clients without revealing the user's identity.

## Public algorithm

The public algorithm is the default algorithm in Ory OAuth2 and OpenID Connect. It provides the same subject value (sub) to all
clients. You can set this algorithm using the Ory CLI:

```shell
ory patch oauth2-config {project.id} \
  --replace "/oidc/subject_identifiers/supported_types=[\"public\"]"
```

## Pairwise algorithm

The `pairwise` algorithm provides a different sub value to each client, ensuring that the clients cannot correlate the user's
activities without permission. To use the `pairwise` algorithm, you must enable it and set
`/oidc/subject_identifiers/pairwise/salt`. This salt is used to obfuscate the `sub` value.

To enable both algorithms, use the following configuration:

```shell
ory patch oauth2-config {project.id} \
  --replace "/oidc/subject_identifiers/supported_types=[\"public\", \"pairwise\"]" \
  --replace "/oidc/subject_identifiers/pairwise/salt=\"{16-character-long-salt}\""
```

:::warning

Do not change the salt value once it is set in production. Changing it will cause all client applications to receive new user IDs
from Ory, which can lead to serious complications with authentication.

:::

Each OAuth 2.0 client has a configuration field called `subject_type`. The value of that `subject_type` is either `public` or
`pairwise`. If the identifier algorithm is enabled, Ory will automatically choose the right strategy.

While Ory handles `sub` obfuscation out of the box, you can also override this value with your own obfuscated sub value by setting
`force_subject_identifier` when accepting the login request in your custom OAuth2 login app.

## Using `login_hint` with a different subject

If a user has already logged in with a subject (for example, user-A), and she wants to log in as another user using `login_hint`
(for example, login_hint=user-B), directly accepting the latter login request in your login provider will cause an error:

```
Subject from payload doesn't match subject from previous authentication
```

To solve this issue, follow these steps:

1. [Get the OAuth 2.0 Login Request](../../reference/api#tag/oAuth2/operation/getOAuth2LoginRequest).
2. Check if both `subject` and `login_hint` are **not empty** and **not the same user**.
3. If they are different, redirect the browser to `request_url` and append `?prompt=login`.

4. Ory will now restart the flow and ignore the existing authentication, allowing your login provider to log in a different
   subject.

In summary, Ory OAuth2 and OpenID Connect offer two subject identifier algorithms to provide unique user IDs to clients while
preserving user privacy. You can enable either one or both algorithms and override the obfuscated `sub` value with your own value.
If you need to log in a different subject using `ogin_hint`, follow the above steps to avoid an error.
