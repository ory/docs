# OryLoginSuccessEvent

```ts
type OryLoginSuccessEvent = {
  flow: LoginFlow
  flowType: FlowType.Login
  method: string
  session: Session
}
```

Event fired after a successful login, before the redirect.

`session.identity` contains the authenticated user. Use `session.identity.id` for analytics session stitching (e.g.,
`mixpanel.identify`).

## Properties

### flow

```ts
flow: LoginFlow
```

---

### flowType

```ts
flowType: FlowType.Login
```

---

### method

```ts
method: string
```

---

### session

```ts
session: Session
```
