# OryValidationErrorEvent

```ts
type OryValidationErrorEvent =
  | {
      flow: LoginFlow
      flowType: FlowType.Login
    }
  | {
      flow: RegistrationFlow
      flowType: FlowType.Registration
    }
  | {
      flow: VerificationFlow
      flowType: FlowType.Verification
    }
  | {
      flow: RecoveryFlow
      flowType: FlowType.Recovery
    }
  | {
      flow: SettingsFlow
      flowType: FlowType.Settings
    }
```

Discriminated union of validation error events. Each variant carries the updated flow object. Consumers extract messages from
`flow.ui` themselves.
