# OryFlowComponents

```ts
type OryFlowComponents = {
  Card: {
    AuthMethodListContainer: ComponentType<PropsWithChildren>
    AuthMethodListItem: ComponentType<OryCardAuthMethodListItemProps>
    Content: ComponentType<OryCardContentProps>
    Divider: ComponentType<OryCardDividerProps>
    Footer: ComponentType<OryCardFooterProps>
    Header: ComponentType<OryCardProps>
    Logo: ComponentType<OryCardLogoProps>
    Root: ComponentType<OryCardProps>
    SettingsSection: ComponentType<OryCardSettingsSectionProps>
    SettingsSectionContent: ComponentType<OryFormSectionContentProps>
    SettingsSectionFooter: ComponentType<OryFormSectionFooterProps>
  }
  Form: {
    Group: ComponentType<OryFormGroupProps>
    PasskeySettings: ComponentType<OrySettingsPasskeyProps>
    RecoveryCodesSettings: ComponentType<OrySettingsRecoveryCodesProps>
    Root: ComponentType<OryFormRootProps>
    SsoRoot: ComponentType<OryFormSsoRootProps>
    SsoSettings: ComponentType<OrySettingsSsoProps>
    TotpSettings: ComponentType<OrySettingsTotpProps>
    WebauthnSettings: ComponentType<OrySettingsWebauthnProps>
  }
  Message: {
    Content: ComponentType<OryMessageContentProps>
    Root: ComponentType<OryMessageRootProps>
    Toast: ComponentType<OryToastProps>
  }
  Node: {
    Anchor: ComponentType<OryNodeAnchorProps>
    Button: ComponentType<OryNodeButtonProps>
    Captcha: ComponentType<OryNodeCaptchaProps>
    Checkbox: ComponentType<OryNodeCheckboxProps>
    CodeInput: ComponentType<OryNodeInputProps>
    ConsentScopeCheckbox: ComponentType<OryNodeConsentScopeCheckboxProps>
    Image: ComponentType<OryNodeImageProps>
    Input: ComponentType<OryNodeInputProps>
    Label: ComponentType<OryNodeLabelProps>
    SsoButton: ComponentType<OryNodeSsoButtonProps>
    Text: ComponentType<OryNodeTextProps>
  }
  Page: {
    Header: ComponentType<OryPageHeaderProps>
  }
}
```

A record of all the components that are used in the OryForm component.

## Properties

### Card

```ts
Card: {
  AuthMethodListContainer: ComponentType<PropsWithChildren>
  AuthMethodListItem: ComponentType<OryCardAuthMethodListItemProps>
  Content: ComponentType<OryCardContentProps>
  Divider: ComponentType<OryCardDividerProps>
  Footer: ComponentType<OryCardFooterProps>
  Header: ComponentType<OryCardProps>
  Logo: ComponentType<OryCardLogoProps>
  Root: ComponentType<OryCardProps>
  SettingsSection: ComponentType<OryCardSettingsSectionProps>
  SettingsSectionContent: ComponentType<OryFormSectionContentProps>
  SettingsSectionFooter: ComponentType<OryFormSectionFooterProps>
}
```

