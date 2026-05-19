export interface InventoryItem {
  id: string;
  reagentCode: string;
  reagentName: string;
  batchNumber: string;
  supplierId: string;
  quantityInStock: number;
  reorderLevel: number;
  expiryDate: string;
  unit: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  supplierCode: string;
  supplierName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface PurchaseEntry {
  id: string;
  supplierId: string;
  purchaseDate: string;
  invoiceNumber: string;
  items: Array<{ inventoryId: string; quantity: number; unitPrice: number }>;
  totalAmount: number;
}

export interface StockTransaction {
  id: string;
  inventoryId: string;
  transactionType: 'INWARD' | 'OUTWARD';
  quantity: number;
  reason?: string;
  transactionDate: string;
}
