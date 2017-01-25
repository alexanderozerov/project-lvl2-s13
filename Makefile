install:
	npm install

run:
	npm run babel-node -- ./dist/bin/

publish:
	npm publish

lint:
	npm run eslint -- ./dist/
