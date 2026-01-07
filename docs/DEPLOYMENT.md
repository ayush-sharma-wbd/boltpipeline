# Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Docker Deployment](#docker-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Monitoring](#monitoring)

## Prerequisites

- Docker 20.10+
- Kubernetes 1.24+ (for K8s deployment)
- kubectl configured
- Access to container registry

## Docker Deployment

### Build Image

```bash
docker build -t boltpipeline:latest .
```

### Run Container

```bash
docker run -d \
  --name boltpipeline \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://... \
  boltpipeline:latest
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Kubernetes Deployment

### Create Namespace

```bash
kubectl create namespace boltpipeline
```

### Deploy Application

```bash
kubectl apply -f k8s/
```

### Verify Deployment

```bash
kubectl get pods -n boltpipeline
kubectl get services -n boltpipeline
```

## Environment Configuration

### Required Variables

- `NODE_ENV`: Environment (production/staging/development)
- `PORT`: Service port (default: 3000)
- `DATABASE_URL`: Database connection string
- `REDIS_URL`: Redis connection string

### Optional Variables

- `LOG_LEVEL`: Logging level (debug/info/warn/error)
- `JWT_SECRET`: JWT signing secret
- `API_KEY`: External API key

## Monitoring

### Health Checks

```bash
curl http://localhost:3000/health
```

### Metrics

```bash
curl http://localhost:3000/metrics
```

### Logs

```bash
# Docker
docker logs -f boltpipeline

# Kubernetes
kubectl logs -f deployment/boltpipeline -n boltpipeline
```

## Scaling

### Docker Compose

```bash
docker-compose up -d --scale boltpipeline=3
```

### Kubernetes

```bash
kubectl scale deployment boltpipeline --replicas=3 -n boltpipeline
```

## Troubleshooting

### Common Issues

1. **Container won't start**
   - Check logs: `docker logs boltpipeline`
   - Verify environment variables
   - Check port availability

2. **Database connection failed**
   - Verify DATABASE_URL
   - Check network connectivity
   - Ensure database is running

3. **High memory usage**
   - Check for memory leaks
   - Review log files
   - Monitor metrics endpoint

## Rollback

### Docker

```bash
docker stop boltpipeline
docker rm boltpipeline
docker run -d --name boltpipeline boltpipeline:previous-version
```

### Kubernetes

```bash
kubectl rollout undo deployment/boltpipeline -n boltpipeline
```
