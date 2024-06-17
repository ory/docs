curl -X GET \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -c cookie.txt  \
    "https://$PROJECT_SLUG.projects.oryapis.com/self-service/registration/browser"
