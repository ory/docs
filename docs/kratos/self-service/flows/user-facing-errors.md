---
id: user-facing-errors
title: User-facing errors
---

Because Ory Kratos doesn't render User Interfaces, we implemented a flow that allows you to implement the error page in any way
you want.

## User-facing errors in the browser

When a user-facing error occurs for example during Self Service User Login, Ory Kratos will store error message and context and
redirect the User's Browser to the Error UI URL set by the `selfservice.flows.error.ui_url` configuration or
`SELFSERVICE_FLOWS_ERROR_UI_URL` environment variable.

Assuming `selfservice.flows.error.ui_url` is set to `https://example.org/errors`, Ory Kratos will redirect the User's Browser to
`https://example.org/errors?id=abcde`.

The route matching `https://example.org/errors` uses the `error` URL Query parameter value `abcde` to make a request to Ory
Kratos' Public or Admin API `https://kratos-<public|admin>/self-service/errors?id=abcde`. The JSON Response contains a list of
errors and their details, for example:

```json
[
  {
    "code": 500,
    "message": "no such file or directory"
  }
]
```

We're working on documenting possible error messages and homogenize error layouts. Errors have the following keys defined:

```json
{
  "code": 500,
  "message": "some message",
  "reason": "some reason",
  "debug": "some debug info"
}
```

## User-facing errors when consuming APIs

When a user-facing error occurs and the HTTP client is an API Client (for example a mobile app), the error will be returned as the
HTTP Response. No additional steps are required.

## Error reference

When a self-service flow rejects a request, the response status and body together identify the failure. This section is a lookup for the errors you hit most often, grouped by where they originate: session enforcement, self-service flows, OAuth2, hook callouts, network plumbing, and rate limits.

