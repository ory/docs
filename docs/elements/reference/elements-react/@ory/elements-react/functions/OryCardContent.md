# `<OryCardContent />`

```ts
function OryCardContent(props: {
  children?: ReactNode;
}): Element;
```

A component that renders the content of the Ory Card.
This is the main content of the card, such as the flow's form, with it's input fields and messages.

You can use this component to build fully custom implementations of the Ory Flows.

However, you most likely want to override the individual components instead.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `children?`: [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485); \} | pass children to render instead of the default Ory Card components |
| `props.children?` | [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485) | - |

## Returns

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)
