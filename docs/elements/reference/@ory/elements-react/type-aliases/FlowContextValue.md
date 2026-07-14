# FlowContextValue

```ts
type FlowContextValue = OryFlowContainer & {
  dispatchFormState: Dispatch<FormStateAction>
  formState: FormState
  onError?: OryErrorHandler
  onSuccess?: OrySuccessHandler
  onValidationError?: OryValidationErrorHandler
  setFlowContainer: FlowContainerSetter
  transientPayload?: OryTransientPayload
}
```

The return value of the OryFlowContext.

## Type declaration

| Name                 | Type                                                          | Description                                                        |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| `dispatchFormState`  | `Dispatch`\<[`FormStateAction`](FormStateAction.md)\>         | Dispatch function to update the form state.                        |
| `formState`          | [`FormState`](FormState.md)                                   | The current form state. **See** FormState                          |
| `onError?`           | [`OryErrorHandler`](OryErrorHandler.md)                       | Optional callback invoked when a flow error occurs.                |
| `onSuccess?`         | [`OrySuccessHandler`](OrySuccessHandler.md)                   | Optional callback invoked on successful flow completion.           |
| `onValidationError?` | [`OryValidationErrorHandler`](OryValidationErrorHandler.md)   | Optional callback invoked when the flow returns validation errors. |
| `setFlowContainer`   | [`FlowContainerSetter`](../interfaces/FlowContainerSetter.md) | Function to set the flow container.                                |
| `transientPayload?`  | [`OryTransientPayload`](OryTransientPayload.md)               | Optional transient payload to include in flow submissions.         |