Each row lists the symptom you see, the HTTP status, the OAuth2 or Ory Kratos identifier (when one applies), the error catalog code (`4xxxxxx`, when one applies), and a one-line cause and resolution. The catalog column is `—` for OAuth2 errors and for infrastructure responses such as CORS, custom domains, and rate limiting — Ory Kratos produces those outside its validation catalog. To look up a `4xxxxxx` code from a JSON response, use the [error catalog appendix](#error-catalog-code-appendix), which maps every code to its identifier and message.

For how Ory Kratos surfaces errors to the browser and to API clients, see the sections above.

### Session and whoami

These errors occur during `/sessions/whoami` or any endpoint that requires an authenticated session. The 403 response is the dominant signal — the same HTTP status carries several distinct causes.

| # | Symptom | HTTP | Identifier | Catalog | Cause | Resolution | Related |
|---|---|---|---|---|---|---|---|
| A1 | `whoami` returns 403, no body visible to browser | 403 | — | — | The session cookie didn't reach Ory Kratos. This is usually a domain-scope mismatch between the cookie and the API origin, or an expired session. | Verify `cookies.domain` matches the public API host. Re-authenticate and check the new session lifespan to confirm the session hasn't expired. | session lifespan, cookie domain |
| A2 | `whoami` 403 with `Ory-Session-Edge-Status: MISS`, missing `Access-Control-Allow-Origin` | 403 | — | — | The edge node couldn't find a valid session cookie — often because the cookie domain doesn't match the custom domain, or CORS headers aren't configured for cross-origin requests. | Set `cookies.domain` to the correct top-level domain. For custom domains, configure CORS on the reverse proxy or CDN to include `Access-Control-Allow-Origin` for the API origin. | cookie domain, custom-domain CORS |
| A3 | Settings flow rejected — privileged session required | 403 | — | — | The session doesn't satisfy the privileged-session requirement: the last authentication happened too long ago relative to `selfservice.flows.settings.privileged_session_max_age`. | Re-authenticate (sign in or verify) to get a fresh privileged session, or increase `selfservice.flows.settings.privileged_session_max_age` if a longer window is acceptable. | `selfservice.flows.settings.privileged_session_max_age` |
| A4 | AAL too low — needs step-up | 403 | — | — | The current Authentication Assurance Level (AAL) is below the minimum the flow requires (set via `selfservice.flows.*.required_aal`). The session was established at AAL1 and the flow requires AAL2. The 403 body carries a `redirect_browser_to` field pointing at the step-up login flow. | Perform a step-up authentication: follow the `redirect_browser_to` URL from the 403 body, or start a fresh login flow with `aal=aal2` — `GET /self-service/login/browser?aal=aal2` for browser clients, `GET /self-service/login/api?aal=aal2` for API clients — and complete the MFA challenge to raise the session AAL. If AAL2 isn't actually required, lower `selfservice.flows.*.required_aal` for the flow. | MFA config, AAL2 reference |
| A5 | CSRF check failed on browser POST | 403 / 400 | `security_csrf_violation` | — | The CSRF token was missing, expired, or didn't match — commonly from a cookie-domain mismatch, a public-suffix domain, or a cross-origin request where the CSRF cookie wasn't forwarded. | Verify `cookies.domain` is set correctly and isn't a public-suffix domain. Make sure the request includes the CSRF cookie from the same origin that issued the flow. See [CSRF troubleshooting](../../debug/csrf.mdx) for detailed diagnostics. | `cookies.domain`, CSRF troubleshooting |

### Self-service flow errors

These errors come from the Ory Kratos validation catalog when a login, registration, or settings flow can't proceed. Most are time-window failures (the flow expired) or input conflicts.

| # | Symptom | HTTP | Identifier | Catalog | Cause | Resolution | Related |
|---|---|---|---|---|---|---|---|
| B1 | Login flow expired (re-render) | 410 / 400 | `ErrorValidationLoginFlowExpired` | 4010001 | The login flow exceeded `selfservice.flows.login.lifespan`. Ory Kratos returns 410 Gone for browser flows and 400 for API flows. Literal message: "The login flow expired X.XX minutes ago, please try again." | Start a new login flow (`GET /self-service/login/browser` for browser, `GET /self-service/login/api` for API). Increase `selfservice.flows.login.lifespan` if a longer window is appropriate. | flow lifespan config |
| B2 | Registration flow expired | 410 / 400 | `ErrorValidationRegistrationFlowExpired` | 4040001 | The registration flow exceeded `selfservice.flows.registration.lifespan`, with the same 410/400 split as the login flow. Literal message: "The registration flow expired X.XX minutes ago, please try again." | Start a new registration flow (`GET /self-service/registration/browser` or `GET /self-service/registration/api`). Increase `selfservice.flows.registration.lifespan` if needed. | flow lifespan config |
| B3 | Identifier already exists during registration | 409 | — | — | The email, phone number, or other identifier being registered already belongs to an existing identity — commonly from a prior registration, an identity import, or an OIDC link. | Direct the user to the login flow instead. If the duplicate came from an identity import, audit the identity store and deduplicate before re-importing. | identity import, dedup |
| B4 | `updateSettingsFlow` returns 422 — browser location change required (not AAL) | 422 | `browser_location_change_required` | — | The settings flow needs the browser to navigate to a third-party URL (typically an OIDC step-up), but the request came over the API without browser context. The 422 is a redirect signal, not an authentication-level failure. | For browser clients, follow the `redirect_browser_to` URL in the response body. For API or mobile clients, surface the URL to the user and let them complete the redirect in a browser. Note: privileged-session and AAL failures use 403, not 422 — don't conflate them. | settings-flow docs |
| B5 | Settings flow expired | 410 / 400 | `ErrorValidationSettingsFlowExpired` | 4050001 | The settings flow exceeded `selfservice.flows.settings.lifespan`, with the same 410/400 split as login and registration. Literal message: "The settings flow expired X.XX minutes ago, please try again." | Start a new settings flow (`GET /self-service/settings/browser` or `GET /self-service/settings/api`). | flow lifespan config |

### OAuth2 and OIDC

These are OAuth2 errors emitted by Ory Hydra. They aren't in the Ory Kratos catalog and use the OAuth2 RFC 6749 / RFC 7662 error names.

| # | Symptom | HTTP | Identifier | Catalog | Cause | Resolution | Related |
|---|---|---|---|---|---|---|---|
| C1 | Refresh token rejected as `invalid_grant` after client network timeout | 400 | `invalid_grant` | — | The refresh token expired, was already used (rotation enabled), or arrived after a client-side timeout that triggered a retry with a stale token. | Check that the refresh token hasn't expired (`exp` claim). With rotation enabled, make sure only one process consumes the token at a time. Increase the client-side timeout and use idempotent retries. | refresh-token rotation, timeout config |
| C2 | Empty POST body to `/admin/oauth2/introspect` | 400 | `invalid_request` | — | The introspection request lacked the required `token` parameter in the form-encoded POST body, per RFC 7662. Common when an upstream proxy drops the body or the client never serializes it. | Send `token=<value>` form-encoded in the POST body. If Ory Oathkeeper is the caller, verify the introspection authenticator is configured correctly. | Oathkeeper introspection config |
| C3 | Client auth failed (secret doesn't match, or unknown client) | 401 | `invalid_client` | — | The OAuth2 client ID is unknown, the client secret doesn't match, or the authentication method (`client_secret_post` vs `client_secret_basic`) differs from how credentials are sent. | Verify the client ID and secret against the OAuth2 client registry. Make sure the client's `token_endpoint_auth_method` matches how the integrator sends credentials. Rotate the secret if you suspect a compromise. | OAuth2 client credentials |
| C4 | Token-hook callout returned 5xx | 5xx → `server_error` | `server_error` | — | A configured OAuth2 token hook (`oauth2.token_hook` for token issuance, `oauth2.refresh_token_hook` for the refresh grant) returned a non-2xx response, which Ory Hydra surfaces to the client as a generic `server_error`. A `403` from the hook is the exception — it maps to `access_denied`, an intentional deny; any other non-2xx, including 5xx, becomes `server_error`. The hook service is usually down, timing out, or returning unexpected JSON. | Check the health and logs of the token-hook service. Verify the hook URL under `oauth2.token_hook` / `oauth2.refresh_token_hook` is reachable and that the request payload matches the hook's contract. Add a circuit breaker on the hook side to prevent cascading failures. | Hydra token-hook configuration (`oauth2.token_hook`) |

### Self-service callouts and hooks

These errors occur when a configured webhook or hook fails during a self-service flow. They surface as HTTP errors to the end client even though the underlying problem is in the customer-controlled webhook target.

| # | Symptom | HTTP | Identifier | Catalog | Cause | Resolution | Related |
|---|---|---|---|---|---|---|---|
| D1 | Registration submission returns 502 because the pre-registration webhook returned 403 | 502 | — | — | A pre-registration webhook responded with a non-2xx status, commonly 403. With `can_interrupt: true` on the hook, Ory Kratos aborts the registration and returns a 502. Browsers may also show a CORS error, since the 502 response lacks `Access-Control-Allow-Origin`. | Check the webhook endpoint's logs for why it returned 403 — typically an auth misconfiguration between Ory Kratos and the webhook target. To let registration proceed despite the webhook error, set `can_interrupt: false` on the hook. | webhook debugging, hook abort behavior |
| D2 | Webhook fired but never logged — no diagnostic trail | varies | — | — | Webhook delivery outcomes don't appear in the default operator UI. Without log inspection on the receiving side, you can't confirm whether the webhook reached its target or what it returned. | Enable verbose logging on the receiving webhook service (request body, headers, response code). On Ory Network, check the project event log for the self-service flow ID — successful webhook calls appear there as `hook_executed` entries. | webhook logging, retry policy |
| D3 | Hook chain aborted by a single failure | varies | — | — | When a hook in a chain is configured with `can_interrupt: true`, a non-2xx response from that hook stops the whole chain and aborts the flow. Later hooks in the chain don't run. | If the hooks are independent and should run regardless of each other's outcome, set `can_interrupt: false` on the non-critical ones. Reserve `can_interrupt: true` for hooks whose failure should block the flow, such as compliance gates. | hook-chain config, `can_interrupt` semantics |

### Network and project plumbing

These errors come from Ory Network infrastructure — custom domains, the API gateway, and edge nodes — rather than from Ory Kratos or Ory Hydra directly.

| # | Symptom | HTTP | Identifier | Catalog | Cause | Resolution | Related |
|---|---|---|---|---|---|---|---|
| E1 | Custom domain returns 404 — *"The requested host is not associated with any Ory Network Project"* | 404 | — | — | The custom domain isn't fully provisioned and bound to an Ory Network project. Either the DNS CNAME hasn't propagated, or the domain isn't activated in the project settings. | Verify the custom domain is added in Ory Console and that the required CNAME record points to the assigned Ory subdomain. Wait for DNS propagation — typically minutes to an hour — before retrying. See the custom-domain setup guide for the full activation sequence. | custom-domain setup |
| E2 | Admin API returns 401 with a valid-looking API key | 401 | — | — | The API key is valid but the wrong type for the resource. Ory Network has two kinds: a Project API Key (prefix `ory_pat_`) scoped to a single project, and a Workspace API Key (prefix `ory_wak_`) scoped to the workspace. A workspace key can't make project-level identity, session, or OAuth2 Admin API calls, and a project key can't perform workspace-level admin. | Check which key type you're using by its prefix. Generate the correct one in Ory Console: **Project → API Keys** (`ory_pat_`) for identity, session, and OAuth2 Admin API calls, or **Workspace → Settings → API keys** (`ory_wak_`) for workspace-level admin. | Project vs Workspace API keys |
| E3 | Browser request rejected — `431 Request Header Fields Too Large` | 431 | — | — | The combined Cookie header exceeds the server's header-size limit. This is most often caused by a too-broad `cookies.domain` that leaks parent-domain cookies into every subdomain request. | Scope `cookies.domain` to the specific subdomain in use, not the apex. Audit which apps set cookies on shared parent domains and tighten their `Domain=` attributes. | cookie domain |

### Rate limiting

| # | Symptom | HTTP | Identifier | Catalog | Cause | Resolution | Related |
|---|---|---|---|---|---|---|---|
| F1 | 429 from permission checks under load | 429 | — | — | The project or workspace exceeded its allocated request rate for the endpoint. Ory Network applies rate limits per project; workspace-level limits are an aggregate of all projects in the workspace. | Add exponential backoff with jitter in the calling client. Review the rate limit for your plan and consider an upgrade if it binds legitimate load. Cache permission-check responses where the underlying authorization rules allow. | rate-limit scope, retry strategy |

## Error catalog code appendix

Use this appendix when you hit a 7-digit catalog code in an Ory Kratos JSON error response and want to look up its meaning. Codes follow the flow type: login is `401xxxx`, registration is `404xxxx`, settings is `405xxxx`, recovery is `406xxxx`, and verification is `407xxxx`. The text strings here are the literal `Text:` values from the Ory Kratos source as of this catalog snapshot — message context such as `expired_at` or address values may be templated into the text at runtime.

### Login (4010xxx)

| Code | Identifier | Message |
|---|---|---|
| 4010000 | `ErrorValidationLogin` | _(dynamic — context-dependent)_ |
| 4010001 | `ErrorValidationLoginFlowExpired` | "The login flow expired X minutes ago, please try again." |
| 4010002 | `ErrorValidationLoginNoStrategyFound` | "Could not find a strategy to log you in with. Did you fill out the form correctly?" |
| 4010003 | `ErrorValidationRegistrationNoStrategyFound` | "Could not find a strategy to register you with. Did you fill out the form correctly?" |
| 4010004 | `ErrorValidationSettingsNoStrategyFound` | "Could not find a strategy to update your settings with. Did you fill out the form correctly?" |
| 4010005 | `ErrorValidationRecoveryNoStrategyFound` | "Could not find a strategy to recover your account with." |
| 4010006 | `ErrorValidationVerificationNoStrategyFound` | "Could not find a strategy to verify your address with." |
| 4010007 | `ErrorValidationLoginRetrySuccess` | "The request was already completed successfully and can not be retried." |
| 4010008 | `ErrorValidationLoginCodeInvalidOrAlreadyUsed` | "The login code is invalid or has already been used. Please try again." |
| 4010009 | `ErrorValidationLoginLinkedCredentialsDoNotMatch` | "Linked credentials do not match." |
| 4010010 | `ErrorValidationLoginAddressUnknown` | "The address you entered does not match any known addresses in the current account." |
| 4010011 | `ErrorValidationIdentityDisabled` | "This account has been disabled. Please contact support for assistance." |

### Registration (4040xxx)

| Code | Identifier | Message |
|---|---|---|
| 4040001 | `ErrorValidationRegistrationFlowExpired` | "The registration flow expired X minutes ago, please try again." |
| 4040002 | `ErrorValidateionRegistrationRetrySuccess` *(typo preserved from source)* | "The request was already completed successfully and can not be retried." |
| 4040003 | `ErrorValidationRegistrationCodeInvalidOrAlreadyUsed` | "The registration code is invalid or has already been used. Please try again." |

### Settings (4050xxx)

| Code | Identifier | Message |
|---|---|---|
| 4050001 | `ErrorValidationSettingsFlowExpired` | "The settings flow expired X minutes ago, please try again." |
| 4050002 | `ErrorValidationSettingsTooManyAddressChanges` | "You can only change one address at a time. Please update each address separately." |

### Recovery (4060xxx)

| Code | Identifier | Message |
|---|---|---|
| 4060000 | `ErrorValidationRecovery` | _(dynamic — context-dependent)_ |
| 4060001 | `ErrorValidationRecoveryRetrySuccess` | "The request was already completed successfully and can not be retried." |
| 4060002 | `ErrorValidationRecoveryStateFailure` | "The recovery flow reached a failure state and must be retried." |
| 4060003 | `ErrorValidationRecoveryMissingRecoveryToken` | _(dynamic — context-dependent)_ |
| 4060004 | `ErrorValidationRecoveryTokenInvalidOrAlreadyUsed` | "The recovery token is invalid or has already been used. Please retry the flow." |
| 4060005 | `ErrorValidationRecoveryFlowExpired` | "The recovery flow expired X minutes ago, please try again." |
| 4060006 | `ErrorValidationRecoveryCodeInvalidOrAlreadyUsed` | "The recovery code is invalid or has already been used. Please try again." |

### Verification (4070xxx)

| Code | Identifier | Message |
|---|---|---|
| 4070000 | `ErrorValidationVerification` | _(dynamic — context-dependent)_ |
| 4070001 | `ErrorValidationVerificationTokenInvalidOrAlreadyUsed` | "The verification token is invalid or has already been used. Please retry the flow." |
| 4070002 | `ErrorValidationVerificationRetrySuccess` | "The request was already completed successfully and can not be retried." |
| 4070003 | `ErrorValidationVerificationStateFailure` | "The verification flow reached a failure state and must be retried." |
| 4070004 | `ErrorValidationVerificationMissingVerificationToken` | _(dynamic — context-dependent)_ |
| 4070005 | `ErrorValidationVerificationFlowExpired` | "The verification flow expired X minutes ago, please try again." |
| 4070006 | `ErrorValidationVerificationCodeInvalidOrAlreadyUsed` | "The verification code is invalid or has already been used. Please try again." |

## Using stub errors

The error endpoint supports stub errors which can be used to implement your Error UI:

- `?id=stub:500` - returns a stub 500 (Internal Server Error) error.

To call a stub error, simply do:

```sh
curl -s \
  'https://playground.projects.oryapis.com/self-service/errors?id=stub:500' | jq

{
  "id": "9f900efa-a5ea-4dfd-8311-a8c7448ffeec",
  "error": {
    "code": 500,
    "status": "Internal Server Error",
    "reason": "This is a stub error.",
    "message": "An internal server error occurred, please contact the system administrator"
  },
  "created_at": "0001-01-01T00:00:00Z",
  "updated_at": "0001-01-01T00:00:00Z"
}
```
