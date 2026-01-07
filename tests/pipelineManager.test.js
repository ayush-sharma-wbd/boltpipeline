const PipelineManager = require('../src/services/pipelineManager');

describe('PipelineManager', () => {
  beforeEach(() => {
    // Clear pipelines before each test
    PipelineManager.pipelines.clear();
    PipelineManager.runningPipelines.clear();
  });

  describe('register', () => {
    it('should register a new pipeline', () => {
      const config = {
        stages: [
          { name: 'build', enabled: true },
          { name: 'test', enabled: true }
        ]
      };

      PipelineManager.register('test-pipeline', config);
      const status = PipelineManager.getStatus('test-pipeline');

      expect(status).toBeDefined();
      expect(status.id).toBe('test-pipeline');
      expect(status.status).toBe('registered');
    });
  });

  describe('execute', () => {
    it('should execute a registered pipeline', async () => {
      const config = {
        stages: [
          { name: 'build', enabled: true }
        ]
      };

      PipelineManager.register('test-pipeline', config);
      const result = await PipelineManager.execute('test-pipeline');

      expect(result.success).toBe(true);
      expect(result.pipeline).toBe('test-pipeline');
      expect(result.duration).toBeGreaterThan(0);
    });

    it('should throw error for non-existent pipeline', async () => {
      await expect(
        PipelineManager.execute('non-existent')
      ).rejects.toThrow('Pipeline non-existent not found');
    });
  });

  describe('list', () => {
    it('should list all pipelines', () => {
      PipelineManager.register('pipeline-1', { stages: [] });
      PipelineManager.register('pipeline-2', { stages: [] });

      const pipelines = PipelineManager.list();

      expect(pipelines).toHaveLength(2);
      expect(pipelines[0].id).toBe('pipeline-1');
      expect(pipelines[1].id).toBe('pipeline-2');
    });
  });
});
