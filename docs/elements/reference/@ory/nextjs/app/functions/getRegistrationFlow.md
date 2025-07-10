# getRegistrationFlow()

```ts
function getRegistrationFlow(
  config: {
    project: {
      registration_ui_url: string
    }
  },
  params: QueryParams | Promise<QueryParams>,
): Promise<null | void | RegistrationFlow>
```

Use this method in an app router page to fetch an existing registration flow or to create a new one. This method works with
server-side rendering.

## Parameters

| Parameter                            | Type                                                     | Description                          |
| ------------------------------------ | -------------------------------------------------------- | ------------------------------------ |
| `config`                             | \{ `project`: \{ `registration_ui_url`: `string`; \}; \} | The Ory configuration object.        |
| `config.project`                     | \{ `registration_ui_url`: `string`; \}                   | -                                    |
| `config.project.registration_ui_url` | `string`                                                 | -                                    |
| `params`                             | `QueryParams` \| `Promise`\<`QueryParams`\>              | The query parameters of the request. |

## Returns

`Promise`\<`null` \| `void` \| `RegistrationFlow`\>

## Example

```tsx
import { Registration } from "@ory/elements-react/theme"
import { getRegistrationFlow, OryPageParams } from "@ory/nextjs/app"

import config from "@/ory.config"
import CardHeader from "@/app/auth/registration/card-header"

export default async function RegistrationPage(props: OryPageParams) {
  const flow = await getRegistrationFlow(config, props.searchParams)

  if (!flow) {
    return null
  }

  return (
    <Registration
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
