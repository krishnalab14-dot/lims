import { ActivityLog, AuditLog, LogSeverity } from './audit-logs.types';

export class AuditLogsService {
  private auditLogs: AuditLog[] = [];
  private activityLogs: ActivityLog[] = [];

  logUserActivity(userId: string, activityType: ActivityLog['activityType'], description: string): ActivityLog {
    const activity: ActivityLog = {
      id: `act-${this.activityLogs.length + 1}`,
      userId,
      activityType,
      description,
      createdAt: new Date().toISOString(),
    };
    this.activityLogs.push(activity);
    return activity;
  }

  trackDataChange(payload: Omit<AuditLog, 'id' | 'createdAt' | 'severity'> & { severity?: LogSeverity }): AuditLog {
    const log: AuditLog = {
      id: `adt-${this.auditLogs.length + 1}`,
      ...payload,
      severity: payload.severity ?? 'INFO',
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.push(log);
    return log;
  }

  logLogin(userId: string, ipAddress?: string, userAgent?: string): ActivityLog {
    return this.logUserActivity(userId, 'LOGIN', `User login from ${ipAddress ?? 'unknown IP'}`);
  }

  logLogout(userId: string): ActivityLog {
    return this.logUserActivity(userId, 'LOGOUT', 'User logout');
  }

  logCriticalOperation(userId: string, action: string, entityType: string, entityId?: string): AuditLog {
    return this.trackDataChange({
      userId,
      action,
      entityType,
      entityId,
      severity: 'CRITICAL',
      oldValue: undefined,
      newValue: undefined,
    });
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  getActivityLogs(): ActivityLog[] {
    return this.activityLogs;
  }
}
