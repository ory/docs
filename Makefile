SHELL=/bin/bash -euo pipefail

export GO111MODULE        := on
export PATH               := .bin:${PATH}

.PHONY: install
install: code-examples/protect-page-login/nextjs/package-lock.json code-examples/protect-page-login/expressjs/package-lock.json package-lock.json code-examples/protect-page-login/go/go.sum code-examples/auth-api/expressjs/package-lock.json code-examples/protect-page-login/vue/package-lock.json code-examples/protect-page-login/flutter_web_redirect/pubspec.lock
		cd code-examples/protect-page-login/nextjs && npm i
		cd code-examples/protect-page-login/expressjs && npm i
		npm i
		cd code-examples/protect-page-login/flutter_web_redirect && flutter pub get
		cd code-examples/protect-page-login/go && go mod download && go build -o server
		cd code-examples/protect-page-login/php && composer install
		cd code-examples/auth-api/expressjs && npm i
		cd code-examples/protect-page-login/vue && npm i

.PHONY: build-examples
build-examples:
		cd code-examples/protect-page-login/nextjs && npm run build
		cd code-examples/protect-page-login/flutter_web_redirect && flutter build web --web-renderer html
		cd code-examples/protect-page-login/vue && VUE_APP_API_URL=http://localhost:4007 VUE_APP_ORY_URL=http://localhost:3006 npm run build

.PHONY: test
test: install build-examples .bin/ory
		./src/scripts/test.sh

.bin/ory: Makefile
		bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b .bin ory v0.1.33
		touch -a -m .bin/ory
