# `<Recovery />`

```ts
function Recovery(props: {
  children?: ReactNode
  components?: OryFlowComponentOverrides
  config: OryClientConfiguration
  flow: RecoveryFlow
}): Element
```

The `Recovery` component is used to render the recovery flow in Ory Elements.

## Parameters

| Parameter           | Type                                                                                                                                                                                                                                     | Description                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `props`             | \{ `children?`: `ReactNode`; `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `flow`: `RecoveryFlow`; \} | The props for the Recovery component.                                                                                                    |
| `props.children?`   | `ReactNode`                                                                                                                                                                                                                              | Optional children to render If not provided, the default OrySelfServiceFlowCard will be rendered.                                        |
| `props.components?` | [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md)                                                                                                                                                           | Optional components to override the default ones. This allows you to customize the appearance and behavior of the recovery flow.         |
| `props.config`      | [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md)                                                                                                                                                                   | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL and other settings. |
| `props.flow`        | `RecoveryFlow`                                                                                                                                                                                                                           | The recovery flow object containing the state and data for the recovery process.                                                         |

## Returns

`Element`

the recovery flow component.
