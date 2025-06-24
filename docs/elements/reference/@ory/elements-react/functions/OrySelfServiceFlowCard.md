# `<OrySelfServiceFlowCard />`

```ts
function OrySelfServiceFlowCard(): Element
```

The `OrySelfServiceFlowCard` component is an umbrella component that can render the self-service flows.

Note: prefer using the [\<Login /\> component](../theme/functions/Login.md), etc. directly instead of this component.

It renders different forms based on the current flow state, such as providing an identifier, entering a password or one time code
or selecting a method for authentication.

The component must be use within an [OryProvider](OryProvider.md) that provides the flow context and components to use.

## Returns

`Element`

The Ory Two-Step Card component that renders different forms based on the current flow state.

## Example

```jsx
import { OrySelfServiceFlowCard } from "@ory/elements-react";

function MyComponent() {
 return <OryProvider ...>
   <OrySelfServiceFlowCard />
 </OryProvider>;
}
```
