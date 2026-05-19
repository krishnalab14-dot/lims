CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY,
  supplier_code VARCHAR(40) UNIQUE NOT NULL,
  supplier_name VARCHAR(160) NOT NULL,
  contact_person VARCHAR(120),
  phone VARCHAR(30),
  email VARCHAR(120),
  address TEXT
);

CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY,
  reagent_code VARCHAR(40) UNIQUE NOT NULL,
  reagent_name VARCHAR(160) NOT NULL,
  batch_number VARCHAR(80) NOT NULL,
  supplier_id UUID NOT NULL REFERENCES suppliers(id),
  quantity_in_stock NUMERIC(12,2) NOT NULL,
  reorder_level NUMERIC(12,2) NOT NULL,
  expiry_date DATE NOT NULL,
  unit VARCHAR(20) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY,
  supplier_id UUID NOT NULL REFERENCES suppliers(id),
  purchase_date DATE NOT NULL,
  invoice_number VARCHAR(60) NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stock_transactions (
  id UUID PRIMARY KEY,
  inventory_id UUID NOT NULL REFERENCES inventory(id),
  transaction_type VARCHAR(20) NOT NULL,
  quantity NUMERIC(12,2) NOT NULL,
  reason TEXT,
  transaction_date TIMESTAMPTZ NOT NULL
);
