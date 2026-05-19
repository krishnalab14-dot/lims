import { GeneratePdfInput, ReportPrintRecord } from './report-printing.types';

export class ReportPrintingService {
  private reports: ReportPrintRecord[] = [];

  generatePdfReport(input: GeneratePdfInput): ReportPrintRecord {
    const now = new Date().toISOString();
    const id = `rpt-${this.reports.length + 1}`;
    const record: ReportPrintRecord = {
      id,
      testResultId: input.testResultId,
      patientId: input.patientId,
      doctorName: input.doctorName,
      doctorSignatureUrl: input.doctorSignatureUrl,
      qrVerificationValue: `lims://verify/report/${id}`,
      pdfPath: `/reports/${id}.pdf`,
      createdAt: now,
      updatedAt: now,
    };

    this.reports.push(record);
    return record;
  }

  markPrinted(reportId: string): ReportPrintRecord | null {
    return this.patch(reportId, { printedAt: new Date().toISOString() });
  }

  markDownloaded(reportId: string): ReportPrintRecord | null {
    return this.patch(reportId, {});
  }

  emailReport(reportId: string): ReportPrintRecord | null {
    return this.patch(reportId, { emailedAt: new Date().toISOString() });
  }

  shareOnWhatsApp(reportId: string): ReportPrintRecord | null {
    return this.patch(reportId, { whatsappSharedAt: new Date().toISOString() });
  }

  getReportHistory(patientId: string): ReportPrintRecord[] {
    return this.reports.filter((entry) => entry.patientId === patientId);
  }

  private patch(reportId: string, partial: Partial<ReportPrintRecord>): ReportPrintRecord | null {
    const report = this.reports.find((entry) => entry.id === reportId);
    if (!report) return null;
    Object.assign(report, partial, { updatedAt: new Date().toISOString() });
    return report;
  }
}
