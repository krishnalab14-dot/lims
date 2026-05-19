import { InventoryItem, PurchaseEntry, StockTransaction, Supplier } from './inventory.types';

export class InventoryService {
  private inventory: InventoryItem[] = [];
  private suppliers: Supplier[] = [];
  private purchases: PurchaseEntry[] = [];
  private stockTransactions: StockTransaction[] = [];

  createSupplier(payload: Omit<Supplier, 'id'>): Supplier {
    const supplier: Supplier = { id: `sup-${this.suppliers.length + 1}`, ...payload };
    this.suppliers.push(supplier);
    return supplier;
  }

  createInventoryItem(payload: Omit<InventoryItem, 'id' | 'updatedAt'>): InventoryItem {
    const item: InventoryItem = { id: `inv-${this.inventory.length + 1}`, ...payload, updatedAt: new Date().toISOString() };
    this.inventory.push(item);
    return item;
  }

  recordPurchase(payload: Omit<PurchaseEntry, 'id' | 'totalAmount'>): PurchaseEntry {
    const totalAmount = payload.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const purchase: PurchaseEntry = { id: `pur-${this.purchases.length + 1}`, ...payload, totalAmount };
    this.purchases.push(purchase);

    payload.items.forEach((entry) => this.applyStock(entry.inventoryId, 'INWARD', entry.quantity, 'Purchase entry'));
    return purchase;
  }

  recordStockOutward(inventoryId: string, quantity: number, reason: string): StockTransaction | null {
    const item = this.inventory.find((entry) => entry.id === inventoryId);
    if (!item || item.quantityInStock < quantity) return null;
    return this.applyStock(inventoryId, 'OUTWARD', quantity, reason);
  }

  getLowStockAlerts(): InventoryItem[] {
    return this.inventory.filter((item) => item.quantityInStock <= item.reorderLevel);
  }

  getStockReport(): { totalItems: number; lowStockCount: number; expiringSoonCount: number } {
    const now = new Date();
    const in30Days = new Date(now);
    in30Days.setUTCDate(now.getUTCDate() + 30);

    return {
      totalItems: this.inventory.length,
      lowStockCount: this.getLowStockAlerts().length,
      expiringSoonCount: this.inventory.filter((item) => {
        const expiry = new Date(item.expiryDate);
        return expiry >= now && expiry <= in30Days;
      }).length,
    };
  }

  private applyStock(inventoryId: string, transactionType: 'INWARD' | 'OUTWARD', quantity: number, reason?: string): StockTransaction | null {
    const item = this.inventory.find((entry) => entry.id === inventoryId);
    if (!item) return null;

    item.quantityInStock += transactionType === 'INWARD' ? quantity : -quantity;
    item.updatedAt = new Date().toISOString();

    const transaction: StockTransaction = {
      id: `stx-${this.stockTransactions.length + 1}`,
      inventoryId,
      transactionType,
      quantity,
      reason,
      transactionDate: new Date().toISOString(),
    };
    this.stockTransactions.push(transaction);
    return transaction;
  }
}
