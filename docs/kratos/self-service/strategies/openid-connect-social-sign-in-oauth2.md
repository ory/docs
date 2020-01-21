---
id: openid-connect-social-sign-in-oauth2
title: Social Sign In with OpenID Connect and OAuth2
---

## Sign In

Sign In only works when an identity exists for that profile already.
If it does not exist, a registration flow will be performed instead.

## Sign Up

Sign Up on conflict with existing primary identifiers like email:

* Sign Up is dis-allowed and the user is asked to instead log in and then
    link his/her account instead.

## Disabling sign-in/sign-up for specific providers

> Disabling sign in (but e.g. not sign up) for a provider is not yet supported.
