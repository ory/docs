---
title: REST API
id: version-oryOS.15-api
original_id: api
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

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

<a id="ory-kratos-public-endpoints"></a>

## Public Endpoints

<a id="opIdinitializeLoginFlow"></a>

### Initialize a Login Flow

```
GET /auth/browser/login HTTP/1.1
Accept: application/json

```

This endpoint initializes a login flow. This endpoint **should not be called
from a programatic API** but instead for the, for example, browser. It will
redirect the user agent (e.g. browser) to the configured login UI, appending the
login challenge.

If the user-agent already has a valid authentication session, the server will
respond with a 302 code redirecting to the config value of
`urls.default_return_to`.

For an in-depth look at ORY Krato's login flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/login

#### Responses

<a id="initialize-a-login-flow-responses"></a>

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
  "error": "The requested resource could not be found",
  "error_code": 404,
  "error_debug": "The database adapter was unable to find the element",
  "error_hint": "Object with RequestID 12345 does not exist"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeLoginFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeLoginFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeLoginFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeLoginFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeLoginFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeLoginFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeLoginFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeLoginFlow-shell">

```shell
curl -X GET /auth/browser/login \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeLoginFlow-go">

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

    req, err := http.NewRequest("GET", "/auth/browser/login", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeLoginFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/auth/browser/login', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeLoginFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/auth/browser/login");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeLoginFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/auth/browser/login',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeLoginFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/auth/browser/login',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdinitializeRegistrationFlow"></a>

### Initialize a Registration Flow

```
GET /auth/browser/registration HTTP/1.1
Accept: application/json

