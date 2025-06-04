# `<OryForm />`

```ts
function OryForm(props: {
  onAfterSubmit?: (method: undefined | string | number | boolean) => void;
} & {
  children?: ReactNode;
}): Element;
```

The OryForm component is the main form container for Ory flows.

It renders the form with the correct action and method, and handles the submission of the form.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `onAfterSubmit?`: (`method`: `undefined` \| `string` \| `number` \| `boolean`) => `void`; \} & \{ `children?`: [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485); \} | The props for the OryForm component. |

## Returns

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)
