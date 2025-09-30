export ORY_API_KEY="ory_pat_XXXXXXXXXXXXXXXX"
export COLLECTION="identities-d7c52eed-e45c-4483-af3b-4aaa5782bff7" # replace with your project ID
export ORY_SLUG="upbeat-lalande-zu8omm6wwp" # replace with your Ory slug

# list identities which do not have two-factor authentication enabled,
# resolved by the organization to which they belong,
# ordered by creation date (newest first),
# and limited to 20 per page
curl -H "Authorization: Bearer $ORY_API_KEY" \
  "https://$ORY_SLUG.projects.oryapis.com/admin/preview/search/v0beta1/collections/$COLLECTION/documents/search" \
  --url-query 'q=*' \
  --url-query 'filter_by=available_aal:!=aal2' \
  --url-query 'facet_by=organization_id' \
  --url-query 'sort_by=created_at:desc' \
  --url-query 'per_page=20'
