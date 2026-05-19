export type ResultWorkflowStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED' | 'APPROVED';

export interface ResultParameterEntry {
  id: string;
  parameterName: string;
  unit: string;
  referenceRange: string;
  value: string;
  isAbnormal: boolean;
}

export interface TestResult {
  id: string;
  sampleId: string;
  patientId: string;
  testCode: string;
  technicianId: string;
  doctorId?: string;
  status: ResultWorkflowStatus;
  remarks?: string;
  attachments: string[];
  parameters: ResultParameterEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestResultInput {
  sampleId: string;
  patientId: string;
  testCode: string;
  technicianId: string;
  remarks?: string;
}

export interface ResultParameterInput {
  parameterName: string;
  unit: string;
  referenceRange: string;
  value: string;
}
