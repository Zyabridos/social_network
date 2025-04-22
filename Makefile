# Local-comands - common
install:
	npm install

build:
	cd frontend && npm run build

# Local-comands - backend
test-backend:
	cd backend && npm test

lint-backend:
	cd backend && npm run lint

# Local-comands - frontend
test-e2e:
	cd frontend && npx playwright test tests

lint-frontend:
	cd frontend && npm run lint