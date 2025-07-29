# FormStateAction

```ts
type FormStateAction =
  | {
      flow: OryFlowContainer
      type: "action_flow_update"
    }
  | {
      method: UiNodeGroupEnum
      type: "action_select_method"
    }
  | {
      type: "action_clear_active_method"
    }
```

Represents the actions that can be dispatched to update the form state. These actions are used to change the current state of the
form based on user interactions or flow updates.

## Type declaration

```ts
{
  flow: OryFlowContainer
  type: "action_flow_update"
}
```

| Name   | Type                                      | Description                                                                                                                                              |
| ------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flow` | [`OryFlowContainer`](OryFlowContainer.md) | The updated flow container that contains the new flow data.                                                                                              |
| `type` | `"action_flow_update"`                    | Action to update the flow state. This action is dispatched when the flow is updated, and it will parse the new flow to determine the current form state. |

```ts
{
  method: UiNodeGroupEnum
  type: "action_select_method"
}
```

| Name     | Type                     | Description                                                                                                                                                                     |
| -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method` | `UiNodeGroupEnum`        | The authentication method that the user has selected.                                                                                                                           |
| `type`   | `"action_select_method"` | Action to select an authentication method. This action is dispatched when the user selects an authentication method (e.g., password, passkey, etc.) from the available options. |

```ts
{
  type: "action_clear_active_method"
}
```

| Name   | Type                           | Description                                                                                                                                                                    |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type` | `"action_clear_active_method"` | Action to clear the active authentication method. This action is dispatched when the user wants to clear the currently active method and return to the method selection state. |
