# API Documentation

## Base URL

```
http://localhost:3000
```

## Endpoints

### Health Check

**GET** `/health`

Returns the health status of the service.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "service": "boltpipeline",
  "version": "1.0.0"
}
```

### Metrics

**GET** `/metrics`

Returns service metrics.

**Response:**

```json
{
  "memory": {
    "rss": 50331648,
    "heapTotal": 20971520,
    "heapUsed": 15728640,
    "external": 1048576
  },
  "cpu": {
    "user": 1000000,
    "system": 500000
  },
  "uptime": 3600
}
```

### Service Status

**GET** `/api/v1/status`

Returns the current service status.

**Response:**

```json
{
  "message": "Boltpipeline service is running",
  "version": "1.0.0"
}
```

## Error Responses

All endpoints may return the following error responses:

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Route GET /invalid not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.

## Authentication

Some endpoints require authentication using JWT tokens.

**Header:**

```
Authorization: Bearer <token>
```

## Versioning

The API uses URL versioning. Current version: `v1`

All API endpoints are prefixed with `/api/v1/`
