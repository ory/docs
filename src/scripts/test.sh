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

cd code-examples/go && \
  PORT=4003 go run . &
ory proxy --no-jwt --port 3003 http://localhost:4003/ &

trap "exit" INT TERM ERR
trap 'kill $(jobs -p)' EXIT

npx wait-on -v -t 300000 \
  tcp:127.0.0.1:3001 \
  tcp:127.0.0.1:3002 \
  tcp:127.0.0.1:3003 \
  tcp:127.0.0.1:4002 \
  tcp:127.0.0.1:4003

npm run test
