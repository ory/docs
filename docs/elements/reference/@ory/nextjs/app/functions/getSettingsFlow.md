# getSettingsFlow()

```ts
function getSettingsFlow(
  config: {
    project: {
      settings_ui_url: string
    }
  },
  params: QueryParams | Promise<QueryParams>,
): Promise<null | void | SettingsFlow>
```

Use this method in an app router page to fetch an existing login flow or to create a new one. This method works with server-side
rendering.

## Parameters

| Parameter                        | Type                                                 | Description                          |
| -------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| `config`                         | \{ `project`: \{ `settings_ui_url`: `string`; \}; \} | The Ory configuration object.        |
| `config.project`                 | \{ `settings_ui_url`: `string`; \}                   | -                                    |
| `config.project.settings_ui_url` | `string`                                             | -                                    |
| `params`                         | `QueryParams` \| `Promise`\<`QueryParams`\>          | The query parameters of the request. |

## Returns

`Promise`\<`null` \| `void` \| `SettingsFlow`\>

## Example

```tsx
import { Login } from "@ory/elements-react/theme"
import { getLoginFlow, OryPageParams } from "@ory/nextjs/app"

import config from "@/ory.config"
import CardHeader from "@/app/auth/login/card-header"

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
