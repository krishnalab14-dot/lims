import { SettingsOverview } from '../../components/settings/settings-overview';

export default function SettingsPage() {
  return (
    <main>
      <h1>Settings Module</h1>
      <SettingsOverview
        snapshot={{
          labName: 'Acme Diagnostics',
          reportHeader: 'Acme Diagnostics - Accurate & Trusted',
          reportFooter: 'This is a system-generated report.',
          emailProvider: 'SMTP',
          smsProvider: 'Twilio',
          taxEnabled: true,
          taxPercent: 18,
          backupEnabled: true,
          backupFrequency: 'Daily',
        }}
      />
    </main>
  );
}
