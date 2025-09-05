SHELL=/bin/bash -euo pipefail

export GO111MODULE        := on
export PATH               := .bin:${PATH}

.PHONY: help
help:  ## Show this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

.PHONY: format
format: node_modules  ## Format code using prettier
	npm exec -- prettier --write .

.PHONY: format-licenses
format-licenses: .bin/ory  ## Format license headers
	.bin/ory dev headers copyright --type=open-source --exclude=src/plugins

.PHONY: install
install: code-examples/protect-page-login/nextjs-12/package-lock.json code-examples/protect-page-login/nextjs/package-lock.json code-examples/protect-page-login/expressjs/package-lock.json package-lock.json code-examples/protect-page-login/go/go.sum code-examples/auth-api/expressjs/package-lock.json code-examples/protect-page-login/vue/package-lock.json code-examples/protect-page-login/flutter_web_redirect/pubspec.lock code-examples/protect-page-login/react/package-lock.json  ## Install all dependencies
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

.PHONY: build-examples
build-examples:  ## Build all code examples
	cd code-examples/protect-page-login/nextjs-12 && npm run build
	cd code-examples/protect-page-login/nextjs && npm run build
	cd code-examples/protect-page-login/flutter_web_redirect && flutter build web --web-renderer html
	cd code-examples/protect-page-login/vue && VUE_APP_API_URL=http://localhost:4007 VUE_APP_ORY_URL=http://localhost:3006 npm run build
	cd code-examples/protect-page-login/react && npm run build
	cd code-examples/protect-page-login/dotnet && docker build --build-arg APP_DIR=01-basic -t dotnet-01-basic .

licenses: .bin/licenses node_modules  ## Check open-source licenses
	.bin/licenses

.PHONY: test
test: install build-examples .bin/ory  ## Run tests
	./src/scripts/test.sh

.PHONY: dev
dev: node_modules  ## Start local development server
	npm run start

.bin/licenses: Makefile
	curl https://raw.githubusercontent.com/ory/ci/master/licenses/install | sh

.bin/ory: Makefile go.sum
	go build -o .bin/ory github.com/ory/cli

node_modules: package.json package-lock.json
	npm ci
	touch node_modules