| Name                      | Type                                                                                             | Description                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthMethodListContainer` | `ComponentType`\<`PropsWithChildren`\>                                                           | The AuthMethodListContainer component is rendered around the "method" chooser step in the identifier_first login flow. This is only used, if login is configured to use identifier_first authentication. |
| `AuthMethodListItem`      | `ComponentType`\<[`OryCardAuthMethodListItemProps`](OryCardAuthMethodListItemProps.md)\>         | The AuthMethodListItem component is rendered on the "method" chooser step in the identifier_first login flow. This is only used, if login is configured to use identifier_first authentication.          |
| `Content`                 | `ComponentType`\<[`OryCardContentProps`](OryCardContentProps.md)\>                               | The card content is the main content of the card container.                                                                                                                                              |
| `Divider`                 | `ComponentType`\<[`OryCardDividerProps`](OryCardDividerProps.md)\>                               | The HorizontalDivider component is rendered between groups.                                                                                                                                              |
| `Footer`                  | `ComponentType`\<[`OryCardFooterProps`](OryCardFooterProps.md)\>                                 | The card footer is the footer of the card container.                                                                                                                                                     |
| `Header`                  | `ComponentType`\<[`OryCardProps`](../interfaces/OryCardProps.md)\>                               | The card header is the header of the card container.                                                                                                                                                     |
| `Logo`                    | `ComponentType`\<[`OryCardLogoProps`](OryCardLogoProps.md)\>                                     | The card logo is the logo of the card container.                                                                                                                                                         |
| `Root`                    | `ComponentType`\<[`OryCardProps`](../interfaces/OryCardProps.md)\>                               | The card container is the main container of the card.                                                                                                                                                    |
| `SettingsSection`         | `ComponentType`\<[`OryCardSettingsSectionProps`](../interfaces/OryCardSettingsSectionProps.md)\> | The SettingsSection component is rendered around each section of the settings.                                                                                                                           |
| `SettingsSectionContent`  | `ComponentType`\<[`OryFormSectionContentProps`](OryFormSectionContentProps.md)\>                 | The SettingsSectionContent component is rendered around the content of each section of the settings.                                                                                                     |
| `SettingsSectionFooter`   | `ComponentType`\<[`OryFormSectionFooterProps`](OryFormSectionFooterProps.md)\>                   | The SettingsSectionFooter component is rendered around the footer of each section of the settings.                                                                                                       |

---

### Form

```ts
Form: {
  Group: ComponentType<OryFormGroupProps>
  PasskeySettings: ComponentType<OrySettingsPasskeyProps>
  RecoveryCodesSettings: ComponentType<OrySettingsRecoveryCodesProps>
  Root: ComponentType<OryFormRootProps>
  SsoRoot: ComponentType<OryFormSsoRootProps>
  SsoSettings: ComponentType<OrySettingsSsoProps>
  TotpSettings: ComponentType<OrySettingsTotpProps>
  WebauthnSettings: ComponentType<OrySettingsWebauthnProps>
}
```

| Name                    | Type                                                                                   | Description                                                                                                                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Group`                 | `ComponentType`\<[`OryFormGroupProps`](OryFormGroupProps.md)\>                         | The FormGroup is rendered around each group of nodes in the UI nodes.                                                                                                                                                               |
| `PasskeySettings`       | `ComponentType`\<[`OrySettingsPasskeyProps`](OrySettingsPasskeyProps.md)\>             | The section on the settings page, rendering the Passkey settings                                                                                                                                                                    |
| `RecoveryCodesSettings` | `ComponentType`\<[`OrySettingsRecoveryCodesProps`](OrySettingsRecoveryCodesProps.md)\> | The section on the settings page, rendering the recovery code settings                                                                                                                                                              |
| `Root`                  | `ComponentType`\<[`OryFormRootProps`](OryFormRootProps.md)\>                           | The FormContainer component is the main container of the form. It should render its children. You most likely don't want to override this component directly.                                                                       |
| `SsoRoot`               | `ComponentType`\<[`OryFormSsoRootProps`](OryFormSsoRootProps.md)\>                     | A special form group container for the social buttons. This is required, because the social buttons need to be in its form, to not influence the other form groups. You most likely don't want to override this component directly. |
| `SsoSettings`           | `ComponentType`\<[`OrySettingsSsoProps`](OrySettingsSsoProps.md)\>                     | The section on the settings page, rendering the OIDC settings                                                                                                                                                                       |
| `TotpSettings`          | `ComponentType`\<[`OrySettingsTotpProps`](OrySettingsTotpProps.md)\>                   | The section on the settings page, rendering the TOTP settings                                                                                                                                                                       |
| `WebauthnSettings`      | `ComponentType`\<[`OrySettingsWebauthnProps`](OrySettingsWebauthnProps.md)\>           | The section on the settings page, rendering the Webauthn settings                                                                                                                                                                   |

---

### Message

```ts
Message: {
  Content: ComponentType<OryMessageContentProps>
  Root: ComponentType<OryMessageRootProps>
  Toast: ComponentType<OryToastProps>
}
```

