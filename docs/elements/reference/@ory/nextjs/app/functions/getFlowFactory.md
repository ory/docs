# getFlowFactory()

```ts
function getFlowFactory<T>(
  params: QueryParams,
  fetchFlowRaw: () => Promise<ApiResponse<T>>,
  flowType: FlowType,
  baseUrl: string,
  route: string,
  options: {
    disableRewrite?: boolean
  },
): Promise<null | void | T>
```

A function that creates a flow fetcher. The flow fetcher can be used to fetch a login, registration, recovery, settings, or
verification flow from the SDK.

Unless you are building something very custom, you will not need this method. Use it with care and expect potential breaking
changes.

## Type Parameters

| Type Parameter         |
| ---------------------- |
| `T` _extends_ `object` |

## Parameters

| Parameter                 | Type                                    | Description                                    |
| ------------------------- | --------------------------------------- | ---------------------------------------------- |
| `params`                  | `QueryParams`                           | The query parameters of the request.           |
| `fetchFlowRaw`            | () => `Promise`\<`ApiResponse`\<`T`\>\> | A function that fetches the flow from the SDK. |
| `flowType`                | `FlowType`                              | The type of the flow.                          |
| `baseUrl`                 | `string`                                | The base URL of the application.               |
| `route`                   | `string`                                | The route of the application.                  |
| `options`                 | \{ `disableRewrite?`: `boolean`; \}     | Additional options.                            |
| `options.disableRewrite?` | `boolean`                               | -                                              |

## Returns

`Promise`\<`null` \| `void` \| `T`\>
