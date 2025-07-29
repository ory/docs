# ConsentFlow

A flow container for the OAuth2 consent flow

Note: This is a polyfill for the OAuth2 consent flow, which is not yet implemented in the Ory SDK. It tries to mirror the
structure of the other flow containers as closely as possible.

## Properties

### active

```ts
active: "oauth2_consent"
```

The active part of the flow, which is always "oauth2_consent" for this flow.

---

### consent_request

```ts
consent_request: OAuth2ConsentRequest
```

---

### created_at

```ts
created_at: Date
```

When the flow was created.

---

### expires_at

```ts
expires_at: Date
```

When the flow expires.

---

### id

```ts
id: "UNSET"
```

Always "UNSET" as the consent flow does not have a specific ID.

---

### issued_at

```ts
issued_at: Date
```

When the flow was issued.

---

### return_to?

```ts
optional return_to: string;
```

---

### session

```ts
session: Session
```

---

### state

```ts
state: "show_form" | "rejected" | "accepted"
```

The state of the consent flow.

- "show_form": The form is being shown to the user.
- "rejected": The user has rejected the consent request.
- "accepted": The user has accepted the consent request.

---

### ui

```ts
ui: UiContainer
```
