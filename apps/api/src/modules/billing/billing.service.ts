import { CreateInvoiceInput, Invoice, Payment, PaymentMethod, PaymentStatus } from './billing.types';

export class BillingService {
  private invoices: Invoice[] = [];
  private payments: Payment[] = [];

  private generateInvoiceNumber(): string {
    return `INV-${new Date().getUTCFullYear()}-${String(this.invoices.length + 1).padStart(6, '0')}`;
  }

  createInvoice(input: CreateInvoiceInput): Invoice {
    const subTotal = input.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const itemDiscount = input.items.reduce((sum, item) => sum + (item.discountAmount ?? 0), 0);
    const discountAmount = (input.discountAmount ?? 0) + itemDiscount;
    const taxableAmount = Math.max(subTotal - discountAmount, 0);
    const taxRate = input.taxRatePercent ?? 0;
    const taxAmount = (taxableAmount * taxRate) / 100;

    const invoice: Invoice = {
      id: `inv-${this.invoices.length + 1}`,
      invoiceNumber: this.generateInvoiceNumber(),
      patientId: input.patientId,
      visitId: input.visitId,
      packageName: input.packageName,
      subTotal,
      discountAmount,
      taxAmount,
      totalAmount: taxableAmount + taxAmount,
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.invoices.push(invoice);
    return invoice;
  }

  recordPayment(invoiceId: string, method: PaymentMethod, amount: number, referenceNumber?: string): Payment | null {
    const invoice = this.invoices.find((entry) => entry.id === invoiceId);
    if (!invoice) return null;

    const payment: Payment = {
      id: `pay-${this.payments.length + 1}`,
      invoiceId,
      method,
      amount,
      status: 'PAID',
      referenceNumber,
      createdAt: new Date().toISOString(),
    };
    this.payments.push(payment);

    const paidAmount = this.payments
      .filter((entry) => entry.invoiceId === invoiceId && entry.status !== 'FAILED')
      .reduce((sum, entry) => sum + entry.amount, 0);

    invoice.paymentStatus = this.derivePaymentStatus(invoice.totalAmount, paidAmount);
    return payment;
  }

  refundPayment(paymentId: string): Payment | null {
    const payment = this.payments.find((entry) => entry.id === paymentId);
    if (!payment) return null;
    payment.status = 'REFUNDED';

    const invoice = this.invoices.find((entry) => entry.id === payment.invoiceId);
    if (invoice) invoice.paymentStatus = 'REFUNDED';

    return payment;
  }

  dailyCollection(dateIso: string): { date: string; totalCollected: number; paymentCount: number } {
    const date = dateIso.slice(0, 10);
    const todayPayments = this.payments.filter(
      (entry) => entry.createdAt.slice(0, 10) === date && entry.status === 'PAID',
    );

    return {
      date,
      totalCollected: todayPayments.reduce((sum, entry) => sum + entry.amount, 0),
      paymentCount: todayPayments.length,
    };
  }

  private derivePaymentStatus(totalAmount: number, paidAmount: number): PaymentStatus {
    if (paidAmount <= 0) return 'PENDING';
    if (paidAmount < totalAmount) return 'PARTIAL';
    return 'PAID';
  }
}
