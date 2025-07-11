---
id: sqa
title: Software quality assurance
---

Our goal is to provide you with the fastest and most reliable open source services. To achieve this goal, we collect metrics on
endpoint performance and send a **fully anonymized** telemetry report ("anonymous usage statistics") to our servers. This data
helps us understand how changes impact performance and stability of our open source service and identify potential issues.

We're committed to full transparency on what data we transmit why and how. The source code of the telemetry package is open source
and located [here](https://github.com/ory/x/blob/master/metricsx). If you don't wish to help us improve our projects by sharing
telemetry data, it's possible to [opt out of this feature](#opt-out).

## Data processing

We want to give you a thorough understanding why we collect this data, how we collect it, and what we do with it, as well as
real-world examples of how this data improved a project.

The data processing pipeline has the following steps:

1. Telemetry data is collected at each service.
2. Periodically this data is sent to `sqa.ory.sh`.
3. Data is forwarded to a private Google cloud storage Bucket owned by the Ory organization. The data isn't shared with any other
   party.
4. The GCS Bucket(s) are periodically downloaded onto Google compute engine virtual machines.
5. The downloaded data is extracted, filtered, processed, and analyzed. The output is a CSV report which we analyze using Open
   Office.

We built this pipeline with the following goals in mind:

- Be able to say how many production deployments exist.
- Understand which features are used and how.
- Understand how much throughput deployments handle.
- Evaluate how frequently specific features are used.
- Detect issues introduced by new features (such as a buggy releases).
- Identify problems at scale (such as slow endpoints).
- Understand which versions are deployed.

The following real-world outcomes have been achieved using this data (excerpt):

1. We were able to identify that Ory Hydra's Warden and Policy API were heavily underused and decided to move these APIs to a
   different project (Ory Keto) which has been received very well by the community.
2. A v1.0.0 beta released caused a heavy increase in response times for certain environments at one Consent API endpoint. We
   identified that a missing database index caused this issue and resolved it in the next patch.
3. We learned that many developers still run old versions, sometimes with critical security vulnerabilities. To resolve this, we
   improved the release process and introduced a release newsletter. Use of vulnerable versions has dropped by 20% since then.
4. A heavy uptake in usage of Ory Keto showed us that we need to provide certain migration tools for an update that introduces
   breaking changes. We were under the impression that the service was only used in test environments.

## Opt out

You can opt out of software quality assurance features (telemetry)

- by providing the `--sqa-opt-out` flag.

Disabling telemetry doesn't have any downsides, except for us not being able to improve the project. Note that Ory always sends
minimal ping with version information once on start up.

## Data privacy

To protect your privacy, we filter out any data that could identify you or your users. We're taking the following measures to
protect your privacy:

1. We only transmit information on how often endpoints are requested, how fast they respond and what HTTP status code was sent.
2. We filter out any query parameters, headers, response and request bodies and path parameters. A full list of transmitted URL
   paths is listed in section [Request telemetry](#request-telemetry).
3. **We're unable to see or store the IP address of your host**, as the
   [IP is set to `0.0.0.0`](https://github.com/ory/x/blob/master/metricsx/middleware.go) when transmitting data to our metrics
   aggregator.
4. We don't transmit any environment information from the host, except:

- Operating system id (windows, linux, osx)
- The target architecture (amd64, darwin, ...)
- Number of CPUs available
- Binary build time, git hash, git tag
- Memory consumption of the process

The information is stored in an aggregated format without any personally identifiable information.

### Identification

To identify an installation and group together clusters, we create a SHA-256 hash of unique information (for example host, port)
for identification. Additionally, each running instance is identified using an unique identifier which is set every time the
service starts. The identifier is a Universally Unique Identifier (V4) and is thus a cryptographically safe random string.
Identification is triggered when we're confident that the instance isn't a test instance (for example one of the tutorials or a
local installation).

We collect the following system metrics:

- `goarch`: The target architecture of the service binary.
- `goos`: The target system of the service binary.
- `numCpu`: The number of CPUs available.
- `runtimeVersion`: The go version used to create the binary.
- `version`: The version of this binary.
- `hash`: The git hash of this binary.
- `buildTime`: The build time of this binary.

### Request telemetry

The IP addresses of both host and client are anonymized to `0.0.0.0`.

We collect the following request metrics:

- `host`: Request URL host name
- `path`: AllowList defined part of the request URL path
  - `/self-service/login/browser?refresh=true&aal=aal1` becomes `/self-service/login/browser`
  - `/policies?owner=foo` becomes `/policies`
- `method`: Request HTTP method
- `latency`: Request execution time in milliseconds
- `size`: Response size

### Source code

The full code-base is [open source](https://github.com/ory/x/blob/master/metricsx).

### Data example

The following code snippet represents two raw event types (`page` and `identify`) collected by a real Ory Hydra instance:

```json
[
  {
    "context": {
      "ip": "0.0.0.0",
      "library": {
        "name": "analytics-go",
        "version": "3.0.0"
      }
    },
    "messageId": "21999137-d1d2-4102-9a94-57beed5e5fca",
    "timestamp": "2018-01-18T18:41:37.028Z",
    "traits": {
      "buildTime": "2018-01-18 18:41:35.6222348 +0000 UTC",
      "goarch": "amd64",
      "goos": "windows",
      "hash": "undefined",
      "instanceId": "c2bdd39c-3b0a-4f3d-b394-8e51f23833c4",
      "numCpu": 8,
      "runtimeVersion": "go1.9",
      "version": "dev-master"
    },
    "type": "identify",
    "userId": "22b137b6aae9bc40feb7ff14a08a1b9ecbc6305f77956214404c5b744c3b3fe2",
    "writeKey": "yF6PTASTliRjCtRbUnwgsvjrvneqACDM",
    "sentAt": "2018-01-18T18:41:42.546Z",
    "integrations": {},
    "receivedAt": "2018-01-18T18:41:41.972Z",
    "originalTimestamp": "2018-01-18T19:41:37.6027834+01:00"
  },
  {
    "context": {
      "ip": "0.0.0.0",
      "library": {
        "name": "analytics-go",
        "version": "3.0.0"
      }
    },
    "messageId": "258f0127-498a-4d71-8c55-ce678a5d92b8",
    "name": "/clients",
    "properties": {
      "latency": 0,
      "method": "GET",
      "name": "/clients",
      "path": "/clients",
      "size": 154,
      "status": 401,
      "url": "http://22b137b6aae9bc40feb7ff14a08a1b9ecbc6305f77956214404c5b744c3b3fe2/clients"
    },
    "timestamp": "2018-01-18T18:41:49.537Z",
    "type": "page",
    "userId": "22b137b6aae9bc40feb7ff14a08a1b9ecbc6305f77956214404c5b744c3b3fe2",
    "writeKey": "yF6PTASTliRjCtRbUnwgsvjrvneqACDM",
    "sentAt": "2018-01-18T18:41:52.547Z",
    "integrations": {},
    "receivedAt": "2018-01-18T18:41:51.380Z",
    "originalTimestamp": "2018-01-18T19:41:50.7046198+01:00"
  }
]
```
