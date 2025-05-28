---
id: sbom
title: Software Bill Of Materials (SBOM) Reports
sidebar_label: SBOM
---

[SBOM](https://en.wikipedia.org/wiki/Software_bill_of_materials) is a list of components in a piece of software. It is like a list
of ingredients of a product and is quickly becoming a standard for software supply chain risk management. The ecosystem is growing
with tools that help you verify, scan and monitor all your dependencies.

## Report Standards

SBOM reports primarily use [SPDX](https://en.wikipedia.org/wiki/Software_Package_Data_Exchange) &
[CycloneDX](https://cyclonedx.org/) standards.

## Reports

> **Note:** This is supported for all versions >=0.3.8

You can find the SBOM reports as artifacts in our container registry at the locations below. They are updated every time there is
change in the codebase and tagged by the exact version we release.

| Location                                        | Files                         | Context                               |
| ----------------------------------------------- | ----------------------------- | ------------------------------------- |
| `ghcr.io/boxyhq/jackson/sbom:service-<version>` | `sbom.spdx`, `sbom.cyclonedx` | SAML Jackson service                  |
| `ghcr.io/boxyhq/jackson/sbom:npm-<version>`     | `sbom.spdx`, `sbom.cyclonedx` | NPM package                           |
| `ghcr.io/boxyhq/jackson/sbom:docker-<version>`  | `sbom.spdx`, `sbom.cyclonedx` | Docker Image for SAML Jackson service |

You can use [oras](https://oras.land) (or a similar OCI artifacts tool) to retrieve these files.

```bash
oras pull ghcr.io/boxyhq/jackson/sbom:service-<version>
```
