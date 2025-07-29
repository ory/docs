# getRecoveryFlow()

```ts
function getRecoveryFlow(
  config: {
    project: {
      recovery_ui_url: string
    }
  },
  params: QueryParams | Promise<QueryParams>,
): Promise<null | void | RecoveryFlow>
```

Use this method in an app router page to fetch an existing recovery flow or to create a new one. This method works with
server-side rendering.

## Parameters

| Parameter                        | Type                                                 | Description                          |
| -------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| `config`                         | \{ `project`: \{ `recovery_ui_url`: `string`; \}; \} | The Ory configuration object.        |
| `config.project`                 | \{ `recovery_ui_url`: `string`; \}                   | -                                    |
| `config.project.recovery_ui_url` | `string`                                             | -                                    |
| `params`                         | `QueryParams` \| `Promise`\<`QueryParams`\>          | The query parameters of the request. |

## Returns

`Promise`\<`null` \| `void` \| `RecoveryFlow`\>

## Example

```tsx
import { Recovery } from "@ory/elements-react/theme"
import { getRecoveryFlow, OryPageParams } from "@ory/nextjs/app"
import config from "@/ory.config"
import CardHeader from "@/app/auth/recovery/card-header"

export default async function RecoveryPage(props: OryPageParams) {
  const flow = await getRecoveryFlow(config, props.searchParams)

  if (!flow) {
    return null
  }

  return (
    <Recovery
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
