# OryNodeConsentScopeCheckboxProps

```ts
type OryNodeConsentScopeCheckboxProps = {
  attributes: UiNodeInputAttributes
  inputProps: {
    checked: boolean
    disabled?: boolean
    name: string
    value: string
  }
  node: UiNode
  onCheckedChange: (checked: boolean) => void
}
```

## Properties

### attributes

```ts
attributes: UiNodeInputAttributes
```

---

### inputProps

```ts
inputProps: {
  checked: boolean;
  disabled?: boolean;
  name: string;
  value: string;
};
```

| Name        | Type      |
| ----------- | --------- |
| `checked`   | `boolean` |
| `disabled?` | `boolean` |
| `name`      | `string`  |
| `value`     | `string`  |

---

### node

```ts
node: UiNode
```

---

### onCheckedChange()

```ts
onCheckedChange: (checked: boolean) => void;
```

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `checked` | `boolean` |

#### Returns

`void`
