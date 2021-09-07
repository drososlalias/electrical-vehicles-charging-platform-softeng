all:
	@export npm_config_loglevel=error; \
	npm install; \
	cd client; npm install; \
	cd ../cli; npm install; npm install -g .

tests:
	@npm run test