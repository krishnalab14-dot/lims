import { SettingsSnapshot } from '../../modules/settings/types';

export function SettingsOverview({ snapshot }: { snapshot: SettingsSnapshot }) {
  return (
    <section>
      <h2>Settings Module</h2>
      <p>Manage lab settings, report header/footer, email, SMS, tax, and backup settings.</p>
      <table>
        <tbody>
          <tr><th>Lab Name</th><td>{snapshot.labName}</td></tr>
          <tr><th>Report Header</th><td>{snapshot.reportHeader}</td></tr>
          <tr><th>Report Footer</th><td>{snapshot.reportFooter}</td></tr>
          <tr><th>Email Provider</th><td>{snapshot.emailProvider}</td></tr>
          <tr><th>SMS Provider</th><td>{snapshot.smsProvider}</td></tr>
          <tr><th>Tax Enabled</th><td>{snapshot.taxEnabled ? 'Yes' : 'No'}</td></tr>
          <tr><th>Tax Percent</th><td>{snapshot.taxPercent}%</td></tr>
          <tr><th>Backup Enabled</th><td>{snapshot.backupEnabled ? 'Yes' : 'No'}</td></tr>
          <tr><th>Backup Frequency</th><td>{snapshot.backupFrequency}</td></tr>
        </tbody>
      </table>
    </section>
  );
}
