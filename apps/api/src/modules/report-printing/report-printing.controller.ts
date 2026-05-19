import { ReportPrintingService } from './report-printing.service';

export class ReportPrintingController {
  constructor(private readonly reportPrintingService: ReportPrintingService) {}

  generate(payload: Parameters<ReportPrintingService['generatePdfReport']>[0]) {
    return this.reportPrintingService.generatePdfReport(payload);
  }

  print(reportId: string) {
    return this.reportPrintingService.markPrinted(reportId);
  }

  download(reportId: string) {
    return this.reportPrintingService.markDownloaded(reportId);
  }

  email(reportId: string) {
    return this.reportPrintingService.emailReport(reportId);
  }

  shareWhatsApp(reportId: string) {
    return this.reportPrintingService.shareOnWhatsApp(reportId);
  }

  history(patientId: string) {
    return this.reportPrintingService.getReportHistory(patientId);
  }
}
