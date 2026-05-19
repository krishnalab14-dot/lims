export interface LabSettings {
  labName: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export interface ReportTemplateSettings {
  headerText: string;
  footerText: string;
  logoUrl?: string;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  fromEmail: string;
  useTls: boolean;
}

export interface SmsSettings {
  provider: string;
  senderId: string;
  apiKeyMasked: string;
}

export interface TaxSettings {
  gstNumber?: string;
  taxPercent: number;
  isTaxEnabled: boolean;
}

export interface BackupSettings {
  enabled: boolean;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  retentionDays: number;
  backupPath: string;
}

export interface SystemSettings {
  id: string;
  lab: LabSettings;
  reportTemplate: ReportTemplateSettings;
  email: EmailSettings;
  sms: SmsSettings;
  tax: TaxSettings;
  backup: BackupSettings;
  updatedAt: string;
}
