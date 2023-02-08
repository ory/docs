curl -X DELETE \
    -H "Content-Type: application/json" \
    -d '{"session_token":"<session_token>"}' \
    https://{project.slug}.projects.oryapis.com/self-service/logout/api