SHELL=/bin/bash -euo pipefail

.PHONY: install
install:
		cd code-examples/protect-page-login/nextjs && npm i
		npm i

.PHONY: build-examples
build-examples:
		cd code-examples/protect-page-login/nextjs && npm run build;

.PHONY: test
test: install build-examples
		./src/scripts/test.sh
