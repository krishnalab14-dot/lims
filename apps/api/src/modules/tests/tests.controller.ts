import { TestsService } from './tests.service';

export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  createDepartment(code: string, name: string, description?: string) {
    return this.testsService.createDepartment(code, name, description);
  }

  createCategory(code: string, name: string, departmentId: string) {
    return this.testsService.createCategory(code, name, departmentId);
  }

  createTest(payload: Parameters<TestsService['createTest']>[0]) {
    return this.testsService.createTest(payload);
  }
}
