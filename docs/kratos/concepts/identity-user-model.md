---
id: identity-user-model
title: Identity and User Model
---

An identity ("user", "user account", "account", "subject") is the "who" of a software system. It can be a customer, an
employee, a user, a contractor, and even a programmatic identity such as an IoT
device, an application, or some other type of "robot."

Identities take different roles sometimes for instance called "Account Recovery" or "User Account" since these are commonly used terms. In ORY Kratos an identity is always called an "Identity," and it always exposed as `identity` in the API Endpoints, request and response payloads.

The following examples uses YAML for improved readability. However the API payload is usually in JSON format. An `identity has the following properties:

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
itself e.g. as part of the registration or profile update process as well as
anyone having access to ORY Krato's Admin API.

Traits tell ORY Kratos that a field has a particular meaning. For example, trait `email` is a good candidate for the field "Email + Password" for
signing up or logging in.

To validate traits Ory Kratos uses
[JSON Schema](https://json-schema.org/learn/getting-started-step-by-step.html) 
adding a small extension "Vocabulary" that allows you to tell
ORY Kratos that a specific trait adds some specific meaning to the standard JSON Schema .

Each identity can, theoretically, have a different Traits Schema. This is
useful in the following situations:

- there is more than one type of identity in the system for instance customers, support or staff;
- the system includes both users and robots sometimes also known as  named service accounts;
- the system needs to ingest another company's identity model, and
- the system's identity model changes or grows over time and requires versioning.

The following example illustrates a usage scenario with three types of identities:
Regular customers,
[grandfather accounts](https://en.wikipedia.org/wiki/Grandfather_clause), and
Service Accounts (Microsoft provides
[Service Accounts](https://docs.microsoft.com/en-us/windows/security/identity-protection/access-control/service-accounts)).
There would be one JSON Schema per type of identity:

- Customers: `http://mydomain.com/schemas/v1/customer.schema.json`
- Grandfather Accounts: `http://mydomain.com/schemas/v2/customer.schema.json`
- Service Accounts: `http://mydomain.com/schemas/service-account.schema.json`

ORY Kratos expects the JSON Schemas in its configuration file:

```yaml
identity:
  traits:
    # This will be the default JSON Schema. If  `traits_schema_id` is empty when creating an identity using the
    # Admin API, or a user signs up using a selfservice flow, this schema will be used.
    #
    # This is a required configuration field!
    default_schema_url: http://foo.bar.com/person.schema.json

    # Optionally define additional schemas here:
    schemas:
      # When creating an identity that uses this schema, `traits_schema_id: customer` would be set for that identity.
      - id: customer
        url:  http://foo.bar.com/customer.schema.json
```

ORY Kratos enforces each of these schemas when at an identity's creation or update. The employed business logic must be able to
distingush between these three identities.  The switch statement is used in this case. For example:

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
@aeneas maybe add above default:

## JSON Schema Vocabulary Extensions

As already explained, traits tell ORY Kratos that a particular
field has a system-relevant meaning. That would for example include:

- The email address for recovering a lost password
- The identifier for logging in e.g. username and password or email and
  password
- The phone number for enabling SMS 2FA
- ...

ORY Kratos' JSON Schema Vocabulary Extension can be used within a property:

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

### Identifier for Username and Password Flows

ORY Kratos can set specific fields to be used as the *identifier* e.g. username, email, phone number, etc., in the
Username and Password Registration and Login Flow:

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

      // This tells ORY Kratos that the field should be used as the "username" for the Username and Password Flow.
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

In this example, ORY Kratos understands that traits:email: `office@ory.sh` is the identity's identifier. The system expects `office@ory.sh`
plus a password to sign in.

 [Username and Password Credentials](credentials.md#username-and-password) contains more information and examples.

There are currently no other extensions supported for Identity Traits. Further fields will be added in future releases!
