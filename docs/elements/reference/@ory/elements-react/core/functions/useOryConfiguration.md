# useOryConfiguration()

```ts
function useOryConfiguration(): OryElementsConfiguration
```

The `useOryConfiguration` hook provides access to the Ory Elements configuration.

This includes the SDK configuration and the project configuration. To customize the configuration, provide the `sdk` and `project`
properties in the `OryConfigurationProvider`.

## Returns

[`OryElementsConfiguration`](../interfaces/OryElementsConfiguration.md)

the Ory Elements configuration, which includes the SDK and project configuration.
