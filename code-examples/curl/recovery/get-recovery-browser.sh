curl -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -c cookies.txt \
    -b cookies.txt \
    "https://$project_slug.projects.oryapis.com/self-service/recovery/flows?id=<your-flow-id>"