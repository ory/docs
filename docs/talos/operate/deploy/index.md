---
title: Deploy
---

Deploy Ory Talos as a standalone binary or Docker container.

## Deployment options

| Method              | Best for                            |
| ------------------- | ----------------------------------- |
| [Docker](docker.md) | Development, small-scale production |
| Binary              | Custom deployments                  |

## Architecture options

| Topology                                              | Edition         | Description                                                                  |
| ----------------------------------------------------- | --------------- | ---------------------------------------------------------------------------- |
| Single-node                                           | OSS, commercial | One `talos serve` process exposes both the admin and public APIs.            |
| [Separate admin and public APIs](deployment-modes.md) | OSS, commercial | `talos serve admin` for the admin API, `talos serve public` for self-revoke. |
| [Edge proxy](edge-proxy.mdx)                          | Commercial only | `talos proxy` sidecars cache verify responses next to your application.      |
