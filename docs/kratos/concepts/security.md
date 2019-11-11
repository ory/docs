---
id: index
title: Security
---

There is no one standard to digital identity. There are however [Digital Identity Guidelines established by the National Institute
of Standards and Technology (NIST)](https://pages.nist.gov/800-63-3/) (and a follow-up [FAQ](https://pages.nist.gov/800-63-3/))
which ORY Kratos follows closely.

In the first section we will discuss what guidelines ORY Kratos implements and how, and then take a look at competing
products and projects.

## Digital Identity Guidelines

**TBD**

## Avoiding OAuth2 and OpenID Connect

## Comparison

In this section we compare security practices with other systems. Please be aware that this is not a complete
list and that we might have missed things others have implemented that make their systems more secure. Feel
free to extend this list or create an issue if you feel we can improve on of our security components.

### Okta for Developers

#### OAuth2 and OpenID Connect

Okta exclusively uses OAuth2 and OpenID Connect as the only mechanism to retrieve credentials.
For more details check section [Avoiding OAuth2 and OpenID Connect](#avoiding-oauth2-openid-connect) above.

#### Password Policy

*This needs to be confirmed* - I believe Okta does not use HIBP to verify if passwords have been leaked or not? Their
password policy allows (in regular Okta):

- Password complexity: Bad - see NIST guidelines
- Password expiration: Bad - see NIST guidelines
- Password minimum age: Bad - see nist guidelines

Okta developers: https://developer.okta.com/docs/reference/api/policy/#password-policy

#### Password reset using security questions

Okta for developers uses ["security questions"](https://devforum.okta.com/t/forgot-password-flow-is-it-possible-to-skip-security-question/4928/1)
for password reset flows. Disabling this feature requires (in April 2019) enabling a hidden feature flag through Okta Support
and deselecting a box in the Admin UI.

NIST deems security question unacceptable for proof of authentication:

> Knowledge-based authentication, where the claimant is prompted to answer questions that are presumably known only
> by the claimant, also does not constitute an acceptable secret for digital authentication.
>
> https://pages.nist.gov/800-63-FAQ/#q-b15

Security questions have been used in high-profile dataleaks including the
[iCloud leaks of celebrety fotos (aka "The Fappening")](https://en.wikipedia.org/wiki/ICloud_leaks_of_celebrity_photos).

### Auth0

#### OAuth2 and OpenID Connect

Okta exclusively uses OAuth2 and OpenID Connect as the only mechanism to retrieve credentials.
For more details check section [Avoiding OAuth2 and OpenID Connect](#avoiding-oauth2-openid-connect) above.

#### Account linking and updating credentials

Auth0 supports [account linking](https://auth0.com/docs/link-accounts) which was
[recently updated (Nov 2019)](https://auth0.com/docs/migrations/guides/account-linking) because
the API accepted ID Tokens (proof of Authentication) as proof of Authorization (*why god why?*).

One major issue with Auth0's implementation is that no immediate proof of authentication is required. This
is problematic as highlighted in the Stack Overflow discussion
[Why do we ask for a user's existing password when changing their password?](https://security.stackexchange.com/questions/24291/why-do-we-ask-for-a-users-existing-password-when-changing-their-password):

> If a user leaves their computer unattended for a few minutes (while logged in), we don't want someone else to be able
>to walk by and quickly change their password. For one thing, this would allow the attacker to change the associated
>email address, too, and now the legitimate owner is never getting his/her account back.

Google Account, GitHub, and others always require to verify that you're you by requesting another sign in before
revealing the, for example, "Change my password" UI.

While Auth0 requires a "confirm password" field, they do not have a similar mechanism for linking additional credentials
such as another Google account. This is obviously problematic because:

> If a user leaves their computer unattended for a few minutes (while logged in), we don't want someone else to be able
> to walk by and quickly use **their personal Facebook as a legitimate proof of authentication by "linking" the accounts**.

ORY Kratos however **always requires proof of authentication with proof of (implicit) intent** by requiring the identity
to confirm they are still the ones in front of the screen. By asking the identity to login in again for the sole purpose
of changing the password, both intent and authenticity of the request are confirmed.
