# useError()

```ts
function useError(params: ParsedUrlQuery): null | OryError
```

Use this hook in a page to fetch an error from the Ory SDK. This hook works with client-side rendering.

## Parameters

| Parameter | Type             | Description                            |
| --------- | ---------------- | -------------------------------------- |
| `params`  | `ParsedUrlQuery` | the `router.query` object from Next.js |

## Returns

`null` \| `OryError`

An object containing the error and error description, or a FlowError object if the error is a flow error. If the error is not a
flow error, the error description will be "An unknown error occurred.".

## Example

```tsx
import { Error as ErrorComponent } from "@ory/elements-react/theme"
import "@ory/elements-react/theme/styles.css"
import { useRouter } from "next/router"

import config from "@/ory.config"
import { useError } from "@ory/nextjs/pages"

export default function ErrorPage() {
  const router = useRouter()

  const error = useError(router.query)

  if (!error) {
    return null
  }

  return (
    <main className="p-4 pb-8 flex items-center justify-center flex-col gap-8 min-h-screen">
      <ErrorComponent error={error} config={config} components={{ Card: {} }} />
    </main>
  )
}
```
