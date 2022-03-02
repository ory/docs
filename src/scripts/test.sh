#!/bin/bash

set -euxo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

export ORY_SDK_URL=https://playground.projects.oryapis.com

cd code-examples/protect-page-login/nextjs && \
  npm run start -- --port=3001 &

# Apps which are protected by a proxy we run on ports 40xx
cd code-examples/protect-page-login/expressjs && \
  PORT=4002 npm run start &
ory proxy --no-jwt --port 3002 http://localhost:4002/ &

cd code-examples/protect-page-login/go && \
  PORT=4003 PROXY_PORT=3003 go run . &
ory proxy --no-jwt --port 3003 http://localhost:4003/ &

cd code-examples/protect-page-login/php && \
  composer install && \
  PROXY_PORT=3004 php -S 127.0.0.1:4004 &

ory proxy --no-jwt --port 3004 http://localhost:4004/ &

cd code-examples/protect-page-login/flutter_web_redirect && \
  flutter pub get && \
  flutter build web && \
  dart pub global run dhttpd --host localhost --port 4005 --path build/web &

ory proxy --no-jwt --port 3005 http://localhost:4005/ &

trap "exit" INT TERM ERR
trap 'kill $(jobs -p)' EXIT

npx wait-on -v -t 300000 \
  tcp:127.0.0.1:3001 \
  tcp:127.0.0.1:3002 \
  tcp:127.0.0.1:3003 \
  tcp:127.0.0.1:3004 \
  tcp:127.0.0.1:3005 \
  tcp:127.0.0.1:4002 \
  tcp:127.0.0.1:4003 \
  tcp:127.0.0.1:4004 \
  tcp:localhost:4005

npm run test
