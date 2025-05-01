# Docker commands
docker-prepare:
	make docker-build-front && make docker-build-back
	
docker-build:
	docker-compose build

docker-start:
	docker compose up -d

docker-clean:
	docker compose down --volumes --remove-orphans
	docker image prune -f
	docker volume prune -f

docker-restart:
	make docker-stop
	make docker-build
	make docker-start

docker-build-front:
	cd frontend && docker build -t social-network-frontend -f Dockerfile.production .

docker-build-back:
	cd backend && docker build -t social-network-backend -f Dockerfile.production .
# Common local commands
install:
	npm install

setup:
	make install && make db-migrate

prepare:
	cd backend && cp -n .env.example .env || true

test:
	make test-e2e
	make test-backend

dev:
	npm run dev

start:
	cd frontend && npm run start
	cd backend && npm run start

build:
	cd backend && npm run build
	cd frontend && npm run build

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