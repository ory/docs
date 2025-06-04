# `<DefaultButtonSocial />`

```ts
function DefaultButtonSocial(props: {
  attributes: UiNodeInputAttributes;
  logos?: Record<string, ElementType>;
  node: UiNode;
  onClick?: () => void;
  showLabel?: boolean;
}): Element;
```

The default implementation of a social button for Ory SSO.
It renders a button with a logo and an optional label.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `attributes`: `UiNodeInputAttributes`; `logos?`: `Record`\<`string`, [`ElementType`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L88)\>; `node`: `UiNode`; `onClick?`: () => `void`; `showLabel?`: `boolean`; \} | The props for the DefaultButtonSocial component. |
| `props.attributes` | `UiNodeInputAttributes` | - |
| `props.logos?` | `Record`\<`string`, [`ElementType`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L88)\> | Logos to use for the social buttons. If not provided, the default logos will be used. |
| `props.node` | `UiNode` | - |
| `props.onClick?` | () => `void` | - |
| `props.showLabel?` | `boolean` | Whether to show the label next to the logo. If not provided, it will be determined based on the number of SSO nodes. |

## Returns

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)
