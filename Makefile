all: build

template:
	./generate-template > sql/template.sql

build:
	NODE_ENV=production npm run build

test:
	npm test

.PHONY: build template test
