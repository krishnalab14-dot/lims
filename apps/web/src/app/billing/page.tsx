import { BillingOverview } from '../../components/billing/billing-overview';

export default function BillingPage() {
  return (
    <main>
      <h1>Billing Module</h1>
      <BillingOverview
        invoices={[
          {
            invoiceNumber: 'INV-2026-000101',
            patientId: 'PT-2026-00002',
            packageOrTests: 'Full Body Checkup Package',
            totalAmount: 4720,
            paymentStatus: 'Paid',
          },
          {
            invoiceNumber: 'INV-2026-000102',
            patientId: 'PT-2026-00003',
            packageOrTests: 'CBC + Thyroid Profile',
            totalAmount: 1560,
            paymentStatus: 'Pending',
          },
        ]}
        collection={{
          date: '2026-05-19',
          totalCollected: 32450,
          cash: 10200,
          card: 8450,
          upi: 9900,
          insurance: 3900,
          refunds: 600,
        }}
      />
    </main>
  );
}
