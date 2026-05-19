import { CreateLabTestInput, Department, LabTest, TestCategory } from './tests.types';

export class TestsService {
  private departments: Department[] = [];
  private categories: TestCategory[] = [];
  private tests: LabTest[] = [];

  createDepartment(code: string, name: string, description?: string): Department {
    const department: Department = { id: `dept-${this.departments.length + 1}`, code, name, description };
    this.departments.push(department);
    return department;
  }

  createCategory(code: string, name: string, departmentId: string): TestCategory {
    const category: TestCategory = { id: `cat-${this.categories.length + 1}`, code, name, departmentId };
    this.categories.push(category);
    return category;
  }

  createTest(input: CreateLabTestInput): LabTest {
    const now = new Date().toISOString();
    const test: LabTest = {
      id: `test-${this.tests.length + 1}`,
      testCode: input.testCode,
      testName: input.testName,
      categoryId: input.categoryId,
      departmentId: input.departmentId,
      price: input.price,
      parameters: input.parameters.map((parameter, index) => ({ id: `param-${this.tests.length + 1}-${index + 1}`, ...parameter })),
      createdAt: now,
      updatedAt: now,
    };
    this.tests.push(test);
    return test;
  }

  updateTest(testId: string, input: Partial<CreateLabTestInput>): LabTest | null {
    const index = this.tests.findIndex((entry) => entry.id === testId);
    if (index === -1) return null;

    const existing = this.tests[index];
    const updated: LabTest = {
      ...existing,
      ...input,
      parameters: input.parameters
        ? input.parameters.map((parameter, idx) => ({ id: `param-${existing.id}-${idx + 1}`, ...parameter }))
        : existing.parameters,
      updatedAt: new Date().toISOString(),
    };
    this.tests[index] = updated;
    return updated;
  }

  listTests(): LabTest[] {
    return this.tests;
  }
}
