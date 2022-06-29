---
id: go
title: Go
---

import CodeBlock from '@theme/CodeBlock'
import { useLatestRelease } from '@site/src/hooks'


Ory Keto exposes two APIs for integration

- [gRPC](http://ory.sh/docs/keto/reference/proto-api)
- [REST](http://ory.sh/docs/keto/reference/rest-api)

## Installation

### Installation gRPC API

```mdx-code-block

<CodeBlock className="language-shell">{`go get github.com/ory/keto/proto/ory/keto/acl/v1alpha1@${useLatestRelease('keto')}`}</CodeBlock>

```

### Installation REST API

```mdx-code-block
<CodeBlock className="language-shell">{`go get github.com/ory/keto-client-go@${useLatestRelease('keto')}`}</CodeBlock>
```

## Configuration

### Configuration gRPC API

```go
package main

import (
	"google.golang.org/grpc"

	acl "github.com/ory/keto/proto/ory/keto/acl/v1alpha1"
)

func main() {
	conn, err := grpc.Dial("127.0.0.1:4467", grpc.WithInsecure())
	if err != nil {
		panic("Encountered error: " + err.Error())
	}

	writeClient := acl.NewWriteServiceClient(conn)

	// _, err = client.TransactRelationTuples(context.Background() ...
	conn, err = grpc.Dial("127.0.0.1:4466", grpc.WithInsecure())

	readClient := acl.NewReadServiceClient(conn)
	// _, err = readClient.ListRelationTuples(context.Background()...

	conn, err = grpc.Dial("127.0.0.1:4466", grpc.WithInsecure())
	checkClient := acl.NewCheckServiceClient(conn)
	// _, err = checkClient.Check(context.Background() ...

	conn, err = grpc.Dial("127.0.0.1:4466", gprc.WithInsecure())
	expandClient := acl.NewExpandServiceClient(conn)
	// _, err = expandClient.Expand(context.Background() ...
}
```

### Configuration REST API

```go
package main

import (
	client "github.com/ory/keto-client-go"
)

func main() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4467", // Write API
		},
	}
	writeClient := client.NewAPIClient(configuration)
	// resp, r, err := writeClient.WriteApi.CreateRelationTuple(context.Background())...
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4466", // Read API
		},
	}
	readClient := client.NewAPIClient(configuration)

	// resp, r, err := readClient.ReadApi.GetCheck(context.Background()...
	// resp, r, err := readClient.ReadApi.GetExpand(context.Background()...
	// resp, r, err := readClient.ReadApi.GetRelationTuples(context.Background()...
}
```

## Making requests

As an example, let's create the following relation tuple and check that `alice` has access to `my-first-blog-post` object

```
blog_posts:my-first-blog-post#read@alice
```

### Making requests with gRPC API
```go
package main

import (
	"context"
	"fmt"

	"google.golang.org/grpc"

	acl "github.com/ory/keto/proto/ory/keto/acl/v1alpha1"
)

func main() {
	conn, err := grpc.Dial("127.0.0.1:4467", grpc.WithInsecure())
	if err != nil {
		panic("Encountered error: " + err.Error())
	}

	client := acl.NewWriteServiceClient(conn)

	_, err = client.TransactRelationTuples(context.Background(), &acl.TransactRelationTuplesRequest{
		RelationTupleDeltas: []*acl.RelationTupleDelta{
			{
				Action: acl.RelationTupleDelta_INSERT,
				RelationTuple: &acl.RelationTuple{
					Namespace: "blog_posts",
					Object:    "my-first-blog-post",
					Relation:  "read",
					Subject:   acl.NewSubjectID("alice"),
				},
			},
		},
	})
	if err != nil {
		panic("Encountered error: " + err.Error())
	}

	fmt.Println("Successfully created tuple")
	readConn, err := grpc.Dial("127.0.0.1:4466", grpc.WithInsecure())
	if err != nil {
		panic("Encountered error: " + err.Error())
	}
	checkClient := acl.NewCheckServiceClient(readConn)

	check, err := checkClient.Check(context.Background(), &acl.CheckRequest{
		Namespace: "blog_posts",
		Object:    "my-first-blog-post",
		Relation:  "read",
		Subject:   acl.NewSubjectID("alice"),
	})

	if check.Allowed {
		fmt.Println("Alice has access to my-first-blog-post")
	}

}
```

### Making requests with REST API
```go
package main

import (
	"context"
	"fmt"
	"os"

	client "github.com/ory/keto-client-go"
)

func main() {
	relationQuery := *client.NewRelationQuery()
	relationQuery.SetNamespace("blog_posts")
	relationQuery.SetObject("my-first-blog-post")
	relationQuery.SetRelation("read")
	relationQuery.SetSubjectId("alice")
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4467", // Write API
		},
	}
	writeClient := client.NewAPIClient(configuration)
	_, r, err := writeClient.WriteApi.CreateRelationTuple(context.Background()).RelationQuery(relationQuery).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
		panic("Encountered error: " + err.Error())
	}

	fmt.Println("Successfully created tuple")
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4466", // Write API
		},
	}
	readClient := client.NewAPIClient(configuration)

	check, r, err := readClient.ReadApi.GetCheck(context.Background()).
		Namespace("blog_posts").
		Object("my-first-blog-post").
		Relation("read").
		SubjectId("alice").
		Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
		panic("Encountered error: " + err.Error())
	}

	if check.Allowed {
		fmt.Println("Alice has access to my-first-blog-post")
	}

}
```

## More examples

### More examples REST API
- [Write API documentation](https://github.com/ory/keto-client-go/blob/master/docs/WriteApi.md)
- [Read API documentation](https://github.com/ory/keto-client-go/blob/master/docs/ReadApi.md)

### More examples gRPC API

- [Protocol Buffer API](http://localhost:3001/docs/keto/reference/proto-api)
