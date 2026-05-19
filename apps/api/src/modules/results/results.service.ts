import { CreateTestResultInput, ResultParameterInput, ResultParameterEntry, ResultWorkflowStatus, TestResult } from './results.types';

export class ResultsService {
  private results: TestResult[] = [];

  createResult(input: CreateTestResultInput): TestResult {
    const now = new Date().toISOString();
    const result: TestResult = {
      id: `result-${this.results.length + 1}`,
      sampleId: input.sampleId,
      patientId: input.patientId,
      testCode: input.testCode,
      technicianId: input.technicianId,
      status: 'PENDING',
      remarks: input.remarks,
      attachments: [],
      parameters: [],
      createdAt: now,
      updatedAt: now,
    };
    this.results.push(result);
    return result;
  }

  addParameterEntry(resultId: string, input: ResultParameterInput): TestResult | null {
    const result = this.results.find((entry) => entry.id === resultId);
    if (!result) return null;

    const parameter: ResultParameterEntry = {
      id: `rp-${result.parameters.length + 1}`,
      ...input,
      isAbnormal: this.isAbnormal(input.referenceRange, input.value),
    };

    result.parameters.push(parameter);
    result.status = 'IN_PROGRESS';
    result.updatedAt = new Date().toISOString();
    return result;
  }

  completeResultEntry(resultId: string, remarks?: string): TestResult | null {
    const result = this.results.find((entry) => entry.id === resultId);
    if (!result) return null;
    result.status = 'COMPLETED';
    result.remarks = remarks ?? result.remarks;
    result.updatedAt = new Date().toISOString();
    return result;
  }

  verifyByDoctor(resultId: string, doctorId: string, remarks?: string): TestResult | null {
    return this.transition(resultId, 'VERIFIED', { doctorId, remarks });
  }

  approveResult(resultId: string, approverId: string, remarks?: string): TestResult | null {
    return this.transition(resultId, 'APPROVED', { doctorId: approverId, remarks });
  }

  addAttachment(resultId: string, attachmentPath: string): TestResult | null {
    const result = this.results.find((entry) => entry.id === resultId);
    if (!result) return null;
    result.attachments.push(attachmentPath);
    result.updatedAt = new Date().toISOString();
    return result;
  }

  private transition(resultId: string, status: ResultWorkflowStatus, opts: { doctorId?: string; remarks?: string }): TestResult | null {
    const result = this.results.find((entry) => entry.id === resultId);
    if (!result) return null;
    result.status = status;
    if (opts.doctorId) result.doctorId = opts.doctorId;
    if (opts.remarks) result.remarks = opts.remarks;
    result.updatedAt = new Date().toISOString();
    return result;
  }

  private isAbnormal(referenceRange: string, value: string): boolean {
    const match = referenceRange.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
    const numericValue = Number(value);
    if (!match || Number.isNaN(numericValue)) return false;

    const min = Number(match[1]);
    const max = Number(match[2]);
    return numericValue < min || numericValue > max;
  }
}
