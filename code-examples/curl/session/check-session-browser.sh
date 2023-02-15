curl -X GET \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -b cookies.txt \
    https://{project.slug}.projects.oryapis.com/session/whoami