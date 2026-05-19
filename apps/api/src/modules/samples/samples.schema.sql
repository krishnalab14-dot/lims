CREATE TABLE IF NOT EXISTS samples (
  id UUID PRIMARY KEY,
  sample_barcode VARCHAR(50) UNIQUE NOT NULL,
  patient_id UUID NOT NULL,
  visit_id UUID,
  test_code VARCHAR(50) NOT NULL,
  collection_status VARCHAR(20) NOT NULL,
  transfer_status VARCHAR(20) NOT NULL,
  rejection_reason TEXT,
  collected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sample_collections (
  id UUID PRIMARY KEY,
  sample_id UUID NOT NULL REFERENCES samples(id) ON DELETE CASCADE,
  collected_by UUID,
  collection_datetime TIMESTAMPTZ NOT NULL,
  collection_status VARCHAR(20) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
