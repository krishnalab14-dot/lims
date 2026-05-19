export interface AuthenticatedRequestContext {
  userId: string;
  roles: string[];
  permissions: string[];
}

export interface RateLimitRecord {
  key: string;
  windowStart: number;
  requestCount: number;
}
