# Advanced Topics

This guide aims to help setting up a production system with ORY Hydra.

<!-- toc -->

## Mobile Authorization

We have an [excellent blog post](https://www.ory.sh/oauth2-for-mobile-app-spa-browser) on this topic. Read it now!

## OAuth 2.0

### JSON Web Tokens

ORY Hydra supports JSON Web Tokens as Access Tokens. We *discourage you from using this feature for multiple reasons:*

1. It is very new and has not been battle-tested.
2. We believe that JSON Web Tokens can lead to poor security practices.
3. Using this feature disables other features, like the pairwise Subject Identifier Algorithm.

If you still want to use this strategy you can do so by setting environment variable `OAUTH2_ACCESS_TOKEN_STRATEGY=jwt`.

Be aware that only access tokens are formatted as JSON Web Tokens. Refresh tokens are not impacted by this strategy.
By performing OAuth 2.0 Token Introspection you can check if the token is still valid. If a token is revoked or otherwise
blacklisted, the OAuth 2.0 Token Introspection will return `{ "active": false }`. This is useful when you do not want
to rely only on the token's expiry.

## OpenID Connect

### Subject Identifier Algorithms

Hydra supports two [Subject Identifier Algorithms](http://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes):

* `public`: This provides the same `sub` (subject) value to all Clients (default).
* `pairwise`: This provides a different `sub` value to each Client, so as not to enable Clients to
correlate the End-User's activities without permission.

You can enable either one or both algorithms using the `OIDC_SUBJECT_TYPES_SUPPORTED` environment variable:

* `export IDC_SUBJECT_TYPES_SUPPORTED=public` (default)
* `export IDC_SUBJECT_TYPES_SUPPORTED=pairwise`
* `export IDC_SUBJECT_TYPES_SUPPORTED=public,pairwise`

If `pairwise` is enabled, you must also set the environment variable `OIDC_SUBJECT_TYPE_PAIRWISE_SALT`. The salt
is used to obfuscate the `sub` value.

**This value should not be changed once set in production. Changing it will cause all client applications
to receive new user IDs from ORY Hydra which will lead to serious complications with authentication on their side!**

Each OAuth 2.0 Client has a configuration field `subject_type`. The value of that `subject_type` is either `public` or
`pairwise`. If the mode is enabled by `IDC_SUBJECT_TYPES_SUPPORTED`, then ORY Hydra will choose the right strategy automatically.

While ORY Hydra handles `sub` obfuscation out of the box, you may also override this value with your own obfuscated
`sub` value by setting `force_subject_identifier` when accepting the login challenge in your user login app.
