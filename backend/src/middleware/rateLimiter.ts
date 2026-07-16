import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from '../config/redis';

const createRedisStore = () => new RedisStore({
  client: redis,
  prefix: 'lis:ratelimit:',
});

export const loginLimiter = rateLimit({
  store: createRedisStore(),
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.LOGIN_RATE_LIMIT_MAX) || 5,
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const searchLimiter = rateLimit({
  store: createRedisStore(),
  windowMs: 60 * 1000,
  max: Number(process.env.SEARCH_RATE_LIMIT_MAX) || 30,
  message: 'Too many search requests, please try again later.',
  skipSuccessfulRequests: false,
});

export const apiLimiter = rateLimit({
  store: createRedisStore(),
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});