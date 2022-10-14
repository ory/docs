#!/bin/bash

set -euxo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

export ORY_SDK_URL=https://playground.projects.oryapis.com

! nc -zv localhost 3001
! nc -zv localhost 3002
! nc -zv localhost 3003
! nc -zv localhost 3004
! nc -zv localhost 3005
! nc -zv localhost 3006
! nc -zv localhost 3007
! nc -zv localhost 4001
! nc -zv localhost 4002
! nc -zv localhost 4003
! nc -zv localhost 4004
! nc -zv localhost 4005
! nc -zv localhost 4006
! nc -zv localhost 4007
! nc -zv localhost 4008

#
# Please add any build steps to the Makefile and not here!
#

cd code-examples/protect-page-login/flutter_web_redirect && \
  dart pub global run dhttpd --host localhost --port 4005 --path build/web &
ory proxy --no-jwt --port 3005 http://localhost:4005/ &

cd code-examples/protect-page-login/nextjs && \
  npm run start -- --port=3001 &

# Apps which are protected by a proxy we run on ports 40xx
cd code-examples/protect-page-login/expressjs && \
  PORT=4002 npm run start &
ory proxy --no-jwt --port 3002 http://localhost:4002/ &

cd code-examples/protect-page-login/go && \
  PORT=4003 PROXY_PORT=3003 ./server &
ory proxy --no-jwt --port 3003 http://localhost:4003/ &

cd code-examples/protect-page-login/php && \
  PROXY_PORT=3004 php -S 127.0.0.1:4004 &
ory proxy --no-jwt --port 3004 http://localhost:4004/ &

cd code-examples/auth-api/expressjs && \
  ORY_URL=http://localhost:3006 UI_URL=http://localhost:4006 PORT=4007 npm run start &
cd code-examples/protect-page-login/vue && \
  npm run start -- -l 4006 &
ory tunnel --dev --port 3006 http://localhost:4006/ &

cd code-examples/protect-page-login/react && \
  PORT=4008 REACT_APP_ORY_URL=http://localhost:3007 BROWSER=none CI=true npm run start &
ory tunnel --dev --port 3007 http://localhost:4008/ &

trap "exit" INT TERM ERR
trap 'kill $(jobs -p)' EXIT

npx wait-on -v -t 300000 \
  tcp:127.0.0.1:3001 \
  tcp:127.0.0.1:3002 \
  tcp:127.0.0.1:3003 \
  tcp:127.0.0.1:3004 \
  tcp:127.0.0.1:3005 \
  tcp:127.0.0.1:3006 \
  tcp:127.0.0.1:3007 \
  tcp:127.0.0.1:4002 \
  tcp:127.0.0.1:4003 \
  tcp:127.0.0.1:4004 \
  tcp:localhost:4005 \
  tcp:localhost:4006 \
  tcp:localhost:4008

npm run test
