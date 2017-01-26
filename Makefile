install:
	yarn

run:
	npm run babel-node -- ./src/bin/gendiff.js ${flag} ${path1} ${path2}

test:
	npm test

publish:
	npm publish

lint:
	npm run eslint -- ./src

build:
	rm -rf dist
	npm run build
