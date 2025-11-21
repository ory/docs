#!/bin/bash

set -euxo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

: "${ORY_PROJECT_API_KEY:?Environment variable ORY_PROJECT_API_KEY is not set}"
: "${ORY_CI_RATE_LIMIT_HEADER:?Environment variable ORY_CI_RATE_LIMIT_HEADER is not set}"
: "${ORY_CI_RATE_LIMIT_HEADER_VALUE:?Environment variable ORY_CI_RATE_LIMIT_HEADER_VALUE is not set}"

export ORY_SDK_URL=https://funny-kepler-o0v6t1yox6.projects.staging.oryapis.dev
export ORY_CONSOLE_URL=https://console.staging.ory.dev
export ORY_ORYAPIS_URL=https://staging.oryapis.dev
# export ORY_PROJECT_ID=a931be69-adcc-4a23-875c-23286fc9c8ac

# ensure ports are free
npx kill-port --port 3001,3002,3003,3004,3005,3006,3007,3008,3009,3010,4002,4003,4004,4005,4006,4007,4008,4009,4010

#
# Please add any build steps to the Makefile and not here!
#

# Apps which are protected by a proxy we run on ports 40xx

## NextJS-12 example ##
## proxy and app run on port 3001
cd code-examples/protect-page-login/nextjs-12 && \
  npm run start -- --port=3001 &

## NextJS-13 example ##
## proxy and app run on port 3008
cd code-examples/protect-page-login/nextjs && \
  npm run start -- --port=3008 &

## ExpressJs example ##
## proxy runs on 3002
## app runs on 4002
cd code-examples/protect-page-login/expressjs && \
  PORT=4002 ORY_SDK_URL=http://localhost:3002 npm run start &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --port 3002 --dev http://localhost:4002/ -q -y &

# We need to wait for the proxy to write the credentials file.
sleep 2

## Go server example ##
## proxy runs on 3003
## app runs on 4003
cd code-examples/protect-page-login/go && \
  PORT=4003 TUNNEL_PORT=3003 ./server &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --port 3003 --dev http://localhost:4003/ -q -y &

## PHP example ##
## proxy runs on 3004
## app runs on 4004
cd code-examples/protect-page-login/php && \
  TUNNEL_PORT=3004 php -S 127.0.0.1:4004 &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --port 3004 --dev http://localhost:4004/ -q -y &

## Flutter Web example ##
## tunnel runs on 3005
## app runs on 4005
cd code-examples/protect-page-login/flutter_web_redirect && \
  python3 -m http.server 4005 --directory build/web &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --port 3005 --dev http://localhost:4005/ -q -y &

## VueJS SPA with ExpressJS backend example ##
## tunnel runs on 3006
## expressjs app runs on 4007
## vuejs app runs on 4006
cd code-examples/auth-api/expressjs && \
  ORY_URL=http://localhost:3006 UI_URL=http://localhost:4006 PORT=4007 npm run start &
cd code-examples/protect-page-login/vue && \
  VITE_ORY_URL=http://localhost:3006 npm run dev -- --port 4006 &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --dev --port 3006 http://localhost:4006/ -q -y &

## ReactJS SPA example ##
## tunnel runs on 3007
## app runs on 4008
cd code-examples/protect-page-login/react && \
  VITE_ORY_SDK_URL=http://localhost:3007 npm run dev -- --port 4008 &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --dev --port 3007 http://localhost:4008/ -q -y &

## Dotnet server example ##
## proxy runs on 3009
## app runs on 4009
docker run --rm -d --name dotnet-01-basic --env APP_PORT=4009 -p 4009:4009 --env ORY_TUNNEL_PORT=3009 -p 3009:3009 dotnet-01-basic

## Java Spring Boot example ##
## proxy runs on 3010
## app runs on 4010
cd code-examples/protect-page-login/java && \
  ORY_SDK_URL=http://localhost:3010 mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=4010 &
ory tunnel --additional-request-headers "$ORY_CI_RATE_LIMIT_HEADER"="$ORY_CI_RATE_LIMIT_HEADER_VALUE" --port 3010 --dev http://localhost:4010/ -q -y &

trap "exit" INT TERM ERR
trap 'docker stop dotnet-01-basic; kill $(jobs -p)' EXIT

npx wait-on -v -t 300000 \
  tcp:127.0.0.1:3001 \
  tcp:127.0.0.1:3002 \
  tcp:127.0.0.1:3003 \
  tcp:127.0.0.1:3004 \
  tcp:127.0.0.1:3005 \
  tcp:127.0.0.1:3006 \
  tcp:127.0.0.1:3007 \
  tcp:127.0.0.1:3008 \
  tcp:127.0.0.1:3009 \
  tcp:127.0.0.1:3010 \
  tcp:127.0.0.1:4002 \
  tcp:127.0.0.1:4003 \
  tcp:127.0.0.1:4004 \
  tcp:127.0.0.1:4005 \
  tcp:localhost:4006 \
  tcp:localhost:4007 \
  tcp:localhost:4008 \
  tcp:localhost:4009 \
  tcp:localhost:4010

npm run test
