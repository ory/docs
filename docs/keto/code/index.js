// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

export const createRelationship = {
  cli: {
    label: "Ory CLI",
    language: "shell",
    code: `echo '{"namespace":"Document","object":"secret","relation":"reader","subject_set":{"namespace":"User","object":"Tom","relation":""}}' |
  ory create relation-tuples --project=$PROJECT -

# Output:
# NAMESPACE  OBJECT  RELATION NAME  SUBJECT		
# Document   secret  reader         User:Tom	
`,
  },

  curl: {
    label: "cURL",
    language: "bash",
    code: `relationtuple='
{
  "namespace": "Document",
  "object": "secret",
  "relation": "reader",
  "subject_set": {
    "namespace": "User",
    "object": "Tom",
    "relation": ""
  }
}
'

curl --fail --silent -X PUT \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer $API_TOKEN" \\
     --data "$relationtuple" \\
     $SDK_URL/admin/relation-tuples > /dev/null \\
  && echo "Successfully created tuple" \\
  || echo "Encountered error"`,
  },
}

export const deleteRelationship = {
  cli: {
    label: "Ory CLI",
    language: "shell",
    code: `ory delete relationships \\
  --project=$PROJECT \\
  --namespace=Document \\
  --object=secret \\
  --relation=reader \\
  --subject-set=User:Tom \\
  --force`,
  },
  curl: {
    label: "cURL",
    language: "bash",
    code: `curl -X DELETE -G --silent \\
  --data-urlencode "subject_set.namespace=User" \\
  --data-urlencode "subject_set.subject=Tom" \\
  --data-urlencode "relation=reader" \\
  --data-urlencode "namespace=Document" \\
  --data-urlencode "object=secret" \\
  $SDK_URL/admin/relation-tuples`,
  },
}
