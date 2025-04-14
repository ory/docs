#!/bin/sh
export ORY_BASEPATH="http://localhost:${ORY_TUNNEL_PORT}"

/usr/local/bin/ory tunnel --port "${ORY_TUNNEL_PORT}" --dev "http://localhost:${APP_PORT}" &

exec "$@"
