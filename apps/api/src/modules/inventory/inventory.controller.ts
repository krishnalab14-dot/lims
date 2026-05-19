import { InventoryService } from './inventory.service';

export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  createSupplier(payload: Parameters<InventoryService['createSupplier']>[0]) {
    return this.inventoryService.createSupplier(payload);
  }

  createInventoryItem(payload: Parameters<InventoryService['createInventoryItem']>[0]) {
    return this.inventoryService.createInventoryItem(payload);
  }

  createPurchase(payload: Parameters<InventoryService['recordPurchase']>[0]) {
    return this.inventoryService.recordPurchase(payload);
  }

  stockOutward(inventoryId: string, quantity: number, reason: string) {
    return this.inventoryService.recordStockOutward(inventoryId, quantity, reason);
  }

  lowStockAlerts() {
    return this.inventoryService.getLowStockAlerts();
  }

  stockReport() {
    return this.inventoryService.getStockReport();
  }
}