```

This endpoint initializes a registration flow. This endpoint **should not be
called from a programatic API** but instead for the, for example, browser. It
will redirect the user agent (e.g. browser) to the configured registration UI,
appending the registration challenge.

For an in-depth look at ORY Krato's registration flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/registration

#### Responses

<a id="initialize-a-registration-flow-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 404            | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | genericError                                                                                                   | [genericError](#schemagenericerror) |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 404 response

```json
{
  "error": "The requested resource could not be found",
  "error_code": 404,
  "error_debug": "The database adapter was unable to find the element",
  "error_hint": "Object with RequestID 12345 does not exist"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeRegistrationFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeRegistrationFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeRegistrationFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeRegistrationFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeRegistrationFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeRegistrationFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeRegistrationFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeRegistrationFlow-shell">

```shell
curl -X GET /auth/browser/registration \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeRegistrationFlow-go">

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

    req, err := http.NewRequest("GET", "/auth/browser/registration", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeRegistrationFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/auth/browser/registration', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeRegistrationFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/auth/browser/registration");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeRegistrationFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/auth/browser/registration',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeRegistrationFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/auth/browser/registration',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetLoginRequest"></a>

### Get Login Request

```
GET /auth/browser/requests/login HTTP/1.1
Accept: application/json

```

This endpoint returns a login request's context with, for example, error details
and other information.

For an in-depth look at ORY Krato's login flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/login

#### Responses

<a id="get-login-request-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                              |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 200            | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | loginRequest                                                                                                   | [loginRequest](#schemaloginrequest) |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror) |

##### Examples

###### 200 response

```json
{
  "active": "string",
  "expires_at": "2020-01-30T07:01:51Z",
  "id": "string",
  "issued_at": "2020-01-30T07:01:51Z",
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

<div class="tabs" id="tab-getLoginRequest">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getLoginRequest-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getLoginRequest-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getLoginRequest-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getLoginRequest-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getLoginRequest-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getLoginRequest-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getLoginRequest-shell">

```shell
curl -X GET /auth/browser/requests/login \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getLoginRequest-go">

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

    req, err := http.NewRequest("GET", "/auth/browser/requests/login", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getLoginRequest-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/auth/browser/requests/login', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getLoginRequest-java">

```java
// This sample needs improvement.
URL obj = new URL("/auth/browser/requests/login");

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
<div class="tab-pane" role="tabpanel"  id="tab-getLoginRequest-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/auth/browser/requests/login',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getLoginRequest-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/auth/browser/requests/login',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetRegistrationRequest"></a>

### Get Registration Request

```
GET /auth/browser/requests/registration HTTP/1.1
Accept: application/json

```

This endpoint returns a registration request's context with, for example, error
details and other information.

For an in-depth look at ORY Krato's registration flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/registration

#### Responses

<a id="get-registration-request-responses"></a>

##### Overview

| Status | Meaning                                                                    | Description         | Schema                                            |
| ------ | -------------------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | registrationRequest | [registrationRequest](#schemaregistrationrequest) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | genericError        | [genericError](#schemagenericerror)               |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError        | [genericError](#schemagenericerror)               |

##### Examples

###### 200 response

```json
{
  "active": "string",
  "expires_at": "2020-01-30T07:01:51Z",
  "id": "string",
  "issued_at": "2020-01-30T07:01:51Z",
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

<div class="tabs" id="tab-getRegistrationRequest">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getRegistrationRequest-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getRegistrationRequest-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getRegistrationRequest-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getRegistrationRequest-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getRegistrationRequest-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getRegistrationRequest-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getRegistrationRequest-shell">

```shell
curl -X GET /auth/browser/requests/registration \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getRegistrationRequest-go">

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

    req, err := http.NewRequest("GET", "/auth/browser/requests/registration", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getRegistrationRequest-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/auth/browser/requests/registration', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getRegistrationRequest-java">

```java
// This sample needs improvement.
URL obj = new URL("/auth/browser/requests/registration");

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
<div class="tab-pane" role="tabpanel"  id="tab-getRegistrationRequest-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/auth/browser/requests/registration',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getRegistrationRequest-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/auth/browser/requests/registration',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdinitializeProfileManagementFlow"></a>

### Initialize Profile Management Flow

```
GET /profiles HTTP/1.1
Accept: application/json

```

This endpoint initializes a profile update flow. This endpoint **should not be
called from a programatic API** but instead for the, for example, browser. It
will redirect the user agent (e.g. browser) to the configured login UI,
appending the login challenge.

If the user-agent does not have a valid authentication session, a 302 code will
be returned which redirects to the initializeLoginFlow endpoint, appending this
page as the return_to value.

For an in-depth look at ORY Krato's profile management flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/profile

#### Responses

<a id="initialize-profile-management-flow-responses"></a>

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
  "error": "The requested resource could not be found",
  "error_code": 404,
  "error_debug": "The database adapter was unable to find the element",
  "error_hint": "Object with RequestID 12345 does not exist"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-initializeProfileManagementFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-initializeProfileManagementFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeProfileManagementFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeProfileManagementFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeProfileManagementFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeProfileManagementFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-initializeProfileManagementFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-initializeProfileManagementFlow-shell">

```shell
curl -X GET /profiles \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeProfileManagementFlow-go">

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

    req, err := http.NewRequest("GET", "/profiles", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeProfileManagementFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/profiles', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeProfileManagementFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/profiles");

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
<div class="tab-pane" role="tabpanel"  id="tab-initializeProfileManagementFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/profiles',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-initializeProfileManagementFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/profiles',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdcompleteProfileManagementFlow"></a>

### Complete Profile Management Flow

```
POST /profiles HTTP/1.1
Accept: application/json

```

This endpoint returns a login request's context with, for example, error details
and other information.

For an in-depth look at ORY Krato's profile management flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/profile

#### Responses

<a id="complete-profile-management-flow-responses"></a>

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
  "error": "The requested resource could not be found",
  "error_code": 404,
  "error_debug": "The database adapter was unable to find the element",
  "error_hint": "Object with RequestID 12345 does not exist"
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-completeProfileManagementFlow">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-completeProfileManagementFlow-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeProfileManagementFlow-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeProfileManagementFlow-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeProfileManagementFlow-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeProfileManagementFlow-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-completeProfileManagementFlow-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-completeProfileManagementFlow-shell">

```shell
curl -X POST /profiles \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeProfileManagementFlow-go">

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

    req, err := http.NewRequest("POST", "/profiles", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeProfileManagementFlow-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/profiles', {
  method: 'POST',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeProfileManagementFlow-java">

```java
// This sample needs improvement.
URL obj = new URL("/profiles");

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
<div class="tab-pane" role="tabpanel"  id="tab-completeProfileManagementFlow-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.post(
  '/profiles',
  params={},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-completeProfileManagementFlow-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post '/profiles',
  params: {}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

<a id="opIdgetProfileManagementRequest"></a>

### Get Profile Management Request (via cookie)

```
GET /profiles/requests?request=string HTTP/1.1
Accept: application/json

```

This endpoint returns a profile management request's context with, for example,
error details and other information.

It can be used from a Single Page Application or other applications running on a
client device. The request must be made with valid authentication cookies or it
will fail!

If you wish to access this endpoint without the valid cookies (e.g. as part of a
server) please call this path at the admin port.

For an in-depth look at ORY Krato's profile management flow, head over to:
https://www.ory.sh/docs/kratos/selfservice/profile

<a id="get-profile-management-request-(via-cookie)-parameters"></a>

##### Parameters

| Parameter | In    | Type   | Required | Description                                                         |
| --------- | ----- | ------ | -------- | ------------------------------------------------------------------- |
| request   | query | string | true     | Request should be set to the value of the `request` query parameter |

##### Detailed descriptions

**request**: Request should be set to the value of the `request` query parameter
by the profile management UI.

#### Responses

<a id="get-profile-management-request-(via-cookie)-responses"></a>

##### Overview

| Status         | Meaning                                                                    | Description                                                                                                    | Schema                                                      |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 200            | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | profileManagementRequest                                                                                       | [profileManagementRequest](#schemaprofilemanagementrequest) |
| 302            | [Found](https://tools.ietf.org/html/rfc7231#section-6.4.3)                 | Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is |
| typically 201. | None                                                                       |
| 500            | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | genericError                                                                                                   | [genericError](#schemagenericerror)                         |

##### Examples

###### 200 response

```json
{
  "expires_at": "2020-01-30T07:01:51Z",
  "form": {
    "action": "string",
    "errors": [
      {
        "message": "string"
      }
    ],
    "fields": [
      {
        "errors": [
          {
            "message": "string"
          }
        ],
        "name": "string",
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
  "issued_at": "2020-01-30T07:01:51Z",
  "request_url": "string",
  "update_successful": true
}
```

<aside class="success">
This operation does not require authentication
</aside>

#### Code samples

<div class="tabs" id="tab-getProfileManagementRequest">
<nav class="tabs-nav">
<ul class="nav nav-tabs au-link-list au-link-list--inline">
<li class="nav-item"><a class="nav-link active" role="tab" href="#tab-getProfileManagementRequest-shell">Shell</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getProfileManagementRequest-go">Go</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getProfileManagementRequest-node">Node.js</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getProfileManagementRequest-java">Java</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getProfileManagementRequest-python">Python</a></li>
<li class="nav-item"><a class="nav-link" role="tab" href="#tab-getProfileManagementRequest-ruby">Ruby</a></li>
</ul>
</nav>
<div class="tab-content">
<div class="tab-pane active" role="tabpanel" id="tab-getProfileManagementRequest-shell">

```shell
curl -X GET /profiles/requests?request=string \
  -H 'Accept: application/json'
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getProfileManagementRequest-go">

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

    req, err := http.NewRequest("GET", "/profiles/requests", bytes.NewBuffer(body))
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getProfileManagementRequest-node">

```nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept': 'application/json'
}

fetch('/profiles/requests?request=string', {
  method: 'GET',
  headers
})
.then(r => r.json())
.then((body) => {
    console.log(body)
})
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getProfileManagementRequest-java">

```java
// This sample needs improvement.
URL obj = new URL("/profiles/requests?request=string");

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
<div class="tab-pane" role="tabpanel"  id="tab-getProfileManagementRequest-python">

```python
import requests

headers = {
  'Accept': 'application/json'
}

r = requests.get(
  '/profiles/requests',
  params={
    'request': 'string'},
  headers = headers)

print r.json()
```

</div>
<div class="tab-pane" role="tabpanel"  id="tab-getProfileManagementRequest-ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/profiles/requests',
  params: {
    'request' => 'string'}, headers: headers

p JSON.parse(result)
```

</div>
</div>
</div>

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

_Error error_

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

_Identity identity_

#### Properties

| Name              | Type                    | Required | Restrictions | Description                                                                                                    |
| ----------------- | ----------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| id                | [UUID](#schemauuid)     | true     | none         | UUID UUID                                                                                                      |
| traits            | [Traits](#schematraits) | true     | none         | Traits traits                                                                                                  |
| traits_schema_id  | string                  | false    | none         | TraitsSchemaID is the ID of the JSON Schema to be used for validating the identity's traits.                   |
| traits_schema_url | string                  | false    | none         | TraitsSchemaURL is the URL of the endpoint where the identity's traits schema can be fetched from. format: url |

<a id="tocSloginrequestmethodconfigallof0">LoginRequestMethodConfigAllOf0</a>

#### LoginRequestMethodConfigAllOf0

<a id="schemaloginrequestmethodconfigallof0"></a>

```json
{}
```

_LoginRequestMethodConfigAllOf0 login request method config all of0_

#### Properties

_None_

<a id="tocSloginrequestmethodconfigallof1">LoginRequestMethodConfigAllOf1</a>

#### LoginRequestMethodConfigAllOf1

<a id="schemaloginrequestmethodconfigallof1"></a>

```json
{}
```

_LoginRequestMethodConfigAllOf1 login request method config all of1_

#### Properties

_None_

<a id="tocSloginrequestmethodconfigallof2">LoginRequestMethodConfigAllOf2</a>

#### LoginRequestMethodConfigAllOf2

<a id="schemaloginrequestmethodconfigallof2"></a>

```json
{}
```

_LoginRequestMethodConfigAllOf2 login request method config all of2_

#### Properties

_None_

<a id="tocSloginrequestmethodconfigallof3">LoginRequestMethodConfigAllOf3</a>

#### LoginRequestMethodConfigAllOf3

<a id="schemaloginrequestmethodconfigallof3"></a>

```json
{}
```

_LoginRequestMethodConfigAllOf3 login request method config all of3_

#### Properties

_None_

<a id="tocSregistrationrequestmethodconfigallof0">RegistrationRequestMethodConfigAllOf0</a>

#### RegistrationRequestMethodConfigAllOf0

<a id="schemaregistrationrequestmethodconfigallof0"></a>

```json
{}
```

_RegistrationRequestMethodConfigAllOf0 registration request method config all
of0_

#### Properties

_None_

<a id="tocSregistrationrequestmethodconfigallof1">RegistrationRequestMethodConfigAllOf1</a>

#### RegistrationRequestMethodConfigAllOf1

<a id="schemaregistrationrequestmethodconfigallof1"></a>

```json
{}
```

_RegistrationRequestMethodConfigAllOf1 registration request method config all
of1_

#### Properties

_None_

<a id="tocSregistrationrequestmethodconfigallof2">RegistrationRequestMethodConfigAllOf2</a>

#### RegistrationRequestMethodConfigAllOf2

<a id="schemaregistrationrequestmethodconfigallof2"></a>

```json
{}
```

_RegistrationRequestMethodConfigAllOf2 registration request method config all
of2_

#### Properties

_None_

<a id="tocSregistrationrequestmethodconfigallof3">RegistrationRequestMethodConfigAllOf3</a>

#### RegistrationRequestMethodConfigAllOf3

<a id="schemaregistrationrequestmethodconfigallof3"></a>

```json
{}
```

_RegistrationRequestMethodConfigAllOf3 registration request method config all
of3_

#### Properties

_None_

<a id="tocSregistrationrequestmethodconfigallof4">RegistrationRequestMethodConfigAllOf4</a>

#### RegistrationRequestMethodConfigAllOf4

<a id="schemaregistrationrequestmethodconfigallof4"></a>

```json
{}
```

_RegistrationRequestMethodConfigAllOf4 registration request method config all
of4_

#### Properties

_None_

<a id="tocStraits">Traits</a>

#### Traits

<a id="schematraits"></a>

```json
{}
```

_Traits traits_

#### Properties

_None_

<a id="tocSuuid">UUID</a>

#### UUID

<a id="schemauuid"></a>

```json
"string"
```

_UUID UUID_

#### Properties

| Name        | Type          | Required | Restrictions | Description |
| ----------- | ------------- | -------- | ------------ | ----------- |
| _anonymous_ | string(uuid4) | false    | none         | UUID UUID   |

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
      "errors": [
        {
          "message": "string"
        }
      ],
      "name": "string",
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
  "errors": [
    {
      "message": "string"
    }
  ],
  "name": "string",
  "required": true,
  "type": "string",
  "value": {}
}
```

_Field represents a HTML Form Field_

#### Properties

| Name     | Type                    | Required | Restrictions | Description                                                             |
| -------- | ----------------------- | -------- | ------------ | ----------------------------------------------------------------------- |
| errors   | [[Error](#schemaerror)] | false    | none         | Errors contains all validation errors this particular field has caused. |
| name     | string                  | false    | none         | Name is the equivalent of <input name="{{.Name}}">                      |
| required | boolean                 | false    | none         | Required is the equivalent of <input required="{{.Required}}">          |
| type     | string                  | false    | none         | Type is the equivalent of <input type="{{.Type}}">                      |
| value    | object                  | false    | none         | Value is the equivalent of <input value="{{.Value}}">                   |

<a id="tocSformfields">formFields</a>

#### formFields

<a id="schemaformfields"></a>

```json
[
  {
    "errors": [
      {
        "message": "string"
      }
    ],
    "name": "string",
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
  "error": "The requested resource could not be found",
  "error_code": 404,
  "error_debug": "The database adapter was unable to find the element",
  "error_hint": "Object with RequestID 12345 does not exist"
}
```

_Error response_

#### Properties

| Name        | Type           | Required | Restrictions | Description                                                                            |
| ----------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------- |
| error       | string         | true     | none         | Name is the error name.                                                                |
| error_code  | integer(int64) | false    | none         | Code represents the error status code (404, 403, 401, ...).                            |
| error_debug | string         | false    | none         | Debug contains debug information. This is usually not available and has to be enabled. |
| error_hint  | string         | false    | none         | Hint contains further information on the nature of the error.                          |

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

_HealthNotReadyStatus health not ready status_

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

_HealthStatus health status_

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
  "expires_at": "2020-01-30T07:01:51Z",
  "id": "string",
  "issued_at": "2020-01-30T07:01:51Z",
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
| id                         | [UUID](#schemauuid)                             | false    | none         | UUID UUID                                                                                                                                                                   |
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

<a id="tocSoidcstrategycredentialsconfig">oidcStrategyCredentialsConfig</a>

#### oidcStrategyCredentialsConfig

<a id="schemaoidcstrategycredentialsconfig"></a>

```json
{
  "provider": "string",
  "subject": "string"
}
```

#### Properties

| Name     | Type   | Required | Restrictions | Description |
| -------- | ------ | -------- | ------------ | ----------- |
| provider | string | false    | none         | none        |
| subject  | string | false    | none         | none        |

<a id="tocSoidcstrategyrequestmethod">oidcStrategyRequestMethod</a>

#### oidcStrategyRequestMethod

<a id="schemaoidcstrategyrequestmethod"></a>

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
      "errors": [
        {
          "message": "string"
        }
      ],
      "name": "string",
      "required": true,
      "type": "string",
      "value": {}
    }
  ],
  "method": "string",
  "providers": [
    {
      "errors": [
        {
          "message": "string"
        }
      ],
      "name": "string",
      "required": true,
      "type": "string",
      "value": {}
    }
  ]
}
```

#### Properties

| Name      | Type                            | Required | Restrictions | Description                                                                                 |
| --------- | ------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------- |
| action    | string                          | false    | none         | Action should be used as the form action URL (<form action="{{ .Action }}" method="post">). |
| errors    | [[Error](#schemaerror)]         | false    | none         | Errors contains all form errors. These will be duplicates of the individual field errors.   |
| fields    | [formFields](#schemaformfields) | false    | none         | Fields contains multiple fields                                                             |
| method    | string                          | false    | none         | Method is the form method (e.g. POST)                                                       |
| providers | [[formField](#schemaformfield)] | false    | none         | [Field represents a HTML Form Field]                                                        |

<a id="tocSprofilemanagementrequest">profileManagementRequest</a>

#### profileManagementRequest

<a id="schemaprofilemanagementrequest"></a>

```json
{
  "expires_at": "2020-01-30T07:01:51Z",
  "form": {
    "action": "string",
    "errors": [
      {
        "message": "string"
      }
    ],
    "fields": [
      {
        "errors": [
          {
            "message": "string"
          }
        ],
        "name": "string",
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
  "issued_at": "2020-01-30T07:01:51Z",
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
| id                | [UUID](#schemauuid)         | false    | none         | UUID UUID                                                                                                                                                                                                                                                                                         |
| identity          | [Identity](#schemaidentity) | false    | none         | Identity identity                                                                                                                                                                                                                                                                                 |
| issued_at         | string(date-time)           | false    | none         | IssuedAt is the time (UTC) when the request occurred.                                                                                                                                                                                                                                             |
| request_url       | string                      | false    | none         | RequestURL is the initial URL that was requested from ORY Kratos. It can be used to forward information contained in the URL's path or query for example.                                                                                                                                         |
| update_successful | boolean                     | false    | none         | UpdateSuccessful, if true, indicates that the profile has been updated successfully with the provided data. Done will stay true when repeatedly checking. If set to true, done will revert back to false only when a request with invalid (e.g. "please use a valid phone number") data was sent. |

<a id="tocSregistrationrequest">registrationRequest</a>

#### registrationRequest

<a id="schemaregistrationrequest"></a>

```json
{
  "active": "string",
  "expires_at": "2020-01-30T07:01:51Z",
  "id": "string",
  "issued_at": "2020-01-30T07:01:51Z",
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
| id                         | [UUID](#schemauuid)                                           | false    | none         | UUID UUID                                                                                                                                                                                 |
| issued_at                  | string(date-time)                                             | false    | none         | IssuedAt is the time (UTC) when the request occurred.                                                                                                                                     |
| methods                    | object                                                        | false    | none         | Methods contains context for all enabled registration methods. If a registration request has been processed, but for example the password is incorrect, this will contain error messages. |
| » **additionalProperties** | [registrationRequestMethod](#schemaregistrationrequestmethod) | false    | none         | RegistrationRequestMethod registration request method                                                                                                                                     |
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

_RegistrationRequestMethod registration request method_

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

<a id="tocSversion">version</a>

#### version

<a id="schemaversion"></a>

```json
{
  "version": "string"
}
```

_Version version_

#### Properties

| Name    | Type   | Required | Restrictions | Description                       |
| ------- | ------ | -------- | ------------ | --------------------------------- |
| version | string | false    | none         | Version is the service's version. |
