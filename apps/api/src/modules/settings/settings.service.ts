import { SystemSettings } from './settings.types';

export class SettingsService {
  private settings: SystemSettings = {
    id: 'settings-1',
    lab: {
      labName: 'Acme Diagnostics',
      address: '12 Health Street, Springfield',
      phone: '+1-555-000-1111',
      email: 'info@acmediagnostics.local',
      website: 'https://acmediagnostics.local',
    },
    reportTemplate: {
      headerText: 'Acme Diagnostics - Accurate & Trusted',
      footerText: 'This is a system-generated report.',
    },
    email: {
      smtpHost: 'smtp.example.local',
      smtpPort: 587,
      smtpUsername: 'mailer',
      fromEmail: 'noreply@acmediagnostics.local',
      useTls: true,
    },
    sms: {
      provider: 'Twilio',
      senderId: 'ACME-LAB',
      apiKeyMasked: '********',
    },
    tax: {
      gstNumber: 'GST-0000001',
      taxPercent: 18,
      isTaxEnabled: true,
    },
    backup: {
      enabled: true,
      frequency: 'DAILY',
      retentionDays: 30,
      backupPath: '/var/backups/lims',
    },
    updatedAt: new Date().toISOString(),
  };

  getSettings(): SystemSettings {
    return this.settings;
  }

  updateSettings(patch: Partial<Omit<SystemSettings, 'id' | 'updatedAt'>>): SystemSettings {
    this.validatePatch(patch);

    this.settings = {
      ...this.settings,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    return this.settings;
  }

  private validatePatch(patch: Partial<Omit<SystemSettings, 'id' | 'updatedAt'>>): void {
    if (patch.tax && (patch.tax.taxPercent < 0 || patch.tax.taxPercent > 100)) {
      throw new Error('Tax percent must be between 0 and 100');
    }

    if (patch.email && (patch.email.smtpPort <= 0 || patch.email.smtpPort > 65535)) {
      throw new Error('SMTP port must be between 1 and 65535');
    }

    if (patch.backup && patch.backup.retentionDays <= 0) {
      throw new Error('Backup retention days must be greater than 0');
    }
  }
}
