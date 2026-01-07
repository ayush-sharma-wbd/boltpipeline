const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Load configuration from environment and config file
function loadConfig() {
  const configPath = path.join(__dirname, '../config.yaml');
  let fileConfig = {};

  // Try to load config file if it exists
  if (fs.existsSync(configPath)) {
    try {
      const fileContents = fs.readFileSync(configPath, 'utf8');
      fileConfig = yaml.load(fileContents);
    } catch (e) {
      console.warn('Could not load config.yaml, using defaults');
    }
  }

  // Merge with environment variables
  return {
    service: {
      name: process.env.SERVICE_NAME || fileConfig.service?.name || 'boltpipeline',
      version: process.env.SERVICE_VERSION || fileConfig.service?.version || '1.0.0',
      port: parseInt(process.env.PORT) || fileConfig.service?.port || 3000,
      host: process.env.HOST || fileConfig.service?.host || '0.0.0.0'
    },
    database: {
      url: process.env.DATABASE_URL || fileConfig.database?.url,
      poolSize: parseInt(process.env.DATABASE_POOL_SIZE) || fileConfig.database?.pool?.max || 10
    },
    redis: {
      url: process.env.REDIS_URL || fileConfig.cache?.url
    },
    logging: {
      level: process.env.LOG_LEVEL || fileConfig.logging?.level || 'info',
      format: process.env.LOG_FORMAT || fileConfig.logging?.format || 'json'
    },
    cors: {
      origin: fileConfig.security?.cors?.origins || ['http://localhost:3000'],
      credentials: true
    },
    security: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiration: process.env.JWT_EXPIRATION || '24h'
    }
  };
}

module.exports = loadConfig();
