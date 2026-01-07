"""Boltpipeline Service - Python Implementation"""

import os
import logging
from flask import Flask, jsonify
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__)

# Configuration
app.config['SERVICE_NAME'] = os.getenv('SERVICE_NAME', 'boltpipeline')
app.config['SERVICE_VERSION'] = os.getenv('SERVICE_VERSION', '1.0.0')
app.config['PORT'] = int(os.getenv('PORT', 3000))

# Store start time for uptime calculation
START_TIME = time.time()


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': time.time(),
        'uptime': time.time() - START_TIME,
        'service': app.config['SERVICE_NAME'],
        'version': app.config['SERVICE_VERSION']
    }), 200


@app.route('/metrics', methods=['GET'])
def metrics():
    """Metrics endpoint"""
    import psutil
    process = psutil.Process()
    
    return jsonify({
        'memory': {
            'rss': process.memory_info().rss,
            'vms': process.memory_info().vms,
            'percent': process.memory_percent()
        },
        'cpu': {
            'percent': process.cpu_percent(interval=0.1),
            'num_threads': process.num_threads()
        },
        'uptime': time.time() - START_TIME
    }), 200


@app.route('/api/v1/status', methods=['GET'])
def status():
    """Service status endpoint"""
    return jsonify({
        'message': 'Boltpipeline service is running',
        'version': app.config['SERVICE_VERSION']
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource was not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f'Internal error: {error}')
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred'
    }), 500


if __name__ == '__main__':
    port = app.config['PORT']
    logger.info(f"🚀 Starting Boltpipeline service on port {port}")
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.getenv('FLASK_ENV') == 'development'
    )
