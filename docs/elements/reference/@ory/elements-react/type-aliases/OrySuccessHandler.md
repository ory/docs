# OrySuccessHandler()

```ts
type OrySuccessHandler = (event: OrySuccessEvent) => void | Promise<void>
```

Callback invoked on a successful flow submission. Returning a `Promise` delays the default behavior (redirect, flow update) until
the promise resolves.

## Parameters

| Parameter | Type                                    |
| --------- | --------------------------------------- |
| `event`   | [`OrySuccessEvent`](OrySuccessEvent.md) |

## Returns

`void` \| `Promise`\<`void`\>
