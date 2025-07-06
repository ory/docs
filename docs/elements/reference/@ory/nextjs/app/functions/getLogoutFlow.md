# getLogoutFlow()

```ts
function getLogoutFlow(params: { returnTo?: string }): Promise<LogoutFlow>
```

Use this method in an app router page to create a new logout flow. This method works with server-side rendering.

## Parameters

| Parameter          | Type                         | Description                          |
| ------------------ | ---------------------------- | ------------------------------------ |
| `params`           | \{ `returnTo?`: `string`; \} | The query parameters of the request. |
| `params.returnTo?` | `string`                     | -                                    |

## Returns

`Promise`\<`LogoutFlow`\>

## Example

```tsx
import { getLogoutFlow } from "@ory/nextjs/app"

async function LogoutLink() {
  const flow = await getLogoutFlow()

  return <a href={flow.logout_url}>Logout</a>
}
```
