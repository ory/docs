---
title: REST API
id: api
---



Package main ORY Keto

> You are viewing a REST API documentation. This documentation is auto-generated from a swagger specification which
itself is generated from annotations in the source files of the project. It is possible that this documentation includes
bugs and that code samples are incomplete or wrong.
>
> If you find issues in the respective documentation, please do not edit the
markdown files directly (as they are generated) but raise an issue on the project's GitHub instead. This documentation
will improve over time with your help! If you have ideas how to improve this part of the documentation, feel free to
share them in a [GitHub issue](https://github.com/ory/docs/issues/new) any time.

<a id="api-health"></a>
## health

<a id="opIdisInstanceAlive"></a>

### Check the Alive Status

```
GET /health/alive HTTP/1.1
Accept: application/json

```

This endpoint returns a 200 status code when the HTTP server is up running.
This status does currently not include checks whether the database connection is working.
This endpoint does not require the `X-Forwarded-Proto` header when TLS termination is set.

Be aware that if you are running multiple nodes of ORY Keto, the health status will never refer to the cluster state, only to a single instance.

#### Responses

<a id="check-the-alive-status-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|healthStatus|[healthStatus](#schemahealthstatus)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="check-the-alive-status-responseschema"></a>
##### Response Schema</h3>

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

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

### Check the Readiness Status

```
GET /health/ready HTTP/1.1
Accept: application/json

```

This endpoint returns a 200 status code when the HTTP server is up running and the environment dependencies (e.g.
the database) are responsive as well.

This status does currently not include checks whether the database connection is working.
This endpoint does not require the `X-Forwarded-Proto` header when TLS termination is set.

Be aware that if you are running multiple nodes of ORY Keto, the health status will never refer to the cluster state, only to a single instance.

#### Responses

<a id="check-the-readiness-status-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|healthStatus|[healthStatus](#schemahealthstatus)|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|healthNotReadyStatus|[healthNotReadyStatus](#schemahealthnotreadystatus)|

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

<a id="api-policy"></a>
## policy

<a id="opIdlistPolicies"></a>

### listPolicies

```
GET /policies HTTP/1.1
Accept: application/json

```

List Access Control Policies

<a id="listpolicies-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|offset|query|integer(int64)|false|The offset from where to start looking.|
|limit|query|integer(int64)|false|The maximum amount of policies returned.|

#### Responses

<a id="listpolicies-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A policy|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="listpolicies-responseschema"></a>
##### Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[policy](#schemapolicy)]|false|none|none|
|» actions|[string]|false|none|Actions impacted by the policy.|
|» conditions|object|false|none|Conditions under which the policy is active.|
|»» **additionalProperties**|object|false|none|none|
|»»» options|object|false|none|none|
|»»»» **additionalProperties**|object|false|none|none|
|»»» type|string|false|none|none|
|»» description|string|false|none|Description of the policy.|
|»» effect|string|false|none|Effect of the policy|
|»» id|string|false|none|ID of the policy.|
|»» resources|[string]|false|none|Resources impacted by the policy.|
|»» subjects|[string]|false|none|Subjects impacted by the policy.|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
[
  {
    "actions": [
      "string"
    ],
    "conditions": {
      "property1": {
        "options": {
          "property1": {},
          "property2": {}
        },
        "type": "string"
      },
      "property2": {
        "options": {
          "property1": {},
          "property2": {}
        },
        "type": "string"
      }
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
  }
]
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-listPolicies">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-listPolicies-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listPolicies-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listPolicies-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listPolicies-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listPolicies-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listPolicies-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-listPolicies-shell">

```shell
curl -X GET /policies \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listPolicies-go">

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

    req, err := http.NewRequest("GET", "/policies", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listPolicies-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/policies', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listPolicies-java">

```java
// This sample needs improvement.
URL obj = new URL("/policies");

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
<div class="tab-pane" role="tabpanel"  id="tab-listPolicies-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/policies',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listPolicies-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/policies',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdcreatePolicy"></a>

### createPolicy

```
POST /policies HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Create an Access Control Policy

#### Request body

```json
{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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
}
```

<a id="createpolicy-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[policy](#schemapolicy)|false|none|

#### Responses

<a id="createpolicy-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|policy|[policy](#schemapolicy)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="createpolicy-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 201 response

```json
{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-createPolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-createPolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createPolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createPolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createPolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createPolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createPolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-createPolicy-shell">

```shell
curl -X POST /policies \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createPolicy-go">

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

    req, err := http.NewRequest("POST", "/policies", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createPolicy-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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

fetch('/policies', {
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
<div class="tab-pane" role="tabpanel"  id="tab-createPolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/policies");

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
<div class="tab-pane" role="tabpanel"  id="tab-createPolicy-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/policies',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createPolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/policies',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetPolicy"></a>

### getPolicy

```
GET /policies/{id} HTTP/1.1
Accept: application/json

```

Get an Access Control Policy

<a id="getpolicy-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the policy.|

#### Responses

<a id="getpolicy-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|policy|[policy](#schemapolicy)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="getpolicy-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getPolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getPolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getPolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getPolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getPolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getPolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getPolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getPolicy-shell">

```shell
curl -X GET /policies/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getPolicy-go">

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

    req, err := http.NewRequest("GET", "/policies/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getPolicy-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/policies/{id}', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getPolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/policies/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-getPolicy-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/policies/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getPolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/policies/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdupdatePolicy"></a>

### updatePolicy

```
PUT /policies/{id} HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Update an Access Control Policy

#### Request body

```json
{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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
}
```

<a id="updatepolicy-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the policy.|
|body|body|[policy](#schemapolicy)|false|none|

#### Responses

<a id="updatepolicy-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|policy|[policy](#schemapolicy)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="updatepolicy-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-updatePolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-updatePolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updatePolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updatePolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updatePolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updatePolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-updatePolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-updatePolicy-shell">

```shell
curl -X PUT /policies/{id} \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-updatePolicy-go">

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

    req, err := http.NewRequest("PUT", "/policies/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-updatePolicy-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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

fetch('/policies/{id}', {
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
<div class="tab-pane" role="tabpanel"  id="tab-updatePolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/policies/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-updatePolicy-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put(
  '/policies/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-updatePolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.put '/policies/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIddeletePolicy"></a>

### deletePolicy

```
DELETE /policies/{id} HTTP/1.1
Accept: application/json

```

Delete an Access Control Policy

<a id="deletepolicy-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the policy.|

#### Responses

<a id="deletepolicy-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|An empty response|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="deletepolicy-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 401 response

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

<div class="tabs" id="tab-deletePolicy">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-deletePolicy-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deletePolicy-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deletePolicy-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deletePolicy-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deletePolicy-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deletePolicy-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-deletePolicy-shell">

```shell
curl -X DELETE /policies/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deletePolicy-go">

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

    req, err := http.NewRequest("DELETE", "/policies/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deletePolicy-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/policies/{id}', {
  method: 'DELETE',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deletePolicy-java">

```java
// This sample needs improvement.
URL obj = new URL("/policies/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-deletePolicy-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.delete(
  '/policies/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deletePolicy-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/policies/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="api-role"></a>
## role

<a id="opIdlistRoles"></a>

### List all roles

```
GET /roles HTTP/1.1
Accept: application/json

```

A Role represents a group of users that share the same role and thus permissions. A role could be an administrator, a moderator, a regular
user or some other sort of role.

This endpoint allows you to retrieve all roles that are stored in the system.

<a id="list-all-roles-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|member|query|string|false|The id of the member to look up.|
|limit|query|integer(int64)|false|The maximum amount of policies returned.|
|offset|query|integer(int64)|false|The offset from where to start looking.|

#### Responses

<a id="list-all-roles-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of roles the member is belonging to|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="list-all-roles-responseschema"></a>
##### Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[role](#schemarole)]|false|none|[Role represents a group of users that share the same role. A role could be an administrator, a moderator, a regular user or some other sort of role.]|
|» id|string|false|none|ID is the role's unique id.|
|» members|[string]|false|none|Members is who belongs to the role.|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
[
  {
    "id": "string",
    "members": [
      "string"
    ]
  }
]
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-listRoles">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-listRoles-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listRoles-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listRoles-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listRoles-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listRoles-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-listRoles-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-listRoles-shell">

```shell
curl -X GET /roles \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listRoles-go">

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

    req, err := http.NewRequest("GET", "/roles", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listRoles-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/roles', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listRoles-java">

```java
// This sample needs improvement.
URL obj = new URL("/roles");

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
<div class="tab-pane" role="tabpanel"  id="tab-listRoles-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/roles',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-listRoles-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/roles',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdcreateRole"></a>

### Create a role

```
POST /roles HTTP/1.1
Content-Type: application/json
Accept: application/json

```

A Role represents a group of users that share the same role and thus permissions. A role could be an administrator, a moderator, a regular
user or some other sort of role.

This endpoint allows you to create a new role. You may define members as well but you don't have to.

#### Request body

```json
{
  "id": "string",
  "members": [
    "string"
  ]
}
```

<a id="create-a-role-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[role](#schemarole)|false|none|

#### Responses

<a id="create-a-role-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|role|[role](#schemarole)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="create-a-role-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 201 response

```json
{
  "id": "string",
  "members": [
    "string"
  ]
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-createRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-createRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-createRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-createRole-shell">

```shell
curl -X POST /roles \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createRole-go">

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

    req, err := http.NewRequest("POST", "/roles", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createRole-node">

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

fetch('/roles', {
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
<div class="tab-pane" role="tabpanel"  id="tab-createRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/roles");

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
<div class="tab-pane" role="tabpanel"  id="tab-createRole-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/roles',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-createRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/roles',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIddeleteRole"></a>

### Get a role by its ID

```
DELETE /roles/{id} HTTP/1.1
Accept: application/json

```

A Role represents a group of users that share the same role and thus permissions. A role could be an administrator, a moderator, a regular
user or some other sort of role.

This endpoint allows you to delete an existing role. You have to know the role's ID.

<a id="get-a-role-by-its-id-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the role to look up.|

#### Responses

<a id="get-a-role-by-its-id-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|An empty response|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="get-a-role-by-its-id-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 401 response

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

<div class="tabs" id="tab-deleteRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-deleteRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-deleteRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-deleteRole-shell">

```shell
curl -X DELETE /roles/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteRole-go">

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

    req, err := http.NewRequest("DELETE", "/roles/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteRole-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/roles/{id}', {
  method: 'DELETE',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/roles/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-deleteRole-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.delete(
  '/roles/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-deleteRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/roles/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdsetRole"></a>

### A Role represents a group of users that share the same role and thus permissions. A role could be an administrator, a moderator, a regular
user or some other sort of role.

```
PUT /roles/{id} HTTP/1.1
Accept: application/json

```

This endpoint allows you to overwrite a role. You have to know the role's ID.

#### Responses

<a id="a-role-represents-a-group-of-users-that-share-the-same-role-and-thus-permissions.-a-role-could-be-an-administrator,-a-moderator,-a-regular
user-or-some-other-sort-of-role.-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|An empty response|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="a-role-represents-a-group-of-users-that-share-the-same-role-and-thus-permissions.-a-role-could-be-an-administrator,-a-moderator,-a-regular
user-or-some-other-sort-of-role.-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 401 response

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

<div class="tabs" id="tab-setRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-setRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-setRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-setRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-setRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-setRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-setRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-setRole-shell">

```shell
curl -X PUT /roles/{id} \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-setRole-go">

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

    req, err := http.NewRequest("PUT", "/roles/{id}", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-setRole-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/roles/{id}', {
  method: 'PUT',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-setRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/roles/{id}");

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
<div class="tab-pane" role="tabpanel"  id="tab-setRole-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.put(
  '/roles/{id}',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-setRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.put '/roles/{id}',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdaddMembersToRole"></a>

### Add members to a role

```
POST /roles/{id}/members HTTP/1.1
Content-Type: application/json
Accept: application/json

```

A Role represents a group of users that share the same role and thus permissions. A role could be an administrator, a moderator, a regular
user or some other sort of role.

This endpoint allows you to add members (users, applications, ...) to a specific role. You have to know the role's ID.

#### Request body

```json
{
  "members": [
    "string"
  ]
}
```

<a id="add-members-to-a-role-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the role to modify.|
|body|body|[roleMembers](#schemarolemembers)|false|none|

#### Responses

<a id="add-members-to-a-role-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|An empty response|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="add-members-to-a-role-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 401 response

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

<div class="tabs" id="tab-addMembersToRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-addMembersToRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addMembersToRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addMembersToRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addMembersToRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addMembersToRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-addMembersToRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-addMembersToRole-shell">

```shell
curl -X POST /roles/{id}/members \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addMembersToRole-go">

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

    req, err := http.NewRequest("POST", "/roles/{id}/members", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addMembersToRole-node">

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

fetch('/roles/{id}/members', {
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
<div class="tab-pane" role="tabpanel"  id="tab-addMembersToRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/roles/{id}/members");

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
<div class="tab-pane" role="tabpanel"  id="tab-addMembersToRole-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/roles/{id}/members',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-addMembersToRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/roles/{id}/members',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdremoveMembersFromRole"></a>

### Remove members from a role

```
DELETE /roles/{id}/members HTTP/1.1
Content-Type: application/json
Accept: application/json

```

A Role represents a group of users that share the same role and thus permissions. A role could be an administrator, a moderator, a regular
user or some other sort of role.

This endpoint allows you to remove members (users, applications, ...) from a specific role. You have to know the role's ID.

#### Request body

```json
{
  "members": [
    "string"
  ]
}
```

<a id="remove-members-from-a-role-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the role to modify.|
|body|body|[roleMembers](#schemarolemembers)|false|none|

#### Responses

<a id="remove-members-from-a-role-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|An empty response|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="remove-members-from-a-role-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 401 response

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

<div class="tabs" id="tab-removeMembersFromRole">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-removeMembersFromRole-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeMembersFromRole-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeMembersFromRole-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeMembersFromRole-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeMembersFromRole-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-removeMembersFromRole-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-removeMembersFromRole-shell">

```shell
curl -X DELETE /roles/{id}/members \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeMembersFromRole-go">

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

    req, err := http.NewRequest("DELETE", "/roles/{id}/members", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeMembersFromRole-node">

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

fetch('/roles/{id}/members', {
  method: 'DELETE',
  body: input,
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeMembersFromRole-java">

```java
// This sample needs improvement.
URL obj = new URL("/roles/{id}/members");

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
<div class="tab-pane" role="tabpanel"  id="tab-removeMembersFromRole-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.delete(
  '/roles/{id}/members',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-removeMembersFromRole-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.delete '/roles/{id}/members',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="api-version"></a>
## version

<a id="opIdgetVersion"></a>

### Get the version of Keto

```
GET /version HTTP/1.1
Accept: application/json

```

This endpoint returns the version as `{ "version": "VERSION" }`. The version is only correct with the prebuilt binary and not custom builds.

#### Responses

<a id="get-the-version-of-keto-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|version|[version](#schemaversion)|

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

<a id="api-warden"></a>
## warden

<a id="opIdisOAuth2AccessTokenAuthorized"></a>

### Check if an OAuth 2.0 access token is authorized to access a resource

```
POST /warden/oauth2/access-tokens/authorize HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Checks if a token is valid and if the token subject is allowed to perform an action on a resource.
This endpoint requires a token, a scope, a resource name, an action name and a context.

If a token is expired/invalid, has not been granted the requested scope or the subject is not allowed to
perform the action on the resource, this endpoint returns a 200 response with `{ "allowed": false }`.

This endpoint passes all data from the upstream OAuth 2.0 token introspection endpoint. If you use ORY Hydra as an
upstream OAuth 2.0 provider, data set through the `accessTokenExtra` field in the consent flow will be included in this
response as well.

#### Request body

```json
{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "scope": [
    "string"
  ],
  "token": "string"
}
```

<a id="check-if-an-oauth-2.0-access-token-is-authorized-to-access-a-resource-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[wardenOAuth2AccessTokenAuthorizationRequest](#schemawardenoauth2accesstokenauthorizationrequest)|false|none|

#### Responses

<a id="check-if-an-oauth-2.0-access-token-is-authorized-to-access-a-resource-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|wardenOAuth2AccessTokenAuthorizationResponse|[wardenOAuth2AccessTokenAuthorizationResponse](#schemawardenoauth2accesstokenauthorizationresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="check-if-an-oauth-2.0-access-token-is-authorized-to-access-a-resource-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
{
  "allowed": true,
  "aud": [
    "string"
  ],
  "client_id": "string",
  "exp": "2018-11-12T10:44:13Z",
  "iat": "2018-11-12T10:44:13Z",
  "iss": "string",
  "nbf": "2018-11-12T10:44:13Z",
  "scope": "string",
  "session": {
    "property1": {},
    "property2": {}
  },
  "sub": "string",
  "username": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-isOAuth2AccessTokenAuthorized">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-isOAuth2AccessTokenAuthorized-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2AccessTokenAuthorized-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2AccessTokenAuthorized-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2AccessTokenAuthorized-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2AccessTokenAuthorized-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2AccessTokenAuthorized-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-isOAuth2AccessTokenAuthorized-shell">

```shell
curl -X POST /warden/oauth2/access-tokens/authorize \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2AccessTokenAuthorized-go">

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

    req, err := http.NewRequest("POST", "/warden/oauth2/access-tokens/authorize", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2AccessTokenAuthorized-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "scope": [
    "string"
  ],
  "token": "string"
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/warden/oauth2/access-tokens/authorize', {
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
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2AccessTokenAuthorized-java">

```java
// This sample needs improvement.
URL obj = new URL("/warden/oauth2/access-tokens/authorize");

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
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2AccessTokenAuthorized-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/warden/oauth2/access-tokens/authorize',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2AccessTokenAuthorized-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/warden/oauth2/access-tokens/authorize',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdisOAuth2ClientAuthorized"></a>

### Check if an OAuth 2.0 Client is authorized to access a resource

```
POST /warden/oauth2/clients/authorize HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Checks if an OAuth 2.0 Client provided the correct access credentials and and if the client is allowed to perform
an action on a resource. This endpoint requires a client id, a client secret, a scope, a resource name, an action name and a context.

#### Request body

```json
{
  "action": "string",
  "client_id": "string",
  "client_secret": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "scope": [
    "string"
  ]
}
```

<a id="check-if-an-oauth-2.0-client-is-authorized-to-access-a-resource-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[wardenOAuth2ClientAuthorizationRequest](#schemawardenoauth2clientauthorizationrequest)|false|none|

#### Responses

<a id="check-if-an-oauth-2.0-client-is-authorized-to-access-a-resource-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|wardenOAuth2ClientAuthorizationResponse|[wardenOAuth2ClientAuthorizationResponse](#schemawardenoauth2clientauthorizationresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="check-if-an-oauth-2.0-client-is-authorized-to-access-a-resource-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
{
  "allowed": true,
  "sub": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-isOAuth2ClientAuthorized">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-isOAuth2ClientAuthorized-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2ClientAuthorized-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2ClientAuthorized-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2ClientAuthorized-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2ClientAuthorized-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isOAuth2ClientAuthorized-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-isOAuth2ClientAuthorized-shell">

```shell
curl -X POST /warden/oauth2/clients/authorize \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2ClientAuthorized-go">

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

    req, err := http.NewRequest("POST", "/warden/oauth2/clients/authorize", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2ClientAuthorized-node">

```nodejs
const fetch = require('node-fetch');
const input = '{
  "action": "string",
  "client_id": "string",
  "client_secret": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "scope": [
    "string"
  ]
}';
const headers = {
  'Content-Type': 'application/json',  'Accept': 'application/json'
}

fetch('/warden/oauth2/clients/authorize', {
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
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2ClientAuthorized-java">

```java
// This sample needs improvement.
URL obj = new URL("/warden/oauth2/clients/authorize");

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
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2ClientAuthorized-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/warden/oauth2/clients/authorize',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isOAuth2ClientAuthorized-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/warden/oauth2/clients/authorize',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdisSubjectAuthorized"></a>

### Check if a subject is authorized to access a resource

```
POST /warden/subjects/authorize HTTP/1.1
Content-Type: application/json
Accept: application/json

```

Checks if a subject (e.g. user ID, API key, ...) is allowed to perform a certain action on a resource.

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

<a id="check-if-a-subject-is-authorized-to-access-a-resource-parameters"></a>
##### Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[WardenSubjectAuthorizationRequest](#schemawardensubjectauthorizationrequest)|false|none|

#### Responses

<a id="check-if-a-subject-is-authorized-to-access-a-resource-responses"></a>
##### Overview

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|wardenSubjectAuthorizationResponse|[wardenSubjectAuthorizationResponse](#schemawardensubjectauthorizationresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The standard error format|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The standard error format|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|The standard error format|Inline|

<a id="check-if-a-subject-is-authorized-to-access-a-resource-responseschema"></a>
##### Response Schema</h3>

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» code|integer(int64)|false|none|none|
|» details|[object]|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|» message|string|false|none|none|
|» reason|string|false|none|none|
|» request|string|false|none|none|
|» status|string|false|none|none|

##### Examples

###### 200 response

```json
{
  "allowed": true,
  "sub": "string"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-isSubjectAuthorized">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-isSubjectAuthorized-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isSubjectAuthorized-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isSubjectAuthorized-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isSubjectAuthorized-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isSubjectAuthorized-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-isSubjectAuthorized-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-isSubjectAuthorized-shell">

```shell
curl -X POST /warden/subjects/authorize \
  -H 'Content-Type: application/json' \  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isSubjectAuthorized-go">

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

    req, err := http.NewRequest("POST", "/warden/subjects/authorize", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isSubjectAuthorized-node">

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

fetch('/warden/subjects/authorize', {
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
<div class="tab-pane" role="tabpanel"  id="tab-isSubjectAuthorized-java">

```java
// This sample needs improvement.
URL obj = new URL("/warden/subjects/authorize");

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
<div class="tab-pane" role="tabpanel"  id="tab-isSubjectAuthorized-python">

```python
import requests

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post(
  '/warden/subjects/authorize',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-isSubjectAuthorized-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/warden/subjects/authorize',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

## Schemas

<a id="tocSauthenticationoauth2clientcredentialsrequest">AuthenticationOAuth2ClientCredentialsRequest</a>
#### AuthenticationOAuth2ClientCredentialsRequest

<a id="schemaauthenticationoauth2clientcredentialsrequest"></a>

```json
{
  "client_id": "string",
  "client_secret": "string",
  "scope": [
    "string"
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|client_id|string|false|none|Token is the token to introspect.|
|client_secret|string|false|none|none|
|scope|[string]|false|none|Scope is an array of scopes that are required.|

<a id="tocSauthenticationoauth2introspectionrequest">AuthenticationOAuth2IntrospectionRequest</a>
#### AuthenticationOAuth2IntrospectionRequest

<a id="schemaauthenticationoauth2introspectionrequest"></a>

```json
{
  "scope": [
    "string"
  ],
  "token": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|scope|[string]|false|none|Scope is an array of scopes that are required.|
|token|string|false|none|Token is the token to introspect.|

<a id="tocSauthenticator">Authenticator</a>
#### Authenticator

<a id="schemaauthenticator"></a>

```json
{}

```

#### Properties

*None*

<a id="tocSfirewall">Firewall</a>
#### Firewall

<a id="schemafirewall"></a>

```json
{}

```

*Firewall offers various validation strategies for access tokens.*

#### Properties

*None*

<a id="tocShandler">Handler</a>
#### Handler

<a id="schemahandler"></a>

```json
{
  "H": {},
  "Manager": {}
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|H|[Writer](#schemawriter)|false|none|Writer is a helper to write arbitrary data to a ResponseWriter|
|Manager|[Manager](#schemamanager)|false|none|none|

<a id="tocSintrospectionresponse">IntrospectionResponse</a>
#### IntrospectionResponse

<a id="schemaintrospectionresponse"></a>

```json
{
  "active": true,
  "aud": [
    "string"
  ],
  "client_id": "string",
  "exp": 0,
  "ext": {
    "property1": {},
    "property2": {}
  },
  "iat": 0,
  "iss": "string",
  "nbf": 0,
  "scope": "string",
  "sub": "string",
  "token_type": "string",
  "username": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|active|boolean|false|none|none|
|aud|[string]|false|none|none|
|client_id|string|false|none|none|
|exp|integer(int64)|false|none|none|
|ext|object|false|none|Session represents arbitrary session data.|
|» **additionalProperties**|object|false|none|none|
|iat|integer(int64)|false|none|none|
|iss|string|false|none|none|
|nbf|integer(int64)|false|none|none|
|scope|string|false|none|none|
|sub|string|false|none|Here, it's sub|
|token_type|string|false|none|none|
|username|string|false|none|none|

<a id="tocSmanager">Manager</a>
#### Manager

<a id="schemamanager"></a>

```json
{}

```

#### Properties

*None*

<a id="tocSoauth2clientcredentialsauthentication">OAuth2ClientCredentialsAuthentication</a>
#### OAuth2ClientCredentialsAuthentication

<a id="schemaoauth2clientcredentialsauthentication"></a>

```json
{}

```

#### Properties

*None*

<a id="tocSoauth2introspectionauthentication">OAuth2IntrospectionAuthentication</a>
#### OAuth2IntrospectionAuthentication

<a id="schemaoauth2introspectionauthentication"></a>

```json
{}

```

#### Properties

*None*

<a id="tocSsession">Session</a>
#### Session

<a id="schemasession"></a>

```json
{
  "GetSubject": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|GetSubject|string|false|none|none|

<a id="tocSwardensubjectauthorizationrequest">WardenSubjectAuthorizationRequest</a>
#### WardenSubjectAuthorizationRequest

<a id="schemawardensubjectauthorizationrequest"></a>

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

*AccessRequest is the warden's request object.*

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|action|string|false|none|Action is the action that is requested on the resource.|
|context|object|false|none|Context is the request's environmental context.|
|» **additionalProperties**|object|false|none|none|
|resource|string|false|none|Resource is the resource that access is requested to.|
|subject|string|false|none|Subejct is the subject that is requesting access.|

<a id="tocSwriter">Writer</a>
#### Writer

<a id="schemawriter"></a>

```json
{}

```

*Writer is a helper to write arbitrary data to a ResponseWriter*

#### Properties

*None*

<a id="tocSauthenticationdefaultsession">authenticationDefaultSession</a>
#### authenticationDefaultSession

<a id="schemaauthenticationdefaultsession"></a>

```json
{
  "allowed": true,
  "sub": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|allowed|boolean|false|none|Allowed is true if the request is allowed and false otherwise.|
|sub|string|false|none|Subject is the identity that authorized issuing the token, for example a user or an OAuth2 app. This is usually a uuid but you can choose a urn or some other id too.|

<a id="tocSauthenticationoauth2clientcredentialssession">authenticationOAuth2ClientCredentialsSession</a>
#### authenticationOAuth2ClientCredentialsSession

<a id="schemaauthenticationoauth2clientcredentialssession"></a>

```json
{
  "allowed": true,
  "sub": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|allowed|boolean|false|none|Allowed is true if the request is allowed and false otherwise.|
|sub|string|false|none|Subject is the identity that authorized issuing the token, for example a user or an OAuth2 app. This is usually a uuid but you can choose a urn or some other id too.|

<a id="tocSauthenticationoauth2session">authenticationOAuth2Session</a>
#### authenticationOAuth2Session

<a id="schemaauthenticationoauth2session"></a>

```json
{
  "allowed": true,
  "aud": [
    "string"
  ],
  "client_id": "string",
  "exp": "2018-11-12T10:44:13Z",
  "iat": "2018-11-12T10:44:13Z",
  "iss": "string",
  "nbf": "2018-11-12T10:44:13Z",
  "scope": "string",
  "session": {
    "property1": {},
    "property2": {}
  },
  "sub": "string",
  "username": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|allowed|boolean|false|none|Allowed is true if the request is allowed and false otherwise.|
|aud|[string]|false|none|none|
|client_id|string|false|none|ClientID is the id of the OAuth2 client that requested the token.|
|exp|string(date-time)|false|none|ExpiresAt is the expiry timestamp.|
|iat|string(date-time)|false|none|IssuedAt is the token creation time stamp.|
|iss|string|false|none|Issuer is the id of the issuer, typically an hydra instance.|
|nbf|string(date-time)|false|none|none|
|scope|string|false|none|GrantedScopes is a list of scopes that the subject authorized when asked for consent.|
|session|object|false|none|Session represents arbitrary session data.|
|» **additionalProperties**|object|false|none|none|
|sub|string|false|none|Subject is the identity that authorized issuing the token, for example a user or an OAuth2 app. This is usually a uuid but you can choose a urn or some other id too.|
|username|string|false|none|none|

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

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|errors|object|false|none|Errors contains a list of errors that caused the not ready status.|
|» **additionalProperties**|string|false|none|none|

<a id="tocShealthstatus">healthStatus</a>
#### healthStatus

<a id="schemahealthstatus"></a>

```json
{
  "status": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|Status always contains "ok".|

<a id="tocSpolicy">policy</a>
#### policy

<a id="schemapolicy"></a>

```json
{
  "actions": [
    "string"
  ],
  "conditions": {
    "property1": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    },
    "property2": {
      "options": {
        "property1": {},
        "property2": {}
      },
      "type": "string"
    }
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
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|actions|[string]|false|none|Actions impacted by the policy.|
|conditions|object|false|none|Conditions under which the policy is active.|
|» **additionalProperties**|object|false|none|none|
|»» options|object|false|none|none|
|»»» **additionalProperties**|object|false|none|none|
|»» type|string|false|none|none|
|» description|string|false|none|Description of the policy.|
|» effect|string|false|none|Effect of the policy|
|» id|string|false|none|ID of the policy.|
|» resources|[string]|false|none|Resources impacted by the policy.|
|» subjects|[string]|false|none|Subjects impacted by the policy.|

<a id="tocSrole">role</a>
#### role

<a id="schemarole"></a>

```json
{
  "id": "string",
  "members": [
    "string"
  ]
}

```

*Role represents a group of users that share the same role. A role could be an administrator, a moderator, a regular
user or some other sort of role.*

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|ID is the role's unique id.|
|members|[string]|false|none|Members is who belongs to the role.|

<a id="tocSrolemembers">roleMembers</a>
#### roleMembers

<a id="schemarolemembers"></a>

```json
{
  "members": [
    "string"
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|members|[string]|false|none|none|

<a id="tocSswaggercreatepolicyparameters">swaggerCreatePolicyParameters</a>
#### swaggerCreatePolicyParameters

<a id="schemaswaggercreatepolicyparameters"></a>

```json
{
  "Body": {
    "actions": [
      "string"
    ],
    "conditions": {
      "property1": {
        "options": {
          "property1": {},
          "property2": {}
        },
        "type": "string"
      },
      "property2": {
        "options": {
          "property1": {},
          "property2": {}
        },
        "type": "string"
      }
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
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Body|[policy](#schemapolicy)|false|none|none|

<a id="tocSswaggerdoeswardenallowaccessrequestparameters">swaggerDoesWardenAllowAccessRequestParameters</a>
#### swaggerDoesWardenAllowAccessRequestParameters

<a id="schemaswaggerdoeswardenallowaccessrequestparameters"></a>

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
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Body|[WardenSubjectAuthorizationRequest](#schemawardensubjectauthorizationrequest)|false|none|none|

<a id="tocSswaggerdoeswardenallowclientrequestparameters">swaggerDoesWardenAllowClientRequestParameters</a>
#### swaggerDoesWardenAllowClientRequestParameters

<a id="schemaswaggerdoeswardenallowclientrequestparameters"></a>

```json
{
  "Body": {
    "action": "string",
    "client_id": "string",
    "client_secret": "string",
    "context": {
      "property1": {},
      "property2": {}
    },
    "resource": "string",
    "scope": [
      "string"
    ]
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Body|[wardenOAuth2ClientAuthorizationRequest](#schemawardenoauth2clientauthorizationrequest)|false|none|none|

<a id="tocSswaggerdoeswardenallowtokenaccessrequestparameters">swaggerDoesWardenAllowTokenAccessRequestParameters</a>
#### swaggerDoesWardenAllowTokenAccessRequestParameters

<a id="schemaswaggerdoeswardenallowtokenaccessrequestparameters"></a>

```json
{
  "Body": {
    "action": "string",
    "context": {
      "property1": {},
      "property2": {}
    },
    "resource": "string",
    "scope": [
      "string"
    ],
    "token": "string"
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Body|[wardenOAuth2AccessTokenAuthorizationRequest](#schemawardenoauth2accesstokenauthorizationrequest)|false|none|none|

<a id="tocSswaggergetpolicyparameters">swaggerGetPolicyParameters</a>
#### swaggerGetPolicyParameters

<a id="schemaswaggergetpolicyparameters"></a>

```json
{
  "id": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|The id of the policy. in: path|

<a id="tocSswaggerlistpolicyparameters">swaggerListPolicyParameters</a>
#### swaggerListPolicyParameters

<a id="schemaswaggerlistpolicyparameters"></a>

```json
{
  "limit": 0,
  "offset": 0
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|integer(int64)|false|none|The maximum amount of policies returned. in: query|
|offset|integer(int64)|false|none|The offset from where to start looking. in: query|

<a id="tocSswaggerlistpolicyresponse">swaggerListPolicyResponse</a>
#### swaggerListPolicyResponse

<a id="schemaswaggerlistpolicyresponse"></a>

```json
{
  "Body": [
    {
      "actions": [
        "string"
      ],
      "conditions": {
        "property1": {
          "options": {
            "property1": {},
            "property2": {}
          },
          "type": "string"
        },
        "property2": {
          "options": {
            "property1": {},
            "property2": {}
          },
          "type": "string"
        }
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
    }
  ]
}

```

*A policy*

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Body|[[policy](#schemapolicy)]|false|none|in: body type: array|

<a id="tocSswaggerupdatepolicyparameters">swaggerUpdatePolicyParameters</a>
#### swaggerUpdatePolicyParameters

<a id="schemaswaggerupdatepolicyparameters"></a>

```json
{
  "Body": {
    "actions": [
      "string"
    ],
    "conditions": {
      "property1": {
        "options": {
          "property1": {},
          "property2": {}
        },
        "type": "string"
      },
      "property2": {
        "options": {
          "property1": {},
          "property2": {}
        },
        "type": "string"
      }
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
  },
  "id": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Body|[policy](#schemapolicy)|false|none|none|
|id|string|false|none|The id of the policy. in: path|

<a id="tocSswaggerwardenbaserequest">swaggerWardenBaseRequest</a>
#### swaggerWardenBaseRequest

<a id="schemaswaggerwardenbaserequest"></a>

```json
{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string"
}

```

*swager:model authorizedBaseRequest*

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|action|string|false|none|Action is the action that is requested on the resource.|
|context|object|false|none|Context is the request's environmental context.|
|» **additionalProperties**|object|false|none|none|
|resource|string|false|none|Resource is the resource that access is requested to.|

<a id="tocSversion">version</a>
#### version

<a id="schemaversion"></a>

```json
{
  "version": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|string|false|none|none|

<a id="tocSwardenoauth2accesstokenauthorizationrequest">wardenOAuth2AccessTokenAuthorizationRequest</a>
#### wardenOAuth2AccessTokenAuthorizationRequest

<a id="schemawardenoauth2accesstokenauthorizationrequest"></a>

```json
{
  "action": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "scope": [
    "string"
  ],
  "token": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|action|string|false|none|Action is the action that is requested on the resource.|
|context|object|false|none|Context is the request's environmental context.|
|» **additionalProperties**|object|false|none|none|
|resource|string|false|none|Resource is the resource that access is requested to.|
|scope|[string]|false|none|Scope is an array of scopes that are required.|
|token|string|false|none|Token is the token to introspect.|

<a id="tocSwardenoauth2accesstokenauthorizationresponse">wardenOAuth2AccessTokenAuthorizationResponse</a>
#### wardenOAuth2AccessTokenAuthorizationResponse

<a id="schemawardenoauth2accesstokenauthorizationresponse"></a>

```json
{
  "allowed": true,
  "aud": [
    "string"
  ],
  "client_id": "string",
  "exp": "2018-11-12T10:44:13Z",
  "iat": "2018-11-12T10:44:13Z",
  "iss": "string",
  "nbf": "2018-11-12T10:44:13Z",
  "scope": "string",
  "session": {
    "property1": {},
    "property2": {}
  },
  "sub": "string",
  "username": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|allowed|boolean|false|none|Allowed is true if the request is allowed and false otherwise.|
|aud|[string]|false|none|none|
|client_id|string|false|none|ClientID is the id of the OAuth2 client that requested the token.|
|exp|string(date-time)|false|none|ExpiresAt is the expiry timestamp.|
|iat|string(date-time)|false|none|IssuedAt is the token creation time stamp.|
|iss|string|false|none|Issuer is the id of the issuer, typically an hydra instance.|
|nbf|string(date-time)|false|none|none|
|scope|string|false|none|GrantedScopes is a list of scopes that the subject authorized when asked for consent.|
|session|object|false|none|Session represents arbitrary session data.|
|» **additionalProperties**|object|false|none|none|
|sub|string|false|none|Subject is the identity that authorized issuing the token, for example a user or an OAuth2 app. This is usually a uuid but you can choose a urn or some other id too.|
|username|string|false|none|none|

<a id="tocSwardenoauth2clientauthorizationrequest">wardenOAuth2ClientAuthorizationRequest</a>
#### wardenOAuth2ClientAuthorizationRequest

<a id="schemawardenoauth2clientauthorizationrequest"></a>

```json
{
  "action": "string",
  "client_id": "string",
  "client_secret": "string",
  "context": {
    "property1": {},
    "property2": {}
  },
  "resource": "string",
  "scope": [
    "string"
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|action|string|false|none|Action is the action that is requested on the resource.|
|client_id|string|false|none|Token is the token to introspect.|
|client_secret|string|false|none|none|
|context|object|false|none|Context is the request's environmental context.|
|» **additionalProperties**|object|false|none|none|
|resource|string|false|none|Resource is the resource that access is requested to.|
|scope|[string]|false|none|Scope is an array of scopes that are required.|

<a id="tocSwardenoauth2clientauthorizationresponse">wardenOAuth2ClientAuthorizationResponse</a>
#### wardenOAuth2ClientAuthorizationResponse

<a id="schemawardenoauth2clientauthorizationresponse"></a>

```json
{
  "allowed": true,
  "sub": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|allowed|boolean|false|none|Allowed is true if the request is allowed and false otherwise.|
|sub|string|false|none|Subject is the identity that authorized issuing the token, for example a user or an OAuth2 app. This is usually a uuid but you can choose a urn or some other id too.|

<a id="tocSwardensubjectauthorizationresponse">wardenSubjectAuthorizationResponse</a>
#### wardenSubjectAuthorizationResponse

<a id="schemawardensubjectauthorizationresponse"></a>

```json
{
  "allowed": true,
  "sub": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|allowed|boolean|false|none|Allowed is true if the request is allowed and false otherwise.|
|sub|string|false|none|Subject is the identity that authorized issuing the token, for example a user or an OAuth2 app. This is usually a uuid but you can choose a urn or some other id too.|

