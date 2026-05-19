export interface SettingsSnapshot {
  labName: string;
  reportHeader: string;
  reportFooter: string;
  emailProvider: string;
  smsProvider: string;
  taxEnabled: boolean;
  taxPercent: number;
  backupEnabled: boolean;
  backupFrequency: 'Daily' | 'Weekly' | 'Monthly';
}
