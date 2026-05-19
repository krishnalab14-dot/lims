import { RateLimitRecord } from './security.types';

const memoryStore = new Map<string, RateLimitRecord>();

export function rateLimitMiddleware(key: string, limit: number, windowMs: number): void {
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || now - record.windowStart > windowMs) {
    memoryStore.set(key, { key, windowStart: now, requestCount: 1 });
    return;
  }

  if (record.requestCount >= limit) {
    throw new Error('Too many requests');
  }

  record.requestCount += 1;
  memoryStore.set(key, record);
}
