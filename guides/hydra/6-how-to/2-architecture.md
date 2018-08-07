# How to integrate ORY Hydra

This article explains how you to integrate ORY Hydra in your system.

<!-- toc -->

## Overview

A high-level overview of the interaction between a client, ORY Hydra (Authorization Server) and an API looks as follows:

[`sequenceDiagram
  participant Client
  participant ORY Hydra
  participant API

  Client->>ORY Hydra: Perform OAuth 2.0 Flow
  ORY Hydra->>Client: Access Token
  Client->>API: Request with Access Token
  API->ORY Hydra: Validates Access Token
  API->>Client: Response`](./images/basic-oauth2-system.png)