| Name      | Type                                                                                   | Description                                                                                                       |
| --------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `Content` | `ComponentType`\<[`OryMessageContentProps`](../interfaces/OryMessageContentProps.md)\> | The Message component is rendered whenever a message is encountered.                                              |
| `Root`    | `ComponentType`\<[`OryMessageRootProps`](../interfaces/OryMessageRootProps.md)\>       | The MessageContainer is rendered around the messages.                                                             |
| `Toast`   | `ComponentType`\<[`OryToastProps`](OryToastProps.md)\>                                 | The Toast component is rendered for toast messages. Currently only used in the settings page to display messages. |

---

### Node

```ts
Node: {
  Anchor: ComponentType<OryNodeAnchorProps>
  Button: ComponentType<OryNodeButtonProps>
  Captcha: ComponentType<OryNodeCaptchaProps>
  Checkbox: ComponentType<OryNodeCheckboxProps>
  CodeInput: ComponentType<OryNodeInputProps>
  ConsentScopeCheckbox: ComponentType<OryNodeConsentScopeCheckboxProps>
  Image: ComponentType<OryNodeImageProps>
  Input: ComponentType<OryNodeInputProps>
  Label: ComponentType<OryNodeLabelProps>
  SsoButton: ComponentType<OryNodeSsoButtonProps>
  Text: ComponentType<OryNodeTextProps>
}
```

| Name                   | Type                                                                                         | Description                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Anchor`               | `ComponentType`\<[`OryNodeAnchorProps`](OryNodeAnchorProps.md)\>                             | Anchor component, rendered whenever an "anchor" node is encountered                                                                                                          |
| `Button`               | `ComponentType`\<[`OryNodeButtonProps`](OryNodeButtonProps.md)\>                             | Button component, rendered whenever a button is encountered in the Ory UI Nodes.                                                                                             |
| `Captcha`              | `ComponentType`\<[`OryNodeCaptchaProps`](OryNodeCaptchaProps.md)\>                           | The Captcha component is rendered whenever a "captcha" group is encountered.                                                                                                 |
| `Checkbox`             | `ComponentType`\<[`OryNodeCheckboxProps`](OryNodeCheckboxProps.md)\>                         | The Checkbox component is rendered whenever an input node with of boolean type is encountered.                                                                               |
| `CodeInput`            | `ComponentType`\<[`OryNodeInputProps`](OryNodeInputProps.md)\>                               | Special version of the Input component for OTP codes.                                                                                                                        |
| `ConsentScopeCheckbox` | `ComponentType`\<[`OryNodeConsentScopeCheckboxProps`](OryNodeConsentScopeCheckboxProps.md)\> | Special version of the Input component for scopes in OAuth2 flows.                                                                                                           |
| `Image`                | `ComponentType`\<[`OryNodeImageProps`](OryNodeImageProps.md)\>                               | The Image component is rendered whenever an "image" node is encountered. For example used in the "Logo" node.                                                                |
| `Input`                | `ComponentType`\<[`OryNodeInputProps`](OryNodeInputProps.md)\>                               | The Input component is rendered whenever a "input" node is encountered.                                                                                                      |
| `Label`                | `ComponentType`\<[`OryNodeLabelProps`](OryNodeLabelProps.md)\>                               | The Label component is rendered around Input components and is used to render form labels.                                                                                   |
| `SsoButton`            | `ComponentType`\<[`OryNodeSsoButtonProps`](OryNodeSsoButtonProps.md)\>                       | The SsoButton component is rendered whenever a button of group "oidc" or "saml" node is encountered. It renders the "Login with Google", "Login with Facebook" etc. buttons. |
| `Text`                 | `ComponentType`\<[`OryNodeTextProps`](OryNodeTextProps.md)\>                                 | The Text component is rendered whenever a "text" node is encountered.                                                                                                        |

---

### Page

```ts
Page: {
  Header: ComponentType<OryPageHeaderProps>
}
```

| Name     | Type                                                             |
| -------- | ---------------------------------------------------------------- |
| `Header` | `ComponentType`\<[`OryPageHeaderProps`](OryPageHeaderProps.md)\> |
