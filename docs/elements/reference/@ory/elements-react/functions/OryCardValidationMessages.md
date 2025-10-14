# `<OryCardValidationMessages />`

```ts
function OryCardValidationMessages(__namedParameters: { hiddenMessageIds?: number[] }): null | Element
```

Renders the [OryFlowComponents.Message.Content](../type-aliases/OryFlowComponents.md#message) component for each message in the
current flow.

See also [useOryFlow](useOryFlow.md)

## Parameters

| Parameter                             | Type                                   | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`                   | \{ `hiddenMessageIds?`: `number`[]; \} | -                                                                                                                                                                                                                                                                                                                                                                                  |
| `__namedParameters.hiddenMessageIds?` | `number`[]                             | An array of message IDs that should be hidden. This is useful for hiding specific messages that are not relevant to the user or are rendered elsewhere. If not provided, the default list of message IDs to hide will be used. **Default** `[1040009, 1060003, 1080003, 1010004, 1010014, 1040005, 1010016, 1010003]` **See** https://www.ory.com/docs/kratos/concepts/ui-messages |

## Returns

`null` \| `Element`
