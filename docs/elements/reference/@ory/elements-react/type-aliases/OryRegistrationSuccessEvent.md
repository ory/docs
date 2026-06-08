# OryRegistrationSuccessEvent

```ts
type OryRegistrationSuccessEvent = {
  flow: RegistrationFlow
  flowType: FlowType.Registration
  identity: Identity
  method: string
  session?: Session
}
```

Event fired after a successful registration, before the redirect.

## Properties

### flow

```ts
flow: RegistrationFlow
```

---

### flowType

```ts
flowType: FlowType.Registration
```

---

### identity

```ts
identity: Identity
```

---

### method

```ts
method: string
```

---

### session?

```ts
optional session: Session;
```
