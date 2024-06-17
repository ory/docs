curl -X GET \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -b cookies.txt \
    https://$PROJECT_SLUG.projects.oryapis.com/session/whoami
