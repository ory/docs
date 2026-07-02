# OryVerificationSuccessEvent

```ts
type OryVerificationSuccessEvent = {
  flow: VerificationFlow
  flowType: FlowType.Verification
  method: string
}
```

Event fired after a successful verification submission.

This fires when the server accepts the verification form (e.g., a code was submitted). It does not necessarily mean the identity
is verified — check the flow state for that.

## Properties

### flow

```ts
flow: VerificationFlow
```

---

### flowType

```ts
flowType: FlowType.Verification
```

---

### method

```ts
method: string
```
