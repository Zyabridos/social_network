frontend_api_host ?= localhost
backend_port ?= 5001

# Docker commands

docker-build-front:
	docker build \
		-t zyabridos/social_network_frontend:latest \
		-f frontend/Dockerfile.production \
		--build-arg NEXT_PUBLIC_API_URL=http://$(frontend_api_host):$(backend_port)/api \
		--build-arg NEXT_PUBLIC_API_BASE=http://$(frontend_api_host):$(backend_port) \
		frontend


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

# Ansible commands
ping:
	ansible deploy/webservers -m ping

prepare-deploy:
	ansible-playbook deploy/playbook.yml --tags setup --ask-vault-pass

install-roles:
	ansible-galaxy install -r deploy/requirements.yml

deploy:
	ansible-playbook deploy/playbook.yml --tags deploy --ask-vault-pass

debug:
	ansible-playbook deploy/playbook.yml --tags debug --ask-vault-pass

vault-edit:
	ansible-vault edit ./deploy/group_vars/webservers/vault.yml

vault-view:
	ansible-vault view ./deploy/group_vars/webservers/vault.yml

clean-redmine:
	ansible webservers -a "docker rm -f redmine || true"

check:
	ansible webservers -a "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000"

setup-ansible:
	make install-roles
	ansible webservers -m ping
	ansible-playbook playbook.yml --tags setup --ask-vault-pass	

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