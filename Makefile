# Docker commands
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
	docker build -t social-network-frontend -f ./frontend/Dockerfile.production ./frontend

docker-run-front:
	docker run -d --name social-network-frontend -p 3000:3000 social-network-frontend

docker-build-back:
	docker build -t social-network-backend -f ./backend/Dockerfile.production ./backend

docker-run-back:
	docker run -d --name social-network-backend -p 5001:5001 social-network-backend
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