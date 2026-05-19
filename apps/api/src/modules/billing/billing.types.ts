export type PaymentMethod = 'CASH' | 'CARD' | 'UPI' | 'INSURANCE';
export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED' | 'FAILED';

export interface InvoiceItemInput {
  testCode: string;
  testName: string;
  quantity: number;
  unitPrice: number;
  discountAmount?: number;
  taxRatePercent?: number;
}

export interface CreateInvoiceInput {
  patientId: string;
  visitId?: string;
  packageName?: string;
  items: InvoiceItemInput[];
  discountAmount?: number;
  taxRatePercent?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  visitId?: string;
  packageName?: string;
  subTotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  referenceNumber?: string;
  createdAt: string;
}
