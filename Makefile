REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	mkdir -p dist
	# Note: DO NOT pass --compress to uglifyjs. The Rhino JS interpreter on Android
	# does not work well with the transformations it applies to the code. It results
	# in a more complex (or, different) AST which results in StackOverflowError's while
	# parsing the source.
	# browserify -t coffeeify --extension=".coffee" sqlite.coffee | \
	# 	./node_modules/uglify-js/bin/uglifyjs > dist/sqlite.js --mangle
	# browserify -t coffeeify --extension=".coffee" postgres.coffee | \
	# 	./node_modules/uglify-js/bin/uglifyjs > dist/postgres.js --mangle
	browserify -t coffeeify --extension=".coffee" sqlite.coffee > dist/sqlite.js --mangle
	browserify -t coffeeify --extension=".coffee" postgres.coffee > dist/postgres.js --mangle

# debug:
# 	mkdir -p dist
# 	browserify -t coffeeify --extension=".coffee" runtime.coffee > dist/expressions.js
# 	./script/build-docs

copy:
	./script/copy-files

dist: clean build test

clean:
	rm -f dist/*

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--compilers coffee:coffee-script/register \
	$(TESTS)

.PHONY: build test copy clean dist
