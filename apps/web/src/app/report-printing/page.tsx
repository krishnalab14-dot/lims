import { ReportPrintingOverview } from '../../components/report-printing/report-printing-overview';

export default function ReportPrintingPage() {
  return (
    <main>
      <h1>Report Printing Module</h1>
      <ReportPrintingOverview
        reports={[
          {
            reportId: 'RPT-2026-00041',
            patientId: 'PT-2026-00002',
            testResultId: 'RES-2026-00031',
            doctorName: 'Dr. Smith',
            hasLogo: true,
            hasSignature: true,
            qrVerificationValue: 'lims://verify/report/rpt-41',
            generatedAt: '2026-05-19T10:15:00Z',
            deliveryChannels: ['Print', 'Download', 'Email'],
          },
          {
            reportId: 'RPT-2026-00042',
            patientId: 'PT-2026-00003',
            testResultId: 'RES-2026-00032',
            doctorName: 'Dr. Jane',
            hasLogo: true,
            hasSignature: false,
            qrVerificationValue: 'lims://verify/report/rpt-42',
            generatedAt: '2026-05-19T11:05:00Z',
            deliveryChannels: ['Download', 'WhatsApp'],
          },
        ]}
      />
    </main>
  );
}
