# OryCardAuthMethodListItemProps

```ts
type OryCardAuthMethodListItemProps = {
  disabled?: boolean
  group: string
  onClick: () => void
  title?: {
    id: string
    values?: Record<string, string>
  }
}
```

Props for the AuthMethodListItem component. This component is used to render a single auth method in the AuthMethodList component.

## Properties

### disabled?

```ts
optional disabled: boolean;
```

---

### group

```ts
group: string
```

---

### onClick()

```ts
onClick: () => void;
```

#### Returns

`void`

---

### title?

```ts
optional title: {
  id: string;
  values?: Record<string, string>;
};
```

| Name      | Type                           |
| --------- | ------------------------------ |
| `id`      | `string`                       |
| `values?` | `Record`\<`string`, `string`\> |
