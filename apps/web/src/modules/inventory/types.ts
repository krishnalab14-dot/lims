export interface InventoryRow {
  reagentCode: string;
  reagentName: string;
  batchNumber: string;
  supplier: string;
  quantityInStock: number;
  reorderLevel: number;
  expiryDate: string;
  status: 'OK' | 'Low Stock' | 'Expiring Soon';
}

export interface StockTransactionRow {
  transactionId: string;
  reagentCode: string;
  type: 'Inward' | 'Outward';
  quantity: number;
  reason: string;
  dateTime: string;
}
