# OryRecoverySuccessEvent

```ts
type OryRecoverySuccessEvent = {
  flow: RecoveryFlow
  flowType: FlowType.Recovery
  method: string
}
```

Event fired after a successful recovery submission.

This fires when the server accepts the recovery form (e.g., a code or email was submitted). The user may still need to complete
additional steps.

## Properties

### flow

```ts
flow: RecoveryFlow
```

---

### flowType

```ts
flowType: FlowType.Recovery
```

---

### method

```ts
method: string
```
