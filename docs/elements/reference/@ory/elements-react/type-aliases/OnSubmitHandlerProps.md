# OnSubmitHandlerProps\<T\>

```ts
type OnSubmitHandlerProps<T> = {
  body: T
  onRedirect: OnRedirectHandler
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

### onRedirect

```ts
onRedirect: OnRedirectHandler
```

This method is used to redirect the user to a different page.

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
