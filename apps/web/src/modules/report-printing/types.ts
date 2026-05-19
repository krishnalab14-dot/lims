export interface ReportHistoryRow {
  reportId: string;
  patientId: string;
  testResultId: string;
  doctorName: string;
  hasLogo: boolean;
  hasSignature: boolean;
  qrVerificationValue: string;
  generatedAt: string;
  deliveryChannels: string[];
}
