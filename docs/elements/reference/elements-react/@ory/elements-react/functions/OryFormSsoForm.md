# `<OryFormSsoForm />`

```ts
function OryFormSsoForm(): 
  | null
  | Element;
```

The `OryFormSsoForm` component renders the Ory Form for SSO methods (OIDC and SAML).

It needs to be its own form, as the OIDC buttons are form submits but are not related to the main form.

## Returns

  \| `null`
  \| [`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9519439d51f51f794efa1b5865d3a9224c337bfd/types/react/jsx-runtime.d.ts#L6)

a React component that renders the Ory Form for SSO methods.
