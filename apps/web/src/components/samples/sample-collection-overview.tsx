import { SampleCollectionRow } from '../../modules/samples/types';

export function SampleCollectionOverview({ rows }: { rows: SampleCollectionRow[] }) {
  return (
    <section>
      <h2>Sample Collection</h2>
      <p>Manage sample collection entries, barcode generation, tracking, transfer status, and rejection handling.</p>

      <table>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Patient</th>
            <th>Test</th>
            <th>Collection Status</th>
            <th>Transfer Status</th>
            <th>Collection Date/Time</th>
            <th>Rejection Reason</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.sampleBarcode}>
              <td>{row.sampleBarcode}</td>
              <td>{row.patientId}</td>
              <td>{row.testCode}</td>
              <td>{row.collectionStatus}</td>
              <td>{row.transferStatus}</td>
              <td>{row.collectedAt}</td>
              <td>{row.rejectionReason ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
