---
id: rest-api-guidelines
title: REST API Guidelines
---

This design document provides guidelines for specifying API documentation in Go Code using go-swagger, OpenAPI 3.0, and OpenAPI
Generator. This document standardizes Ory's V1 API contract.

## Context and Reference

Ory has an established API and SDK generation system consisting of four parts:

1. Extraction of code comments from Go Code using [Go Swagger](https://goswagger.io/go-swagger/generate-spec/)
   ([example](https://github.com/ory/kratos/blob/bd4af9ab9f872b5dacf6e7abaf2cad5ffc83ddd6/Makefile#L89-L93));
2. Conversion of Swagger 2.0 to OpenAPI Spec 3.0 and applying JsonPatch documents to improve the OpenAPI 3.0 file
   ([example](https://github.com/ory/kratos/blob/bd4af9ab9f872b5dacf6e7abaf2cad5ffc83ddd6/Makefile#L96-L109));
3. Generation of code in the repository itself
   ([example](https://github.com/ory/kratos/blob/bd4af9ab9f872b5dacf6e7abaf2cad5ffc83ddd6/Makefile#L113-L120));
4. Pushing the code to [ory/sdk](https://github.com/ory/sdk)
   ([example](https://github.com/ory/kratos/blob/bd4af9ab9f872b5dacf6e7abaf2cad5ffc83ddd6/.github/workflows/ci.yaml#L221-L234))
   where it is published to Maven, Packagist, npm, and other package repositories.

As projects grew organically, there is a lack of consistency across the API definitions. This document defines rules and
regulations which will bring consistency to our APIs.

## Goals and Non-Goals

Goals:

- Provide consistent naming patterns for API methods.
- Solve coarse-grained versioning.
- Use the existing tool-chain.

Non-goals:

- Fine-grained versioning will be discussed in future work.
- Fixing limitations of OpenAPI Generator:
- Has often problems with discriminators;
- Some templates have code generation bugs;
- Most of the times all code is dumped into one directory making naming conflicts likely;
- Fixing limitations of Go Swagger:
- Only generates Swagger 2.0 (OpenAPI 2.0);
- Has wonky enum generation;
- Discriminators do not work;
- Has problems when multiple definitions for models / parameters / resources exist;
- We need to explicitly include packages we want to use for spec generation, otherwise random definitions end up in the spec;
- gRPC API design is left to future work.

## The Design for OpenAPI

This section discusses how Ory uses OpenAPI 3.0.

### Routes

Routes are the functions of an RPC infrastructure and are annotated using
[`swagger:route`](https://goswagger.io/go-swagger/reference/annotations/route/):

```go
// swagger:route [method] [path pattern] [?tag1 tag2 tag3] [operation id]
```

Non-normative example of a fully-defined route:

```go
// swagger:route GET /admin/identities identities listIdentities
//
// # List Identities
//
// Lists all identities. Does not support search at the moment.
//
// Learn how identities work in [Ory Kratos' User And Identity Model Documentation](https://www.ory.sh/docs/next/kratos/concepts/identity-user-model).
//
//	Produces:
//	- application/json
//
//	Schemes: http, https
//
//	Security:
//	  oryAccessToken:
//
//	Responses:
//	  200: identityList
//	  default: jsonError
```

#### Naming

All route operator names should be named using the following schema:

- `get{ResourceName}` (e.g. `getIdentity`): Retrieves a resource using `GET`.
- `set{ResourceName}` (e.g. `setIdentity`): Replaces a resource using `PUT`.
- `patch{ResourceName}` (e.g. `patchIdentity`): Patches a resource using `PATCH`.
- `delete{ResourceName}` (e.g. `deleteIdentity`): Deletes a resource using `DELETE`.
- `list{ResourceName}s` (e.g. `listIdentities`): Retrieves a list of resources with pagination and optionally filtering using
  `GET`.

If the schema above does not fit your use case, please discuss it with a code owner.

##### Parameters

Parameters of requests or responses should always be written in `snake_case`.

This includes:

- Query (sometimes referred to as "search") parameters (e.g. `?query_param=1&query_param2=test`)
- Parameters in a request or response body (form values or JSON)
- Header names

```go
// Update Registration Flow with Password Method
//
// swagger:model updateRegistrationFlowWithPasswordMethod
type UpdateRegistrationFlowWithPasswordMethod struct {
	// The CSRF Token
	CSRFToken string `json:"csrf_token"`
  // ... other fields
}
```

#### Tags

Tags should denote a functional domain:

- identity
- oauth2
- project
- relationships

#### Security

Unless specified otherwise, administrative actions require an Ory Access Token to be included:

```go
// swagger:route GET /admin/identities identities listIdentities
//
// ...
//
//	Security:
//	  oryAccessToken:
//
//	...
func listIdentities(w http.ResponseWriter, r *http.Request) {}
```

Public routes that don't need authorization can omit this parameter.

#### Request

Routes which have request parameters should have the name of the operation. If the request has a body either use an existing
model, or create a struct named like the parameter and postfixed with `RequestBody`.

##### Non-Normative Example

```go
// An Identity
//
// Represents an identity (e.g. user).
//
// swagger:model identity
type identity struct {
    ID uuid.UUID `json:"id"`
    // ...
}

// Get Identity Request
//
// The request object for getting an identity.
//
// swagger:parameters getIdentity
type getIdentityRequest struct {
    tokenpagination.ResponseHeaderAnnotation

    // Request Body
    //
    // in: body
    Body getIdentityRequestBody // In GET requests we do not have a body but we keep this for the example's sake.
    //
    // Alternatively if a model already exists:
    //
    //   in: body
    //   Body identity


    // Foo Bar
    //
    // Some description
    //
    // in: path
    Foo string `json:"foo"`

    // ...
}

// Request Body for Getting an Identity
//
// swagger:model
type getIdentityRequestBody struct {
    // Perform search.
    Search string `json:"search"`
}

// swagger:route GET /admin/identities identities getIdentity
//
// ...
//
//	Responses:
//	  ...
// ...
func listIdentities(w http.ResponseWriter, r *http.Request) {}
```

#### Pagination

All APIs returning multiple items have to use pagination. To achieve
[efficient paginated SQL queries](https://www.cockroachlabs.com/docs/stable/pagination.html#keyset-pagination), we use token
pagination, where the token is the ID/key/... of the last item in the previous list. The API should return that token encoded in
the `Link` header, so that it points to the next page. An empty string denotes the first page. Tokens should always be treated as
opaque strings. For implementations that still use limit/offset pagination, the token can be the offset until the pagination is
refactored.

##### Example

Below is an example of defining token pagination in OpenAPI.

```go
package example

import "github.com/ory/x/pagination/tokenpagination"

const paginationMaxItems = 1000
const paginationDefaultItems = 250

var paginator = &tokenpagination.TokenPaginator{
	MaxItems:     paginationMaxItems,
	DefaultItems: paginationDefaultItems,
}

// Identity List Request
//
// The request object for listing identities.
//
// swagger:parameters listIdentities
type listIdentitiesRequest struct {
    tokenpagination.RequestParameters

    // ...
}

// Identity List Response
//
// The response given when listing identities.
//
// swagger:response listIdentities
type listIdentitiesResponse struct {
    tokenpagination.ResponseHeaderAnnotation

    // ...
}

// swagger:route GET /admin/identities identities listIdentities
//
// ...
//
//	Responses:
//	  200: listIdentitiesResponse
// ...
func listIdentities(w http.ResponseWriter, r *http.Request) {
    // Parse
    token, itemsPerPage := paginator.ParsePagination(r)

    // List identities here ...

    // Write HTTP header
    var nextToken, approximateTotalCount int
    tokenpagination.PaginationHeader(w, r.URL, approximateTotalCount, nextToken, itemsPerPage)
}
```

##### SQL Example

1. [Parsing pagination parameters](https://github.com/ory/keto/blob/e431978238cbab86723ae3f57104b3e62242d8a0/internal/relationtuple/read_server.go#L138-L150)
2. [SQL query using token pagination](https://github.com/ory/keto/blob/e431978238cbab86723ae3f57104b3e62242d8a0/internal/persistence/sql/relationtuples.go#L212-L215)

#### Responses

Each route defines one or more responses.

##### Common Error Format

Use the same error format for all responses.

###### Generic JSON Error

Use
[`herodot.DefaultError`](https://github.com/ory/herodot/blob/d0a9a9ba23771a55776df5b70b95d736cb0cfece/error_default.go#L17-L68),
[wrapped in the error key](https://github.com/ory/herodot/blob/d0a9a9ba23771a55776df5b70b95d736cb0cfece/json.go#L70-L75):

```json
{
  "error": {
    "code": 404,
    "status": "Not Found",
    "request": "d7e1dbb1-9839-9a7c-974c-3e5c1e839ea3",
    "message": "Requested url does not match any rules"
  }
}
```

###### OAuth2 & OpenID Connect API Error

Some endpoints implement public specifications and need to follow the API design of those specifications. This is specifically the
case for OAuth2 and OpenID Connect. The format
[is described in Ory Fosite](https://github.com/ory/fosite/blob/dc436751dfefa272ba7d64f5edc961c4ffeb1133/errors.go#L479-L485).

##### Default Error Response

Always define a default response. It should usually be a generic error and allows the SDKs to handle unexpected response codes
(e.g. 503) with grace.

```go
// Some Error
//
// Describe the error.
//
// swagger:model someError
type someError struct {
    ErrorExample string `json:"error"`
}

// swagger:route GET /admin/identities identities listIdentities
//
// ...
//
//	Responses:
//	  default: someError
// ...
func listIdentities(w http.ResponseWriter, r *http.Request) {}
```

##### Specific Error Responses

Some APIs are expected to return certain errors. One such example is an expected 404 error when a resource could not be found. It
is a good idea to make these error codes explicit:

```go
// swagger:model errorIdentityNotFound
type errorIdentityNotFound struct {
    ErrorExample string `json:"error"`
}

// swagger:route GET /admin/identities/{id} identities getIdentity
//
// ...
//
//	Responses:
//	  404: errorIdentityNotFound
// ...
func getIdentity(w http.ResponseWriter, r *http.Request) {}
```

Always prefix errors with `error` and try to find a descriptive name, for example: `errorIdentityAlreadyExists`, `errorForbidden`,
`errorUnauthorized`.

##### 204 No Content

Some API calls such as `DELETE` return `204 No Content` without a body. For these responses we use the following annotations:

```go
// Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is typically 204.
//
// swagger:response empty
type emptyResponse struct{}

// swagger:route DELETE /admin/identities/{id} identities deleteIdentity
//
// ...
//
//	Responses:
//	  204: empty
// ...
func deleteIdentity(w http.ResponseWriter, r *http.Request) {}
```

##### Success Responses (200 OK / 201 Created)

Hopefully, your API mostly returns success responses

###### Item

Most APIs return singular items

```go
// An Identity
//
// Represents an identity (e.g. user).
//
// swagger:model identity
type identity struct {
    ID uuid.UUID `json:"id"`
    // ...
}

// swagger:route GET /admin/identities/{id} identities getIdentity
//
// ...
//
//	Responses:
//	  200: identity
// ...
func getIdentity(w http.ResponseWriter, r *http.Request) {}
```

###### Item Lists

Lists of items must always be paginated using token pagination. Edge cases are to be discussed with a code owner.

```go
package example

import "github.com/ory/x/pagination/tokenpagination"

// An Identity
//
// Represents an identity (e.g. user).
//
// swagger:model identity
type identity struct {
    ID uuid.UUID `json:"id"`
    // ...
}

// Identity List Response
//
// The response given when listing identities.
//
// swagger:response listIdentities
type listIdentitiesResponse struct {
    tokenpagination.ResponseHeaderAnnotation

    // The list
    //
    // in: body
    Body []identity
}

// swagger:route GET /admin/identities identities listIdentities
//
// ...
//
//	Responses:
//	  200: listIdentities
// ...
func listIdentities(w http.ResponseWriter, r *http.Request) {}
```

### Models

Models should have simplified names (`identity`, `oauth2Consent`, `accessToken`, `sessionCookie`, `relationship`) and not
`packageModuleConceptErrorStrategy`.

:::danger

Model names are not scoped, so it is important to ensure the name is precise enough to be unique across all Ory projects.

:::

#### Polymorph Object

Prefer `json.RawMessage` over `interface{}`:

```patch
// Some model
//
// swagger:model someModel
type someModel struct {
-    Polymorph interface{} `json:"polymorph"`
+    Polymorph json.RawMessage `json:"polymorph"`
}
```

### Enums

`go-swagger` supports enums, but with a few caveats:

1. `iota` or generally int enums are not supported, especially when using a custom `MarshalJSON` implementation.
2. The enum type has to have the same name as the enum name annotation.
3. The enum values have to be defined in one `const` block following the type definition.

See this example from [the go-swagger PR](https://github.com/go-swagger/go-swagger/pull/2176):

```go
// swagger:enum Level
type Level string

const (
	LEVEL_1 Level = "ONE"
	LEVEL_2 Level = "TWO"
	LEVEL_3 Level = "THREE"
)

// swagger:enum LevelInt
type LevelInt int

const (
	LEVEL_INT_1 LevelInt = 1
	LEVEL_INT_2 LevelInt = 2
	LEVEL_INT_3 LevelInt = 3
)

// swagger:model
type Model struct {
	level    Level
	levelInt LevelInt
}
```

which results in

```yaml
definitions:
  Model:
    type: "object"
    properties:
      level:
        type: "string"
        enum:
          - "ONE"
          - "TWO"
          - "THREE"
      levelInt:
        type: "integer"
        enum:
          - 1
          - 2
          - 3
```

### Edge Cases

Generating good OpenAPI specifications is not easy and there are several pitfalls. Especially polymorphism, enums, and OpenAPI
3.0-only features are hard to get right with go-swagger. A straight-forward way to fix-up definitions is to use JsonPatches which
will be applied by the Ory CLI tooling. Enums should preferably defined as in the [Enums](#enums) section, but can be patched in
advanced cases as well.

#### Examples

- [Example with Enums, Discriminators, Polymorphism](https://github.com/ory/kratos/blob/bd4af9ab9f872b5dacf6e7abaf2cad5ffc83ddd6/.schema/openapi/patches/selfservice.yaml)
- [Cleaning up Polymorphism and Enums](https://github.com/ory/kratos/blob/bd4af9ab9f872b5dacf6e7abaf2cad5ffc83ddd6/.schema/openapi/patches/identity.yaml)

## API

This section iterates over samples of existing projects' OpenAPI Specs to clarify naming conventions.

### Design Decisions

When multiple tags exist one might think that the code is created in isolation. All code for tag `oauth2` is in one package, and
all code for `identity` in another. That however is not the case, which is problematic because we need to avoid naming collisions
between packages. There are two ways to achieve that:

1. Auto-prefix all models, structs, classes with the tag name;
2. Include the tag name manually in functions, classes, structs, models, ...

Unfortunately, auto-prefixing is not available in all OpenAPI generators, and it creates a bit of an awkward API. We therefore
chose to include the tags manually in the operation names, which you can see in the example below.

### Exemplary Definitions

:::note

The definitions below most likely contain inconsistencies and bad naming. Contributions and ideas are welcomed.

:::

| Method | Notes (Aeneas) | Route                                         | Tag          | Op                                 | Request                         | Response                                                 |
| ------ | -------------- | --------------------------------------------- | ------------ | ---------------------------------- | ------------------------------- | -------------------------------------------------------- |
| GET    |                | /.well-known/openid-configuration             | oidc         | discoverOpenIdConnectConfiguration |                                 | oidcConfiguration, errorOAuth2                           |
| GET    |                | /.well-known/jwks.json                        | wellknown    | discoverWellKnownJsonWebKeys       |                                 | jsonWebKeySet, errorOAuth2                               |
| GET    |                | /admin/clients                                | oauth2       | listOAuth2Clients                  | listOAuth2Clients               | listOAuth2Clients, errorGeneric                          |
| POST   |                | /admin/clients                                | oauth2       | createOAuth2Client                 | createOAuth2Client              | oauth2Client, errorOAuth2ClientNotFound, errorGeneric    |
| PUT    |                | /admin/clients/{id}/lifespans                 | oauth2       | setOAuth2ClientLifespans           | setOAuth2ClientLifespans        | oauth2Client, errorOAuth2ClientNotFound, errorGeneric    |
| DELETE |                | /admin/keys/{set}                             | jwk          | deleteJsonWebKeySet                | deleteJsonWebKeySet             | empty, errorJsonWebKeySetNotFound                        |
| DELETE |                | /admin/keys/{set}/{kid}                       | jwk          | deleteJsonWebKey                   | deleteJsonWebKey                | empty, errorJsonWebKeyNotFound                           |
| PUT    |                | /admin/oauth2/auth/requests/consent/accept    | oauth2       | acceptOAuth2ConsentRequest         | acceptOAuth2Consent             | acceptedOAuth2ConsentRequest, errorGeneric               |
| DELETE |                | /admin/oauth2/auth/sessions/consent           | oauth2       | revokeOAuth2ConsentSessions        | revokeOAuth2ConsentSessions     | empty, errorGeneric                                      |
| POST   |                | /admin/trust/grants/jwt-bearer/issuers        | oauth2       | trustOAuth2JwtGrantIssuer          | trustOAuth2JwtGrantIssuer       | trustedOAuth2JwtGrantIssuer, errorGeneric                |
| GET    |                | /admin/oauth2/introspect                      | oauth2       | introspectOAuth2Token              | introspectOAuth2Token           | introspectedOAuth2Token, errorOAuth2                     |
| POST   |                | /oauth2/register                              | oidc         | createOidcDynamicClient            | oAuth2Client                    | oAuth2Client, errorOAuth2                                |
| GET    |                | /oauth2/register/{id}                         | oidc         | getOidcDynamicClient               | oAuth2Client                    | oAuth2Client, errorOAuth2                                |
| POST   |                | /oauth2/revoke                                | oauth2       | revokeOAuth2Token                  | revokeOAuth2Token               | emptyResponse, errorOAuth2                               |
| GET    |                | /oauth2/sessions/logout                       | oidc         | revokeOidcSession                  | revokeOidcSession               | emptyResponse, 303                                       |
| POST   |                | /oauth2/token                                 | oauth2       | oauth2TokenExchange                | oauth2TokenExchange             | oauth2Tokens, errorOAuth2                                |
| GET    |                | /oauth2/auth                                  | oauth2       | oauth2Authorize                    | oauth2Authorize                 | 302, html                                                |
| GET    |                | /userinfo                                     | oidc         | oidcUserinfo                       | oidcUserinfo                    | oidcUserinfo, errorOAuth2                                |
| POST   |                | /relation-tuples                              | relationship | createRelationship                 | createRelationship              | relationship, errorGeneric                               |
| GET    |                | /relation-tuples/check/openapi                | relationship | hasRelationship                    | hasRelationship                 | hasRelationship, errorGeneric                            |
| GET    |                | /relation-tuples/check                        | relationship | hasRelationshipOrError             | hasRelationshipOrError          | hasRelationship, errorNoRelationship, errorGeneric       |
| GET    |                | /relation-tuples/expand                       | relationship | expandRelationship                 | expandRelationship              | expandedRelationship, errorGeneric                       |
| GET    |                | /.well-known/ory/webauthn.js                  | identity     | getWebAuthnJavaScript              |                                 | 200 application/javascript                               |
| GET    |                | /admin/courier/messages                       | courier      | listCourierMessages                | listCourierMessages             | listCourierMessages, errorGeneric                        |
| GET    |                | /admin/identities/{id}                        | identity     | getIdentity                        | getIdentity                     | identity, errorIdentityNotFound, errorGeneric            |
| DELETE |                | /admin/identities/{id}/sessions               | identity     | deleteIdentitySessions             | deleteIdentitySessions          | empty, errorIdentityNotFound, errorGeneric               |
| POST   |                | /admin/recovery/code                          | identity     | createRecoveryCodeForIdentity      | createRecoveryCodeForIdentity   | identityRecoveryCode, errorGeneric                       |
| POST   |                | /admin/sessions/{id}/extend                   | identity     | prolongIdentitySession             | prolongIdentitySession          | session, errorGeneric                                    |
| GET    |                | /schemas/{id}                                 | identity     | getIdentitySchema                  | getIdentitySchema               | identitySchema, errorGeneric                             |
| POST   |                | /self-service/login                           | fontend      | submitFrontendLogin                | submitFrontendLogin             | 302, frontendLoginResult                                 |
| GET    |                | /self-service/login/api                       | fontend      | initFrontendLoginWithoutBrowser    | initFrontendLoginWithoutBrowser | 302, frontendLogin, errorGeneric                         |
| GET    |                | /self-service/login/browser                   | fontend      | initFrontendLoginForBrowser        | initFrontendLoginForBrowser     | frontendLogin, errorGeneric                              |
| GET    |                | /sessions                                     | identity     | getMySessions                      | getMySessions                   | getMySessions, errorGeneric                              |
| GET    |                | /sessions/whoami                              | identity     | toSession                          | toSession                       | session, errorGeneric, errorUnauthorized, errorForbidden |
| GET    |                | /.well-known/identity-meta-schema             | identity     | getIdentityMetaSchema              |                                 | 200 application/json, errorGeneric                       |
| DELETE |                | /cname/{cname_host}                           | project      | deleteCustomDomain                 | deleteCustomDomain              | empty, errorGeneric                                      |
| GET    |                | /identity-schemas                             | project      | getManagedIdentitySchemas          |                                 | getManagedIdentitySchemas, errorGeneric                  |
| GET    |                | /invites/manage/{project}/project             | project      | getProjectInvites                  | getProjectInvites               | getProjectInvites, errorGeneric                          |
| GET    |                | /projects/{project_id}/cname                  | project      | listProjectCustomDomains           | listProjectCustomDomains        | listProjectCustomDomains, errorGeneric                   |
| PATCH  |                | /projects/{project_id}/revision/{revision_id} | project      | patchProjectUsingRevision          | patchProjectUsingRevision       | patchProjectUsingRevision, errorGeneric                  |
