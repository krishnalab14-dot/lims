import { ReportHistoryRow } from '../../modules/report-printing/types';

export function ReportPrintingOverview({ reports }: { reports: ReportHistoryRow[] }) {
  return (
    <section>
      <h2>Report Printing</h2>
      <p>Supports PDF generation, branding/logo, doctor signature, QR verification, print/download, email, WhatsApp sharing, and report history.</p>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Patient</th>
            <th>Test Result</th>
            <th>Doctor</th>
            <th>Logo</th>
            <th>Signature</th>
            <th>QR Verify</th>
            <th>Generated At</th>
            <th>Channels</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.reportId}>
              <td>{report.reportId}</td>
              <td>{report.patientId}</td>
              <td>{report.testResultId}</td>
              <td>{report.doctorName}</td>
              <td>{report.hasLogo ? 'Yes' : 'No'}</td>
              <td>{report.hasSignature ? 'Yes' : 'No'}</td>
              <td>{report.qrVerificationValue}</td>
              <td>{report.generatedAt}</td>
              <td>{report.deliveryChannels.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
