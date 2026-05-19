CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY,
  code VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS test_categories (
  id UUID PRIMARY KEY,
  code VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  department_id UUID NOT NULL REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY,
  test_code VARCHAR(40) UNIQUE NOT NULL,
  test_name VARCHAR(150) NOT NULL,
  category_id UUID NOT NULL REFERENCES test_categories(id),
  department_id UUID NOT NULL REFERENCES departments(id),
  price NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_parameters (
  id UUID PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  unit VARCHAR(30) NOT NULL,
  reference_range VARCHAR(120) NOT NULL,
  normal_value VARCHAR(120)
);
