export interface Department {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface TestCategory {
  id: string;
  code: string;
  name: string;
  departmentId: string;
}

export interface TestParameter {
  id: string;
  name: string;
  unit: string;
  referenceRange: string;
  normalValue?: string;
}

export interface LabTest {
  id: string;
  testCode: string;
  testName: string;
  categoryId: string;
  departmentId: string;
  price: number;
  parameters: TestParameter[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateLabTestInput {
  testCode: string;
  testName: string;
  categoryId: string;
  departmentId: string;
  price: number;
  parameters: Omit<TestParameter, 'id'>[];
}
