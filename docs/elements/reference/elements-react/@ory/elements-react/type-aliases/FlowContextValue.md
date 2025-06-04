# FlowContextValue

```ts
type FlowContextValue = OryFlowContainer & {
  dispatchFormState: Dispatch<FormStateAction>;
  formState: FormState;
  setFlowContainer: FlowContainerSetter;
};
```

The return value of the OryFlowContext.

## Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `dispatchFormState` | [`Dispatch`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L1842)\<[`FormStateAction`](FormStateAction.md)\> | Dispatch function to update the form state. |
| `formState` | [`FormState`](FormState.md) | The current form state. **See** FormState |
| `setFlowContainer` | [`FlowContainerSetter`](../interfaces/FlowContainerSetter.md) | Function to set the flow container. |
