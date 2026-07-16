export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  LAB_ADMIN = 'LAB_ADMIN',
  MANAGER = 'MANAGER',
  PATHOLOGIST = 'PATHOLOGIST',
  TECHNICIAN = 'TECHNICIAN',
  RECEPTIONIST = 'RECEPTIONIST',
  VIEWER = 'VIEWER',
}

export interface JwtPayload {
  userId: string;
  email: string;
  labId?: string;
  organizationId?: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Express.Request {
  user?: JwtPayload;
  token?: string;
}

export interface PaginationParams {
  cursor?: string;
  limit: number;
}

export interface CursorPaginationResult<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
  count: number;
}

export interface AuditContext {
  userId: string;
  labId?: string;
  organizationId: string;
  ipAddress: string;
  userAgent: string;
}
