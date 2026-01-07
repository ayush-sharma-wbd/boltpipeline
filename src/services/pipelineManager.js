/**
 * Pipeline Manager
 * Handles pipeline execution and orchestration
 */

const logger = require('../utils/logger');

class PipelineManager {
  constructor() {
    this.pipelines = new Map();
    this.runningPipelines = new Set();
  }

  /**
   * Register a new pipeline
   * @param {string} id - Pipeline identifier
   * @param {Object} config - Pipeline configuration
   */
  register(id, config) {
    logger.info(`Registering pipeline: ${id}`);
    this.pipelines.set(id, {
      id,
      config,
      status: 'registered',
      createdAt: new Date()
    });
  }

  /**
   * Execute a pipeline
   * @param {string} id - Pipeline identifier
   * @param {Object} context - Execution context
   */
  async execute(id, context = {}) {
    const pipeline = this.pipelines.get(id);
    if (!pipeline) {
      throw new Error(`Pipeline ${id} not found`);
    }

    if (this.runningPipelines.has(id)) {
      throw new Error(`Pipeline ${id} is already running`);
    }

    logger.info(`Executing pipeline: ${id}`);
    this.runningPipelines.add(id);

    try {
      pipeline.status = 'running';
      pipeline.startedAt = new Date();

      // Execute pipeline stages
      const stages = pipeline.config.stages || [];
      for (const stage of stages) {
        logger.info(`Executing stage: ${stage.name}`);
        await this.executeStage(stage, context);
      }

      pipeline.status = 'completed';
      pipeline.completedAt = new Date();
      logger.info(`Pipeline ${id} completed successfully`);

      return {
        success: true,
        pipeline: id,
        duration: pipeline.completedAt - pipeline.startedAt
      };
    } catch (error) {
      pipeline.status = 'failed';
      pipeline.error = error.message;
      logger.error(`Pipeline ${id} failed:`, error);
      throw error;
    } finally {
      this.runningPipelines.delete(id);
    }
  }

  /**
   * Execute a pipeline stage
   * @param {Object} stage - Stage configuration
   * @param {Object} context - Execution context
   */
  async executeStage(stage, context) {
    // Simulate stage execution
    return new Promise((resolve) => {
      setTimeout(() => {
        logger.info(`Stage ${stage.name} completed`);
        resolve();
      }, 1000);
    });
  }

  /**
   * Get pipeline status
   * @param {string} id - Pipeline identifier
   */
  getStatus(id) {
    const pipeline = this.pipelines.get(id);
    if (!pipeline) {
      return null;
    }

    return {
      id: pipeline.id,
      status: pipeline.status,
      createdAt: pipeline.createdAt,
      startedAt: pipeline.startedAt,
      completedAt: pipeline.completedAt,
      error: pipeline.error
    };
  }

  /**
   * List all pipelines
   */
  list() {
    return Array.from(this.pipelines.values()).map(p => ({
      id: p.id,
      status: p.status,
      createdAt: p.createdAt
    }));
  }
}

module.exports = new PipelineManager();
