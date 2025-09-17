# FormState

```ts
type FormState =
  | {
      current: "select_method"
    }
  | {
      current: "provide_identifier"
    }
  | {
      current: "method_active"
      method: UiNodeGroupEnum
    }
  | {
      current: "success_screen"
    }
  | {
      current: "settings"
    }
```

Represents the state of the form based on the flow type and active method. This type is used to determine which part of the form
should be displayed.

It can be one of the following:

- `select_method`: The user is selecting an authentication method.
- `provide_identifier`: The user is providing an identifier (e.g., email or username).
- `method_active`: An authentication method is active, and the user is interacting with it.
- `success_screen`: The flow has successfully completed (only used in the verification flow).
- `settings`: The user is in the settings flow.
