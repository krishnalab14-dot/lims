CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY,
  sample_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  test_code VARCHAR(50) NOT NULL,
  technician_id UUID NOT NULL,
  doctor_id UUID,
  status VARCHAR(20) NOT NULL,
  remarks TEXT,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS result_parameters (
  id UUID PRIMARY KEY,
  test_result_id UUID NOT NULL REFERENCES test_results(id) ON DELETE CASCADE,
  parameter_name VARCHAR(120) NOT NULL,
  unit VARCHAR(30) NOT NULL,
  reference_range VARCHAR(120) NOT NULL,
  value_text VARCHAR(120) NOT NULL,
  is_abnormal BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS result_approvals (
  id UUID PRIMARY KEY,
  test_result_id UUID NOT NULL REFERENCES test_results(id) ON DELETE CASCADE,
  action VARCHAR(20) NOT NULL,
  actor_id UUID NOT NULL,
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
