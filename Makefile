.PHONY: image test plugins

build:
	docker build -t greenlight/cli .

test: plugins
	npm run test:tap
	node app test/fixtures/example

plugins:
	docker build -t greenlight/a test/fixtures/plugins/a
	docker build -t greenlight/b test/fixtures/plugins/b
	docker build -t greenlight/c test/fixtures/plugins/c
