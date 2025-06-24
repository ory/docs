# `<Settings />`

```ts
function Settings(props: {
  children?: ReactNode
  components?: OryFlowComponentOverrides
  config: OryClientConfiguration
  flow: SettingsFlow
}): Element
```

The `Settings` component is used to render the settings flow in Ory Elements.

It provides the necessary context and components for the settings flow, allowing you to customize the appearance and behavior of
the settings form.

## Parameters

| Parameter           | Type                                                                                                                                                                                                                                     | Description                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `props`             | \{ `children?`: `ReactNode`; `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `flow`: `SettingsFlow`; \} | The props for the Settings component.                                                                                                    |
| `props.children?`   | `ReactNode`                                                                                                                                                                                                                              | Optional children to render If not provided, the default OrySettingsCard will be rendered.                                               |
| `props.components?` | [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md)                                                                                                                                                           | Optional components to override the default ones. This allows you to customize the appearance and behavior of the settings flow.         |
| `props.config`      | [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md)                                                                                                                                                                   | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL and other settings. |
| `props.flow`        | `SettingsFlow`                                                                                                                                                                                                                           | The settings flow object containing the state and data for the settings process.                                                         |

## Returns

`Element`
