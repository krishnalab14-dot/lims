CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY,
  lab_settings JSONB NOT NULL,
  report_template_settings JSONB NOT NULL,
  email_settings JSONB NOT NULL,
  sms_settings JSONB NOT NULL,
  tax_settings JSONB NOT NULL,
  backup_settings JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
