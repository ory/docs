export ORY_API_KEY="ory_pat_XXXXXXXXXXXXXXXX"
export COLLECTION="identities-d7c52eed-e45c-4483-af3b-4aaa5782bff7" # replace with your project ID
export ORY_SLUG="upbeat-lalande-zu8omm6wwp" # replace with your Ory slug

# List identities via Search API
curl -H "Authorization: Bearer $ORY_API_KEY" \
  "https://$ORY_SLUG.projects.oryapis.com/admin/preview/search/v0beta1/collections/$COLLECTION/documents/search?q=*"

# Search for "foo" in the email trait
curl -H "Authorization: Bearer $ORY_API_KEY" \
  "https://$ORY_SLUG.projects.oryapis.com/admin/preview/search/v0beta1/collections/$COLLECTION/documents/search?q=foo&query_by=traits.email"
