# OrySettingsWebauthnProps

```ts
type OrySettingsWebauthnProps = {
  nameInput: UiNode
  removeButtons: UiNode &
    {
      onClick: () => void
    }[]
  triggerButton: UiNode & {
    onClick: () => void
  }
}
```

## Properties

### nameInput

```ts
nameInput: UiNode
```

---

### removeButtons

```ts
removeButtons: UiNode & {
  onClick: () => void;
}[];
```

---

### triggerButton

```ts
triggerButton: UiNode & {
  onClick: () => void;
};
```

#### Type declaration

| Name        | Type         |
| ----------- | ------------ |
| `onClick()` | () => `void` |
