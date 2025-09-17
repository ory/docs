# getServerSession()

```ts
function getServerSession(): Promise<null | Session>
```

A helper to fetch the session on the server side. This method works with server-side rendering.

## Returns

`Promise`\<`null` \| `Session`\>

The session object or null if no session is found.

## Example

```tsx
import { getServerSession } from "@ory/nextjs/app"

async function MyComponent() {
  const session = await getServerSession()

  if (!session) {
    return <p>No session found</p>
  }
}
```
