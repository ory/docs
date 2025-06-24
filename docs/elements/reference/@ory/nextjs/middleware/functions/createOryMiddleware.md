# createOryMiddleware()

```ts
function createOryMiddleware(options: {
  forceCookieDomain?: string
  forwardAdditionalHeaders?: string[]
  project?: Partial<AccountExperienceConfiguration>
}): (r: NextRequest) => Promise<NextResponse<unknown>>
```

Creates a Next.js middleware function that proxies requests to the Ory SDK.

This middleware function intercepts requests to the Ory SDK and rewrites the URLs if in development mode or on vercel.com domains.

## Parameters

| Parameter                           | Type                                                                                                                                      | Description                                                                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                           | \{ `forceCookieDomain?`: `string`; `forwardAdditionalHeaders?`: `string`[]; `project?`: `Partial`\<`AccountExperienceConfiguration`\>; \} | The Ory configuration to use for the middleware.                                                                                                                  |
| `options.forceCookieDomain?`        | `string`                                                                                                                                  | If you want to force a specific cookie domain, you can set it here.                                                                                               |
| `options.forwardAdditionalHeaders?` | `string`[]                                                                                                                                | By default headers are filtered to forward only a fixed list. If you need to forward additional headers you can use this setting to define them.                  |
| `options.project?`                  | `Partial`\<`AccountExperienceConfiguration`\>                                                                                             | If you want to use a specific project configuration, you can set it here. Make sure to pass the same project configuration that you pass to `@ory/elements-react` |

## Returns

The Ory Next.js middleware function

```ts
(r: NextRequest): Promise<NextResponse<unknown>>;
```

### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `r`       | `NextRequest` |

### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

## Example

```ts title="middleware.ts"
import { createOryMiddleware } from "@ory/elements/nextjs"

export default createOryMiddleware({
  forwardAdditionalHeaders: ["authorization", "x-custom-header"],
  forceCookieDomain: "example.com",
  project: {
    name: "my-project",
  },
})
```
