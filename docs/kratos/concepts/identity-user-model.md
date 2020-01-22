---
id: identity-user-model
title: Identity and User Model
---

An identity ("user", "user account", "account", "subject") is the "who" of a software system. It can be a customer, an
employee, a user, a contractor, and even a programmatic identity such as an IoT
device, an application, or some other type of "robot".

Identities take different roles and we sometimes talk about "Account Recovery" or "User Account" because it's the common
terminology, but within ORY Kratos this is always an Identity, and it always is being exposed as `identity` in the API
Endpoints, request and response payloads.

An identity has the following properties - we're using YAML for better readability but the payload is usually JSON:

```yaml
# A universally unique ID that is generated when the identity is created and that cannot be changed or updated
# at a later stage.
id: '9f425a8d-7efc-4768-8f23-7647a74fdf13'

# This section represents all the credentials associated with this identity. It is further explained in section "Credentials".
credentials:
  password:
    id: password
    identifiers:
      - john.doe@acme.com
      - johnd@ory.sh
    config:
      hashed_password: ...
  oidc:
    id: oidc
    identifiers:
      - google:j8kf7a3...
      - facebook:83475891...
    config:
      - provider: google
        identifier: j8kf7a3
      - provider: facebook
        identifier: 83475891

# This is the JSON Schema ID used for validating the identities's traits.
traits_schema_id: default
# Could also be another schema:
# traits_schema_id: customer

# Traits represent information about the identity, such as the first or last name. The traits content is completely
# up to you and will be validated using the JSON Schema at `traits_schema_url`.
traits:
  # These are just examples
  email: office@ory.sh
  name:
    first: Aeneas
    last: Rekkas
  favorite_animal: Dog
  accepted_tos: true
```

## Identity Traits and JSON Schemas

An identity may have one or more traits. Traits can be modified by the identity
itself (e.g. as part of the registration or profile update process) as well as
anyone having access to ORY Krato's Admin API.

Traits can be used to tell ORY Kratos that a field has a particular meaning. For
example, trait `email` is a good candidate for the field "Email + Password" when
signing up or logging in.

Traits are validated using
[JSON Schema](https://json-schema.org/learn/getting-started-step-by-step.html) and
we've added a small extension ("Vocabulary") to the standard JSON Schema which allows you to tell
ORY Kratos that a specific trait has additional meaning.

Each identity can, theoretically, have a different Traits Schema, this can be
useful if

- you have more than one type of identity in your system (customers, support
  staff).
- you have both users and robots (sometimes named Service Accounts).
- you acquired another company with its own identity model that you would like
  to ingest.
- you gradually make changes (can be versioned) to your identity model.

Let's look at a concrete example and say you have three types of identities:
Regular customers,
[grandfather accounts](https://en.wikipedia.org/wiki/Grandfather_clause), and
Service Accounts (Microsoft provides
[Service Accounts](https://docs.microsoft.com/en-us/windows/security/identity-protection/access-control/service-accounts)).
You would use one JSON Schema per type of identity:

- Customers: `http://mydomain.com/schemas/v1/customer.schema.json`
- Grandfather Accounts: `http://mydomain.com/schemas/v2/customer.schema.json`
- Service Accounts: `http://mydomain.com/schemas/service-account.schema.json`

You define the JSON Schemas in your ORY Kratos configuration file:

```yaml
identity:
  traits:
    # This will be the default JSON Schema. If you leave `traits_schema_id` empty when creating an identity using the
    # Admin API, or a user signs up using a selfservice flow, this schema will be used.
    #
    # This is a required configuration field!
    default_schema_url: http://foo.bar.com/person.schema.json

    # You can optionally define additional schemas here:
    schemas:
      # When creating an identity that uses this schema, you can set `traits_schema_id: customer` for that identity.
      - id: customer
        url:  http://foo.bar.com/customer.schema.json
```

ORY Kratos will ensure that each of these schemas is enforced when an identity's
traits are created or updated. Your business logic must be able to
understand the distinctions between these three identities, but this can easily
be achieved with, for example, a switch statement:

```go
// This is an example program that can deal with all three identities
// session := ...
switch (session.Identity.TraitsSchemaURL) {
    case "":
        fallthrough
    case "default":
        // ...
    case "customer":
        // ...
    case "employee":
        // ...
}
```

## JSON Schema Vocabulary Extensions

As already explained, traits can be used to tell ORY Kratos that a particular
field has a system-relevant meaning. That could include:

- The email address for recovering a lost password
- The identifier for logging in (e.g. username and password or email and
  password)
- The phone number for enabling SMS 2FA
- ...

The ORY Kratos JSON Schema Vocabulary Extension can be used within a property:

```json5
{
  "$id": "http://mydomain.com/schemas/v2/customer.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "A customer (v2)",
  "type": "object",
  "properties": {
    "email": {
      "title": "E-Mail",
      "type": "string",
      "format": "email",

      // This tells ORY Kratos that the field should be used as the "username" for the username+password flow.
      // It is an extension to the regular JSON Schema vocabulary.
      "ory.sh/kratos": {
        "credentials": {
          "password": {
            "identifier": true
          }
        }
      },

    }
  }
}
```

An overview of available configuration options follows in the next sections.

### Identifier for Username and Password flows

You can tell ORY Kratos that a field should be used as the *identifier* (username, email, phone number, ...) of the
username and password registration and login flow:

```json5
{
  "ory.sh/kratos": {
    "credentials": {
      "password": {
        "identifier": true
      }
    }
  }
}
```

Looking at the traits from above

```yaml
traits:
  # These are just examples
  email: office@ory.sh
  name:
    first: Aeneas
    last: Rekkas
  favorite_animal: Dog
  accepted_tos: true
```

and using a JSON Schema that uses the `email` field as the identifier for the password flow

```json5
{
  "$id": "http://mydomain.com/schemas/v2/customer.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "A customer (v2)",
  "type": "object",
  "properties": {
    "email": {
      "title": "E-Mail",
      "type": "string",
      "format": "email",

      // This tells ORY Kratos that the field should be used as the "username" for the username+password flow.
      "ory.sh/kratos": {
        "credentials": {
          "password": {
            "identifier": true
          }
        }
      },

    },
    "name": {
      "type": "object",
      "properties": {
        "first": {
          "type": "string"
        },
        "last": {
          "type": "string"
        }
      }
    },
    "favorite_animal": {
      "type": "string"
    },
    "accepted_tos": {
      "type": "string"
    }
  },
  "required": ["email"],
  "additionalProperties": false
}
```

you would tell ORY Kratos that `office@ory.sh` is the identity's identifier. The user would then provide `office@ory.sh`
and his/her password to sign in.

For more information and examples head over to [Username and Password Credentials](credentials.md#username-and-password).

There are currently no other extensions supported for Identity Traits. Further fields will be added in future releases!
