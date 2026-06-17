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
  | {
      group: UiNodeGroupEnum
      type: "form_input_loading"
    }
  | {
      input: UiNodeGroupEnum
      type: "form_input_ready"
    }
  | {
      type: "form_submit_start"
    }
  | {
      type: "form_submit_end"
    }
  | {
      type: "page_redirect"
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

```ts
{
  group: UiNodeGroupEnum
  type: "form_input_loading"
}
```

| Name    | Type                   | Description                                                                                                                                                                  |
| ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `group` | `UiNodeGroupEnum`      | The input group that is loading.                                                                                                                                             |
| `type`  | `"form_input_loading"` | Action to indicate that an input group is loading. This action is dispatched when the specified input is in the process of loading, and it sets the form state to not ready. |

```ts
{
  input: UiNodeGroupEnum
  type: "form_input_ready"
}
```

| Name    | Type                 | Description                                                                                                                                                     |
| ------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | `UiNodeGroupEnum`    | The input group that is ready.                                                                                                                                  |
| `type`  | `"form_input_ready"` | Action to indicate that the input group is ready. This action is dispatched when the specified input has finished loading, and it sets the form state to ready. |

```ts
{
  type: "form_submit_start"
}
```

| Name   | Type                  | Description                                                                                                                                            |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type` | `"form_submit_start"` | Action to indicate the start of a form submission. This action is dispatched when the user submits the form, and it sets the submitting state to true. |

```ts
{
  type: "form_submit_end"
}
```

| Name   | Type                | Description                                                                                                                                                 |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | `"form_submit_end"` | Action to indicate the end of a form submission. This action is dispatched when the form submission is complete, and it sets the submitting state to false. |

```ts
{
  type: "page_redirect"
}
```

| Name   | Type              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | `"page_redirect"` | Action to indicate that a page redirect is occurring. This action is dispatched when the form submission results in a page redirect (usually after a successful login, etc. to redirect to the main application's URL), and it keeps the submitting state as true, as the next action is a full page unload. This is necessary, to keep submit buttons in a submitting state while the redirect is in progress, to prevent the user accidentally interacting with the page while it's redirecting causing UX issues. |
