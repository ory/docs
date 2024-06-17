curl -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -b cookies.txt \
    -c cookies.txt \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/verification/flows?id=<your-flow-id>"
