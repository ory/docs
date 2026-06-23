# OryValidationErrorHandler()

```ts
type OryValidationErrorHandler = (event: OryValidationErrorEvent) => void | Promise<void>
```

Callback invoked when the server returns validation errors for a form submission.

## Parameters

| Parameter | Type                                                    |
| --------- | ------------------------------------------------------- |
| `event`   | [`OryValidationErrorEvent`](OryValidationErrorEvent.md) |

## Returns

`void` \| `Promise`\<`void`\>
