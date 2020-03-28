all: build

build:
	NODE_ENV=production npm run build
	./generate-template > sql/template.sql

test:
	npm test

.PHONY: build test
