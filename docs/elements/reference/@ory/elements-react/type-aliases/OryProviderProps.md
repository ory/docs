# OryProviderProps

```ts
type OryProviderProps = {
  components: OryFlowComponents
  config: OryClientConfiguration
} & OryFlowContainer &
  PropsWithChildren
```

Props type for the OryProvider component.

## Type declaration

| Name         | Type                                                                | Description                                                                                                              |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `components` | [`OryFlowComponents`](OryFlowComponents.md)                         | The components to use for rendering Ory flows. You can provide custom components to override the default Ory components. |
| `config`     | [`OryClientConfiguration`](../interfaces/OryClientConfiguration.md) | The Ory client configuration. This includes the SDK and project configuration.                                           |
