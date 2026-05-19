import { SampleCollectionOverview } from '../../components/samples/sample-collection-overview';

export default function SamplesPage() {
  return (
    <main>
      <h1>Sample Collection Module</h1>
      <SampleCollectionOverview
        rows={[
          {
            sampleBarcode: 'SMP-2026-000101',
            patientId: 'PT-2026-00002',
            testCode: 'CBC-001',
            collectionStatus: 'Collected',
            transferStatus: 'In Transit',
            collectedAt: '2026-05-19T09:10:00Z',
          },
          {
            sampleBarcode: 'SMP-2026-000102',
            patientId: 'PT-2026-00003',
            testCode: 'TSH-101',
            collectionStatus: 'Rejected',
            transferStatus: 'Not Transferred',
            collectedAt: '2026-05-19T09:45:00Z',
            rejectionReason: 'Insufficient sample volume',
          },
        ]}
      />
    </main>
  );
}
