# getVerificationFlow()

```ts
function getVerificationFlow(
  config: {
    project: {
      verification_ui_url: string
    }
  },
  params: QueryParams | Promise<QueryParams>,
): Promise<null | void | VerificationFlow>
```

Use this method in an app router page to fetch an existing verification flow or to create a new one. This method works with
server-side rendering.

## Parameters

| Parameter                            | Type                                                     | Description                          |
| ------------------------------------ | -------------------------------------------------------- | ------------------------------------ |
| `config`                             | \{ `project`: \{ `verification_ui_url`: `string`; \}; \} | The Ory configuration object.        |
| `config.project`                     | \{ `verification_ui_url`: `string`; \}                   | -                                    |
| `config.project.verification_ui_url` | `string`                                                 | -                                    |
| `params`                             | `QueryParams` \| `Promise`\<`QueryParams`\>              | The query parameters of the request. |

## Returns

`Promise`\<`null` \| `void` \| `VerificationFlow`\>

## Example

```tsx
import { Verification } from "@ory/elements-react/theme"
import { getVerificationFlow, OryPageParams } from "@ory/nextjs/app"

import config from "@/ory.config"
import CardHeader from "@/app/auth/verification/card-header"

export default async function VerificationPage(props: OryPageParams) {
  const flow = await getVerificationFlow(config, props.searchParams)

  if (!flow) {
    return null
  }

  return (
    <Verification
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
