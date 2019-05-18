---
title: REST API
id: version-oryOS.11-api
original_id: api
---

A cloud native access control server providing best-practice patterns (RBAC,
ABAC, ACL, AWS IAM Policies, Kubernetes Roles, ...) via REST APIs.

> You are viewing a REST API documentation. This documentation is auto-generated
> from a swagger specification which itself is generated from annotations in the
> source files of the project. It is possible that this documentation includes
> bugs and that code samples are incomplete or wrong.
>
> If you find issues in the respective documentation, please do not edit the
> markdown files directly (as they are generated) but raise an issue on the
> project's GitHub instead. This documentation will improve over time with your
> help! If you have ideas how to improve this part of the documentation, feel
> free to share them in a [GitHub issue](https://github.com/ory/docs/issues/new)
> any time.

<a id="ory-keto-engines"></a>

## engines

<a id="opIddoOryAccessControlPoliciesAllow"></a>

### Check if a request is allowed

```
POST /engines/acp/ory/{flavor}/allowed HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Use this endpoint to check if a request is allowed or not. If the request is
allowed, a 200 response with `{"allowed":"true"}` will be sent. If the request
is denied, a 403 response with `{"allowed":"false"}` will be sent instead.

#### Request body

```json
{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "subject": "string"
}
```

<a id="check-if-a-request-is-allowed-parameters"></a>

##### Parameters

| Parameter | In   | Type                                                                            | Required | Description                                                                |
| --------- | ---- | ------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string                                                                          | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| body      | body | [oryAccessControlPolicyAllowedInput](#schemaoryaccesscontrolpolicyallowedinput) | false    | none                                                                       |

#### Responses

<a id="check-if-a-request-is-allowed-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema                                            |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | authorizationResult       | [authorizationResult](#schemaauthorizationresult) |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | authorizationResult       | [authorizationResult](#schemaauthorizationresult) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline                                            |

<a id="check-if-a-request-is-allowed-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "allowed": true
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-doOryAccessControlPoliciesAllow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-doOryAccessControlPoliciesAllow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-doOryAccessControlPoliciesAllow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-doOryAccessControlPoliciesAllow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-doOryAccessControlPoliciesAllow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-doOryAccessControlPoliciesAllow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-doOryAccessControlPoliciesAllow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-doOryAccessControlPoliciesAllow-shell">

```shell
curl -X POST /engines/acp/ory/{flavor}/allowed \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-doOryAccessControlPoliciesAllow-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("POST", "/engines/acp/ory/{flavor}/allowed", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-doOryAccessControlPoliciesAllow-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "subject": "string"
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/allowed', {
  method: 'POST',
  body: input,
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-doOryAccessControlPoliciesAllow-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/allowed");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-doOryAccessControlPoliciesAllow-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/engines/acp/ory/{flavor}/allowed',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-doOryAccessControlPoliciesAllow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/engines/acp/ory/{flavor}/allowed',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdlistOryAccessControlPolicies"></a>

### listOryAccessControlPolicies

```
GET /engines/acp/ory/{flavor}/policies HTTP/1.1
Accept: application/json

```

List ORY Access Control Policies

<a id="listoryaccesscontrolpolicies-parameters"></a>

##### Parameters

| Parameter | In    | Type           | Required | Description                                                               |
| --------- | ----- | -------------- | -------- | ------------------------------------------------------------------------- |
| flavor    | path  | string         | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact" |
| limit     | query | integer(int64) | false    | The maximum amount of policies returned.                                  |
| offset    | query | integer(int64) | false    | The offset from where to start looking.                                   |

#### Responses

<a id="listoryaccesscontrolpolicies-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description                       | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | Policies is an array of policies. | Inline |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format         | Inline |

<a id="listoryaccesscontrolpolicies-responseschema"></a>

##### Response Schema</h3>

Status Code **200**

| Name                                                              | Type                                                      | Required | Restrictions | Description                                                                                                          |
| ----------------------------------------------------------------- | --------------------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| _anonymous_                                                       | [[oryAccessControlPolicy](#schemaoryaccesscontrolpolicy)] | false    | none         | none                                                                                                                 |
| » oryAccessControlPolicy specifies an ORY Access Policy document. | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy)   | false    | none         | none                                                                                                                 |
| »» actions                                                        | [string]                                                  | false    | none         | Actions is an array representing all the actions this ORY Access Policy applies to.                                  |
| »» conditions                                                     | object                                                    | false    | none         | Conditions represents a keyed object of conditions under which this ORY Access Policy is active.                     |
| »»» **additionalProperties**                                      | object                                                    | false    | none         | none                                                                                                                 |
| »» description                                                    | string                                                    | false    | none         | Description is an optional, human-readable description.                                                              |
| »» effect                                                         | string                                                    | false    | none         | Effect is the effect of this ORY Access Policy. It can be "allow" or "deny".                                         |
| »» id                                                             | string                                                    | false    | none         | ID is the unique identifier of the ORY Access Policy. It is used to query, update, and remove the ORY Access Policy. |
| »» resources                                                      | [string]                                                  | false    | none         | Resources is an array representing all the resources this ORY Access Policy applies to.                              |
| »» subjects                                                       | [string]                                                  | false    | none         | Subjects is an array representing all the subjects this ORY Access Policy applies to.                                |

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
[
  {
    "actions": ["string"],
    "conditions": {
      "property1": {},
      "property2": {}
    },
    "description": "string",
    "effect": "string",
    "id": "string",
    "resources": ["string"],
    "subjects": ["string"]
  }
]
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-listOryAccessControlPolicies">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-listOryAccessControlPolicies-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicies-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicies-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicies-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicies-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicies-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-listOryAccessControlPolicies-shell">

```shell
curl -X GET /engines/acp/ory/{flavor}/policies \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicies-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/engines/acp/ory/{flavor}/policies", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicies-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/policies', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicies-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/policies");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicies-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/engines/acp/ory/{flavor}/policies',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicies-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/engines/acp/ory/{flavor}/policies',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdupsertOryAccessControlPolicy"></a>

### upsertOryAccessControlPolicy

```
PUT /engines/acp/ory/{flavor}/policies HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Upsert an ORY Access Control Policy

#### Request body

```json
{
  "actions": ["string"],
  "conditions": {
    "property1": {},
    "property2": {}
  },
  "description": "string",
  "effect": "string",
  "id": "string",
  "resources": ["string"],
  "subjects": ["string"]
}
```

<a id="upsertoryaccesscontrolpolicy-parameters"></a>

##### Parameters

| Parameter | In   | Type                                                    | Required | Description                                                                |
| --------- | ---- | ------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string                                                  | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| body      | body | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) | false    | none                                                                       |

#### Responses

<a id="upsertoryaccesscontrolpolicy-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema                                                  |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | oryAccessControlPolicy    | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline                                                  |

<a id="upsertoryaccesscontrolpolicy-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "actions": ["string"],
  "conditions": {
    "property1": {},
    "property2": {}
  },
  "description": "string",
  "effect": "string",
  "id": "string",
  "resources": ["string"],
  "subjects": ["string"]
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-upsertOryAccessControlPolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-upsertOryAccessControlPolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-upsertOryAccessControlPolicy-shell">

```shell
curl -X PUT /engines/acp/ory/{flavor}/policies \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicy-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("PUT", "/engines/acp/ory/{flavor}/policies", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicy-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {},
    "property2": {}
  },
  "description": "string",
  "effect": "string",
  "id": "string",
  "resources": [
    "string"
  ],
  "subjects": [
    "string"
  ]
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/policies', {
  method: 'PUT',
  body: input,
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/policies");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicy-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put(
  '/engines/acp/ory/{flavor}/policies',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.put '/engines/acp/ory/{flavor}/policies',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetOryAccessControlPolicy"></a>

### getOryAccessControlPolicy

```
GET /engines/acp/ory/{flavor}/policies/{id} HTTP/1.1
Accept: application/json

```

Get an ORY Access Control Policy

<a id="getoryaccesscontrolpolicy-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description                                                                |
| --------- | ---- | ------ | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| id        | path | string | true     | The ID of the ORY Access Control Policy Role.                              |

#### Responses

<a id="getoryaccesscontrolpolicy-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema                                                  |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | oryAccessControlPolicy    | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | The standard error format | Inline                                                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline                                                  |

<a id="getoryaccesscontrolpolicy-responseschema"></a>

##### Response Schema</h3>

Status Code **404**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "actions": ["string"],
  "conditions": {
    "property1": {},
    "property2": {}
  },
  "description": "string",
  "effect": "string",
  "id": "string",
  "resources": ["string"],
  "subjects": ["string"]
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getOryAccessControlPolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getOryAccessControlPolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getOryAccessControlPolicy-shell">

```shell
curl -X GET /engines/acp/ory/{flavor}/policies/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicy-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/engines/acp/ory/{flavor}/policies/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicy-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/policies/{id}', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/policies/{id}");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicy-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/engines/acp/ory/{flavor}/policies/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/engines/acp/ory/{flavor}/policies/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIddeleteOryAccessControlPolicy"></a>

### deleteOryAccessControlPolicy

```
DELETE /engines/acp/ory/{flavor}/policies/{id} HTTP/1.1
Accept: application/json

```

Delete an ORY Access Control Policy

<a id="deleteoryaccesscontrolpolicy-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description                                                                |
| --------- | ---- | ------ | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| id        | path | string | true     | The ID of the ORY Access Control Policy Role.                              |

#### Responses

<a id="deleteoryaccesscontrolpolicy-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 204    | [No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)            | An empty response         | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline |

<a id="deleteoryaccesscontrolpolicy-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 500 response

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-deleteOryAccessControlPolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-deleteOryAccessControlPolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-deleteOryAccessControlPolicy-shell">

```shell
curl -X DELETE /engines/acp/ory/{flavor}/policies/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicy-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("DELETE", "/engines/acp/ory/{flavor}/policies/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicy-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/policies/{id}', {
  method: 'DELETE',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/policies/{id}");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicy-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.delete(
  '/engines/acp/ory/{flavor}/policies/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/engines/acp/ory/{flavor}/policies/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdlistOryAccessControlPolicyRoles"></a>

### List ORY Access Control Policy Roles

```
GET /engines/acp/ory/{flavor}/roles HTTP/1.1
Accept: application/json

```

Roles group several subjects into one. Rules can be assigned to ORY Access
Control Policy (OACP) by using the Role ID as subject in the OACP.

<a id="list-ory-access-control-policy-roles-parameters"></a>

##### Parameters

| Parameter | In    | Type           | Required | Description                                                               |
| --------- | ----- | -------------- | -------- | ------------------------------------------------------------------------- |
| flavor    | path  | string         | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact" |
| limit     | query | integer(int64) | false    | The maximum amount of policies returned.                                  |
| offset    | query | integer(int64) | false    | The offset from where to start looking.                                   |

#### Responses

<a id="list-ory-access-control-policy-roles-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | Roles is an array of roles. | Inline |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format   | Inline |

<a id="list-ory-access-control-policy-roles-responseschema"></a>

##### Response Schema</h3>

Status Code **200**

| Name        | Type                                                              | Required | Restrictions | Description                                                                                                                                                                  |
| ----------- | ----------------------------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | [[oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole)] | false    | none         | [oryAccessControlPolicyRole represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role.] |
| » id        | string                                                            | false    | none         | ID is the role's unique id.                                                                                                                                                  |
| » members   | [string]                                                          | false    | none         | Members is who belongs to the role.                                                                                                                                          |

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
[
  {
    "id": "string",
    "members": ["string"]
  }
]
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-listOryAccessControlPolicyRoles">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-listOryAccessControlPolicyRoles-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicyRoles-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicyRoles-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicyRoles-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicyRoles-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listOryAccessControlPolicyRoles-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-listOryAccessControlPolicyRoles-shell">

```shell
curl -X GET /engines/acp/ory/{flavor}/roles \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicyRoles-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/engines/acp/ory/{flavor}/roles", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicyRoles-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/roles', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicyRoles-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/roles");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicyRoles-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/engines/acp/ory/{flavor}/roles',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listOryAccessControlPolicyRoles-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/engines/acp/ory/{flavor}/roles',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdupsertOryAccessControlPolicyRole"></a>

### Upsert an ORY Access Control Policy Role

```
PUT /engines/acp/ory/{flavor}/roles HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Roles group several subjects into one. Rules can be assigned to ORY Access
Control Policy (OACP) by using the Role ID as subject in the OACP.

#### Request body

```json
{
  "id": "string",
  "members": ["string"]
}
```

<a id="upsert-an-ory-access-control-policy-role-parameters"></a>

##### Parameters

| Parameter | In   | Type                                                            | Required | Description                                                                |
| --------- | ---- | --------------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string                                                          | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| body      | body | [oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) | false    | none                                                                       |

#### Responses

<a id="upsert-an-ory-access-control-policy-role-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description                | Schema                                                          |
| ------ | -------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | oryAccessControlPolicyRole | [oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format  | Inline                                                          |

<a id="upsert-an-ory-access-control-policy-role-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "id": "string",
  "members": ["string"]
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-upsertOryAccessControlPolicyRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-upsertOryAccessControlPolicyRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicyRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicyRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicyRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicyRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-upsertOryAccessControlPolicyRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-upsertOryAccessControlPolicyRole-shell">

```shell
curl -X PUT /engines/acp/ory/{flavor}/roles \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicyRole-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("PUT", "/engines/acp/ory/{flavor}/roles", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicyRole-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "id": "string",
  "members": [
    "string"
  ]
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/roles', {
  method: 'PUT',
  body: input,
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicyRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/roles");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicyRole-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put(
  '/engines/acp/ory/{flavor}/roles',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-upsertOryAccessControlPolicyRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.put '/engines/acp/ory/{flavor}/roles',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetOryAccessControlPolicyRole"></a>

### Get an ORY Access Control Policy Role

```
GET /engines/acp/ory/{flavor}/roles/{id} HTTP/1.1
Accept: application/json

```

Roles group several subjects into one. Rules can be assigned to ORY Access
Control Policy (OACP) by using the Role ID as subject in the OACP.

<a id="get-an-ory-access-control-policy-role-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description                                                                |
| --------- | ---- | ------ | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| id        | path | string | true     | The ID of the ORY Access Control Policy Role.                              |

#### Responses

<a id="get-an-ory-access-control-policy-role-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description                | Schema                                                          |
| ------ | -------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | oryAccessControlPolicyRole | [oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | The standard error format  | Inline                                                          |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format  | Inline                                                          |

<a id="get-an-ory-access-control-policy-role-responseschema"></a>

##### Response Schema</h3>

Status Code **404**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "id": "string",
  "members": ["string"]
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getOryAccessControlPolicyRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getOryAccessControlPolicyRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicyRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicyRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicyRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicyRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getOryAccessControlPolicyRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getOryAccessControlPolicyRole-shell">

```shell
curl -X GET /engines/acp/ory/{flavor}/roles/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicyRole-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/engines/acp/ory/{flavor}/roles/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicyRole-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/roles/{id}', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicyRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/roles/{id}");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicyRole-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/engines/acp/ory/{flavor}/roles/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getOryAccessControlPolicyRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/engines/acp/ory/{flavor}/roles/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIddeleteOryAccessControlPolicyRole"></a>

### Delete an ORY Access Control Policy Role

```
DELETE /engines/acp/ory/{flavor}/roles/{id} HTTP/1.1
Accept: application/json

```

Roles group several subjects into one. Rules can be assigned to ORY Access
Control Policy (OACP) by using the Role ID as subject in the OACP.

<a id="delete-an-ory-access-control-policy-role-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description                                                                |
| --------- | ---- | ------ | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| id        | path | string | true     | The ID of the ORY Access Control Policy Role.                              |

#### Responses

<a id="delete-an-ory-access-control-policy-role-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 204    | [No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)            | An empty response         | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline |

<a id="delete-an-ory-access-control-policy-role-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 500 response

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-deleteOryAccessControlPolicyRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-deleteOryAccessControlPolicyRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicyRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicyRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicyRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicyRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteOryAccessControlPolicyRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-deleteOryAccessControlPolicyRole-shell">

```shell
curl -X DELETE /engines/acp/ory/{flavor}/roles/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicyRole-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("DELETE", "/engines/acp/ory/{flavor}/roles/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicyRole-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/roles/{id}', {
  method: 'DELETE',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicyRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/roles/{id}");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicyRole-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.delete(
  '/engines/acp/ory/{flavor}/roles/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteOryAccessControlPolicyRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/engines/acp/ory/{flavor}/roles/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdaddOryAccessControlPolicyRoleMembers"></a>

### Add a member to an ORY Access Control Policy Role

```
PUT /engines/acp/ory/{flavor}/roles/{id}/members HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Roles group several subjects into one. Rules can be assigned to ORY Access
Control Policy (OACP) by using the Role ID as subject in the OACP.

#### Request body

```json
{
  "members": ["string"]
}
```

<a id="add-a-member-to-an-ory-access-control-policy-role-parameters"></a>

##### Parameters

| Parameter | In   | Type                                                                                        | Required | Description                                                                |
| --------- | ---- | ------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string                                                                                      | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| id        | path | string                                                                                      | true     | The ID of the ORY Access Control Policy Role.                              |
| body      | body | [addOryAccessControlPolicyRoleMembersBody](#schemaaddoryaccesscontrolpolicyrolemembersbody) | false    | none                                                                       |

#### Responses

<a id="add-a-member-to-an-ory-access-control-policy-role-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description                | Schema                                                          |
| ------ | -------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | oryAccessControlPolicyRole | [oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format  | Inline                                                          |

<a id="add-a-member-to-an-ory-access-control-policy-role-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "id": "string",
  "members": ["string"]
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-addOryAccessControlPolicyRoleMembers">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-addOryAccessControlPolicyRoleMembers-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addOryAccessControlPolicyRoleMembers-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addOryAccessControlPolicyRoleMembers-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addOryAccessControlPolicyRoleMembers-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addOryAccessControlPolicyRoleMembers-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addOryAccessControlPolicyRoleMembers-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-addOryAccessControlPolicyRoleMembers-shell">

```shell
curl -X PUT /engines/acp/ory/{flavor}/roles/{id}/members \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addOryAccessControlPolicyRoleMembers-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("PUT", "/engines/acp/ory/{flavor}/roles/{id}/members", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addOryAccessControlPolicyRoleMembers-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "members": [
    "string"
  ]
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/roles/{id}/members', {
  method: 'PUT',
  body: input,
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addOryAccessControlPolicyRoleMembers-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/roles/{id}/members");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addOryAccessControlPolicyRoleMembers-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put(
  '/engines/acp/ory/{flavor}/roles/{id}/members',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addOryAccessControlPolicyRoleMembers-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.put '/engines/acp/ory/{flavor}/roles/{id}/members',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdremoveOryAccessControlPolicyRoleMembers"></a>

### Remove a member from an ORY Access Control Policy Role

```
DELETE /engines/acp/ory/{flavor}/roles/{id}/members/{member} HTTP/1.1
Accept: application/json

```

Roles group several subjects into one. Rules can be assigned to ORY Access
Control Policy (OACP) by using the Role ID as subject in the OACP.

<a id="remove-a-member-from-an-ory-access-control-policy-role-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description                                                                |
| --------- | ---- | ------ | -------- | -------------------------------------------------------------------------- |
| flavor    | path | string | true     | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". |
| id        | path | string | true     | The ID of the ORY Access Control Policy Role.                              |
| member    | path | string | true     | The member to be removed.                                                  |

#### Responses

<a id="remove-a-member-from-an-ory-access-control-policy-role-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)               | An empty response         | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline |

<a id="remove-a-member-from-an-ory-access-control-policy-role-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 500 response

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-removeOryAccessControlPolicyRoleMembers">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-removeOryAccessControlPolicyRoleMembers-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeOryAccessControlPolicyRoleMembers-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeOryAccessControlPolicyRoleMembers-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeOryAccessControlPolicyRoleMembers-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeOryAccessControlPolicyRoleMembers-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeOryAccessControlPolicyRoleMembers-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-removeOryAccessControlPolicyRoleMembers-shell">

```shell
curl -X DELETE /engines/acp/ory/{flavor}/roles/{id}/members/{member} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeOryAccessControlPolicyRoleMembers-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("DELETE", "/engines/acp/ory/{flavor}/roles/{id}/members/{member}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeOryAccessControlPolicyRoleMembers-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/engines/acp/ory/{flavor}/roles/{id}/members/{member}', {
  method: 'DELETE',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeOryAccessControlPolicyRoleMembers-java">

```java
// This sample needs improvement.
URL obj = new URL("/engines/acp/ory/{flavor}/roles/{id}/members/{member}");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeOryAccessControlPolicyRoleMembers-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.delete(
  '/engines/acp/ory/{flavor}/roles/{id}/members/{member}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeOryAccessControlPolicyRoleMembers-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/engines/acp/ory/{flavor}/roles/{id}/members/{member}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="ory-keto-health"></a>

## health

<a id="opIdisInstanceAlive"></a>

### Check alive status

```
GET /health/alive HTTP/1.1
Accept: application/json

```

This endpoint returns a 200 status code when the HTTP server is up running. This
status does currently not include checks whether the database connection is
working.

If the service supports TLS Edge Termination, this endpoint does not require the
`X-Forwarded-Proto` header to be set.

Be aware that if you are running multiple nodes of this service, the health
status will never refer to the cluster state, only to a single instance.

#### Responses

<a id="check-alive-status-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description               | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | healthStatus              | [healthStatus](#schemahealthstatus) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | The standard error format | Inline                              |

<a id="check-alive-status-responseschema"></a>

##### Response Schema</h3>

Status Code **500**

| Name                        | Type           | Required | Restrictions | Description |
| --------------------------- | -------------- | -------- | ------------ | ----------- |
| » code                      | integer(int64) | false    | none         | none        |
| » details                   | [object]       | false    | none         | none        |
| »» **additionalProperties** | object         | false    | none         | none        |
| » message                   | string         | false    | none         | none        |
| » reason                    | string         | false    | none         | none        |
| » request                   | string         | false    | none         | none        |
| » status                    | string         | false    | none         | none        |

##### Examples

###### 200 response

```json
{
  "status": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-isInstanceAlive">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-isInstanceAlive-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceAlive-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceAlive-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceAlive-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceAlive-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceAlive-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-isInstanceAlive-shell">

```shell
curl -X GET /health/alive \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceAlive-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/health/alive", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceAlive-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/health/alive', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceAlive-java">

```java
// This sample needs improvement.
URL obj = new URL("/health/alive");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceAlive-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/health/alive',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceAlive-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/health/alive',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdisInstanceReady"></a>

### Check readiness status

```
GET /health/ready HTTP/1.1
Accept: application/json

```

This endpoint returns a 200 status code when the HTTP server is up running and
the environment dependencies (e.g. the database) are responsive as well.

If the service supports TLS Edge Termination, this endpoint does not require the
`X-Forwarded-Proto` header to be set.

Be aware that if you are running multiple nodes of this service, the health
status will never refer to the cluster state, only to a single instance.

#### Responses

<a id="check-readiness-status-responses"></a>

##### Overview

| Status | Meaning                                                                  | Description          | Schema                                              |
| ------ | ------------------------------------------------------------------------ | -------------------- | --------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                  | healthStatus         | [healthStatus](#schemahealthstatus)                 |
| 503    | [Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4) | healthNotReadyStatus | [healthNotReadyStatus](#schemahealthnotreadystatus) |

##### Examples

###### 200 response

```json
{
  "status": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-isInstanceReady">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-isInstanceReady-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceReady-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceReady-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceReady-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceReady-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isInstanceReady-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-isInstanceReady-shell">

```shell
curl -X GET /health/ready \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceReady-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/health/ready", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceReady-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/health/ready', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceReady-java">

```java
// This sample needs improvement.
URL obj = new URL("/health/ready");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceReady-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/health/ready',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isInstanceReady-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/health/ready',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="ory-keto-version"></a>

## version

<a id="opIdgetVersion"></a>

### Get service version

```
GET /version HTTP/1.1
Accept: application/json

```

This endpoint returns the service version typically notated using semantic
versioning.

If the service supports TLS Edge Termination, this endpoint does not require the
`X-Forwarded-Proto` header to be set.

Be aware that if you are running multiple nodes of this service, the health
status will never refer to the cluster state, only to a single instance.

#### Responses

<a id="get-service-version-responses"></a>

##### Overview

| Status | Meaning                                                 | Description | Schema                    |
| ------ | ------------------------------------------------------- | ----------- | ------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | version     | [version](#schemaversion) |

##### Examples

###### 200 response

```json
{
  "version": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getVersion">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getVersion-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getVersion-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getVersion-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getVersion-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getVersion-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getVersion-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getVersion-shell">

```shell
curl -X GET /version \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getVersion-go">

```go
package main

import (
    "bytes"
    "net/http"
)

func main() {
    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    var body []byte
    // body = ...

    req, err := http.NewRequest("GET", "/version", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getVersion-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/version', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getVersion-java">

```java
// This sample needs improvement.
URL obj = new URL("/version");

HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");

int responseCode = con.getResponseCode();

BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream())
);

String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();

System.out.println(response.toString());
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getVersion-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/version',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getVersion-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/version',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

## Schemas

<a id="tocSaddoryaccesscontrolpolicyrolemembers">AddOryAccessControlPolicyRoleMembers</a>

#### AddOryAccessControlPolicyRoleMembers

<a id="schemaaddoryaccesscontrolpolicyrolemembers"></a>

```json
{
  "Body": {
    "members": ["string"]
  },
  "flavor": "string",
  "id": "string"
}
```

_AddOryAccessControlPolicyRoleMembers add ory access control policy role
members_

#### Properties

| Name   | Type                                                                                        | Required | Restrictions | Description                                                                              |
| ------ | ------------------------------------------------------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| Body   | [AddOryAccessControlPolicyRoleMembersBody](#schemaaddoryaccesscontrolpolicyrolemembersbody) | false    | none         | AddOryAccessControlPolicyRoleMembersBody add ory access control policy role members body |
| flavor | string                                                                                      | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path      |
| id     | string                                                                                      | true     | none         | The ID of the ORY Access Control Policy Role. in: path                                   |

<a id="tocSaddoryaccesscontrolpolicyrolemembersbody">AddOryAccessControlPolicyRoleMembersBody</a>

#### AddOryAccessControlPolicyRoleMembersBody

<a id="schemaaddoryaccesscontrolpolicyrolemembersbody"></a>

```json
{
  "members": ["string"]
}
```

_AddOryAccessControlPolicyRoleMembersBody add ory access control policy role
members body_

#### Properties

| Name    | Type     | Required | Restrictions | Description              |
| ------- | -------- | -------- | ------------ | ------------------------ |
| members | [string] | false    | none         | The members to be added. |

<a id="tocSaddoryaccesscontrolpolicyrolemembersinternalservererror">AddOryAccessControlPolicyRoleMembersInternalServerError</a>

#### AddOryAccessControlPolicyRoleMembersInternalServerError

<a id="schemaaddoryaccesscontrolpolicyrolemembersinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_AddOryAccessControlPolicyRoleMembersInternalServerError handles this case with
default header values._

#### Properties

| Name    | Type                                                                                                                              | Required | Restrictions | Description                                                                                                                       |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Payload | [AddOryAccessControlPolicyRoleMembersInternalServerErrorBody](#schemaaddoryaccesscontrolpolicyrolemembersinternalservererrorbody) | false    | none         | AddOryAccessControlPolicyRoleMembersInternalServerErrorBody add ory access control policy role members internal server error body |

<a id="tocSaddoryaccesscontrolpolicyrolemembersinternalservererrorbody">AddOryAccessControlPolicyRoleMembersInternalServerErrorBody</a>

#### AddOryAccessControlPolicyRoleMembersInternalServerErrorBody

<a id="schemaaddoryaccesscontrolpolicyrolemembersinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_AddOryAccessControlPolicyRoleMembersInternalServerErrorBody add ory access
control policy role members internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSaddoryaccesscontrolpolicyrolemembersok">AddOryAccessControlPolicyRoleMembersOK</a>

#### AddOryAccessControlPolicyRoleMembersOK

<a id="schemaaddoryaccesscontrolpolicyrolemembersok"></a>

```json
{
  "Payload": {
    "id": "string",
    "members": ["string"]
  }
}
```

_AddOryAccessControlPolicyRoleMembersOK handles this case with default header
values._

#### Properties

| Name    | Type                                                            | Required | Restrictions | Description                                                                                                                                                                                           |
| ------- | --------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Payload | [OryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) | false    | none         | OryAccessControlPolicyRole oryAccessControlPolicyRole represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role. |

<a id="tocSaddoryaccesscontrolpolicyrolemembersreader">AddOryAccessControlPolicyRoleMembersReader</a>

#### AddOryAccessControlPolicyRoleMembersReader

<a id="schemaaddoryaccesscontrolpolicyrolemembersreader"></a>

```json
{}
```

_AddOryAccessControlPolicyRoleMembersReader is a Reader for the
AddOryAccessControlPolicyRoleMembers structure._

#### Properties

_None_

<a id="tocSauthorizationresult">AuthorizationResult</a>

#### AuthorizationResult

<a id="schemaauthorizationresult"></a>

```json
{
  "allowed": true
}
```

_AuthorizationResult AuthorizationResult AuthorizationResult is the result of an
access control decision. It contains the decision outcome._

#### Properties

| Name    | Type    | Required | Restrictions | Description                                                           |
| ------- | ------- | -------- | ------------ | --------------------------------------------------------------------- |
| allowed | boolean | true     | none         | Allowed is true if the request should be allowed and false otherwise. |

<a id="tocScontext">Context</a>

#### Context

<a id="schemacontext"></a>

```json
{
  "property1": {},
  "property2": {}
}
```

_Context Context Context Context Context Context Context Context context_

#### Properties

| Name                     | Type   | Required | Restrictions | Description |
| ------------------------ | ------ | -------- | ------------ | ----------- |
| **additionalProperties** | object | false    | none         | none        |

<a id="tocSdeleteoryaccesscontrolpolicy">DeleteOryAccessControlPolicy</a>

#### DeleteOryAccessControlPolicy

<a id="schemadeleteoryaccesscontrolpolicy"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

_DeleteOryAccessControlPolicy delete ory access control policy_

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSdeleteoryaccesscontrolpolicycreated">DeleteOryAccessControlPolicyCreated</a>

#### DeleteOryAccessControlPolicyCreated

<a id="schemadeleteoryaccesscontrolpolicycreated"></a>

```json
{}
```

_DeleteOryAccessControlPolicyCreated DeleteOryAccessControlPolicyCreated
DeleteOryAccessControlPolicyCreated DeleteOryAccessControlPolicyCreated handles
this case with default header values._

#### Properties

_None_

<a id="tocSdeleteoryaccesscontrolpolicyinternalservererror">DeleteOryAccessControlPolicyInternalServerError</a>

#### DeleteOryAccessControlPolicyInternalServerError

<a id="schemadeleteoryaccesscontrolpolicyinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_DeleteOryAccessControlPolicyInternalServerError handles this case with default
header values._

#### Properties

| Name    | Type                                                                                                              | Required | Restrictions | Description                                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| Payload | [DeleteOryAccessControlPolicyInternalServerErrorBody](#schemadeleteoryaccesscontrolpolicyinternalservererrorbody) | false    | none         | DeleteOryAccessControlPolicyInternalServerErrorBody delete ory access control policy internal server error body |

<a id="tocSdeleteoryaccesscontrolpolicyinternalservererrorbody">DeleteOryAccessControlPolicyInternalServerErrorBody</a>

#### DeleteOryAccessControlPolicyInternalServerErrorBody

<a id="schemadeleteoryaccesscontrolpolicyinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_DeleteOryAccessControlPolicyInternalServerErrorBody delete ory access control
policy internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSdeleteoryaccesscontrolpolicynocontent">DeleteOryAccessControlPolicyNoContent</a>

#### DeleteOryAccessControlPolicyNoContent

<a id="schemadeleteoryaccesscontrolpolicynocontent"></a>

```json
{}
```

_DeleteOryAccessControlPolicyNoContent handles this case with default header
values._

#### Properties

_None_

<a id="tocSdeleteoryaccesscontrolpolicyreader">DeleteOryAccessControlPolicyReader</a>

#### DeleteOryAccessControlPolicyReader

<a id="schemadeleteoryaccesscontrolpolicyreader"></a>

```json
{}
```

_DeleteOryAccessControlPolicyReader is a Reader for the
DeleteOryAccessControlPolicy structure._

#### Properties

_None_

<a id="tocSdeleteoryaccesscontrolpolicyrole">DeleteOryAccessControlPolicyRole</a>

#### DeleteOryAccessControlPolicyRole

<a id="schemadeleteoryaccesscontrolpolicyrole"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

_DeleteOryAccessControlPolicyRole delete ory access control policy role_

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSdeleteoryaccesscontrolpolicyrolecreated">DeleteOryAccessControlPolicyRoleCreated</a>

#### DeleteOryAccessControlPolicyRoleCreated

<a id="schemadeleteoryaccesscontrolpolicyrolecreated"></a>

```json
{}
```

_DeleteOryAccessControlPolicyRoleCreated DeleteOryAccessControlPolicyRoleCreated
DeleteOryAccessControlPolicyRoleCreated DeleteOryAccessControlPolicyRoleCreated
handles this case with default header values._

#### Properties

_None_

<a id="tocSdeleteoryaccesscontrolpolicyroleinternalservererror">DeleteOryAccessControlPolicyRoleInternalServerError</a>

#### DeleteOryAccessControlPolicyRoleInternalServerError

<a id="schemadeleteoryaccesscontrolpolicyroleinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_DeleteOryAccessControlPolicyRoleInternalServerError handles this case with
default header values._

#### Properties

| Name    | Type                                                                                                                      | Required | Restrictions | Description                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Payload | [DeleteOryAccessControlPolicyRoleInternalServerErrorBody](#schemadeleteoryaccesscontrolpolicyroleinternalservererrorbody) | false    | none         | DeleteOryAccessControlPolicyRoleInternalServerErrorBody delete ory access control policy role internal server error body |

<a id="tocSdeleteoryaccesscontrolpolicyroleinternalservererrorbody">DeleteOryAccessControlPolicyRoleInternalServerErrorBody</a>

#### DeleteOryAccessControlPolicyRoleInternalServerErrorBody

<a id="schemadeleteoryaccesscontrolpolicyroleinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_DeleteOryAccessControlPolicyRoleInternalServerErrorBody delete ory access
control policy role internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSdeleteoryaccesscontrolpolicyrolenocontent">DeleteOryAccessControlPolicyRoleNoContent</a>

#### DeleteOryAccessControlPolicyRoleNoContent

<a id="schemadeleteoryaccesscontrolpolicyrolenocontent"></a>

```json
{}
```

_DeleteOryAccessControlPolicyRoleNoContent handles this case with default header
values._

#### Properties

_None_

<a id="tocSdeleteoryaccesscontrolpolicyrolereader">DeleteOryAccessControlPolicyRoleReader</a>

#### DeleteOryAccessControlPolicyRoleReader

<a id="schemadeleteoryaccesscontrolpolicyrolereader"></a>

```json
{}
```

_DeleteOryAccessControlPolicyRoleReader is a Reader for the
DeleteOryAccessControlPolicyRole structure._

#### Properties

_None_

<a id="tocSdooryaccesscontrolpoliciesallow">DoOryAccessControlPoliciesAllow</a>

#### DoOryAccessControlPoliciesAllow

<a id="schemadooryaccesscontrolpoliciesallow"></a>

```json
{
  "Body": {
    "action": "string",
    "context": {
      "property1": {},
      "property2": {}
    },
    "resource": "string",
    "subject": "string"
  },
  "flavor": "string"
}
```

_DoOryAccessControlPoliciesAllow do ory access control policies allow_

#### Properties

| Name   | Type                  | Required | Restrictions | Description                                                                         |
| ------ | --------------------- | -------- | ------------ | ----------------------------------------------------------------------------------- |
| Body   | [Input](#schemainput) | false    | none         | none                                                                                |
| flavor | string                | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |

<a id="tocSdooryaccesscontrolpoliciesallowforbidden">DoOryAccessControlPoliciesAllowForbidden</a>

#### DoOryAccessControlPoliciesAllowForbidden

<a id="schemadooryaccesscontrolpoliciesallowforbidden"></a>

```json
{
  "Payload": {
    "allowed": true
  }
}
```

_DoOryAccessControlPoliciesAllowForbidden handles this case with default header
values._

#### Properties

| Name    | Type                                              | Required | Restrictions | Description |
| ------- | ------------------------------------------------- | -------- | ------------ | ----------- |
| Payload | [AuthorizationResult](#schemaauthorizationresult) | false    | none         | none        |

<a id="tocSdooryaccesscontrolpoliciesallowinternalservererror">DoOryAccessControlPoliciesAllowInternalServerError</a>

#### DoOryAccessControlPoliciesAllowInternalServerError

<a id="schemadooryaccesscontrolpoliciesallowinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_DoOryAccessControlPoliciesAllowInternalServerError handles this case with
default header values._

#### Properties

| Name    | Type                                                                                                                    | Required | Restrictions | Description                                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Payload | [DoOryAccessControlPoliciesAllowInternalServerErrorBody](#schemadooryaccesscontrolpoliciesallowinternalservererrorbody) | false    | none         | DoOryAccessControlPoliciesAllowInternalServerErrorBody do ory access control policies allow internal server error body |

<a id="tocSdooryaccesscontrolpoliciesallowinternalservererrorbody">DoOryAccessControlPoliciesAllowInternalServerErrorBody</a>

#### DoOryAccessControlPoliciesAllowInternalServerErrorBody

<a id="schemadooryaccesscontrolpoliciesallowinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_DoOryAccessControlPoliciesAllowInternalServerErrorBody do ory access control
policies allow internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSdooryaccesscontrolpoliciesallowok">DoOryAccessControlPoliciesAllowOK</a>

#### DoOryAccessControlPoliciesAllowOK

<a id="schemadooryaccesscontrolpoliciesallowok"></a>

```json
{
  "Payload": {
    "allowed": true
  }
}
```

_DoOryAccessControlPoliciesAllowOK handles this case with default header
values._

#### Properties

| Name    | Type                                              | Required | Restrictions | Description |
| ------- | ------------------------------------------------- | -------- | ------------ | ----------- |
| Payload | [AuthorizationResult](#schemaauthorizationresult) | false    | none         | none        |

<a id="tocSdooryaccesscontrolpoliciesallowreader">DoOryAccessControlPoliciesAllowReader</a>

#### DoOryAccessControlPoliciesAllowReader

<a id="schemadooryaccesscontrolpoliciesallowreader"></a>

```json
{}
```

_DoOryAccessControlPoliciesAllowReader is a Reader for the
DoOryAccessControlPoliciesAllow structure._

#### Properties

_None_

<a id="tocSgetoryaccesscontrolpolicy">GetOryAccessControlPolicy</a>

#### GetOryAccessControlPolicy

<a id="schemagetoryaccesscontrolpolicy"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

_GetOryAccessControlPolicy get ory access control policy_

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSgetoryaccesscontrolpolicyinternalservererror">GetOryAccessControlPolicyInternalServerError</a>

#### GetOryAccessControlPolicyInternalServerError

<a id="schemagetoryaccesscontrolpolicyinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_GetOryAccessControlPolicyInternalServerError handles this case with default
header values._

#### Properties

| Name    | Type                                                                                                        | Required | Restrictions | Description                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| Payload | [GetOryAccessControlPolicyInternalServerErrorBody](#schemagetoryaccesscontrolpolicyinternalservererrorbody) | false    | none         | GetOryAccessControlPolicyInternalServerErrorBody get ory access control policy internal server error body |

<a id="tocSgetoryaccesscontrolpolicyinternalservererrorbody">GetOryAccessControlPolicyInternalServerErrorBody</a>

#### GetOryAccessControlPolicyInternalServerErrorBody

<a id="schemagetoryaccesscontrolpolicyinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_GetOryAccessControlPolicyInternalServerErrorBody get ory access control policy
internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSgetoryaccesscontrolpolicynotfound">GetOryAccessControlPolicyNotFound</a>

#### GetOryAccessControlPolicyNotFound

<a id="schemagetoryaccesscontrolpolicynotfound"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_GetOryAccessControlPolicyNotFound handles this case with default header
values._

#### Properties

| Name    | Type                                                                                  | Required | Restrictions | Description                                                                        |
| ------- | ------------------------------------------------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| Payload | [GetOryAccessControlPolicyNotFoundBody](#schemagetoryaccesscontrolpolicynotfoundbody) | false    | none         | GetOryAccessControlPolicyNotFoundBody get ory access control policy not found body |

<a id="tocSgetoryaccesscontrolpolicynotfoundbody">GetOryAccessControlPolicyNotFoundBody</a>

#### GetOryAccessControlPolicyNotFoundBody

<a id="schemagetoryaccesscontrolpolicynotfoundbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_GetOryAccessControlPolicyNotFoundBody get ory access control policy not found
body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSgetoryaccesscontrolpolicyok">GetOryAccessControlPolicyOK</a>

#### GetOryAccessControlPolicyOK

<a id="schemagetoryaccesscontrolpolicyok"></a>

```json
{
  "Payload": {
    "actions": ["string"],
    "conditions": {
      "property1": {},
      "property2": {}
    },
    "description": "string",
    "effect": "string",
    "id": "string",
    "resources": ["string"],
    "subjects": ["string"]
  }
}
```

_GetOryAccessControlPolicyOK handles this case with default header values._

#### Properties

| Name    | Type                                                    | Required | Restrictions | Description |
| ------- | ------------------------------------------------------- | -------- | ------------ | ----------- |
| Payload | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) | false    | none         | none        |

<a id="tocSgetoryaccesscontrolpolicyreader">GetOryAccessControlPolicyReader</a>

#### GetOryAccessControlPolicyReader

<a id="schemagetoryaccesscontrolpolicyreader"></a>

```json
{}
```

_GetOryAccessControlPolicyReader is a Reader for the GetOryAccessControlPolicy
structure._

#### Properties

_None_

<a id="tocSgetoryaccesscontrolpolicyrole">GetOryAccessControlPolicyRole</a>

#### GetOryAccessControlPolicyRole

<a id="schemagetoryaccesscontrolpolicyrole"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

_GetOryAccessControlPolicyRole get ory access control policy role_

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSgetoryaccesscontrolpolicyroleinternalservererror">GetOryAccessControlPolicyRoleInternalServerError</a>

#### GetOryAccessControlPolicyRoleInternalServerError

<a id="schemagetoryaccesscontrolpolicyroleinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_GetOryAccessControlPolicyRoleInternalServerError handles this case with default
header values._

#### Properties

| Name    | Type                                                                                                                | Required | Restrictions | Description                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| Payload | [GetOryAccessControlPolicyRoleInternalServerErrorBody](#schemagetoryaccesscontrolpolicyroleinternalservererrorbody) | false    | none         | GetOryAccessControlPolicyRoleInternalServerErrorBody get ory access control policy role internal server error body |

<a id="tocSgetoryaccesscontrolpolicyroleinternalservererrorbody">GetOryAccessControlPolicyRoleInternalServerErrorBody</a>

#### GetOryAccessControlPolicyRoleInternalServerErrorBody

<a id="schemagetoryaccesscontrolpolicyroleinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_GetOryAccessControlPolicyRoleInternalServerErrorBody get ory access control
policy role internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSgetoryaccesscontrolpolicyrolenotfound">GetOryAccessControlPolicyRoleNotFound</a>

#### GetOryAccessControlPolicyRoleNotFound

<a id="schemagetoryaccesscontrolpolicyrolenotfound"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_GetOryAccessControlPolicyRoleNotFound handles this case with default header
values._

#### Properties

| Name    | Type                                                                                          | Required | Restrictions | Description                                                                                 |
| ------- | --------------------------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------- |
| Payload | [GetOryAccessControlPolicyRoleNotFoundBody](#schemagetoryaccesscontrolpolicyrolenotfoundbody) | false    | none         | GetOryAccessControlPolicyRoleNotFoundBody get ory access control policy role not found body |

<a id="tocSgetoryaccesscontrolpolicyrolenotfoundbody">GetOryAccessControlPolicyRoleNotFoundBody</a>

#### GetOryAccessControlPolicyRoleNotFoundBody

<a id="schemagetoryaccesscontrolpolicyrolenotfoundbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_GetOryAccessControlPolicyRoleNotFoundBody get ory access control policy role
not found body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSgetoryaccesscontrolpolicyroleok">GetOryAccessControlPolicyRoleOK</a>

#### GetOryAccessControlPolicyRoleOK

<a id="schemagetoryaccesscontrolpolicyroleok"></a>

```json
{
  "Payload": {
    "id": "string",
    "members": ["string"]
  }
}
```

_GetOryAccessControlPolicyRoleOK handles this case with default header values._

#### Properties

| Name    | Type                                                            | Required | Restrictions | Description                                                                                                                                                                                           |
| ------- | --------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Payload | [OryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) | false    | none         | OryAccessControlPolicyRole oryAccessControlPolicyRole represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role. |

<a id="tocSgetoryaccesscontrolpolicyrolereader">GetOryAccessControlPolicyRoleReader</a>

#### GetOryAccessControlPolicyRoleReader

<a id="schemagetoryaccesscontrolpolicyrolereader"></a>

```json
{}
```

_GetOryAccessControlPolicyRoleReader is a Reader for the
GetOryAccessControlPolicyRole structure._

#### Properties

_None_

<a id="tocSinput">Input</a>

#### Input

<a id="schemainput"></a>

```json
{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "subject": "string"
}
```

_Input Input Input for checking if a request is allowed or not._

#### Properties

| Name                       | Type   | Required | Restrictions | Description                                             |
| -------------------------- | ------ | -------- | ------------ | ------------------------------------------------------- |
| action                     | string | false    | none         | Action is the action that is requested on the resource. |
| context                    | object | false    | none         | Context is the request's environmental context.         |
| » **additionalProperties** | object | false    | none         | none                                                    |
| resource                   | string | false    | none         | Resource is the resource that access is requested to.   |
| subject                    | string | false    | none         | Subject is the subject that is requesting access.       |

<a id="tocSisinstancealiveinternalservererror">IsInstanceAliveInternalServerError</a>

#### IsInstanceAliveInternalServerError

<a id="schemaisinstancealiveinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_IsInstanceAliveInternalServerError handles this case with default header
values._

#### Properties

| Name    | Type                                                                                    | Required | Restrictions | Description                                                                         |
| ------- | --------------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------- |
| Payload | [IsInstanceAliveInternalServerErrorBody](#schemaisinstancealiveinternalservererrorbody) | false    | none         | IsInstanceAliveInternalServerErrorBody is instance alive internal server error body |

<a id="tocSisinstancealiveinternalservererrorbody">IsInstanceAliveInternalServerErrorBody</a>

#### IsInstanceAliveInternalServerErrorBody

<a id="schemaisinstancealiveinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_IsInstanceAliveInternalServerErrorBody is instance alive internal server error
body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSisinstancealiveok">IsInstanceAliveOK</a>

#### IsInstanceAliveOK

<a id="schemaisinstancealiveok"></a>

```json
{
  "Payload": {
    "status": "string"
  }
}
```

_IsInstanceAliveOK handles this case with default header values._

#### Properties

| Name    | Type                                              | Required | Restrictions | Description                               |
| ------- | ------------------------------------------------- | -------- | ------------ | ----------------------------------------- |
| Payload | [swaggerHealthStatus](#schemaswaggerhealthstatus) | false    | none         | SwaggerHealthStatus swagger health status |

<a id="tocSisinstancealivereader">IsInstanceAliveReader</a>

#### IsInstanceAliveReader

<a id="schemaisinstancealivereader"></a>

```json
{}
```

_IsInstanceAliveReader is a Reader for the IsInstanceAlive structure._

#### Properties

_None_

<a id="tocSlistoryaccesscontrolpolicies">ListOryAccessControlPolicies</a>

#### ListOryAccessControlPolicies

<a id="schemalistoryaccesscontrolpolicies"></a>

```json
{
  "flavor": "string",
  "limit": 0,
  "offset": 0
}
```

_ListOryAccessControlPolicies list ory access control policies_

#### Properties

| Name   | Type           | Required | Restrictions | Description                                                                        |
| ------ | -------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| flavor | string         | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact" in: path |
| limit  | integer(int64) | false    | none         | The maximum amount of policies returned. in: query                                 |
| offset | integer(int64) | false    | none         | The offset from where to start looking. in: query                                  |

<a id="tocSlistoryaccesscontrolpoliciesinternalservererror">ListOryAccessControlPoliciesInternalServerError</a>

#### ListOryAccessControlPoliciesInternalServerError

<a id="schemalistoryaccesscontrolpoliciesinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_ListOryAccessControlPoliciesInternalServerError handles this case with default
header values._

#### Properties

| Name    | Type                                                                                                              | Required | Restrictions | Description                                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| Payload | [ListOryAccessControlPoliciesInternalServerErrorBody](#schemalistoryaccesscontrolpoliciesinternalservererrorbody) | false    | none         | ListOryAccessControlPoliciesInternalServerErrorBody list ory access control policies internal server error body |

<a id="tocSlistoryaccesscontrolpoliciesinternalservererrorbody">ListOryAccessControlPoliciesInternalServerErrorBody</a>

#### ListOryAccessControlPoliciesInternalServerErrorBody

<a id="schemalistoryaccesscontrolpoliciesinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_ListOryAccessControlPoliciesInternalServerErrorBody list ory access control
policies internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSlistoryaccesscontrolpoliciesok">ListOryAccessControlPoliciesOK</a>

#### ListOryAccessControlPoliciesOK

<a id="schemalistoryaccesscontrolpoliciesok"></a>

```json
{
  "Payload": [
    {
      "actions": ["string"],
      "conditions": {
        "property1": {},
        "property2": {}
      },
      "description": "string",
      "effect": "string",
      "id": "string",
      "resources": ["string"],
      "subjects": ["string"]
    }
  ]
}
```

_ListOryAccessControlPoliciesOK handles this case with default header values._

#### Properties

| Name    | Type                                                      | Required | Restrictions | Description |
| ------- | --------------------------------------------------------- | -------- | ------------ | ----------- |
| Payload | [[oryAccessControlPolicy](#schemaoryaccesscontrolpolicy)] | false    | none         | payload     |

<a id="tocSlistoryaccesscontrolpoliciesreader">ListOryAccessControlPoliciesReader</a>

#### ListOryAccessControlPoliciesReader

<a id="schemalistoryaccesscontrolpoliciesreader"></a>

```json
{}
```

_ListOryAccessControlPoliciesReader is a Reader for the
ListOryAccessControlPolicies structure._

#### Properties

_None_

<a id="tocSlistoryaccesscontrolpolicyroles">ListOryAccessControlPolicyRoles</a>

#### ListOryAccessControlPolicyRoles

<a id="schemalistoryaccesscontrolpolicyroles"></a>

```json
{
  "flavor": "string",
  "limit": 0,
  "offset": 0
}
```

_ListOryAccessControlPolicyRoles list ory access control policy roles_

#### Properties

| Name   | Type           | Required | Restrictions | Description                                                                        |
| ------ | -------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| flavor | string         | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact" in: path |
| limit  | integer(int64) | false    | none         | The maximum amount of policies returned. in: query                                 |
| offset | integer(int64) | false    | none         | The offset from where to start looking. in: query                                  |

<a id="tocSlistoryaccesscontrolpolicyrolesinternalservererror">ListOryAccessControlPolicyRolesInternalServerError</a>

#### ListOryAccessControlPolicyRolesInternalServerError

<a id="schemalistoryaccesscontrolpolicyrolesinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_ListOryAccessControlPolicyRolesInternalServerError handles this case with
default header values._

#### Properties

| Name    | Type                                                                                                                    | Required | Restrictions | Description                                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Payload | [ListOryAccessControlPolicyRolesInternalServerErrorBody](#schemalistoryaccesscontrolpolicyrolesinternalservererrorbody) | false    | none         | ListOryAccessControlPolicyRolesInternalServerErrorBody list ory access control policy roles internal server error body |

<a id="tocSlistoryaccesscontrolpolicyrolesinternalservererrorbody">ListOryAccessControlPolicyRolesInternalServerErrorBody</a>

#### ListOryAccessControlPolicyRolesInternalServerErrorBody

<a id="schemalistoryaccesscontrolpolicyrolesinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_ListOryAccessControlPolicyRolesInternalServerErrorBody list ory access control
policy roles internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSlistoryaccesscontrolpolicyrolesok">ListOryAccessControlPolicyRolesOK</a>

#### ListOryAccessControlPolicyRolesOK

<a id="schemalistoryaccesscontrolpolicyrolesok"></a>

```json
{
  "Payload": [
    {
      "id": "string",
      "members": ["string"]
    }
  ]
}
```

_ListOryAccessControlPolicyRolesOK handles this case with default header
values._

#### Properties

| Name    | Type                                                              | Required | Restrictions | Description |
| ------- | ----------------------------------------------------------------- | -------- | ------------ | ----------- |
| Payload | [[OryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole)] | false    | none         | payload     |

<a id="tocSlistoryaccesscontrolpolicyrolesreader">ListOryAccessControlPolicyRolesReader</a>

#### ListOryAccessControlPolicyRolesReader

<a id="schemalistoryaccesscontrolpolicyrolesreader"></a>

```json
{}
```

_ListOryAccessControlPolicyRolesReader is a Reader for the
ListOryAccessControlPolicyRoles structure._

#### Properties

_None_

<a id="tocSoryaccesscontrolpolicies">OryAccessControlPolicies</a>

#### OryAccessControlPolicies

<a id="schemaoryaccesscontrolpolicies"></a>

```json
{
  "Body": [
    {
      "actions": ["string"],
      "conditions": {
        "property1": {},
        "property2": {}
      },
      "description": "string",
      "effect": "string",
      "id": "string",
      "resources": ["string"],
      "subjects": ["string"]
    }
  ]
}
```

_OryAccessControlPolicies Policies is an array of policies._

#### Properties

| Name | Type                                                      | Required | Restrictions | Description                            |
| ---- | --------------------------------------------------------- | -------- | ------------ | -------------------------------------- |
| Body | [[oryAccessControlPolicy](#schemaoryaccesscontrolpolicy)] | false    | none         | The request body. in: body type: array |

<a id="tocSoryaccesscontrolpolicyrole">OryAccessControlPolicyRole</a>

#### OryAccessControlPolicyRole

<a id="schemaoryaccesscontrolpolicyrole"></a>

```json
{
  "id": "string",
  "members": ["string"]
}
```

_OryAccessControlPolicyRole oryAccessControlPolicyRole represents a group of
users that share the same role. A role could be an administrator, a moderator, a
regular user or some other sort of role._

#### Properties

| Name    | Type     | Required | Restrictions | Description                         |
| ------- | -------- | -------- | ------------ | ----------------------------------- |
| id      | string   | false    | none         | ID is the role's unique id.         |
| members | [string] | false    | none         | Members is who belongs to the role. |

<a id="tocSpolicies">Policies</a>

#### Policies

<a id="schemapolicies"></a>

```json
[
  {
    "actions": ["string"],
    "conditions": {
      "property1": {},
      "property2": {}
    },
    "description": "string",
    "effect": "string",
    "id": "string",
    "resources": ["string"],
    "subjects": ["string"]
  }
]
```

_Policies Policies Policies Policies is an array of policies._

#### Properties

| Name                                                         | Type                      | Required | Restrictions | Description |
| ------------------------------------------------------------ | ------------------------- | -------- | ------------ | ----------- |
| Policies Policies Policies Policies is an array of policies. | [[Policy](#schemapolicy)] | false    | none         | none        |

<a id="tocSpolicy">Policy</a>

#### Policy

<a id="schemapolicy"></a>

```json
{
  "actions": ["string"],
  "conditions": {
    "property1": {},
    "property2": {}
  },
  "description": "string",
  "effect": "string",
  "id": "string",
  "resources": ["string"],
  "subjects": ["string"]
}
```

_Policy Policy Policy Policy specifies an ORY Access Policy document._

#### Properties

| Name                       | Type     | Required | Restrictions | Description                                                                                                          |
| -------------------------- | -------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| actions                    | [string] | false    | none         | Actions is an array representing all the actions this ORY Access Policy applies to.                                  |
| conditions                 | object   | false    | none         | Conditions represents a keyed object of conditions under which this ORY Access Policy is active.                     |
| » **additionalProperties** | object   | false    | none         | none                                                                                                                 |
| description                | string   | false    | none         | Description is an optional, human-readable description.                                                              |
| effect                     | string   | false    | none         | Effect is the effect of this ORY Access Policy. It can be "allow" or "deny".                                         |
| id                         | string   | false    | none         | ID is the unique identifier of the ORY Access Policy. It is used to query, update, and remove the ORY Access Policy. |
| resources                  | [string] | false    | none         | Resources is an array representing all the resources this ORY Access Policy applies to.                              |
| subjects                   | [string] | false    | none         | Subjects is an array representing all the subjects this ORY Access Policy applies to.                                |

<a id="tocSremoveoryaccesscontrolpolicyrolemembers">RemoveOryAccessControlPolicyRoleMembers</a>

#### RemoveOryAccessControlPolicyRoleMembers

<a id="schemaremoveoryaccesscontrolpolicyrolemembers"></a>

```json
{
  "flavor": "string",
  "id": "string",
  "member": "string"
}
```

_RemoveOryAccessControlPolicyRoleMembers remove ory access control policy role
members_

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |
| member | string | true     | none         | The member to be removed. in: path                                                  |

<a id="tocSremoveoryaccesscontrolpolicyrolememberscreated">RemoveOryAccessControlPolicyRoleMembersCreated</a>

#### RemoveOryAccessControlPolicyRoleMembersCreated

<a id="schemaremoveoryaccesscontrolpolicyrolememberscreated"></a>

```json
{}
```

_RemoveOryAccessControlPolicyRoleMembersCreated handles this case with default
header values._

#### Properties

_None_

<a id="tocSremoveoryaccesscontrolpolicyrolemembersinternalservererror">RemoveOryAccessControlPolicyRoleMembersInternalServerError</a>

#### RemoveOryAccessControlPolicyRoleMembersInternalServerError

<a id="schemaremoveoryaccesscontrolpolicyrolemembersinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_RemoveOryAccessControlPolicyRoleMembersInternalServerError handles this case
with default header values._

#### Properties

| Name    | Type                                                                                                                                    | Required | Restrictions | Description                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Payload | [RemoveOryAccessControlPolicyRoleMembersInternalServerErrorBody](#schemaremoveoryaccesscontrolpolicyrolemembersinternalservererrorbody) | false    | none         | RemoveOryAccessControlPolicyRoleMembersInternalServerErrorBody remove ory access control policy role members internal server error body |

<a id="tocSremoveoryaccesscontrolpolicyrolemembersinternalservererrorbody">RemoveOryAccessControlPolicyRoleMembersInternalServerErrorBody</a>

#### RemoveOryAccessControlPolicyRoleMembersInternalServerErrorBody

<a id="schemaremoveoryaccesscontrolpolicyrolemembersinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_RemoveOryAccessControlPolicyRoleMembersInternalServerErrorBody remove ory
access control policy role members internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSremoveoryaccesscontrolpolicyrolemembersreader">RemoveOryAccessControlPolicyRoleMembersReader</a>

#### RemoveOryAccessControlPolicyRoleMembersReader

<a id="schemaremoveoryaccesscontrolpolicyrolemembersreader"></a>

```json
{}
```

_RemoveOryAccessControlPolicyRoleMembersReader is a Reader for the
RemoveOryAccessControlPolicyRoleMembers structure._

#### Properties

_None_

<a id="tocSrole">Role</a>

#### Role

<a id="schemarole"></a>

```json
{
  "id": "string",
  "members": ["string"]
}
```

_Role Role Role Role Role Role represents a group of users that share the same
role. A role could be an administrator, a moderator, a regular user or some
other sort of role._

#### Properties

| Name    | Type     | Required | Restrictions | Description                         |
| ------- | -------- | -------- | ------------ | ----------------------------------- |
| id      | string   | false    | none         | ID is the role's unique id.         |
| members | [string] | false    | none         | Members is who belongs to the role. |

<a id="tocSroles">Roles</a>

#### Roles

<a id="schemaroles"></a>

```json
[
  {
    "id": "string",
    "members": ["string"]
  }
]
```

_Roles Roles Roles A list of roles._

#### Properties

| Name                               | Type                  | Required | Restrictions | Description                                                                                                                                                                     |
| ---------------------------------- | --------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Roles Roles Roles A list of roles. | [[Role](#schemarole)] | false    | none         | [Role Role Role Role Role Role represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role.] |

<a id="tocSupsertoryaccesscontrolpolicy">UpsertOryAccessControlPolicy</a>

#### UpsertOryAccessControlPolicy

<a id="schemaupsertoryaccesscontrolpolicy"></a>

```json
{
  "Body": {
    "actions": ["string"],
    "conditions": {
      "property1": {},
      "property2": {}
    },
    "description": "string",
    "effect": "string",
    "id": "string",
    "resources": ["string"],
    "subjects": ["string"]
  },
  "flavor": "string"
}
```

_UpsertOryAccessControlPolicy upsert ory access control policy_

#### Properties

| Name   | Type                                                    | Required | Restrictions | Description                                                                         |
| ------ | ------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------- |
| Body   | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) | false    | none         | none                                                                                |
| flavor | string                                                  | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |

<a id="tocSupsertoryaccesscontrolpolicyinternalservererror">UpsertOryAccessControlPolicyInternalServerError</a>

#### UpsertOryAccessControlPolicyInternalServerError

<a id="schemaupsertoryaccesscontrolpolicyinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_UpsertOryAccessControlPolicyInternalServerError handles this case with default
header values._

#### Properties

| Name    | Type                                                                                                              | Required | Restrictions | Description                                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| Payload | [UpsertOryAccessControlPolicyInternalServerErrorBody](#schemaupsertoryaccesscontrolpolicyinternalservererrorbody) | false    | none         | UpsertOryAccessControlPolicyInternalServerErrorBody upsert ory access control policy internal server error body |

<a id="tocSupsertoryaccesscontrolpolicyinternalservererrorbody">UpsertOryAccessControlPolicyInternalServerErrorBody</a>

#### UpsertOryAccessControlPolicyInternalServerErrorBody

<a id="schemaupsertoryaccesscontrolpolicyinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_UpsertOryAccessControlPolicyInternalServerErrorBody upsert ory access control
policy internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSupsertoryaccesscontrolpolicyok">UpsertOryAccessControlPolicyOK</a>

#### UpsertOryAccessControlPolicyOK

<a id="schemaupsertoryaccesscontrolpolicyok"></a>

```json
{
  "Payload": {
    "actions": ["string"],
    "conditions": {
      "property1": {},
      "property2": {}
    },
    "description": "string",
    "effect": "string",
    "id": "string",
    "resources": ["string"],
    "subjects": ["string"]
  }
}
```

_UpsertOryAccessControlPolicyOK handles this case with default header values._

#### Properties

| Name    | Type                                                    | Required | Restrictions | Description |
| ------- | ------------------------------------------------------- | -------- | ------------ | ----------- |
| Payload | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) | false    | none         | none        |

<a id="tocSupsertoryaccesscontrolpolicyreader">UpsertOryAccessControlPolicyReader</a>

#### UpsertOryAccessControlPolicyReader

<a id="schemaupsertoryaccesscontrolpolicyreader"></a>

```json
{}
```

_UpsertOryAccessControlPolicyReader is a Reader for the
UpsertOryAccessControlPolicy structure._

#### Properties

_None_

<a id="tocSupsertoryaccesscontrolpolicyrole">UpsertOryAccessControlPolicyRole</a>

#### UpsertOryAccessControlPolicyRole

<a id="schemaupsertoryaccesscontrolpolicyrole"></a>

```json
{
  "Body": {
    "id": "string",
    "members": ["string"]
  },
  "flavor": "string"
}
```

_UpsertOryAccessControlPolicyRole upsert ory access control policy role_

#### Properties

| Name   | Type                                                            | Required | Restrictions | Description                                                                                                                                                                                           |
| ------ | --------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Body   | [OryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) | false    | none         | OryAccessControlPolicyRole oryAccessControlPolicyRole represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role. |
| flavor | string                                                          | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path                                                                                                                   |

<a id="tocSupsertoryaccesscontrolpolicyroleinternalservererror">UpsertOryAccessControlPolicyRoleInternalServerError</a>

#### UpsertOryAccessControlPolicyRoleInternalServerError

<a id="schemaupsertoryaccesscontrolpolicyroleinternalservererror"></a>

```json
{
  "Payload": {
    "code": 0,
    "details": [
      {
        "property1": {},
        "property2": {}
      }
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"
  }
}
```

_UpsertOryAccessControlPolicyRoleInternalServerError handles this case with
default header values._

#### Properties

| Name    | Type                                                                                                                      | Required | Restrictions | Description                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Payload | [UpsertOryAccessControlPolicyRoleInternalServerErrorBody](#schemaupsertoryaccesscontrolpolicyroleinternalservererrorbody) | false    | none         | UpsertOryAccessControlPolicyRoleInternalServerErrorBody upsert ory access control policy role internal server error body |

<a id="tocSupsertoryaccesscontrolpolicyroleinternalservererrorbody">UpsertOryAccessControlPolicyRoleInternalServerErrorBody</a>

#### UpsertOryAccessControlPolicyRoleInternalServerErrorBody

<a id="schemaupsertoryaccesscontrolpolicyroleinternalservererrorbody"></a>

```json
{
  "code": 0,
  "details": [
    {
      "property1": {},
      "property2": {}
    }
  ],
  "message": "string",
  "reason": "string",
  "request": "string",
  "status": "string"
}
```

_UpsertOryAccessControlPolicyRoleInternalServerErrorBody upsert ory access
control policy role internal server error body_

#### Properties

| Name                       | Type           | Required | Restrictions | Description |
| -------------------------- | -------------- | -------- | ------------ | ----------- |
| code                       | integer(int64) | false    | none         | code        |
| details                    | [object]       | false    | none         | details     |
| » **additionalProperties** | object         | false    | none         | none        |
| message                    | string         | false    | none         | message     |
| reason                     | string         | false    | none         | reason      |
| request                    | string         | false    | none         | request     |
| status                     | string         | false    | none         | status      |

<a id="tocSupsertoryaccesscontrolpolicyroleok">UpsertOryAccessControlPolicyRoleOK</a>

#### UpsertOryAccessControlPolicyRoleOK

<a id="schemaupsertoryaccesscontrolpolicyroleok"></a>

```json
{
  "Payload": {
    "id": "string",
    "members": ["string"]
  }
}
```

_UpsertOryAccessControlPolicyRoleOK handles this case with default header
values._

#### Properties

| Name    | Type                                                            | Required | Restrictions | Description                                                                                                                                                                                           |
| ------- | --------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Payload | [OryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) | false    | none         | OryAccessControlPolicyRole oryAccessControlPolicyRole represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role. |

<a id="tocSupsertoryaccesscontrolpolicyrolereader">UpsertOryAccessControlPolicyRoleReader</a>

#### UpsertOryAccessControlPolicyRoleReader

<a id="schemaupsertoryaccesscontrolpolicyrolereader"></a>

```json
{}
```

_UpsertOryAccessControlPolicyRoleReader is a Reader for the
UpsertOryAccessControlPolicyRole structure._

#### Properties

_None_

<a id="tocSaddoryaccesscontrolpolicyrolemembers">addOryAccessControlPolicyRoleMembers</a>

#### addOryAccessControlPolicyRoleMembers

<a id="schemaaddoryaccesscontrolpolicyrolemembers"></a>

```json
{
  "Body": {
    "members": ["string"]
  },
  "flavor": "string",
  "id": "string"
}
```

#### Properties

| Name   | Type                                                                                        | Required | Restrictions | Description                                                                         |
| ------ | ------------------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------- |
| Body   | [addOryAccessControlPolicyRoleMembersBody](#schemaaddoryaccesscontrolpolicyrolemembersbody) | false    | none         | none                                                                                |
| flavor | string                                                                                      | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string                                                                                      | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSaddoryaccesscontrolpolicyrolemembersbody">addOryAccessControlPolicyRoleMembersBody</a>

#### addOryAccessControlPolicyRoleMembersBody

<a id="schemaaddoryaccesscontrolpolicyrolemembersbody"></a>

```json
{
  "members": ["string"]
}
```

#### Properties

| Name    | Type     | Required | Restrictions | Description              |
| ------- | -------- | -------- | ------------ | ------------------------ |
| members | [string] | false    | none         | The members to be added. |

<a id="tocSauthorizationresult">authorizationResult</a>

#### authorizationResult

<a id="schemaauthorizationresult"></a>

```json
{
  "allowed": true
}
```

_AuthorizationResult is the result of an access control decision. It contains
the decision outcome._

#### Properties

| Name    | Type    | Required | Restrictions | Description                                                           |
| ------- | ------- | -------- | ------------ | --------------------------------------------------------------------- |
| allowed | boolean | true     | none         | Allowed is true if the request should be allowed and false otherwise. |

<a id="tocSdeleteoryaccesscontrolpolicy">deleteOryAccessControlPolicy</a>

#### deleteOryAccessControlPolicy

<a id="schemadeleteoryaccesscontrolpolicy"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSdeleteoryaccesscontrolpolicyrole">deleteOryAccessControlPolicyRole</a>

#### deleteOryAccessControlPolicyRole

<a id="schemadeleteoryaccesscontrolpolicyrole"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSdooryaccesscontrolpoliciesallow">doOryAccessControlPoliciesAllow</a>

#### doOryAccessControlPoliciesAllow

<a id="schemadooryaccesscontrolpoliciesallow"></a>

```json
{
  "Body": {
    "action": "string",
    "context": {
      "property1": {},
      "property2": {}
    },
    "resource": "string",
    "subject": "string"
  },
  "flavor": "string"
}
```

#### Properties

| Name   | Type                                                                            | Required | Restrictions | Description                                                                         |
| ------ | ------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------- |
| Body   | [oryAccessControlPolicyAllowedInput](#schemaoryaccesscontrolpolicyallowedinput) | false    | none         | none                                                                                |
| flavor | string                                                                          | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |

<a id="tocSgetoryaccesscontrolpolicy">getOryAccessControlPolicy</a>

#### getOryAccessControlPolicy

<a id="schemagetoryaccesscontrolpolicy"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocSgetoryaccesscontrolpolicyrole">getOryAccessControlPolicyRole</a>

#### getOryAccessControlPolicyRole

<a id="schemagetoryaccesscontrolpolicyrole"></a>

```json
{
  "flavor": "string",
  "id": "string"
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |

<a id="tocShealthnotreadystatus">healthNotReadyStatus</a>

#### healthNotReadyStatus

<a id="schemahealthnotreadystatus"></a>

```json
{
  "errors": {
    "property1": "string",
    "property2": "string"
  }
}
```

#### Properties

| Name                       | Type   | Required | Restrictions | Description                                                        |
| -------------------------- | ------ | -------- | ------------ | ------------------------------------------------------------------ |
| errors                     | object | false    | none         | Errors contains a list of errors that caused the not ready status. |
| » **additionalProperties** | string | false    | none         | none                                                               |

<a id="tocShealthstatus">healthStatus</a>

#### healthStatus

<a id="schemahealthstatus"></a>

```json
{
  "status": "string"
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                  |
| ------ | ------ | -------- | ------------ | ---------------------------- |
| status | string | false    | none         | Status always contains "ok". |

<a id="tocSlistoryaccesscontrolpolicies">listOryAccessControlPolicies</a>

#### listOryAccessControlPolicies

<a id="schemalistoryaccesscontrolpolicies"></a>

```json
{
  "flavor": "string",
  "limit": 0,
  "offset": 0
}
```

#### Properties

| Name   | Type           | Required | Restrictions | Description                                                                        |
| ------ | -------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| flavor | string         | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact" in: path |
| limit  | integer(int64) | false    | none         | The maximum amount of policies returned. in: query                                 |
| offset | integer(int64) | false    | none         | The offset from where to start looking. in: query                                  |

<a id="tocSlistoryaccesscontrolpolicyroles">listOryAccessControlPolicyRoles</a>

#### listOryAccessControlPolicyRoles

<a id="schemalistoryaccesscontrolpolicyroles"></a>

```json
{
  "flavor": "string",
  "limit": 0,
  "offset": 0
}
```

#### Properties

| Name   | Type           | Required | Restrictions | Description                                                                        |
| ------ | -------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| flavor | string         | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact" in: path |
| limit  | integer(int64) | false    | none         | The maximum amount of policies returned. in: query                                 |
| offset | integer(int64) | false    | none         | The offset from where to start looking. in: query                                  |

<a id="tocSoryaccesscontrolpolicies">oryAccessControlPolicies</a>

#### oryAccessControlPolicies

<a id="schemaoryaccesscontrolpolicies"></a>

```json
{
  "Body": [
    {
      "actions": ["string"],
      "conditions": {
        "property1": {},
        "property2": {}
      },
      "description": "string",
      "effect": "string",
      "id": "string",
      "resources": ["string"],
      "subjects": ["string"]
    }
  ]
}
```

_Policies is an array of policies._

#### Properties

| Name | Type                                                      | Required | Restrictions | Description                            |
| ---- | --------------------------------------------------------- | -------- | ------------ | -------------------------------------- |
| Body | [[oryAccessControlPolicy](#schemaoryaccesscontrolpolicy)] | false    | none         | The request body. in: body type: array |

<a id="tocSoryaccesscontrolpolicy">oryAccessControlPolicy</a>

#### oryAccessControlPolicy

<a id="schemaoryaccesscontrolpolicy"></a>

```json
{
  "actions": ["string"],
  "conditions": {
    "property1": {},
    "property2": {}
  },
  "description": "string",
  "effect": "string",
  "id": "string",
  "resources": ["string"],
  "subjects": ["string"]
}
```

_oryAccessControlPolicy specifies an ORY Access Policy document._

#### Properties

| Name                       | Type     | Required | Restrictions | Description                                                                                                          |
| -------------------------- | -------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| actions                    | [string] | false    | none         | Actions is an array representing all the actions this ORY Access Policy applies to.                                  |
| conditions                 | object   | false    | none         | Conditions represents a keyed object of conditions under which this ORY Access Policy is active.                     |
| » **additionalProperties** | object   | false    | none         | none                                                                                                                 |
| description                | string   | false    | none         | Description is an optional, human-readable description.                                                              |
| effect                     | string   | false    | none         | Effect is the effect of this ORY Access Policy. It can be "allow" or "deny".                                         |
| id                         | string   | false    | none         | ID is the unique identifier of the ORY Access Policy. It is used to query, update, and remove the ORY Access Policy. |
| resources                  | [string] | false    | none         | Resources is an array representing all the resources this ORY Access Policy applies to.                              |
| subjects                   | [string] | false    | none         | Subjects is an array representing all the subjects this ORY Access Policy applies to.                                |

<a id="tocSoryaccesscontrolpolicyallowedinput">oryAccessControlPolicyAllowedInput</a>

#### oryAccessControlPolicyAllowedInput

<a id="schemaoryaccesscontrolpolicyallowedinput"></a>

```json
{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "subject": "string"
}
```

_Input for checking if a request is allowed or not._

#### Properties

| Name                       | Type   | Required | Restrictions | Description                                             |
| -------------------------- | ------ | -------- | ------------ | ------------------------------------------------------- |
| action                     | string | false    | none         | Action is the action that is requested on the resource. |
| context                    | object | false    | none         | Context is the request's environmental context.         |
| » **additionalProperties** | object | false    | none         | none                                                    |
| resource                   | string | false    | none         | Resource is the resource that access is requested to.   |
| subject                    | string | false    | none         | Subject is the subject that is requesting access.       |

<a id="tocSoryaccesscontrolpolicyrole">oryAccessControlPolicyRole</a>

#### oryAccessControlPolicyRole

<a id="schemaoryaccesscontrolpolicyrole"></a>

```json
{
  "id": "string",
  "members": ["string"]
}
```

_oryAccessControlPolicyRole represents a group of users that share the same
role. A role could be an administrator, a moderator, a regular user or some
other sort of role._

#### Properties

| Name    | Type     | Required | Restrictions | Description                         |
| ------- | -------- | -------- | ------------ | ----------------------------------- |
| id      | string   | false    | none         | ID is the role's unique id.         |
| members | [string] | false    | none         | Members is who belongs to the role. |

<a id="tocSoryaccesscontrolpolicyroles">oryAccessControlPolicyRoles</a>

#### oryAccessControlPolicyRoles

<a id="schemaoryaccesscontrolpolicyroles"></a>

```json
{
  "Body": [
    {
      "id": "string",
      "members": ["string"]
    }
  ]
}
```

_Roles is an array of roles._

#### Properties

| Name | Type                                                              | Required | Restrictions | Description                            |
| ---- | ----------------------------------------------------------------- | -------- | ------------ | -------------------------------------- |
| Body | [[oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole)] | false    | none         | The request body. in: body type: array |

<a id="tocSremoveoryaccesscontrolpolicyrolemembers">removeOryAccessControlPolicyRoleMembers</a>

#### removeOryAccessControlPolicyRoleMembers

<a id="schemaremoveoryaccesscontrolpolicyrolemembers"></a>

```json
{
  "flavor": "string",
  "id": "string",
  "member": "string"
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                                         |
| ------ | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| flavor | string | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |
| id     | string | true     | none         | The ID of the ORY Access Control Policy Role. in: path                              |
| member | string | true     | none         | The member to be removed. in: path                                                  |

<a id="tocSswaggerhealthstatus">swaggerHealthStatus</a>

#### swaggerHealthStatus

<a id="schemaswaggerhealthstatus"></a>

```json
{
  "status": "string"
}
```

_SwaggerHealthStatus swagger health status_

#### Properties

| Name   | Type   | Required | Restrictions | Description                  |
| ------ | ------ | -------- | ------------ | ---------------------------- |
| status | string | false    | none         | Status always contains "ok". |

<a id="tocSswaggernotreadystatus">swaggerNotReadyStatus</a>

#### swaggerNotReadyStatus

<a id="schemaswaggernotreadystatus"></a>

```json
{
  "errors": {
    "property1": "string",
    "property2": "string"
  }
}
```

_SwaggerNotReadyStatus swagger not ready status_

#### Properties

| Name                       | Type   | Required | Restrictions | Description                                                        |
| -------------------------- | ------ | -------- | ------------ | ------------------------------------------------------------------ |
| errors                     | object | false    | none         | Errors contains a list of errors that caused the not ready status. |
| » **additionalProperties** | string | false    | none         | none                                                               |

<a id="tocSswaggerversion">swaggerVersion</a>

#### swaggerVersion

<a id="schemaswaggerversion"></a>

```json
{
  "version": "string"
}
```

_SwaggerVersion swagger version_

#### Properties

| Name    | Type   | Required | Restrictions | Description                       |
| ------- | ------ | -------- | ------------ | --------------------------------- |
| version | string | false    | none         | Version is the service's version. |

<a id="tocSupsertoryaccesscontrolpolicy">upsertOryAccessControlPolicy</a>

#### upsertOryAccessControlPolicy

<a id="schemaupsertoryaccesscontrolpolicy"></a>

```json
{
  "Body": {
    "actions": ["string"],
    "conditions": {
      "property1": {},
      "property2": {}
    },
    "description": "string",
    "effect": "string",
    "id": "string",
    "resources": ["string"],
    "subjects": ["string"]
  },
  "flavor": "string"
}
```

#### Properties

| Name   | Type                                                    | Required | Restrictions | Description                                                                         |
| ------ | ------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------- |
| Body   | [oryAccessControlPolicy](#schemaoryaccesscontrolpolicy) | false    | none         | none                                                                                |
| flavor | string                                                  | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path |

<a id="tocSupsertoryaccesscontrolpolicyrole">upsertOryAccessControlPolicyRole</a>

#### upsertOryAccessControlPolicyRole

<a id="schemaupsertoryaccesscontrolpolicyrole"></a>

```json
{
  "Body": {
    "id": "string",
    "members": ["string"]
  },
  "flavor": "string"
}
```

#### Properties

| Name   | Type                                                            | Required | Restrictions | Description                                                                                                                                                                |
| ------ | --------------------------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Body   | [oryAccessControlPolicyRole](#schemaoryaccesscontrolpolicyrole) | false    | none         | oryAccessControlPolicyRole represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role. |
| flavor | string                                                          | true     | none         | The ORY Access Control Policy flavor. Can be "regex", "glob", and "exact". in: path                                                                                        |

<a id="tocSversion">version</a>

#### version

<a id="schemaversion"></a>

```json
{
  "version": "string"
}
```

#### Properties

| Name    | Type   | Required | Restrictions | Description                       |
| ------- | ------ | -------- | ------------ | --------------------------------- |
| version | string | false    | none         | Version is the service's version. |
