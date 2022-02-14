SHELL=/bin/bash -euo pipefail

export GO111MODULE        := on
export PATH               := .bin:${PATH}

.PHONY: install
install: code-examples/protect-page-login/nextjs/package-lock.json code-examples/protect-page-login/expressjs/package-lock.json package-lock.json
		cd code-examples/protect-page-login/nextjs && npm i
		cd code-examples/protect-page-login/expressjs && npm i
		npm i

.PHONY: build-examples
build-examples:
		cd code-examples/protect-page-login/nextjs && npm run build;

.PHONY: test
test: install build-examples .bin/ory
		./src/scripts/test.sh

.bin/ory: Makefile
		bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b .bin ory v0.1.22
		touch -a -m .bin/ory

.PHONY: test-jest
test-jest: Makefile install
				npx vercel dev --listen 9000 --confirm &
				npx wait-on http-get://127.0.0.1:9000/docs/ -l -c waitOnConfig.json
				npm run test:unit
