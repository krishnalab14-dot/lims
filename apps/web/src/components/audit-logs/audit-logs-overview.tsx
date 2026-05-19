import { ActivityLogRow, AuditLogRow } from '../../modules/audit-logs/types';

export function AuditLogsOverview({ activityLogs, auditLogs }: { activityLogs: ActivityLogRow[]; auditLogs: AuditLogRow[] }) {
  return (
    <section>
      <h2>Audit & Logs</h2>
      <p>Tracks user activity, data changes, login/logout history, and critical operations.</p>

      <h3>Activity Logs</h3>
      <table>
        <thead><tr><th>User</th><th>Type</th><th>Description</th><th>Time</th></tr></thead>
        <tbody>
          {activityLogs.map((log, i) => (
            <tr key={`${log.user}-${i}`}><td>{log.user}</td><td>{log.activityType}</td><td>{log.description}</td><td>{log.createdAt}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>Audit Logs</h3>
      <table>
        <thead><tr><th>User</th><th>Action</th><th>Entity</th><th>Entity ID</th><th>Severity</th><th>Time</th></tr></thead>
        <tbody>
          {auditLogs.map((log, i) => (
            <tr key={`${log.user}-${log.action}-${i}`}>
              <td>{log.user}</td><td>{log.action}</td><td>{log.entityType}</td><td>{log.entityId ?? '-'}</td><td>{log.severity}</td><td>{log.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
