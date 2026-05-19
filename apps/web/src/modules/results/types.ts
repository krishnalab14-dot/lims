export type ResultWorkflowStatus = 'Pending' | 'In Progress' | 'Completed' | 'Verified' | 'Approved';

export interface ResultParameterRow {
  parameterName: string;
  value: string;
  unit: string;
  referenceRange: string;
  abnormalFlag: 'Normal' | 'Abnormal';
}

export interface ResultEntryRow {
  resultId: string;
  sampleId: string;
  patientId: string;
  testCode: string;
  technician: string;
  doctor?: string;
  status: ResultWorkflowStatus;
  remarks?: string;
  attachmentsCount: number;
}
