---
id: contributing
title: Contributing
---

This document is a work in progress. We will be documenting the inner workings
of the ORY GitHub ecosystem and project structures in here. If you feel there is
something missing or should be added, please open an issue in
[ory/docs](https://github.com/ory/docs) or contact us on the
[forum](https://community.ory.sh/) or [chat](https://www.ory.sh/chat).

## Releasing Software

To release a project, run the following bash command in the root of the project
you would like to release. The first argument can be one of:

- `patch` bumps `v1.2.3` to `v1.2.4` (does not work for pre-releases such as
  `v1.2.3-beta.1`)
- `minor` bumps `v1.2.3` to `v1.3.0` (does not work for pre-releases such as
  `v1.2.3-beta.1`)
- `major` bumps `v1.2.3` to `v2.0.0` (does not work for pre-releases such as
  `v1.2.3-beta.1`)
- Any [semver-valid](https://semver.org) version, for example `v1.2.3-beta.1`

```shell script
release_as=v1.2.3
bash <(curl -s https://raw.githubusercontent.com/ory/meta/master/scripts/release.sh) $release_as
```

### Defining Release Config

For the scripts to work, the project must be located in a directory structure
that reflects the GitHub organisation and repository name, for example:
`path/to/ory/hydra`.

#### Goreleaser

We use [goreleaser](https://github.com/goreleaser/goreleaser/releases).

The listed configuration options should be included in every `.goreleaser.yml`
config. Make sure you set env vars and `go mod download` and run e.g. packr2 and
other tools first:

```yaml title=".goreleaser.yml"
env:
  - GO111MODULE=on

before:
  hooks:
    - go mod download
    # - go install github.com/gobuffalo/packr/v2/packr2
    # - packr2
```

Tag `-alpha.1` and other pre-release tags as pre-release on GitHub:

```yaml
release:
  prerelease: auto
```

Name snapshot releases `-next`:

```yaml
snapshot:
  name_template: '{{ .Tag }}-next'
```

If you create a new goreleaser config, you may also want to create the following
empty GitHub repositories:

Build and publish on Docker. You need to create a repository on Docker Hub
first!

```yaml
# Build dockerfiles
dockers:
  - dockerfile: Dockerfile
    binaries:
      - $PROJECT_NAME
    image_templates:
      - 'oryd/$PROJECT_NAME:v{{ .Major }}'
      - 'oryd/$PROJECT_NAME:v{{ .Major }}.{{ .Minor }}'
      - 'oryd/$PROJECT_NAME:v{{ .Major }}.{{ .Minor }}.{{ .Patch }}'
      - 'oryd/$PROJECT_NAME:latest'
```

If you add [Scoop](https://scoop.sh) (Homebrew for Windows) you must also create
a GitHub repository under the `ory` org named `scoop-$PROJECT_NAME` (e.g.
`scoop-hydra`).

```yaml
scoop:
  bucket:
    owner: ory
    name: scoop-$PROJECT_NAME
  homepage: https://www.ory.sh
  commit_author:
    name: aeneasr
    email: aeneas@ory.sh
```

If you add [Homebrew](https://brew.sh) you must also create a GitHub repository
under the `ory` org named `homebrew-$PROJECT_NAME` (e.g. `homebrew-hydra`).

```yaml
brews:
  - github:
      owner: ory
      name: homebrew-$PROJECT_NAME
    ids:
      - <<REPLACE-WITH-ARCHIVE-ID>>
    homepage: https://www.ory.sh
    commit_author:
      name: aeneasr
      email: aeneas@ory.sh
```

We use the following replacements:

```yaml
archives:
  - replacements:
      darwin: macOS
      386: 32-bit
      amd64: 64-bit
    format_overrides:
      - goos: windows
        format: zip
```

### Update install script

When you have finalized changes to the `.goreleaser.yml`, run:

```shell
$ GO111MODULES=off go get -u github.com/goreleaser/godownloader
$ godownloader .goreleaser.yml --repo=$(basename $(dirname $(pwd)))/$(basename $(pwd)) > ./install.sh
```

### CircleCI

Define CI Environment Variables:

- [ ] Make sure you set `GITHUB_TOKEN` in the project's CI config.
- [ ] Make sure you set `MAILCHIMP_API_KEY` in the project's CI config.
- [ ] Make sure you set `DOCKER_USER` in the project's CI config.
- [ ] Make sure you set `DOCKER_TOKEN` in the project's CI config.

In the project's CircleCI config (`.circleci/config.yml`), use the following
workflow (please use an appropriate `$VERSION`):

```yaml
orbs:
  goreleaser: ory/goreleaser@0.1.7
  slack: circleci/slack@3.4.2

workflows:
  my-workflow:
    jobs:
      - goreleaser/test:
          filters:
            tags:
              only: /.*/
      - goreleaser/release:
          requires:
            - goreleaser/test
          filters:
            branches:
              ignore: /.*/
            tags:
              only: /.*/

      - goreleaser/newsletter-draft:
          chimp-list: f605a41b53
          chimp-segment: 6478605
          requires:
            - goreleaser/release
          filters:
            tags:
              only: /.*/
      - slack/approval-notification:
          message: Pending approval
          channel: release-automation
          requires:
            - goreleaser/newsletter-draft
          filters:
            tags:
              only: /.*/
      - newsletter-approval:
          type: approval
          requires:
            - goreleaser/newsletter-draft
          filters:
            tags:
              only: /.*/
      - goreleaser/newsletter-send:
          chimp-list: f605a41b53
          requires:
            - newsletter-approval
          filters:
            tags:
              only: /.*/
```

## CI

We use [our own CircleCI Orbs](http://github.com/ory/ci):

### ory/nancy

Enables nancy vulnerability scanning for the repository.

```yml
orbs:
  nancy: ory/nancy@0.0.9

workflows:
  test:
    jobs:
      - nancy/test:
        filters:
          tags:
            only: /.*/
```

## Toolchain

### Checking for vulnerabilities

#### NodeJS

This is done automatically by GitHub

#### Go

```
# Outside of a go module-enabled project:
$ go get -u github.com/sonatype-nexus-community/nancy

# Inside your go module-enabled project:
$ go mod list -m all | nancy
```

### Pinning indirect go module dependencies.

Sometimes a project has an indirect dependency (another dependency requires that
dependency) which does not pass, for example, `nancy` vulnerability scanning.
Because it's not possible to pin this dependency to a specific version, we need
to explicitly require it. But because it's not directly required by our code, it
will be pruned when using `go mod tidy`. To prevent that, create a file which
imports the dependency without use:

```title="go_mod_indirect_pins.go
// +build go_mod_indirect_pins

package main

import _ "github.com/my/dependency"
```

You would do the same if the project uses dev tools such as `packr2`,
`goimports`, `goreturns`, `swagutil`, ... as part of e.g. the Makefile or other
scripts.

## Development

### DBAL gobuffalo/pop

#### Table Names

Please define custom table names for all table structs. Keep in mind that
`TableName()` must be a value receiver, not a pointer receiver, for slices
`[]Model` to work properly:

```diff
-func (m *Model) TableName(ctx context.Context) string {
+func (m Model) TableName(ctx context.Context) string {
 	return "foo"
}
```
