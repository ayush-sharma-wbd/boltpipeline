# Makefile for Boltpipeline

.PHONY: help install test lint format build docker-build docker-run docker-stop clean

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	@echo "📦 Installing dependencies..."
	npm install

test: ## Run tests
	@echo "🧪 Running tests..."
	npm test

test-watch: ## Run tests in watch mode
	@echo "🧪 Running tests in watch mode..."
	npm run test:watch

lint: ## Run linter
	@echo "🔍 Running linter..."
	npm run lint

lint-fix: ## Fix linting issues
	@echo "🔧 Fixing linting issues..."
	npm run lint:fix

format: ## Format code
	@echo "✨ Formatting code..."
	npm run format

dev: ## Start development server
	@echo "🚀 Starting development server..."
	npm run dev

start: ## Start production server
	@echo "🚀 Starting production server..."
	npm start

build: ## Build application
	@echo "🔨 Building application..."
	npm run build

docker-build: ## Build Docker image
	@echo "🐳 Building Docker image..."
	docker build -t boltpipeline:latest .

docker-run: ## Run Docker container
	@echo "🐳 Running Docker container..."
	docker-compose up -d

docker-stop: ## Stop Docker container
	@echo "🛑 Stopping Docker container..."
	docker-compose down

docker-logs: ## View Docker logs
	@echo "📋 Viewing Docker logs..."
	docker-compose logs -f

k8s-deploy: ## Deploy to Kubernetes
	@echo "☸️  Deploying to Kubernetes..."
	kubectl apply -f k8s/

k8s-delete: ## Delete from Kubernetes
	@echo "🗑️  Deleting from Kubernetes..."
	kubectl delete -f k8s/

k8s-status: ## Check Kubernetes status
	@echo "📊 Checking Kubernetes status..."
	kubectl get all -n boltpipeline

clean: ## Clean build artifacts and dependencies
	@echo "🧹 Cleaning..."
	rm -rf node_modules
	rm -rf coverage
	rm -rf logs
	rm -rf tmp
	rm -f package-lock.json

setup: install ## Run setup script
	@echo "⚙️  Running setup..."
	chmod +x scripts/setup.sh
	./scripts/setup.sh
