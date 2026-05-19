export type PaymentMethod = 'Cash' | 'Card' | 'UPI' | 'Insurance';

export interface InvoiceRow {
  invoiceNumber: string;
  patientId: string;
  packageOrTests: string;
  totalAmount: number;
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Refunded';
}

export interface CollectionSnapshot {
  date: string;
  totalCollected: number;
  cash: number;
  card: number;
  upi: number;
  insurance: number;
  refunds: number;
}
