curl -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -c cookies.txt \
    -b cookies.txt \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/logout/browser"
