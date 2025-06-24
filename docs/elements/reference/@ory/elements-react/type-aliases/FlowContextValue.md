# FlowContextValue

```ts
type FlowContextValue = OryFlowContainer & {
  dispatchFormState: Dispatch<FormStateAction>
  formState: FormState
  setFlowContainer: FlowContainerSetter
}
```

The return value of the OryFlowContext.

## Type declaration

| Name                | Type                                                          | Description                                 |
| ------------------- | ------------------------------------------------------------- | ------------------------------------------- |
| `dispatchFormState` | `Dispatch`\<[`FormStateAction`](FormStateAction.md)\>         | Dispatch function to update the form state. |
| `formState`         | [`FormState`](FormState.md)                                   | The current form state. **See** FormState   |
| `setFlowContainer`  | [`FlowContainerSetter`](../interfaces/FlowContainerSetter.md) | Function to set the flow container.         |
