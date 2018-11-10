# Conditions and Context

<!-- toc -->

## Overview

Conditions are defined in policies. Contexts are defined in access control requests. Conditions use contexts and decide
if a policy is responsible for handling the access request at hand.

Conditions are functions returning true or false given a context. Because conditions implement logic,
they must be programmed. ORY Keto uses conditions defined in [ORY Ladon](https://github.com/ory/ladon/#conditions).
Adding new condition handlers must be done through creating a pull request in the ORY Ladon repository.

A condition has always the same JSON format:

```json
{
  "subjects": ["..."],
  "actions" : ["..."],
  "effect": "allow",
  "resources": ["..."],
  "conditions": {
    "this-key-will-be-matched-with-the-context": {
      "type": "SomeConditionType",
      "options": {
        "some": "configuration options set by the condition type"
      }
    }
  }
}
```

The context in the access request made to ORY Keto's Warden API must match the specified key in the condition
in order to be evaluated by the condition logic:

```json
{
  "subject": "...",
  "action" : "...",
  "resource": "...",
  "context": {
    "this-key-will-be-matched-with-the-context": { "foo": "bar" }
  }
}
```

### CIDR Condition

The CIDR condition matches CIDR IP Ranges. An exemplary policy definition could look as follows.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "remoteIPAddress": {
      "type": "CIDRCondition",
      "options": {
        "cidr": "192.168.0.0/16"
      }
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "remoteIPAddress": "192.168.0.5"
  }
}
```

The next access request would be denied as the condition is not fulfilled and thus no policy is matched.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "remoteIPAddress": "255.255.0.0"
  }
}
```

The next access request would also be denied as the context is not using the key `remoteIPAddress` but instead `someOtherKey`.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someOtherKey": "192.168.0.5"
  }
}
```

### String Equal Condition

Checks if the value passed in the access request's context is identical with the string that was given initially.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "someKeyName": {
      "type": "StringEqualCondition",
      "options": {
        "equals": "the-value-should-be-this"
      }
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "the-value-should-be-this"
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "this-is-a-different-value"
  }
}
```

### String Match Condition

Checks if the value passed in the access request's context matches the regular expression that was given initially.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "someKeyName": {
      "type": "StringMatchCondition",
      "options": {
        "equals": "regex-pattern-here.+"
      }
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "regex-pattern-here-matches"
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKeyName": "regex-pattern-here"
  }
}
```

### Subject Condition

Checks if the access request's subject is identical with the string specified in the context.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "owner": {
      "type": "EqualsSubjectCondition",
      "options": {}
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "owner": "users:maria"
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "owner": "another-user"
  }
}
```

This condition makes more sense when being used with access tokens where the subject is extracted from the token.

### String Pairs Equal Condition

Checks if the value passed in the access request's context contains two-element arrays and that both elements in each pair are equal.

```json
{
  "description": "One policy to rule them all.",
  "subjects": ["users:maria"],
  "actions" : ["delete", "create", "update"],
  "effect": "allow",
  "resources": ["resources:articles:<.*>"],
  "conditions": {
    "someKey": {
      "type": "StringPairsEqualCondition",
      "options": {}
    }
  }
}
```

The following access request would be allowed.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKey": [
      ["some-arbitrary-pair-value", "some-arbitrary-pair-value"],
      ["some-other-arbitrary-pair-value", "some-other-arbitrary-pair-value"]
    ]
  }
}
```

The following access request would be denied.

```json
{
  "subject": "users:maria",
  "action" : "delete",
  "resource": "resources:articles:12345",
  "context": {
    "someKey": [
      ["some-arbitrary-pair-value", "some-other-arbitrary-pair-value"]
    ]
  }
}
```
