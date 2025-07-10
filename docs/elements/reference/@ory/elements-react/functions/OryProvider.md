# `<OryProvider />`

```ts
function OryProvider(props: OryProviderProps): Element
```

OryProvider is a React component that provides the necessary context for rendering Ory flows.

It wraps the application in several context providers, including [OryConfigurationProvider](OryConfigurationProvider.md).

You can use this component to set up the Ory SDK, provide custom translations, and specify the components to use for rendering Ory
flows.

## Parameters

| Parameter | Type                                                      | Description                                   |
| --------- | --------------------------------------------------------- | --------------------------------------------- |
| `props`   | [`OryProviderProps`](../type-aliases/OryProviderProps.md) | The properties for the OryProvider component. |

## Returns

`Element`

## Example

```tsx
import { OryProvider, LoginFlow, OryFlowComponents, OryClientConfiguration } from "@ory/elements-react"

export type Props = {
  flow: LoginFlow
  components: OryFlowComponents
  config: OryClientConfiguration
}

function App({ flow, config, children, components }: PropsWithChildren<Props>) {
  return (
    <OryProvider config={config} flow={flow} flowType={FlowType.Login} components={components}>
      {children}
    </OryProvider>
  )
}
```
