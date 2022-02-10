SHELL=/bin/bash -euo pipefail

.PHONY: install
install: code-examples/protect-page-login/nextjs/package-lock.json code-examples/protect-page-login/expressjs/package-lock.json package-lock.json
		cd code-examples/protect-page-login/nextjs && npm i
		cd code-examples/protect-page-login/expressjs && npm i
		npm i

.PHONY: build-examples
build-examples:
		cd code-examples/protect-page-login/nextjs && npm run build;

.PHONY: test
test: install build-examples
		./src/scripts/test.sh
