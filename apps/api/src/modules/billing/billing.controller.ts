import { BillingService } from './billing.service';

export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  createInvoice(payload: Parameters<BillingService['createInvoice']>[0]) {
    return this.billingService.createInvoice(payload);
  }

  collectPayment(invoiceId: string, method: 'CASH' | 'CARD' | 'UPI' | 'INSURANCE', amount: number, referenceNumber?: string) {
    return this.billingService.recordPayment(invoiceId, method, amount, referenceNumber);
  }

  refund(paymentId: string) {
    return this.billingService.refundPayment(paymentId);
  }
}
