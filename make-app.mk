USER = "$(shell id -u):$(shell id -g)"

app:
	docker-compose up

app-setup: ans-development-setup-env  app-build

app-build:
	docker-compose build

app-bash:
	docker-compose run --user=$(USER) app /bin/sh

app-clean:
	docker-compose down