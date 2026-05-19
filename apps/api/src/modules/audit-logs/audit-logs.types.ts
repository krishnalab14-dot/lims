export type LogSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldValue?: string;
  newValue?: string;
  severity: LogSeverity;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  activityType: 'LOGIN' | 'LOGOUT' | 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE';
  description: string;
  createdAt: string;
}
