CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY,
  patient_id VARCHAR(32) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender VARCHAR(16) NOT NULL,
  date_of_birth DATE NOT NULL,
  age INT NOT NULL,
  doctor_reference VARCHAR(120) NOT NULL,
  mobile_number VARCHAR(30) NOT NULL,
  address TEXT NOT NULL,
  emergency_contact_name VARCHAR(100) NOT NULL,
  emergency_contact_relation VARCHAR(50) NOT NULL,
  emergency_contact_mobile VARCHAR(30) NOT NULL,
  barcode_value VARCHAR(64) NOT NULL,
  qr_code_value VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS patient_visits (
  id UUID PRIMARY KEY,
  patient_id VARCHAR(32) NOT NULL,
  visit_date TIMESTAMPTZ NOT NULL,
  doctor_reference VARCHAR(120) NOT NULL,
  notes TEXT NOT NULL,
  CONSTRAINT fk_patient_visits_patient FOREIGN KEY (patient_id) REFERENCES patients (patient_id)
);
