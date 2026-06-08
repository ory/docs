# `<DefaultButtonSocial />`

```ts
function DefaultButtonSocial(props: {
  attributes: UiNodeInputAttributes
  buttonProps: OryNodeButtonButtonProps
  isSubmitting: boolean
  logos?: Record<string, ElementType>
  node: UiNodeInput
  provider: string
}): Element
```

The default implementation of a social button for Ory SSO. It renders a button with a logo and an optional label.

## Parameters

| Parameter            | Type                                                                                                                                                                                                                                                                                                  | Description                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `props`              | \{ `attributes`: `UiNodeInputAttributes`; `buttonProps`: [`OryNodeButtonButtonProps`](../../type-aliases/OryNodeButtonButtonProps.md); `isSubmitting`: `boolean`; `logos?`: `Record`\<`string`, `ElementType`\>; `node`: [`UiNodeInput`](../../type-aliases/UiNodeInput.md); `provider`: `string`; \} | The props for the DefaultButtonSocial component.                                      |
| `props.attributes`   | `UiNodeInputAttributes`                                                                                                                                                                                                                                                                               | **Deprecated** Use node.attributes instead.                                           |
| `props.buttonProps`  | [`OryNodeButtonButtonProps`](../../type-aliases/OryNodeButtonButtonProps.md)                                                                                                                                                                                                                          | -                                                                                     |
| `props.isSubmitting` | `boolean`                                                                                                                                                                                                                                                                                             | -                                                                                     |
| `props.logos?`       | `Record`\<`string`, `ElementType`\>                                                                                                                                                                                                                                                                   | Logos to use for the social buttons. If not provided, the default logos will be used. |
| `props.node`         | [`UiNodeInput`](../../type-aliases/UiNodeInput.md)                                                                                                                                                                                                                                                    | -                                                                                     |
| `props.provider`     | `string`                                                                                                                                                                                                                                                                                              | -                                                                                     |

## Returns

`Element`
