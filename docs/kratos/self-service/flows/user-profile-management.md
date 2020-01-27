---
id: user-profile-management
title: Profile Management
---

ORY Kratos allows users to update their own profile information using two principal flows:

- Browser-based (easy): This flow works for all applications running on top of a
  browser. Websites, single-page apps, Cordova/Ionic, and so on.
- API-based (advanced): This flow works for native applications like iOS (Swift),
  Android (Java), Microsoft (.NET), React Native, Electron, and others.

This flow does not allow updates of security-sensitive information such as the password, fields associated
with login (e.g. email), fields associated with account recovery (e.g. recovery email address). These fields
must be updated using a separate flow which requires prior security checks.

## Self-Service User Profile Management for Browser Applications

This flow works similar to [User Login](./user-login.md) and [User Registration](./user-registration.md) but does not
support before/after workflows and different strategies.

### Server-Side Browser Applications

This flow will be documented in a future release.

### Client-Side Browser Applications

Because Client-Side Browser Applications do not have access to ORY Kratos' Admin API, they must use the ORY Kratos Public
API instead. The flow for a Client-Side Browser Application is almost the exact same as the one for Server-Side Applications,
with the small difference that `https://example.org/.ory/kratos/public/profiles/requests?request=abcde`
would be called via AJAX instead of making a request to `https://ory-kratos-admin.example-org.vpc/profiles/requests?request=abcde`.

> To prevent brute force, guessing, session injection, and other attacks, it is required that cookies are working
for this endpoint. The cookie set in the initial HTTP request made to `https://example.org/.ory/kratos/public/profiles` MUST
> be set and available when calling this endpoint!

## Self-Service User Profile Management for API Clients

Will be addressed in a future release.
