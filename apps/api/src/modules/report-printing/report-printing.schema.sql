CREATE TABLE IF NOT EXISTS report_prints (
  id UUID PRIMARY KEY,
  test_result_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  doctor_name VARCHAR(150) NOT NULL,
  doctor_signature_url TEXT,
  qr_verification_value TEXT NOT NULL,
  pdf_path TEXT,
  emailed_at TIMESTAMPTZ,
  whatsapp_shared_at TIMESTAMPTZ,
  printed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
