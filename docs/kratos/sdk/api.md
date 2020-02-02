---
title: REST API
id: api
---

Welcome to the ORY Kratos HTTP API documentation!

> You are viewing REST API documentation. This documentation is auto-generated
> from a swagger specification which itself is generated from annotations in the
> source code of the project. It is possible that this documentation includes
> bugs and that code samples are incomplete or wrong.
>
> If you find issues in the respective documentation, please do not edit the
> Markdown files directly (as they are generated) but raise an issue on the
> project's GitHub presence instead. This documentation will improve over time
> with your help! If you have ideas how to improve this part of the
> documentation, feel free to share them in a
> [GitHub issue](https://github.com/ory/docs/issues/new) any time.

<a id="ory-kratos-health"></a>

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

| Status | Meaning                                                                    | Description  | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------ | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | healthStatus | [healthStatus](#schemahealthstatus) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError | [genericError](#schemagenericerror) |

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

<a id="ory-kratos-administrative-endpoints"></a>

## Administrative Endpoints

<a id="opIdlistIdentities"></a>

### List all identities in the system

```
GET /identities HTTP/1.1
Accept: application/json

```

This endpoint returns a login request's context with, for example, error details
and other information.

Learn how identities work in
[ORY Kratos' User And Identity Model Documentation](https://www.ory.sh/docs/next/kratos/concepts/identity-user-model).

#### Responses

<a id="list-all-identities-in-the-system-responses"></a>

##### Overview

| Status | Meaning                                                 | Description           | Schema |
| ------ | ------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | A list of identities. |

nolint:deadcode,unused|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|genericError|[genericError](#schemagenericerror)|

<a id="list-all-identities-in-the-system-responseschema"></a>

##### Response Schema</h3>

Status Code **200**

| Name                | Type                          | Required | Restrictions | Description                                                                                                    |
| ------------------- | ----------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| _anonymous_         | [[Identity](#schemaidentity)] | false    | none         | none                                                                                                           |
| » id                | [UUID](#schemauuid)(uuid4)    | true     | none         | none                                                                                                           |
| » traits            | [Traits](#schematraits)       | true     | none         | none                                                                                                           |
| » traits_schema_id  | string                        | false    | none         | TraitsSchemaID is the ID of the JSON Schema to be used for validating the identity's traits.                   |
| » traits_schema_url | string                        | false    | none         | TraitsSchemaURL is the URL of the endpoint where the identity's traits schema can be fetched from. format: url |

##### Examples

###### 200 response

```json
[
  {
    "id": "string",
    "traits": {},
    "traits_schema_id": "string",
    "traits_schema_url": "string"
  }
]
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-listIdentities">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-listIdentities-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listIdentities-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listIdentities-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listIdentities-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listIdentities-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listIdentities-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-listIdentities-shell">

```shell
curl -X GET /identities \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listIdentities-go">

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

    req, err := http.NewRequest("GET", "/identities", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listIdentities-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/identities', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listIdentities-java">

```java
// This sample needs improvement.
URL obj = new URL("/identities");

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
<div class="tab-pane" role="tabpanel"  id="tab-listIdentities-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/identities',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listIdentities-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/identities',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdcreateIdentity"></a>

### Create an identity

```
POST /identities HTTP/1.1
Content-Type: application/json
Accept: application/json

```

This endpoint creates an identity. It is NOT possible to set an identity's
credentials (password, ...) using this method! A way to achieve that will be
introduced in the future.

Learn how identities work in
[ORY Kratos' User And Identity Model Documentation](https://www.ory.sh/docs/next/kratos/concepts/identity-user-model).

#### Request body

```json
{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}
```

<a id="create-an-identity-parameters"></a>

##### Parameters

| Parameter | In   | Type                        | Required | Description |
| --------- | ---- | --------------------------- | -------- | ----------- |
| body      | body | [Identity](#schemaidentity) | true     | none        |

#### Responses

<a id="create-an-identity-responses"></a>

##### Overview

| Status | Meaning                                                      | Description        | Schema |
| ------ | ------------------------------------------------------------ | ------------------ | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | A single identity. |

nolint:deadcode,unused|[Identity](#schemaidentity)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|genericError|[genericError](#schemagenericerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|genericError|[genericError](#schemagenericerror)|

##### Examples

###### 201 response

```json
{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-createIdentity">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-createIdentity-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createIdentity-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createIdentity-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createIdentity-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createIdentity-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createIdentity-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-createIdentity-shell">

```shell
curl -X POST /identities \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createIdentity-go">

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

    req, err := http.NewRequest("POST", "/identities", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createIdentity-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/identities', {
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
<div class="tab-pane" role="tabpanel"  id="tab-createIdentity-java">

```java
// This sample needs improvement.
URL obj = new URL("/identities");

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
<div class="tab-pane" role="tabpanel"  id="tab-createIdentity-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/identities',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createIdentity-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/identities',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetIdentity"></a>

### Get an identity

```
GET /identities/{id} HTTP/1.1
Accept: application/json

```

Learn how identities work in
[ORY Kratos' User And Identity Model Documentation](https://www.ory.sh/docs/next/kratos/concepts/identity-user-model).

<a id="get-an-identity-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description                                          |
| --------- | ---- | ------ | -------- | ---------------------------------------------------- |
| id        | path | string | true     | ID must be set to the ID of identity you want to get |

#### Responses

<a id="get-an-identity-responses"></a>

##### Overview

| Status | Meaning                                                 | Description        | Schema |
| ------ | ------------------------------------------------------- | ------------------ | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | A single identity. |

nolint:deadcode,unused|[Identity](#schemaidentity)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|genericError|[genericError](#schemagenericerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|genericError|[genericError](#schemagenericerror)|

##### Examples

###### 200 response

```json
{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getIdentity">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getIdentity-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getIdentity-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getIdentity-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getIdentity-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getIdentity-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getIdentity-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getIdentity-shell">

```shell
curl -X GET /identities/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getIdentity-go">

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

    req, err := http.NewRequest("GET", "/identities/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getIdentity-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/identities/{id}', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getIdentity-java">

```java
// This sample needs improvement.
URL obj = new URL("/identities/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-getIdentity-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/identities/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getIdentity-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/identities/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdupdateIdentity"></a>

### Update an identity

```
PUT /identities/{id} HTTP/1.1
Content-Type: application/json
Accept: application/json

```

This endpoint updates an identity. It is NOT possible to set an identity's
credentials (password, ...) using this method! A way to achieve that will be
introduced in the future.

The full identity payload (except credentials) is expected. This endpoint does
not support patching.

Learn how identities work in
[ORY Kratos' User And Identity Model Documentation](https://www.ory.sh/docs/next/kratos/concepts/identity-user-model).

#### Request body

```json
{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}
```

<a id="update-an-identity-parameters"></a>

##### Parameters

| Parameter | In   | Type                        | Required | Description                                             |
| --------- | ---- | --------------------------- | -------- | ------------------------------------------------------- |
| id        | path | string                      | true     | ID must be set to the ID of identity you want to update |
| body      | body | [Identity](#schemaidentity) | true     | none                                                    |

#### Responses

<a id="update-an-identity-responses"></a>

##### Overview

| Status | Meaning                                                 | Description        | Schema |
| ------ | ------------------------------------------------------- | ------------------ | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | A single identity. |

nolint:deadcode,unused|[Identity](#schemaidentity)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|genericError|[genericError](#schemagenericerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|genericError|[genericError](#schemagenericerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|genericError|[genericError](#schemagenericerror)|

##### Examples

###### 200 response

```json
{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-updateIdentity">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-updateIdentity-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updateIdentity-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updateIdentity-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updateIdentity-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updateIdentity-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updateIdentity-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-updateIdentity-shell">

```shell
curl -X PUT /identities/{id} \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-updateIdentity-go">

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

    req, err := http.NewRequest("PUT", "/identities/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-updateIdentity-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/identities/{id}', {
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
<div class="tab-pane" role="tabpanel"  id="tab-updateIdentity-java">

```java
// This sample needs improvement.
URL obj = new URL("/identities/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-updateIdentity-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put(
  '/identities/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-updateIdentity-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.put '/identities/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIddeleteIdentity"></a>

### Delete an identity

```
DELETE /identities/{id} HTTP/1.1
Accept: application/json

```

This endpoint deletes an identity. This can not be undone.

Learn how identities work in
[ORY Kratos' User And Identity Model Documentation](https://www.ory.sh/docs/next/kratos/concepts/identity-user-model).

<a id="delete-an-identity-parameters"></a>

##### Parameters

| Parameter | In   | Type   | Required | Description              |
| --------- | ---- | ------ | -------- | ------------------------ |
| id        | path | string | true     | ID is the identity's ID. |

#### Responses

<a id="delete-an-identity-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 204            | [No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)            | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 404            | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | genericError                                                                                                   | [genericError](#schemagenericerror) |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 404 response

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-deleteIdentity">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-deleteIdentity-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteIdentity-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteIdentity-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteIdentity-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteIdentity-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteIdentity-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-deleteIdentity-shell">

```shell
curl -X DELETE /identities/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteIdentity-go">

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

    req, err := http.NewRequest("DELETE", "/identities/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteIdentity-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/identities/{id}', {
  method: 'DELETE',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteIdentity-java">

```java
// This sample needs improvement.
URL obj = new URL("/identities/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-deleteIdentity-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.delete(
  '/identities/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteIdentity-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/identities/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="ory-kratos-public-endpoints"></a>

## Public Endpoints

<a id="opIdinitializeSelfServiceBrowserLoginFlow"></a>

### Initialize browser-based login user flow

```
GET /self-service/browser/flows/login HTTP/1.1
Accept: application/json

```

This endpoint initializes a browser-based user login flow. Once initialized, the
browser will be redirected to `urls.login_ui` with the request ID set as a query
parameter. If a valid user session exists already, the browser will be
redirected to `urls.default_redirect_url`.

> This endpoint is NOT INTENDED for API clients and only works with browsers
> (Chrome, Firefox, ...).

More information can be found at
[ORY Kratos User Login and User Registration Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-login-user-registration).

#### Responses

<a id="initialize-browser-based-login-user-flow-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 500 response

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeSelfServiceBrowserLoginFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeSelfServiceBrowserLoginFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLoginFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLoginFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLoginFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLoginFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLoginFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeSelfServiceBrowserLoginFlow-shell">

```shell
curl -X GET /self-service/browser/flows/login \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLoginFlow-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/login", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLoginFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/login', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLoginFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/login");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLoginFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/login',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLoginFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/login',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdinitializeSelfServiceBrowserLogoutFlow"></a>

### Initialize Browser-Based Logout User Flow

```
GET /self-service/browser/flows/logout HTTP/1.1
Accept: application/json

```

This endpoint initializes a logout flow.

> This endpoint is NOT INTENDED for API clients and only works with browsers
> (Chrome, Firefox, ...).

On successful logout, the browser will be redirected (HTTP 302 Found) to
`urls.default_return_to`.

More information can be found at
[ORY Kratos User Logout Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-logout).

#### Responses

<a id="initialize-browser-based-logout-user-flow-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 500 response

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeSelfServiceBrowserLogoutFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeSelfServiceBrowserLogoutFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLogoutFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLogoutFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLogoutFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLogoutFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserLogoutFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeSelfServiceBrowserLogoutFlow-shell">

```shell
curl -X GET /self-service/browser/flows/logout \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLogoutFlow-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/logout", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLogoutFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/logout', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLogoutFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/logout");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLogoutFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/logout',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserLogoutFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/logout',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdinitializeSelfServiceProfileManagementFlow"></a>

### Initialize browser-based profile management flow

```
GET /self-service/browser/flows/profile HTTP/1.1
Accept: application/json

```

This endpoint initializes a browser-based profile management flow. Once
initialized, the browser will be redirected to `urls.profile_ui` with the
request ID set as a query parameter. If no valid user session exists, a login
flow will be initialized.

> This endpoint is NOT INTENDED for API clients and only works with browsers
> (Chrome, Firefox, ...).

More information can be found at
[ORY Kratos Profile Management Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-profile-management).

#### Responses

<a id="initialize-browser-based-profile-management-flow-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 500 response

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeSelfServiceProfileManagementFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeSelfServiceProfileManagementFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceProfileManagementFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceProfileManagementFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceProfileManagementFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceProfileManagementFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceProfileManagementFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeSelfServiceProfileManagementFlow-shell">

```shell
curl -X GET /self-service/browser/flows/profile \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceProfileManagementFlow-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/profile", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceProfileManagementFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/profile', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceProfileManagementFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/profile");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceProfileManagementFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/profile',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceProfileManagementFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/profile',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdcompleteSelfServiceBrowserProfileManagementFlow"></a>

### Complete the browser-based profile management flows

```
POST /self-service/browser/flows/profile/update HTTP/1.1
Content-Type: application/json
Accept: application/json

```

This endpoint completes a browser-based profile management flow. This is usually
achieved by POSTing data to this endpoint.

If the provided profile data is valid against the Identity's Traits JSON Schema,
the data will be updated and the browser redirected to `url.profile_ui` for
further steps.

> This endpoint is NOT INTENDED for API clients and only works with browsers
> (Chrome, Firefox, ...) and HTML Forms.

More information can be found at
[ORY Kratos Profile Management Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-profile-management).

#### Request body

```json
{
  "traits": {}
}
```

```yaml
traits: {}
```

<a id="complete-the-browser-based-profile-management-flows-parameters"></a>

##### Parameters

| Parameter | In    | Type                                                                                                                    | Required | Description                |
| --------- | ----- | ----------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------- |
| request   | query | string(uuid4)                                                                                                           | false    | Request is the request ID. |
| body      | body  | [completeSelfServiceBrowserProfileManagementFlowPayload](#schemacompleteselfservicebrowserprofilemanagementflowpayload) | true     | none                       |

##### Detailed descriptions

**request**: Request is the request ID.

type: string

#### Responses

<a id="complete-the-browser-based-profile-management-flows-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 500 response

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-completeSelfServiceBrowserProfileManagementFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-completeSelfServiceBrowserProfileManagementFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeSelfServiceBrowserProfileManagementFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeSelfServiceBrowserProfileManagementFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeSelfServiceBrowserProfileManagementFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeSelfServiceBrowserProfileManagementFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeSelfServiceBrowserProfileManagementFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-completeSelfServiceBrowserProfileManagementFlow-shell">

```shell
curl -X POST /self-service/browser/flows/profile/update \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeSelfServiceBrowserProfileManagementFlow-go">

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

    req, err := http.NewRequest("POST", "/self-service/browser/flows/profile/update", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeSelfServiceBrowserProfileManagementFlow-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "traits": {}
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/profile/update', {
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
<div class="tab-pane" role="tabpanel"  id="tab-completeSelfServiceBrowserProfileManagementFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/profile/update");

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
<div class="tab-pane" role="tabpanel"  id="tab-completeSelfServiceBrowserProfileManagementFlow-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/self-service/browser/flows/profile/update',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeSelfServiceBrowserProfileManagementFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/self-service/browser/flows/profile/update',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdinitializeSelfServiceBrowserRegistrationFlow"></a>

### Initialize browser-based registration user flow

```
GET /self-service/browser/flows/registration HTTP/1.1
Accept: application/json

```

This endpoint initializes a browser-based user registration flow. Once
initialized, the browser will be redirected to `urls.registration_ui` with the
request ID set as a query parameter. If a valid user session exists already, the
browser will be redirected to `urls.default_redirect_url`.

> This endpoint is NOT INTENDED for API clients and only works with browsers
> (Chrome, Firefox, ...).

More information can be found at
[ORY Kratos User Login and User Registration Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-login-user-registration).

#### Responses

<a id="initialize-browser-based-registration-user-flow-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 500 response

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeSelfServiceBrowserRegistrationFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeSelfServiceBrowserRegistrationFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserRegistrationFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserRegistrationFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserRegistrationFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserRegistrationFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeSelfServiceBrowserRegistrationFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeSelfServiceBrowserRegistrationFlow-shell">

```shell
curl -X GET /self-service/browser/flows/registration \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserRegistrationFlow-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/registration", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserRegistrationFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/registration', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserRegistrationFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/registration");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserRegistrationFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/registration',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeSelfServiceBrowserRegistrationFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/registration',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdwhoami"></a>

### Check who the current HTTP session belongs to

```
GET /sessions/whoami HTTP/1.1
Accept: application/json

```

Uses the HTTP Headers in the GET request to determine (e.g. by using checking
the cookies) who is authenticated. Returns a session object or 401 if the
credentials are invalid or no credentials were sent.

This endpoint is useful for reverse proxies and API Gateways.

#### Responses

<a id="check-who-the-current-http-session-belongs-to-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description  | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------ | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | session      | [session](#schemasession)           |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | genericError | [genericError](#schemagenericerror) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError | [genericError](#schemagenericerror) |

##### Examples

###### 200 response

```json
{
  "authenticated_at": "2020-02-02T21:00:20Z",
  "expires_at": "2020-02-02T21:00:20Z",
  "identity": {
    "id": "string",
    "traits": {},
    "traits_schema_id": "string",
    "traits_schema_url": "string"
  },
  "issued_at": "2020-02-02T21:00:20Z",
  "sid": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-whoami">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-whoami-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-whoami-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-whoami-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-whoami-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-whoami-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-whoami-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-whoami-shell">

```shell
curl -X GET /sessions/whoami \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-whoami-go">

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

    req, err := http.NewRequest("GET", "/sessions/whoami", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-whoami-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/sessions/whoami', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-whoami-java">

```java
// This sample needs improvement.
URL obj = new URL("/sessions/whoami");

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
<div class="tab-pane" role="tabpanel"  id="tab-whoami-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/sessions/whoami',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-whoami-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/sessions/whoami',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="ory-kratos-common"></a>

## common

<a id="opIdgetSelfServiceBrowserLoginRequest"></a>

### Get the request context of browser-based login user flows

```
GET /self-service/browser/flows/requests/login?request=string HTTP/1.1
Accept: application/json

```

This endpoint returns a login request's context with, for example, error details
and other information.

When accessing this endpoint through ORY Kratos' Public API, ensure that cookies
are set as they are required for CSRF to work. To prevent token scanning
attacks, the public endpoint does not return 404 status codes to prevent
scanning attacks.

More information can be found at
[ORY Kratos User Login and User Registration Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-login-user-registration).

<a id="get-the-request-context-of-browser-based-login-user-flows-parameters"></a>

##### Parameters

| Parameter | In    | Type   | Required | Description                     |
| --------- | ----- | ------ | -------- | ------------------------------- |
| request   | query | string | true     | Request is the Login Request ID |

##### Detailed descriptions

**request**: Request is the Login Request ID

The value for this parameter comes from `request` URL Query parameter sent to
your application (e.g. `/login?request=abcde`).

#### Responses

<a id="get-the-request-context-of-browser-based-login-user-flows-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description  | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------ | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | loginRequest | [loginRequest](#schemaloginrequest) |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | genericError | [genericError](#schemagenericerror) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | genericError | [genericError](#schemagenericerror) |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError | [genericError](#schemagenericerror) |

##### Examples

###### 200 response

```json
{
  "active": "string",
  "expires_at": "2020-02-02T21:00:20Z",
  "id": "string",
  "issued_at": "2020-02-02T21:00:20Z",
  "methods": {
    "property1": {
      "config": {},
      "method": "string"
    },
    "property2": {
      "config": {},
      "method": "string"
    }
  },
  "request_url": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getSelfServiceBrowserLoginRequest">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getSelfServiceBrowserLoginRequest-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserLoginRequest-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserLoginRequest-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserLoginRequest-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserLoginRequest-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserLoginRequest-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getSelfServiceBrowserLoginRequest-shell">

```shell
curl -X GET /self-service/browser/flows/requests/login?request=string \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserLoginRequest-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/requests/login", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserLoginRequest-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/requests/login?request=string', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserLoginRequest-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/requests/login?request=string");

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
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserLoginRequest-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/requests/login',
  params={
    'request': 'string'},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserLoginRequest-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/requests/login',
  params: {
    'request' => 'string'}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetSelfServiceBrowserProfileManagementRequest"></a>

### Get the request context of browser-based profile management flows

```
GET /self-service/browser/flows/requests/profile?request=string HTTP/1.1
Accept: application/json

```

When accessing this endpoint through ORY Kratos' Public API, ensure that cookies
are set as they are required for checking the auth session. To prevent scanning
attacks, the public endpoint does not return 404 status codes but instead 403
or 500.

More information can be found at
[ORY Kratos Profile Management Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-profile-management).

<a id="get-the-request-context-of-browser-based-profile-management-flows-parameters"></a>

##### Parameters

| Parameter | In    | Type   | Required | Description                     |
| --------- | ----- | ------ | -------- | ------------------------------- |
| request   | query | string | true     | Request is the Login Request ID |

##### Detailed descriptions

**request**: Request is the Login Request ID

The value for this parameter comes from `request` URL Query parameter sent to
your application (e.g. `/login?request=abcde`).

#### Responses

<a id="get-the-request-context-of-browser-based-profile-management-flows-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description              | Schema                                                      |
| ------ | -------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | profileManagementRequest | [profileManagementRequest](#schemaprofilemanagementrequest) |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | genericError             | [genericError](#schemagenericerror)                         |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | genericError             | [genericError](#schemagenericerror)                         |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError             | [genericError](#schemagenericerror)                         |

##### Examples

###### 200 response

```json
{
  "expires_at": "2020-02-02T21:00:20Z",
  "form": {
    "action": "string",
    "errors": [
      {
        "message": "string"
      }
    ],
    "fields": [
      {
        "disabled": "string",
        "errors": [
          {
            "message": "string"
          }
        ],
        "name": "string",
        "pattern": "string",
        "required": true,
        "type": "string",
        "value": {}
      }
    ],
    "method": "string"
  },
  "id": "string",
  "identity": {
    "id": "string",
    "traits": {},
    "traits_schema_id": "string",
    "traits_schema_url": "string"
  },
  "issued_at": "2020-02-02T21:00:20Z",
  "request_url": "string",
  "update_successful": true
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getSelfServiceBrowserProfileManagementRequest">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getSelfServiceBrowserProfileManagementRequest-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserProfileManagementRequest-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserProfileManagementRequest-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserProfileManagementRequest-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserProfileManagementRequest-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserProfileManagementRequest-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getSelfServiceBrowserProfileManagementRequest-shell">

```shell
curl -X GET /self-service/browser/flows/requests/profile?request=string \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserProfileManagementRequest-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/requests/profile", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserProfileManagementRequest-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/requests/profile?request=string', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserProfileManagementRequest-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/requests/profile?request=string");

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
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserProfileManagementRequest-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/requests/profile',
  params={
    'request': 'string'},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserProfileManagementRequest-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/requests/profile',
  params: {
    'request' => 'string'}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetSelfServiceBrowserRegistrationRequest"></a>

### Get the request context of browser-based registration user flows

```
GET /self-service/browser/flows/requests/registration?request=string HTTP/1.1
Accept: application/json

```

This endpoint returns a registration request's context with, for example, error
details and other information.

When accessing this endpoint through ORY Kratos' Public API, ensure that cookies
are set as they are required for CSRF to work. To prevent token scanning
attacks, the public endpoint does not return 404 status codes to prevent
scanning attacks.

More information can be found at
[ORY Kratos User Login and User Registration Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-login-user-registration).

<a id="get-the-request-context-of-browser-based-registration-user-flows-parameters"></a>

##### Parameters

| Parameter | In    | Type   | Required | Description                            |
| --------- | ----- | ------ | -------- | -------------------------------------- |
| request   | query | string | true     | Request is the Registration Request ID |

##### Detailed descriptions

**request**: Request is the Registration Request ID

The value for this parameter comes from `request` URL Query parameter sent to
your application (e.g. `/registration?request=abcde`).

#### Responses

<a id="get-the-request-context-of-browser-based-registration-user-flows-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description         | Schema                                            |
| ------ | -------------------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | registrationRequest | [registrationRequest](#schemaregistrationrequest) |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | genericError        | [genericError](#schemagenericerror)               |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | genericError        | [genericError](#schemagenericerror)               |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError        | [genericError](#schemagenericerror)               |

##### Examples

###### 200 response

```json
{
  "active": "string",
  "expires_at": "2020-02-02T21:00:20Z",
  "id": "string",
  "issued_at": "2020-02-02T21:00:20Z",
  "methods": {
    "property1": {
      "config": {},
      "method": "string"
    },
    "property2": {
      "config": {},
      "method": "string"
    }
  },
  "request_url": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getSelfServiceBrowserRegistrationRequest">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getSelfServiceBrowserRegistrationRequest-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserRegistrationRequest-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserRegistrationRequest-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserRegistrationRequest-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserRegistrationRequest-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getSelfServiceBrowserRegistrationRequest-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getSelfServiceBrowserRegistrationRequest-shell">

```shell
curl -X GET /self-service/browser/flows/requests/registration?request=string \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserRegistrationRequest-go">

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

    req, err := http.NewRequest("GET", "/self-service/browser/flows/requests/registration", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserRegistrationRequest-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/self-service/browser/flows/requests/registration?request=string', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserRegistrationRequest-java">

```java
// This sample needs improvement.
URL obj = new URL("/self-service/browser/flows/requests/registration?request=string");

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
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserRegistrationRequest-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/self-service/browser/flows/requests/registration',
  params={
    'request': 'string'},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getSelfServiceBrowserRegistrationRequest-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/self-service/browser/flows/requests/registration',
  params: {
    'request' => 'string'}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="ory-kratos-version"></a>

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

<a id="tocScredentialstype">CredentialsType</a>

#### CredentialsType

<a id="schemacredentialstype"></a>

```json
"string"
```

_CredentialsType represents several different credential types, like password
credentials, passwordless credentials,_

#### Properties

| Name                                                                                                                | Type   | Required | Restrictions | Description |
| ------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------------ | ----------- |
| CredentialsType represents several different credential types, like password credentials, passwordless credentials, | string | false    | none         | and so on.  |

<a id="tocSerror">Error</a>

#### Error

<a id="schemaerror"></a>

```json
{
  "message": "string"
}
```

#### Properties

| Name    | Type   | Required | Restrictions | Description                              |
| ------- | ------ | -------- | ------------ | ---------------------------------------- |
| message | string | false    | none         | Code FormErrorCode `json:"id,omitempty"` |

<a id="tocSidentity">Identity</a>

#### Identity

<a id="schemaidentity"></a>

```json
{
  "id": "string",
  "traits": {},
  "traits_schema_id": "string",
  "traits_schema_url": "string"
}
```

#### Properties

| Name              | Type                    | Required | Restrictions | Description                                                                                                    |
| ----------------- | ----------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| id                | [UUID](#schemauuid)     | true     | none         | none                                                                                                           |
| traits            | [Traits](#schematraits) | true     | none         | none                                                                                                           |
| traits_schema_id  | string                  | false    | none         | TraitsSchemaID is the ID of the JSON Schema to be used for validating the identity's traits.                   |
| traits_schema_url | string                  | false    | none         | TraitsSchemaURL is the URL of the endpoint where the identity's traits schema can be fetched from. format: url |

<a id="tocStraits">Traits</a>

#### Traits

<a id="schematraits"></a>

```json
{}
```

#### Properties

_None_

<a id="tocSuuid">UUID</a>

#### UUID

<a id="schemauuid"></a>

```json
"string"
```

#### Properties

| Name        | Type          | Required | Restrictions | Description |
| ----------- | ------------- | -------- | ------------ | ----------- |
| _anonymous_ | string(uuid4) | false    | none         | none        |

<a id="tocScompleteselfservicebrowserprofilemanagementflowpayload">completeSelfServiceBrowserProfileManagementFlowPayload</a>

#### completeSelfServiceBrowserProfileManagementFlowPayload

<a id="schemacompleteselfservicebrowserprofilemanagementflowpayload"></a>

```json
{
  "traits": {}
}
```

#### Properties

| Name   | Type   | Required | Restrictions | Description                                                               |
| ------ | ------ | -------- | ------------ | ------------------------------------------------------------------------- |
| traits | object | true     | none         | Traits contains all of the identity's traits. type: string format: binary |

<a id="tocSform">form</a>

#### form

<a id="schemaform"></a>

```json
{
  "action": "string",
  "errors": [
    {
      "message": "string"
    }
  ],
  "fields": [
    {
      "disabled": "string",
      "errors": [
        {
          "message": "string"
        }
      ],
      "name": "string",
      "pattern": "string",
      "required": true,
      "type": "string",
      "value": {}
    }
  ],
  "method": "string"
}
```

_HTMLForm represents a HTML Form. The container can work with both HTTP Form and
JSON requests_

#### Properties

| Name   | Type                            | Required | Restrictions | Description                                                                                 |
| ------ | ------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------- |
| action | string                          | false    | none         | Action should be used as the form action URL (<form action="{{ .Action }}" method="post">). |
| errors | [[Error](#schemaerror)]         | false    | none         | Errors contains all form errors. These will be duplicates of the individual field errors.   |
| fields | [formFields](#schemaformfields) | false    | none         | Fields contains multiple fields                                                             |
| method | string                          | false    | none         | Method is the form method (e.g. POST)                                                       |

<a id="tocSformfield">formField</a>

#### formField

<a id="schemaformfield"></a>

```json
{
  "disabled": "string",
  "errors": [
    {
      "message": "string"
    }
  ],
  "name": "string",
  "pattern": "string",
  "required": true,
  "type": "string",
  "value": {}
}
```

_Field represents a HTML Form Field_

#### Properties

| Name     | Type                    | Required | Restrictions | Description                                                             |
| -------- | ----------------------- | -------- | ------------ | ----------------------------------------------------------------------- |
| disabled | string                  | false    | none         | Disabled is the equivalent of <input disabled="{{.Disabled}}">          |
| errors   | [[Error](#schemaerror)] | false    | none         | Errors contains all validation errors this particular field has caused. |
| name     | string                  | false    | none         | Name is the equivalent of <input name="{{.Name}}">                      |
| pattern  | string                  | false    | none         | Pattern is the equivalent of <input pattern="{{.Pattern}}">             |
| required | boolean                 | false    | none         | Required is the equivalent of <input required="{{.Required}}">          |
| type     | string                  | false    | none         | Type is the equivalent of <input type="{{.Type}}">                      |
| value    | object                  | false    | none         | Value is the equivalent of <input value="{{.Value}}">                   |

<a id="tocSformfields">formFields</a>

#### formFields

<a id="schemaformfields"></a>

```json
[
  {
    "disabled": "string",
    "errors": [
      {
        "message": "string"
      }
    ],
    "name": "string",
    "pattern": "string",
    "required": true,
    "type": "string",
    "value": {}
  }
]
```

_Fields contains multiple fields_

#### Properties

| Name        | Type                            | Required | Restrictions | Description                     |
| ----------- | ------------------------------- | -------- | ------------ | ------------------------------- |
| _anonymous_ | [[formField](#schemaformfield)] | false    | none         | Fields contains multiple fields |

<a id="tocSgenericerror">genericError</a>

#### genericError

<a id="schemagenericerror"></a>

```json
{
  "error": {
    "code": 404,
    "debug": "The database adapter was unable to find the element",
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

_Error response_

#### Properties

| Name  | Type                                              | Required | Restrictions | Description            |
| ----- | ------------------------------------------------- | -------- | ------------ | ---------------------- |
| error | [genericErrorPayload](#schemagenericerrorpayload) | false    | none         | nolint:deadcode,unused |

<a id="tocSgenericerrorpayload">genericErrorPayload</a>

#### genericErrorPayload

<a id="schemagenericerrorpayload"></a>

```json
{
  "code": 404,
  "debug": "The database adapter was unable to find the element",
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

_nolint:deadcode,unused_

#### Properties

| Name                       | Type           | Required | Restrictions | Description                                                                            |
| -------------------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------- |
| code                       | integer(int64) | false    | none         | Code represents the error status code (404, 403, 401, ...).                            |
| debug                      | string         | false    | none         | Debug contains debug information. This is usually not available and has to be enabled. |
| details                    | [object]       | false    | none         | none                                                                                   |
| » **additionalProperties** | object         | false    | none         | none                                                                                   |
| message                    | string         | false    | none         | none                                                                                   |
| reason                     | string         | false    | none         | none                                                                                   |
| request                    | string         | false    | none         | none                                                                                   |
| status                     | string         | false    | none         | none                                                                                   |

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

<a id="tocSloginrequest">loginRequest</a>

#### loginRequest

<a id="schemaloginrequest"></a>

```json
{
  "active": "string",
  "expires_at": "2020-02-02T21:00:20Z",
  "id": "string",
  "issued_at": "2020-02-02T21:00:20Z",
  "methods": {
    "property1": {
      "config": {},
      "method": "string"
    },
    "property2": {
      "config": {},
      "method": "string"
    }
  },
  "request_url": "string"
}
```

#### Properties

| Name                       | Type                                            | Required | Restrictions | Description                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active                     | [CredentialsType](#schemacredentialstype)       | false    | none         | and so on.                                                                                                                                                                  |
| expires_at                 | string(date-time)                               | false    | none         | ExpiresAt is the time (UTC) when the request expires. If the user still wishes to log in, a new request has to be initiated.                                                |
| id                         | [UUID](#schemauuid)                             | false    | none         | none                                                                                                                                                                        |
| issued_at                  | string(date-time)                               | false    | none         | IssuedAt is the time (UTC) when the request occurred.                                                                                                                       |
| methods                    | object                                          | false    | none         | Methods contains context for all enabled login methods. If a login request has been processed, but for example the password is incorrect, this will contain error messages. |
| » **additionalProperties** | [loginRequestMethod](#schemaloginrequestmethod) | false    | none         | none                                                                                                                                                                        |
| request_url                | string                                          | false    | none         | RequestURL is the initial URL that was requested from ORY Kratos. It can be used to forward information contained in the URL's path or query for example.                   |

<a id="tocSloginrequestmethod">loginRequestMethod</a>

#### loginRequestMethod

<a id="schemaloginrequestmethod"></a>

```json
{
  "config": {},
  "method": "string"
}
```

#### Properties

| Name   | Type                                                        | Required | Restrictions | Description |
| ------ | ----------------------------------------------------------- | -------- | ------------ | ----------- |
| config | [loginRequestMethodConfig](#schemaloginrequestmethodconfig) | false    | none         | none        |
| method | [CredentialsType](#schemacredentialstype)                   | false    | none         | and so on.  |

<a id="tocSloginrequestmethodconfig">loginRequestMethodConfig</a>

#### loginRequestMethodConfig

<a id="schemaloginrequestmethodconfig"></a>

```json
{}
```

#### Properties

_allOf_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

<a id="tocSprofilemanagementrequest">profileManagementRequest</a>

#### profileManagementRequest

<a id="schemaprofilemanagementrequest"></a>

```json
{
  "expires_at": "2020-02-02T21:00:20Z",
  "form": {
    "action": "string",
    "errors": [
      {
        "message": "string"
      }
    ],
    "fields": [
      {
        "disabled": "string",
        "errors": [
          {
            "message": "string"
          }
        ],
        "name": "string",
        "pattern": "string",
        "required": true,
        "type": "string",
        "value": {}
      }
    ],
    "method": "string"
  },
  "id": "string",
  "identity": {
    "id": "string",
    "traits": {},
    "traits_schema_id": "string",
    "traits_schema_url": "string"
  },
  "issued_at": "2020-02-02T21:00:20Z",
  "request_url": "string",
  "update_successful": true
}
```

_Request presents a profile management request_

#### Properties

| Name              | Type                        | Required | Restrictions | Description                                                                                                                                                                                                                                                                                       |
| ----------------- | --------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| expires_at        | string(date-time)           | false    | none         | ExpiresAt is the time (UTC) when the request expires. If the user still wishes to update the profile, a new request has to be initiated.                                                                                                                                                          |
| form              | [form](#schemaform)         | false    | none         | HTMLForm represents a HTML Form. The container can work with both HTTP Form and JSON requests                                                                                                                                                                                                     |
| id                | [UUID](#schemauuid)         | false    | none         | none                                                                                                                                                                                                                                                                                              |
| identity          | [Identity](#schemaidentity) | false    | none         | none                                                                                                                                                                                                                                                                                              |
| issued_at         | string(date-time)           | false    | none         | IssuedAt is the time (UTC) when the request occurred.                                                                                                                                                                                                                                             |
| request_url       | string                      | false    | none         | RequestURL is the initial URL that was requested from ORY Kratos. It can be used to forward information contained in the URL's path or query for example.                                                                                                                                         |
| update_successful | boolean                     | false    | none         | UpdateSuccessful, if true, indicates that the profile has been updated successfully with the provided data. Done will stay true when repeatedly checking. If set to true, done will revert back to false only when a request with invalid (e.g. "please use a valid phone number") data was sent. |

<a id="tocSregistrationrequest">registrationRequest</a>

#### registrationRequest

<a id="schemaregistrationrequest"></a>

```json
{
  "active": "string",
  "expires_at": "2020-02-02T21:00:20Z",
  "id": "string",
  "issued_at": "2020-02-02T21:00:20Z",
  "methods": {
    "property1": {
      "config": {},
      "method": "string"
    },
    "property2": {
      "config": {},
      "method": "string"
    }
  },
  "request_url": "string"
}
```

#### Properties

| Name                       | Type                                                          | Required | Restrictions | Description                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active                     | [CredentialsType](#schemacredentialstype)                     | false    | none         | and so on.                                                                                                                                                                                |
| expires_at                 | string(date-time)                                             | false    | none         | ExpiresAt is the time (UTC) when the request expires. If the user still wishes to log in, a new request has to be initiated.                                                              |
| id                         | [UUID](#schemauuid)                                           | false    | none         | none                                                                                                                                                                                      |
| issued_at                  | string(date-time)                                             | false    | none         | IssuedAt is the time (UTC) when the request occurred.                                                                                                                                     |
| methods                    | object                                                        | false    | none         | Methods contains context for all enabled registration methods. If a registration request has been processed, but for example the password is incorrect, this will contain error messages. |
| » **additionalProperties** | [registrationRequestMethod](#schemaregistrationrequestmethod) | false    | none         | none                                                                                                                                                                                      |
| request_url                | string                                                        | false    | none         | RequestURL is the initial URL that was requested from ORY Kratos. It can be used to forward information contained in the URL's path or query for example.                                 |

<a id="tocSregistrationrequestmethod">registrationRequestMethod</a>

#### registrationRequestMethod

<a id="schemaregistrationrequestmethod"></a>

```json
{
  "config": {},
  "method": "string"
}
```

#### Properties

| Name   | Type                                                                      | Required | Restrictions | Description |
| ------ | ------------------------------------------------------------------------- | -------- | ------------ | ----------- |
| config | [registrationRequestMethodConfig](#schemaregistrationrequestmethodconfig) | false    | none         | none        |
| method | [CredentialsType](#schemacredentialstype)                                 | false    | none         | and so on.  |

<a id="tocSregistrationrequestmethodconfig">registrationRequestMethodConfig</a>

#### registrationRequestMethodConfig

<a id="schemaregistrationrequestmethodconfig"></a>

```json
{}
```

#### Properties

_allOf_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

_and_

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | object | false    | none         | none        |

<a id="tocSsession">session</a>

#### session

<a id="schemasession"></a>

```json
{
  "authenticated_at": "2020-02-02T21:00:20Z",
  "expires_at": "2020-02-02T21:00:20Z",
  "identity": {
    "id": "string",
    "traits": {},
    "traits_schema_id": "string",
    "traits_schema_url": "string"
  },
  "issued_at": "2020-02-02T21:00:20Z",
  "sid": "string"
}
```

#### Properties

| Name             | Type                        | Required | Restrictions | Description |
| ---------------- | --------------------------- | -------- | ------------ | ----------- |
| authenticated_at | string(date-time)           | false    | none         | none        |
| expires_at       | string(date-time)           | false    | none         | none        |
| identity         | [Identity](#schemaidentity) | false    | none         | none        |
| issued_at        | string(date-time)           | false    | none         | none        |
| sid              | [UUID](#schemauuid)         | false    | none         | none        |

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
