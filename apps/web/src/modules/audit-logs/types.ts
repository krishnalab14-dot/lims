export interface ActivityLogRow {
  user: string;
  activityType: 'Login' | 'Logout' | 'View' | 'Create' | 'Update' | 'Delete';
  description: string;
  createdAt: string;
}

export interface AuditLogRow {
  user: string;
  action: string;
  entityType: string;
  entityId?: string;
  severity: 'Info' | 'Warning' | 'Critical';
  createdAt: string;
}
