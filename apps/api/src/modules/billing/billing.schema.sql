CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY,
  invoice_number VARCHAR(40) UNIQUE NOT NULL,
  patient_id UUID NOT NULL,
  visit_id UUID,
  package_name VARCHAR(120),
  sub_total NUMERIC(12,2) NOT NULL,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  payment_status VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  test_code VARCHAR(50) NOT NULL,
  test_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_rate_percent NUMERIC(5,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  method VARCHAR(20) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  reference_number VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
