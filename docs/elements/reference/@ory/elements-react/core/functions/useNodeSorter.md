# useNodeSorter()

```ts
function useNodeSorter(): (
  a: UiNode,
  b: UiNode,
  ctx: {
    flowType: string
  },
) => number
```

The `useNodeSorter` hook provides a way to access the node sorting function

The node sorting function is used to determine the order of nodes in a flow based on their attributes and context.

To customize the sorting behavior, you can provide a custom `nodeSorter` function to the `OryComponentProvider`.

## Returns

a function that sorts nodes based on the provided context.

```ts
(
   a: UiNode,
   b: UiNode,
   ctx: {
  flowType: string;
}): number;
```

### Parameters

| Parameter      | Type                        |
| -------------- | --------------------------- |
| `a`            | `UiNode`                    |
| `b`            | `UiNode`                    |
| `ctx`          | \{ `flowType`: `string`; \} |
| `ctx.flowType` | `string`                    |

### Returns

`number`
