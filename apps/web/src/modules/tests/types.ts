export interface TestCatalogRow {
  testCode: string;
  testName: string;
  category: string;
  department: string;
  unit: string;
  referenceRange: string;
  normalValue: string;
  price: number;
}

export interface DepartmentRow {
  code: string;
  name: string;
}
