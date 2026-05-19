import { UserManagementOverview } from '../../components/users/user-management-overview';

export default function UsersPage() {
  return (
    <main>
      <h1>User Management Module</h1>
      <UserManagementOverview
        users={[
          { username: 'superadmin', email: 'superadmin@lims.local', status: 'Active', roles: ['Super Admin'] },
          { username: 'acct.john', email: 'john.accountant@lims.local', status: 'Inactive', roles: ['Accountant'] },
        ]}
        mapping={[
          { role: 'Receptionist', permissions: ['PATIENT_CREATE', 'PATIENT_VIEW'] },
          { role: 'Lab Technician', permissions: ['SAMPLE_COLLECT', 'RESULT_ENTRY'] },
        ]}
        activities={[
          { username: 'superadmin', success: true, ipAddress: '10.10.0.2', userAgent: 'Chrome', loginAt: '2026-05-19T08:15:00Z' },
          { username: 'acct.john', success: false, ipAddress: '10.10.0.55', userAgent: 'Firefox', loginAt: '2026-05-19T08:25:00Z' },
        ]}
      />
    </main>
  );
}
