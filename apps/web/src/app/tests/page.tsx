import { TestManagementOverview } from '../../components/tests/test-management-overview';

export default function TestsPage() {
  return (
    <main>
      <h1>Test Management Module</h1>
      <TestManagementOverview
        departments={[
          { code: 'HEM', name: 'Hematology' },
          { code: 'BIO', name: 'Biochemistry' },
        ]}
        tests={[
          {
            testCode: 'CBC-001',
            testName: 'Complete Blood Count',
            category: 'Hematology Routine',
            department: 'Hematology',
            unit: '10^3/µL',
            referenceRange: '4.5 - 11.0',
            normalValue: '7.5',
            price: 450,
          },
          {
            testCode: 'TSH-101',
            testName: 'Thyroid Stimulating Hormone',
            category: 'Endocrine Panel',
            department: 'Biochemistry',
            unit: 'µIU/mL',
            referenceRange: '0.4 - 4.0',
            normalValue: '2.5',
            price: 900,
          },
        ]}
      />
    </main>
  );
}
