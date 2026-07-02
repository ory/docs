# OrySuccessEvent

```ts
type OrySuccessEvent =
  | OryLoginSuccessEvent
  | OryRegistrationSuccessEvent
  | OryVerificationSuccessEvent
  | OryRecoverySuccessEvent
  | OrySettingsSuccessEvent
  | OryConsentSuccessEvent
```

Discriminated union of all success events emitted by Ory Elements.

Use the `flowType` field to narrow:

```ts
onSuccess={async (event) => {
  if (event.flowType === FlowType.Login) {
    await mixpanel.identify(event.session.identity.id)
  }
}}
```
