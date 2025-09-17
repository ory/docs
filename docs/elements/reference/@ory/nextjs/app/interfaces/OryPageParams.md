# OryPageParams

A utility type that represents the query parameters of a request.

This is needed because Next.js does not expose the query parameters as a tye.

```ts
import { OryPageParams } from "@ory/nextjs/app"

export default async function LoginPage(props: OryPageParams) {
  // props.searchParams is a Promise that resolves to an object with the query parameters
}
```

## Properties

### searchParams

```ts
searchParams: Promise<{
  [key: string]: undefined | string | string[]
}>
```
