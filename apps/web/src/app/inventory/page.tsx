import { InventoryOverview } from '../../components/inventory/inventory-overview';

export default function InventoryPage() {
  return (
    <main>
      <h1>Inventory & Stock Management Module</h1>
      <InventoryOverview
        inventoryRows={[
          { reagentCode: 'RG-CBC-01', reagentName: 'CBC Reagent A', batchNumber: 'BCH-7781', supplier: 'MediChem Supplies', quantityInStock: 18, reorderLevel: 20, expiryDate: '2026-06-10', status: 'Low Stock' },
          { reagentCode: 'RG-TSH-05', reagentName: 'TSH Kit Buffer', batchNumber: 'BCH-8022', supplier: 'LabSource Pvt Ltd', quantityInStock: 64, reorderLevel: 15, expiryDate: '2026-12-01', status: 'OK' },
        ]}
        transactions={[
          { transactionId: 'STX-2026-0091', reagentCode: 'RG-CBC-01', type: 'Inward', quantity: 50, reason: 'Purchase PO-5521', dateTime: '2026-05-19T08:40:00Z' },
          { transactionId: 'STX-2026-0092', reagentCode: 'RG-CBC-01', type: 'Outward', quantity: 32, reason: 'Consumed in CBC processing', dateTime: '2026-05-19T12:15:00Z' },
        ]}
      />
    </main>
  );
}
