import { ResultEntryOverview } from '../../components/results/result-entry-overview';

export default function ResultsPage() {
  return (
    <main>
      <h1>Laboratory Result Entry Module</h1>
      <ResultEntryOverview
        entries={[
          {
            resultId: 'RES-2026-00031',
            sampleId: 'SMP-2026-000101',
            patientId: 'PT-2026-00002',
            testCode: 'CBC-001',
            technician: 'tech.jane',
            doctor: 'dr.smith',
            status: 'Verified',
            remarks: 'Reviewed and verified',
            attachmentsCount: 1,
          },
          {
            resultId: 'RES-2026-00032',
            sampleId: 'SMP-2026-000102',
            patientId: 'PT-2026-00003',
            testCode: 'TSH-101',
            technician: 'tech.mike',
            status: 'In Progress',
            remarks: 'Awaiting second parameter entry',
            attachmentsCount: 0,
          },
        ]}
        parameters={[
          { parameterName: 'WBC', value: '12.4', unit: '10^3/µL', referenceRange: '4.5 - 11.0', abnormalFlag: 'Abnormal' },
          { parameterName: 'RBC', value: '5.0', unit: '10^6/µL', referenceRange: '4.2 - 5.8', abnormalFlag: 'Normal' },
        ]}
      />
    </main>
  );
}
