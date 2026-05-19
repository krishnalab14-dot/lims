import { LoginActivityRow, PermissionMapRow, UserRow } from '../../modules/users/types';

export function UserManagementOverview({ users, mapping, activities }: { users: UserRow[]; mapping: PermissionMapRow[]; activities: LoginActivityRow[] }) {
  return (
    <section>
      <h2>User Management</h2>
      <p>Supports user creation, role assignment, permission mapping, user status controls, and login activity tracking.</p>

      <h3>Users</h3>
      <table>
        <thead><tr><th>User</th><th>Email</th><th>Status</th><th>Roles</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}><td>{user.username}</td><td>{user.email}</td><td>{user.status}</td><td>{user.roles.join(', ')}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>Role-Permission Mapping</h3>
      <table>
        <thead><tr><th>Role</th><th>Permissions</th></tr></thead>
        <tbody>
          {mapping.map((entry) => (
            <tr key={entry.role}><td>{entry.role}</td><td>{entry.permissions.join(', ')}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>Login Activity</h3>
      <table>
        <thead><tr><th>User</th><th>Success</th><th>IP</th><th>User Agent</th><th>Time</th></tr></thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={`${activity.username}-${idx}`}><td>{activity.username}</td><td>{activity.success ? 'Yes' : 'No'}</td><td>{activity.ipAddress}</td><td>{activity.userAgent}</td><td>{activity.loginAt}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
