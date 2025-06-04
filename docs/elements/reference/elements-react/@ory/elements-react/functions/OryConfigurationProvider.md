# `<OryConfigurationProvider />`

```ts
function OryConfigurationProvider(props: {
  project?: Partial<AccountExperienceConfiguration>;
  sdk?: {
     options?: Partial<ConfigurationParameters>;
     url?: string;
  };
} & {
  children?: ReactNode;
}): Element;
```

The `OryConfigurationProvider` component provides the Ory Elements configuration to its children.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | \{ `project?`: `Partial`\<`AccountExperienceConfiguration`\>; `sdk?`: \{ `options?`: `Partial`\<`ConfigurationParameters`\>; `url?`: `string`; \}; \} & \{ `children?`: [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/index.d.ts#L485); \} | The properties for the OryConfigurationProvider component. |

## Returns

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)
