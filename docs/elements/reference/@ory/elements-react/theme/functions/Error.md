# `<Error />`

```ts
function Error(props: {
  components?: OryFlowComponentOverrides
  config: OryClientConfiguration
  error:
    | FlowError
    | {
        error: string
        error_description: string
      }
    | {
        error: GenericError
      }
  session?: Session
}): Element
```

The Error component is used to display an error message to the user.

## Parameters

| Parameter           | Type                                                                                                                                                                                                                                                                                                                                | Description                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `props`             | \{ `components?`: [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md); `config`: [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md); `error`: \| `FlowError` \| \{ `error`: `string`; `error_description`: `string`; \} \| \{ `error`: `GenericError`; \}; `session?`: `Session`; \} | The props for the Error component.                                                                                                            |
| `props.components?` | [`OryFlowComponentOverrides`](../../type-aliases/OryFlowComponentOverrides.md)                                                                                                                                                                                                                                                      | The components to override the default ones. This allows you to customize the appearance and behavior of the error flow.                      |
| `props.config`      | [`OryClientConfiguration`](../../interfaces/OryClientConfiguration.md)                                                                                                                                                                                                                                                              | The Ory client configuration object. This object contains the configuration for the Ory client, such as the base URL and project information. |
| `props.error`       | \| `FlowError` \| \{ `error`: `string`; `error_description`: `string`; \} \| \{ `error`: `GenericError`; \}                                                                                                                                                                                                                         | The error object returned by the Ory SDK. This can be a FlowError, OAuth2Error, or a GenericError.                                            |
| `props.session?`    | `Session`                                                                                                                                                                                                                                                                                                                           | The session object, if available. This is used to determine if the user is logged in and to provide appropriate actions.                      |

## Returns

`Element`
