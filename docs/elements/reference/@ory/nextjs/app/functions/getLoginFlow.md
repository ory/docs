# getLoginFlow()

```ts
function getLoginFlow(
  config: {
    project: {
      login_ui_url: string
    }
  },
  params: QueryParams | Promise<QueryParams>,
): Promise<null | void | LoginFlow>
```

Use this method in an app router page to fetch an existing login flow or to create a new one. This method works with server-side
rendering.

## Parameters

| Parameter                     | Type                                              | Description                          |
| ----------------------------- | ------------------------------------------------- | ------------------------------------ |
| `config`                      | \{ `project`: \{ `login_ui_url`: `string`; \}; \} | The Ory configuration object.        |
| `config.project`              | \{ `login_ui_url`: `string`; \}                   | -                                    |
| `config.project.login_ui_url` | `string`                                          | -                                    |
| `params`                      | `QueryParams` \| `Promise`\<`QueryParams`\>       | The query parameters of the request. |

## Returns

`Promise`\<`null` \| `void` \| `LoginFlow`\>

## Example

```tsx
import { Login } from "@ory/elements-react/theme"
import { getLoginFlow, OryPageParams } from "@ory/nextjs/app"
import CardHeader from "@/app/auth/login/card-header"

import config from "@/ory.config"

export default async function LoginPage(props: OryPageParams) {
  const flow = await getLoginFlow(config, props.searchParams)

  if (!flow) {
    return null
  }

  return (
    <Login
      flow={flow}
      config={config}
      components={{
        Card: {
          Header: CardHeader,
        },
      }}
    />
  )
}
```
