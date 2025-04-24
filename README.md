# 🌐 Mini Social Network (WIP)

This is a **fullstack social network application** built with modern technologies and a strong focus on **Test-Driven Development (TDD)**.  
It is currently under active development.

---

## 🚀 CI/CD & Docker

- ✅ All tests are run on **GitHub Actions**.
- ✅ On push to `main`, **frontend and backend are tested and deployed independently** to **Docker Hub** using `docker/build-push-action`.
- ✅ Separate `Dockerfile.production` files are used for each part.
- ✅ No sensitive environment variables are exposed in CI.

## 🐳 Docker images:
- [`zyabridos/social_network_frontend`](https://hub.docker.com/repository/docker/zyabridos/social_network_frontend)
- [`zyabridos/social_network_backend`](https://hub.docker.com/repository/docker/zyabridos/social_network_backend)

---