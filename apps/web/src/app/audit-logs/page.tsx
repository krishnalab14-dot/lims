import { AuditLogsOverview } from '../../components/audit-logs/audit-logs-overview';

export default function AuditLogsPage() {
  return (
    <main>
      <h1>Audit & Logs Module</h1>
      <AuditLogsOverview
        activityLogs={[
          { user: 'superadmin', activityType: 'Login', description: 'User login from 10.10.0.2', createdAt: '2026-05-19T08:15:00Z' },
          { user: 'tech.jane', activityType: 'Logout', description: 'User logout', createdAt: '2026-05-19T14:20:00Z' },
        ]}
        auditLogs={[
          { user: 'superadmin', action: 'UPDATE_ROLE_PERMISSIONS', entityType: 'roles', entityId: 'rol-1', severity: 'Critical', createdAt: '2026-05-19T09:10:00Z' },
          { user: 'acct.john', action: 'UPDATE_INVOICE', entityType: 'invoices', entityId: 'inv-17', severity: 'Warning', createdAt: '2026-05-19T11:35:00Z' },
        ]}
      />
    </main>
  );
}
