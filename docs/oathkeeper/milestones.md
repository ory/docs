---
id: milestones
title: Milestones and Roadmap
---

## [v0.39.0](https://github.com/ory/oathkeeper/milestone/7)

_This milestone does not have a description._

### [Bug](https://github.com/ory/oathkeeper/labels/bug)

Something is not working.

#### Issues

- [ ] Integrate with Traefik, Nginx, Ambassador, Envoy
      ([oathkeeper#263](https://github.com/ory/oathkeeper/issues/263))
- [ ] Rule mutator template changes not reloaded after file update
      ([oathkeeper#272](https://github.com/ory/oathkeeper/issues/272))
- [ ] Log specified http request headers
      ([oathkeeper#361](https://github.com/ory/oathkeeper/issues/361))
- [ ] Timeout in oauth2_client_credentials when using self-signed certificates
      ([oathkeeper#368](https://github.com/ory/oathkeeper/issues/368))
- [ ] JWT validation sometimes appends trailing slash to issuer
      ([oathkeeper#527](https://github.com/ory/oathkeeper/issues/527))
- [ ] I found some data race warnings
      ([oathkeeper#574](https://github.com/ory/oathkeeper/issues/574))
- [x] oauth2_introspection not parsing single string aud valie
      ([oathkeeper#491](https://github.com/ory/oathkeeper/issues/491))
- [x] "fatal error: concurrent map writes" panic, unable to reproduce
      ([oathkeeper#551](https://github.com/ory/oathkeeper/issues/551)) -
      [@hackerman](https://github.com/aeneasr)
- [x] Authenticator oauth2_introspection only works if token_type returned is an
      "access_token"
      ([oathkeeper#553](https://github.com/ory/oathkeeper/issues/553))

### [Feat](https://github.com/ory/oathkeeper/labels/feat)

New feature or request.

#### Issues

- [ ] Implement GRPC response handler in Decisions API
      ([oathkeeper#134](https://github.com/ory/oathkeeper/issues/134))
- [ ] Switch to go-jose key generation lib
      ([oathkeeper#419](https://github.com/ory/oathkeeper/issues/419))
- [ ] Start as Envoy AuthService
      ([oathkeeper#560](https://github.com/ory/oathkeeper/issues/560))
- [ ] Hydator Mutator Client Credential
      ([oathkeeper#565](https://github.com/ory/oathkeeper/issues/565))
- [ ] Header and Cookie Mutators should sign the payloads
      ([oathkeeper#176](https://github.com/ory/oathkeeper/issues/176))
- [ ] Url matching http method should be available in authenticators
      ([oathkeeper#221](https://github.com/ory/oathkeeper/issues/221))
- [ ] Better logging
      ([oathkeeper#227](https://github.com/ory/oathkeeper/issues/227))
- [ ] Iterate over all the available JWKs and see which one is valid when no KID
      is present on the JWT header
      ([oathkeeper#362](https://github.com/ory/oathkeeper/issues/362))
- [ ] Consider jsonnet for templating
      ([oathkeeper#423](https://github.com/ory/oathkeeper/issues/423)) -
      [@hackerman](https://github.com/aeneasr)
- [x] Oathkeeper behind ssl terminating balancer
      ([oathkeeper#153](https://github.com/ory/oathkeeper/issues/153))
- [x] Pass query parameters to the hydrator
      ([oathkeeper#339](https://github.com/ory/oathkeeper/issues/339))
- [x] Clean up logging in case of invalid credentials
      ([oathkeeper#505](https://github.com/ory/oathkeeper/issues/505))
- [x] remote_json: Enable timeout configuration for calls to authorization
      endpoint ([oathkeeper#515](https://github.com/ory/oathkeeper/issues/515))
- [x] Fetch JWKs from object storage (S3)
      ([oathkeeper#518](https://github.com/ory/oathkeeper/issues/518))
- [x] Enable forwarding of original authorization header to (remote) authorizer
      ([oathkeeper#528](https://github.com/ory/oathkeeper/issues/528)) -
      [@hackerman](https://github.com/aeneasr)

#### Pull Requests

- [ ] refactor: refactor decisions API and add traefik (#486)
      ([oathkeeper#487](https://github.com/ory/oathkeeper/pull/487)) -
      [@hackerman](https://github.com/aeneasr)

## [v0.38.0](https://github.com/ory/oathkeeper/milestone/6)

_This milestone does not have a description._

### [Bug](https://github.com/ory/oathkeeper/labels/bug)

Something is not working.

#### Issues

- [x] Use another Policy server than Keto
      ([oathkeeper#288](https://github.com/ory/oathkeeper/issues/288))
- [x] Unable to set array config options via environment variables
      ([oathkeeper#342](https://github.com/ory/oathkeeper/issues/342)) -
      [@Patrik](https://github.com/zepatrik)
- [x] High latencies
      ([oathkeeper#346](https://github.com/ory/oathkeeper/issues/346)) -
      [@hackerman](https://github.com/aeneasr)
- [x] Investigate failing test case on master
      ([oathkeeper#371](https://github.com/ory/oathkeeper/issues/371)) -
      [@hackerman](https://github.com/aeneasr)

### [Feat](https://github.com/ory/oathkeeper/labels/feat)

New feature or request.

#### Issues

- [x] Implement generic JSON-RPC Authorizer `remote_json`
      ([oathkeeper#201](https://github.com/ory/oathkeeper/issues/201))
- [x] Log Rule Id on malformed configuration error
      ([oathkeeper#383](https://github.com/ory/oathkeeper/issues/383))
- [x] Cache hydrate calls
      ([oathkeeper#417](https://github.com/ory/oathkeeper/issues/417)) -
      [@null](https://github.com/pike1212)

#### Pull Requests

- [x] Feature/global auth session
      ([oathkeeper#358](https://github.com/ory/oathkeeper/pull/358)) -
      [@hackerman](https://github.com/aeneasr)
- [x] fix: replace segment with our own sqa endpoint
      ([oathkeeper#385](https://github.com/ory/oathkeeper/pull/385)) -
      [@hackerman](https://github.com/aeneasr)

## [v0.20.0](https://github.com/ory/oathkeeper/milestone/5)

_This milestone does not have a description._

### [Bug](https://github.com/ory/oathkeeper/labels/bug)

Something is not working.

#### Issues

- [x] Client Credentials Authenticators not compatible with Hydra?
      ([oathkeeper#260](https://github.com/ory/oathkeeper/issues/260)) -
      [@hackerman](https://github.com/aeneasr)

### [Feat](https://github.com/ory/oathkeeper/labels/feat)

New feature or request.

#### Pull Requests

- [x] rule: Add migration capabilities
      ([oathkeeper#268](https://github.com/ory/oathkeeper/pull/268)) -
      [@hackerman](https://github.com/aeneasr)

## [v0.19.0](https://github.com/ory/oathkeeper/milestone/4)

_This milestone does not have a description._

### [Feat](https://github.com/ory/oathkeeper/labels/feat)

New feature or request.

#### Issues

- [x] Extend JWT authenticator per rule config with global config
      ([oathkeeper#255](https://github.com/ory/oathkeeper/issues/255)) -
      [@hackerman](https://github.com/aeneasr)
- [x] Version access rules
      ([oathkeeper#266](https://github.com/ory/oathkeeper/issues/266)) -
      [@hackerman](https://github.com/aeneasr)

## [v1.0.0](https://github.com/ory/oathkeeper/milestone/2)

_This milestone does not have a description._

### [Bug](https://github.com/ory/oathkeeper/labels/bug)

Something is not working.

#### Issues

- [x] Adopt new Keto SDK
      ([oathkeeper#172](https://github.com/ory/oathkeeper/issues/172))

### [Feat](https://github.com/ory/oathkeeper/labels/feat)

New feature or request.

#### Issues

- [x] TLS Termination 'X-Forwarded-Proto'
      ([oathkeeper#95](https://github.com/ory/oathkeeper/issues/95))
- [x] Provide an endpoint that allows to fetch configuration information
      ([oathkeeper#131](https://github.com/ory/oathkeeper/issues/131)) -
      [@hackerman](https://github.com/aeneasr),
      [@Patrik](https://github.com/zepatrik)
- [x] Adopt new Keto SDK
      ([oathkeeper#172](https://github.com/ory/oathkeeper/issues/172))
- [x] Add file watcher for config file
      ([oathkeeper#215](https://github.com/ory/oathkeeper/issues/215)) -
      [@hackerman](https://github.com/aeneasr)
- [x] Add file watcher for access rules
      ([oathkeeper#216](https://github.com/ory/oathkeeper/issues/216)) -
      [@hackerman](https://github.com/aeneasr)

### [Rfc](https://github.com/ory/oathkeeper/labels/rfc)

A request for comments to discuss and share ideas.

#### Issues

- [x] Customizable on unauthenticated, forbidden, route not found, and other
      error handlers
      ([oathkeeper#284](https://github.com/ory/oathkeeper/issues/284))

## [v1.0.0-rc.1](https://github.com/ory/oathkeeper/milestone/1)

_This milestone does not have a description._

### [Bug](https://github.com/ory/oathkeeper/labels/bug)

Something is not working.

#### Pull Requests

- [x] cmd: Disable cors per default
      ([oathkeeper#107](https://github.com/ory/oathkeeper/pull/107)) -
      [@hackerman](https://github.com/aeneasr)
- [x] proxy: Improve compatibility with ORY Hydra 1.0.0-beta.8
      ([oathkeeper#108](https://github.com/ory/oathkeeper/pull/108)) -
      [@hackerman](https://github.com/aeneasr)

### [Feat](https://github.com/ory/oathkeeper/labels/feat)

New feature or request.

#### Issues

- [x] Slow POST through proxy causes timeout after 5 seconds
      ([oathkeeper#64](https://github.com/ory/oathkeeper/issues/64)) -
      [@hackerman](https://github.com/aeneasr)
- [x] Add JWT authenticator
      ([oathkeeper#112](https://github.com/ory/oathkeeper/issues/112)) -
      [@hackerman](https://github.com/aeneasr)

#### Pull Requests

- [x] cmd: Disable cors per default
      ([oathkeeper#107](https://github.com/ory/oathkeeper/pull/107)) -
      [@hackerman](https://github.com/aeneasr)
- [x] proxy: Add JWT authenticator
      ([oathkeeper#109](https://github.com/ory/oathkeeper/pull/109)) -
      [@hackerman](https://github.com/aeneasr)
