#!/bin/bash

# Health check script for Docker

set -e

HOST=${HOST:-localhost}
PORT=${PORT:-3000}

# Check if service is responding
response=$(curl -s -o /dev/null -w "%{http_code}" http://$HOST:$PORT/health)

if [ "$response" = "200" ]; then
    echo "✅ Service is healthy"
    exit 0
else
    echo "❌ Service is unhealthy (HTTP $response)"
    exit 1
fi
