SHELL=/bin/bash -euo pipefail

export PATH               := .bin:${PATH}

node_modules/.bin/prettier: package.json package-lock.json
	npm i
	touch node_modules/.bin/prettier

.PHONY: format
format: node_modules/.bin/prettier
	npm exec -- prettier --write .

.PHONY: format-licenses
format-licenses: .bin/ory
	.bin/ory dev headers copyright --type=open-source --exclude=src/plugins

.PHONY: install
install: code-examples/protect-page-login/nextjs-12/package-lock.json code-examples/protect-page-login/nextjs/package-lock.json code-examples/protect-page-login/expressjs/package-lock.json package-lock.json code-examples/protect-page-login/go/go.sum code-examples/auth-api/expressjs/package-lock.json code-examples/protect-page-login/vue/package-lock.json code-examples/protect-page-login/flutter_web_redirect/pubspec.lock code-examples/protect-page-login/react/package-lock.json
	cd code-examples/protect-page-login/nextjs-12 && npm i
	cd code-examples/protect-page-login/nextjs && npm i
	cd code-examples/protect-page-login/expressjs && npm i
	npm i
	cd code-examples/protect-page-login/flutter_web_redirect && flutter pub get
	cd code-examples/protect-page-login/go && go mod download && go build -o server
	cd code-examples/protect-page-login/php && composer install
	cd code-examples/auth-api/expressjs && npm i
	cd code-examples/protect-page-login/vue && npm i
	cd code-examples/protect-page-login/react && npm i
	cd code-examples/protect-page-login/java && mvn dependency:resolve

.PHONY: build-examples
build-examples:
	cd code-examples/protect-page-login/nextjs-12 && npm run build
	cd code-examples/protect-page-login/nextjs && npm run build
	cd code-examples/protect-page-login/flutter_web_redirect && flutter build web
	cd code-examples/protect-page-login/vue && VUE_APP_API_URL=http://localhost:4007 VUE_APP_ORY_URL=http://localhost:3006 npm run build
	cd code-examples/protect-page-login/react && npm run build
	cd code-examples/protect-page-login/dotnet && docker build --build-arg APP_DIR=01-basic -t dotnet-01-basic .
	cd code-examples/protect-page-login/java && mvn clean compile

.PHONY: licenses
licenses: .bin/licenses package-lock.json
	.bin/licenses

.bin/licenses: Makefile
	curl https://raw.githubusercontent.com/ory/ci/master/licenses/install | sh

.bin/ory: Makefile go.mod
	go build -o .bin/ory github.com/ory/cli

.PHONY: test
test: install build-examples .bin/ory
	./src/scripts/test.sh
