#!/bin/bash

set -euxo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

cd code-examples/protect-page-login/nextjs && \
  npm run start -- --port=3001 &

trap "exit" INT TERM ERR
trap 'kill $(jobs -p)' EXIT

! nc -zv localhost 3001

npm run test
