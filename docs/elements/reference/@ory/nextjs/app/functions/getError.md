# getError()

```ts
function getError(searchParams: QueryParams | Promise<QueryParams>): Promise<
  | {
      error: string
      error_description: string
    }
  | FlowError
>
```

Use this method in an app router page to fetch an error from the Ory SDK. This method works with server-side rendering.

## Parameters

| Parameter      | Type                                        | Description                                                                                                                                                                                                                                                    |
| -------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `searchParams` | `QueryParams` \| `Promise`\<`QueryParams`\> | the query params of the request. This can be either the search params from the app router or a promise that resolves to the search params. The promise is useful if you want to fetch the search params from a different source, such as a cookie or a header. |

## Returns

`Promise`\< \| \{ `error`: `string`; `error_description`: `string`; \} \| `FlowError`\>

An object containing the error and error description, or a FlowError object if the error is a flow error. If the error is not a
flow error, the error description will be "An unknown error occurred.".

## Example

```tsx
import { Error as ErrorComponent } from "@ory/elements-react/theme"
import "@ory/elements-react/theme/styles.css"
import { getError, getServerSession, OryPageParams } from "@ory/nextjs/app"

import config from "@/ory.config"

export default async function ErrorPage(props: OryPageParams) {
  const error = await getError(props.searchParams)
  const session = await getServerSession().catch(() => null)

  return <ErrorComponent error={error} config={config} components={{ Card: {} }} session={session ?? undefined} />
}
```
