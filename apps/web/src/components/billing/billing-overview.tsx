import { CollectionSnapshot, InvoiceRow } from '../../modules/billing/types';

export function BillingOverview({ invoices, collection }: { invoices: InvoiceRow[]; collection: CollectionSnapshot }) {
  return (
    <section>
      <h2>Billing & Transactions</h2>
      <p>Daily collection ({collection.date}): ₹{collection.totalCollected.toFixed(2)}</p>
      <p>
        Cash: ₹{collection.cash.toFixed(2)} | Card: ₹{collection.card.toFixed(2)} | UPI: ₹{collection.upi.toFixed(2)} |
        Insurance: ₹{collection.insurance.toFixed(2)} | Refunds: ₹{collection.refunds.toFixed(2)}
      </p>
      <table>
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Patient</th>
            <th>Package/Tests</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.patientId}</td>
              <td>{invoice.packageOrTests}</td>
              <td>₹{invoice.totalAmount.toFixed(2)}</td>
              <td>{invoice.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Supports invoice generation, GST/tax, discounts, payment status tracking, refunds, and invoice printing flows.</p>
    </section>
  );
}
