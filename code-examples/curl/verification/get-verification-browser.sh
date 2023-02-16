curl -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -b cookies.txt \
    -c cookies.txt \
    "https://{project.slug}.projects.oryapis.com/self-service/verification/flows?id=<your-flow-id>"