NEXT_PUBLIC_API_URL ?= http://localhost:5001/api
NEXT_PUBLIC_API_BASE ?= http://localhost:5001

# Docker commands

docker-build-front:
	docker build \
		-t social-network-frontend \
		-f frontend/Dockerfile.production \
		--build-arg NEXT_PUBLIC_API_URL=$(NEXT_PUBLIC_API_URL) \
		--build-arg NEXT_PUBLIC_API_BASE=$(NEXT_PUBLIC_API_BASE) \
		frontend

# docker-build-front:
# 	cd frontend && docker build -t social-network-frontend -f Dockerfile.production .

docker-build-back:
	cd backend && docker build -t social-network-backend -f Dockerfile.production .

docker-prepare:
	make docker-build-front && make docker-build-back

docker-migrate:
	docker exec social_network-backend-1 node dist/scripts/migrate.js

docker-seed:
	docker exec social_network-backend-1 node dist/scripts/seed.js

docker-build:
	docker compose build

docker-run:
	docker compose up -d

docker-stop:
	docker compose down --volumes --remove-orphans

docker-clean:
	docker compose down --volumes --remove-orphans
	docker image prune -f
	docker volume prune -f

docker-restart:
	make docker-stop
	make docker-build-front
	make docker-build-back
	make docker-run
	make docker-migrate
	make docker-seed
	
# Common local commands
install:
	npm install

setup:
	make install && make db-migrate

prepare:
	cd backend && cp server/knexfile.js dist/knexfile.js

dev:
	npm run dev

start:
	npm run start -w backend & npm run start -w frontend &

test:
	make test-e2e
	make test-backend

build:
	npm run build -w backend && npm run build -w frontend

lint:
	cd frontend && npm run lint
	cd backend && npm run lint

format:
	cd backend && npx prettier --write .
	cd frontend && npx prettier --write .

# Backend
test-backend:
	cd backend && npm test

db-migrate:
	cd backend && NODE_ENV=$(ENV) npx knex migrate:latest

db-rollback:
	cd backend && NODE_ENV=$(ENV) npx knex migrate:rollback

# Frontend
test-e2e:
	cd frontend && npx playwright test tests