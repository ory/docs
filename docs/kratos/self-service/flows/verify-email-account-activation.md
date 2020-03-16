---
id: verify-email-account-activation
title: Email and Phone Verification and Account Activation
---

ORY Kratos allows users to verify their out-of-band (email, telephone number,
...) communication channels. Verification can be initiated

- after registration or by performing a verification flow;
- manually by the user.

Currently, ORY Kratos only supports verification of email addresses. Before
sending out a verification E-Mail, ORY Kratos will check if the email address is
already known. Depending on the result, one of the two flows will be executed:

- Unknown email address: An email is sent to the address informing the recipient
  that someone tried to verify this email address but that it is not known by
  the system:
  ![Verification email for unknown address](assets/images/kratos/email-verify-unknown.png)
- Known email address: An email which includes a verification link is sent to
  the address:
  ![Verification email for known address](assets/images/kratos/email-verify-known.png)

This prevents Account Enumeration Attacks at is is not possible for a threat
agent to determine if an account exists or not based on the verification flow.

The emails are using templates that can be customised as explained in
[Customizing E-Mail Templates](../../concepts/email-sms.md#templates). The
template IDs are:

- Unknown email address: `verify_invalid`
- Known email address: `verify_valids`

## Account Activation

Using this feature implements the so-called "account activation" with the difference
that ORY Kratos does not provide a feature that prevents sign in into accounts without
verified addresses. The reason being that verification is proving that the user controls
the given address, but it is not an authentication mechanism.

You may however chose to limit what an identity without verified addresses is able to
do in your application logic or API Gateways.

## Setting Email Verification

You must define at least one Identity Traits field as a verification field. You
can do so by defining the following section in your Identity Traits JSON Schema:

```json5
{
  // ...
  properties: {
    // This could also be an array or any other field name
    email: {
      type: 'string',
      format: 'email',
      'ory.sh/kratos': {
        verification: {
          // Currently, only email is supported
          via: 'email',
        },
      },
    },
  },
  // ...
}
```

You can also combine this with the password strategy login identifier.

```json5
{
  // ...
  properties: {
    // This could also be an array or any other field name
    email: {
      type: 'string',
      format: 'email',
      'ory.sh/kratos': {
        credentials: {
          password: {
            identifier: true,
          },
        },
        verification: {
          // Currently, only email is supported
          via: 'email',
        },
      },
    },
  },
  // ...
}
```

That way, the field `email` (or any field you define with these properties) will
serve as both the login identifier as well as a verifiable email address.

### Verify Email on User Registration

To send an email after user registration, add the following sections to your ORY
Kratos config file:

```yaml
# required
urls:
  # Similar to login_ui or profile_ui, this points to the user interface where the verificaiton
  # user interface is implemented.
  #
  # For more information on this endpoint please head over to the next section
  verify_ui: https://my-kratos-ui/verify

selfservice:
  registration:
    after:
      password:
        # ....
        - job: verify # This sends the verification email after successful registration
        # ....
```

## Self-Service Request or Resend Verification Link for Browser Applications

A user might want to resend a verification link because the link expired or did
not arrive in the inbox.

The flow implementing this feature uses the already established
[Network Flows for Browsers](index.md#network-flows-for-browsers).

### Server-Side Browser Applications

You can find an exemplary implementation for this flow on GitHub:

- [Verification HTTP Route](https://github.com/ory/kratos-selfservice-ui-node/blob/master/src/routes/verify.ts)
- [Verification UI](https://github.com/ory/kratos-selfservice-ui-node/blob/master/views/verify.hbs)

The [Network Flows for Browsers](index.md#network-flows-for-browsers) works as
follows for Email Verification:

1. An initial HTTP Request is made to
   `/self-service/browser/flows/verification/:via`. Currently, only `email` is
   supported as `:via`.
2. ORY Kratos redirects the browser to the URL set in `urls.verify_ui` and
   appends the `request` URL Query Parameter (e.g.
   `https://example.org/verify?request=abcde`).
3. The Endpoint at `/profile` makes a HTTP GET Request to
   `https://ory-kratos-admin.example-org.vpc/self-service/browser/flows/requests/verification?request=abcde`
   and fetches Verification Request JSON Payload that represent the individual
   fields that can be updated.
4. The user fills out the form and sends a HTTP POST request to
   `https://example.org/.ory/kratos/public/self-service/browser/flows/verification/:via/complete?request=abcde`.
   Depending on whether the address is known or not, a `verify_valid` or
   `verify_invalid` message will be sent to the given address.

An exemplary payload for a verification request looks as follows:

```json
{
  "id": "9c3e945c-096a-42ec-8617-caecda9e9263",
  "expires_at": "2020-02-18T16:11:25.3112038Z",
  "issued_at": "2020-02-18T15:11:25.3112824Z",
  "request_url": "http://127.0.0.1:4455/self-service/browser/flows/verification/email",
  "form": {
    "action": "http://127.0.0.1:4455/.ory/kratos/public/self-service/browser/flows/verification/email/complete?request=9c3e945c-096a-42ec-8617-caecda9e9263",
    "method": "POST",
    "fields": [
      {
        "name": "csrf_token",
        "type": "hidden",
        "required": true,
        "value": "fMusJj65BxNtrog/DYryN4sZmuLA85WkbAh4yP9pT1lAQTIAPTVGJTmmLL66Y0HEbIpKEU5gTr5qJoRXHsBoSw=="
      },
      {
        "name": "to_verify",
        "type": "email",
        "required": true
      }
    ]
  },
  "via": "email",
  "success": false
}
```

### Client-Side Browser Applications

Because Client-Side Browser Applications do not have access to ORY Kratos' Admin
API, they must use the ORY Kratos Public API instead. The flow for a Client-Side
Browser Application is almost the exact same as the one for Server-Side
Applications, with the small difference that
`https://example.org/.ory/kratos/public/self-service/browser/flows/requests/verification?request=abcde`
would be called via AJAX instead of making a request to
`https://ory-kratos-admin.example-org.vpc/self-service/browser/flows/requests/verification?request=abcde`.

> To prevent brute force, guessing, session injection, and other attacks, it is
> required that cookies are working for this endpoint. The cookie set in the
> initial HTTP request made to
> `https://example.org/.ory/kratos/public/self-service/browser/flows/verification/:via`
> MUST be set and available when calling this endpoint!
>
> When making AJAX requests from JavaScript, make sure to set
> `{ withCredentials: true }` (name and layout may vary between libraries).

## Email Verification for API Clients

Will be addressed in a future release.
