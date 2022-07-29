---
id: json-schema-json-paths
title: JSON schema and JSON paths
---

[JSON Schema](https://json-schema.org) is a vocabulary that allows you to annotate and validate JSON documents. It's a IETF
(Internet and Engineering Task Force) public standard and is similar to a XML DTD but suited for JSON payloads.

We rely on JSON Schema heavily internally, from configuration validation to generating OpenAPI Spec to writing documentation. By
using Ory Kratos, you will be exposed to JSON Schema as it's used for defining Identity Schemas and other things.

To learn more about JSON Schema, head over to [json-schema.org/learn/](https://json-schema.org/learn/).

Ory Kratos is using JSON Schema Draft7.

## JSON Path Syntax

In some cases you can define a JSON Path. We use [`tidwall/gjson`](https://github.com/tidwall/gjson) for this. A GJSON Path is a
text string syntax that describes a search pattern for quickly retrieving values from a JSON payload.

There are two types of JSON Paths:

- Reading JSON using the [GJSON Syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md);
- Writing JSON using the [SJSON Syntax](https://github.com/tidwall/sjson#path-syntax).
