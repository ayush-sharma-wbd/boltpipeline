#!/bin/bash

# Deployment script for Boltpipeline

set -e

ENVIRONMENT=${1:-production}
VERSION=${2:-latest}

echo "🚀 Deploying Boltpipeline to $ENVIRONMENT"
echo "📦 Version: $VERSION"

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t boltpipeline:$VERSION .

# Tag image
if [ "$ENVIRONMENT" = "production" ]; then
    docker tag boltpipeline:$VERSION boltpipeline:latest
fi

# Push to registry (configure your registry)
# docker push your-registry/boltpipeline:$VERSION

# Deploy to Kubernetes
if command -v kubectl &> /dev/null; then
    echo "☸️  Deploying to Kubernetes..."
    
    # Create namespace if it doesn't exist
    kubectl create namespace boltpipeline --dry-run=client -o yaml | kubectl apply -f -
    
    # Apply configurations
    kubectl apply -f k8s/
    
    # Wait for rollout
    kubectl rollout status deployment/boltpipeline -n boltpipeline
    
    echo "✅ Deployment complete!"
    echo ""
    echo "Check status:"
    echo "  kubectl get pods -n boltpipeline"
    echo ""
    echo "View logs:"
    echo "  kubectl logs -f deployment/boltpipeline -n boltpipeline"
else
    echo "⚠️  kubectl not found. Skipping Kubernetes deployment."
    echo "✅ Docker image built successfully!"
fi
