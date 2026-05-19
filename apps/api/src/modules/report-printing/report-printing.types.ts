export interface ReportBranding {
  labName: string;
  hospitalName?: string;
  logoUrl?: string;
  footerNote?: string;
}

export interface ReportPrintRecord {
  id: string;
  testResultId: string;
  patientId: string;
  doctorName: string;
  doctorSignatureUrl?: string;
  qrVerificationValue: string;
  pdfPath?: string;
  emailedAt?: string;
  whatsappSharedAt?: string;
  printedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratePdfInput {
  testResultId: string;
  patientId: string;
  doctorName: string;
  doctorSignatureUrl?: string;
  branding: ReportBranding;
}
