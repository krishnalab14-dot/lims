import { AuditLogsService } from './audit-logs.service';

export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  userActivity(userId: string, type: 'LOGIN' | 'LOGOUT' | 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE', description: string) {
    return this.auditLogsService.logUserActivity(userId, type, description);
  }

  dataChange(payload: Parameters<AuditLogsService['trackDataChange']>[0]) {
    return this.auditLogsService.trackDataChange(payload);
  }

  login(userId: string, ipAddress?: string, userAgent?: string) {
    return this.auditLogsService.logLogin(userId, ipAddress, userAgent);
  }

  logout(userId: string) {
    return this.auditLogsService.logLogout(userId);
  }

  critical(userId: string, action: string, entityType: string, entityId?: string) {
    return this.auditLogsService.logCriticalOperation(userId, action, entityType, entityId);
  }
}
