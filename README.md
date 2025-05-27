# 🚀 MERN Stack E-Commerce Deployment with Kubernetes & CI/CD

This project showcases the complete lifecycle of a full-stack e-commerce web application — from local development to production-ready containerized deployment on a local Kubernetes cluster using Minikube, Docker, and GitHub Actions for CI/CD automation.

---

## ✨ Features

- Local Kubernetes cluster with Minikube
- MERN stack application (MongoDB, Express, React, Node.js)
- Docker containerization
- GitHub Actions workflow for CI/CD
- Kubernetes manifests for deployments and services

---

## 🔧 Tech Stack

- 💻 Frontend: React.js (Vite)
- 🖥 Backend: Node.js, Express.js
- 🗄 Database: MongoDB
- 🐳 Docker & Docker Compose
- ☸️ Kubernetes (Minikube)
- ⚙️ GitHub Actions (CI/CD)
- 📦 Docker Hub Registry

---

## 📸 Project Architecture Overview
- Containerized backend, frontend, and database services
- Kubernetes deployment manifests for scalable pods and persistent storage
- CI/CD pipeline with GitHub Actions for image build, push, and automated deployment

---

## 🧰 Prerequisites

Before running this project, ensure you have the following installed:

1. **System Requirements**:
   - Windows 10/11, macOS, or Linux
   - 4+ CPU cores
   - 8GB+ RAM
   - 20GB+ free disk space

2. **Software Requirements**:
   - [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - [Minikube](https://minikube.sigs.k8s.io/docs/start/)
   - [kubectl](https://kubernetes.io/docs/tasks/tools/)
   - [Git](https://git-scm.com/downloads)
   - [Node.js](https://nodejs.org/) (v18+ recommended)

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NoorUlBaseer/CI-CD-Driven-Kubernetes-Deployment-of-MERN-App.git
cd your-repo
```

### 2. Run with Minikube (Recommended)

#### ▶️ Start Minikube Cluster

```bash
minikube start --driver=docker --memory=4096 --cpus=2
minikube addons enable ingress
```

#### 🐳 Build and Deploy Application

```bash
# Build Docker images
docker build -t sodapopin/scd-project-backend:latest ./backend
docker build -t sodapopin/scd-project-frontend:latest ./frontend

# Deploy to Kubernetes
kubectl apply -f kubernetes/
```

#### 🌐 Access the Application

```bash
# Get application URLs
minikube service frontend-service --url
minikube service backend-service --url

# Or open directly in browser
minikube service frontend-service
```

### 3. Run Locally (Without Kubernetes)

#### 📦 Backend Setup

```bash
cd backend
npm install
npm start
```

#### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access the application at `http://localhost:5173`

---

## 📁 Project Structure

```
├── backend/               # Node.js/Express backend
│   ├── src/               # Source code
│   ├── Dockerfile         # Backend container configuration
│   └── package.json
├── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/               # React components
│   ├── Dockerfile         # Frontend container configuration
│   └── package.json
├── kubernetes/            # Kubernetes manifests
│   ├── deployment.yaml    # Deployment configurations
│   └── service.yaml       # Service configurations
├── .github/workflows/     # GitHub Actions workflows
└── README.md              # This file
```

---

## 🔁 CI/CD Pipeline

The GitHub Actions workflow performs:
1. Builds Docker images
2. Pushes images to Docker Hub
3. Deploys to Minikube cluster
4. Runs rollout status checks

View workflow in `.github/workflows/deploy.yml`

---

## 🛠 Troubleshooting

### Common Issues

1. **Minikube not starting**:
```bash
minikube delete
minikube start --driver=docker --force
```

2. **Connection refused errors**:
```bash
minikube kubectl -- config view
minikube update-context
```

3. **Docker permission issues**:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

## 🧹 Cleanup Up

To remove all resources:
```bash
kubectl delete -f kubernetes/
minikube stop
minikube delete
```

---

## 📜 License 
This project is licensed under the MIT License. Contributions are welcome! Please see the [LICENSE](LICENSE.txt) file for details.
