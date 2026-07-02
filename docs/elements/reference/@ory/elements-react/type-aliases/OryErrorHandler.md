# OryErrorHandler()

```ts
type OryErrorHandler = (event: OryErrorEvent) => void | Promise<void>
```

Callback invoked on infrastructure or flow-level errors (expired flow, CSRF violation, flow not found, flow replaced).

## Parameters

| Parameter | Type                                |
| --------- | ----------------------------------- |
| `event`   | [`OryErrorEvent`](OryErrorEvent.md) |

## Returns

`void` \| `Promise`\<`void`\>
