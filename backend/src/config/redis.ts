import Redis from 'ioredis';
import logger from './logger';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

redis.on('connect', () => {
  logger.info('Redis connected');
});

export default redis;

export const cacheKeys = {
  PATIENT_LIST: (orgId: string, labId: string) => `patients:${orgId}:${labId}`,
  TEST_CATALOG: (labId: string) => `tests:${labId}`,
  DASHBOARD_STATS: (labId: string) => `dashboard:${labId}`,
  WORKFLOW_CONFIG: (labId: string) => `workflow:${labId}`,
  USER_SESSIONS: (userId: string) => `sessions:${userId}`,
};

export const cacheTTL = {
  PATIENT_LIST: 3600,
  TEST_CATALOG: 7200,
  DASHBOARD_STATS: 300,
  WORKFLOW_CONFIG: 86400,
};