# 🌐 Mini Social Network (WIP)

This is a **fullstack social network application** built with modern technologies and a strong focus on **Test-Driven Development (TDD)**.  
It is currently under active development.

---

## 📊 Badges
[![Maintainability](https://qlty.sh/badges/4d81dab0-854f-4b45-b6a9-78ae216c188f/maintainability.svg)](https://qlty.sh/gh/Zyabridos/projects/social_network)

## 🚀 CI/CD & Docker

- ✅ All tests are run on **GitHub Actions**.
- ✅ On push to `main`, **frontend and backend are tested and deployed independently** to **Docker Hub** using `docker/build-push-action`.
- ✅ Separate `Dockerfile.production` files are used for each part.
- ✅ No sensitive environment variables are exposed in CI.

## 🐳 Docker images:
- [`zyabridos/social_network_frontend`](https://hub.docker.com/repository/docker/zyabridos/social_network_frontend)
- [`zyabridos/social_network_backend`](https://hub.docker.com/repository/docker/zyabridos/social_network_backend)

---

# 🐳 Running the Project with Docker

This project is fully containerized. You can run the entire stack (frontend, backend, and database) using Docker Compose.

### 1. Build Docker Images
Build production-ready Docker images for both frontend and backend:
```bash
make docker-build
```

Or individually:
```bash
make docker-build-front
make docker-build-back
```

### 2. Run the App Locally in Docker
Start all services (backend, frontend, and database):
```bash
make docker-run
```

Then open the app at http://localhost:3000

### 3. Apply Migrations & Seed the Database
After the containers are up, run:
```bash
make docker-migrate    # applies migrations inside the backend container
make docker-seed       # seeds the database with demo data
```

### 4. Restart the Stack
To rebuild and restart everything (useful after code or Dockerfile changes):
```bash
make docker-restart
```

### 5. Stop and Clean Containers
Stop all services and clean volumes:
```bash
make docker-stop
```

Full cleanup (containers + images + volumes):
```bash
make docker-clean
```

## Run Tests in Docker (Playwright, Jest)
Once the app is running:
```bash
make test-backend  # runs backend unit/integration tests
make test-e2e      # runs frontend end-to-end tests with Playwright
```