# Common local commands
install:
	npm install

setup:
	make install && make db-migrate

test:
	make test-e2e
	make test-backend

dev:
	make start-backend & cd frontend && npm run dev

start:
	cd frontend && npm run start
	cd backend && npm run start

build:
	cd frontend && npm run build

format:
	cd backend && npx prettier --write .
	cd frontend && npx prettier --write .

# Backend
test-backend:
	cd backend && npm test

start-backend:
	cd backend && npm run dev

db-migrate:
	cd backend && NODE_ENV=$(ENV) npx knex migrate:latest

db-rollback:
	cd backend && NODE_ENV=$(ENV) npx knex migrate:rollback

lint-backend:
	cd backend && npm run lint

# Frontend
test-e2e:
	cd frontend && npx playwright test tests

lint-frontend:
	cd frontend && npm run lint
