# OnSubmitHandlerProps\<T\>

```ts
type OnSubmitHandlerProps<T> = {
  body: T
  onError?: OryErrorHandler
  onRedirect: OnRedirectHandler
  onSuccess?: OrySuccessHandler
  onValidationError?: OryValidationErrorHandler
  setFlowContainer: (flowContainer: OryFlowContainer) => void
}
```

Props for the submit handler

## Type Parameters

| Type Parameter                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T` _extends_ \| `UpdateLoginFlowBody` \| `UpdateRegistrationFlowBody` \| `UpdateVerificationFlowBody` \| `UpdateRecoveryFlowBody` \| `UpdateSettingsFlowBody` |

## Properties

### body

```ts
body: T
```

The form values to submit.

---

### onError?

```ts
optional onError: OryErrorHandler;
```

Optional callback invoked on infrastructure or flow-level errors (expired flow, CSRF, not found, replaced). Awaited if it returns
a Promise.

---

### onRedirect

```ts
onRedirect: OnRedirectHandler
```

This method is used to redirect the user to a different page.

---

### onSuccess?

```ts
optional onSuccess: OrySuccessHandler;
```

Optional callback invoked after a successful submission, before the default behavior (redirect, flow update). Awaited if it
returns a Promise.

---

### onValidationError?

```ts
optional onValidationError: OryValidationErrorHandler;
```

Optional callback invoked when the server returns validation errors. Awaited if it returns a Promise.

---

### setFlowContainer()

```ts
setFlowContainer: (flowContainer: OryFlowContainer) => void;
```

This method is used to update the flow container when a validation error occurs, for example.

#### Parameters

| Parameter       | Type                                      |
| --------------- | ----------------------------------------- |
| `flowContainer` | [`OryFlowContainer`](OryFlowContainer.md) |

#### Returns

`void`
