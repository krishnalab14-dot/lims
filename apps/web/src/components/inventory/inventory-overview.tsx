import { InventoryRow, StockTransactionRow } from '../../modules/inventory/types';

export function InventoryOverview({ inventoryRows, transactions }: { inventoryRows: InventoryRow[]; transactions: StockTransactionRow[] }) {
  return (
    <section>
      <h2>Inventory & Stock Management</h2>
      <p>Manage reagent stock, suppliers, purchases, expiry, low-stock alerts, batch tracking, stock inward/outward, and stock reports.</p>

      <h3>Current Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Reagent</th><th>Batch</th><th>Supplier</th><th>Stock</th><th>Reorder</th><th>Expiry</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryRows.map((row) => (
            <tr key={`${row.reagentCode}-${row.batchNumber}`}>
              <td>{row.reagentCode} - {row.reagentName}</td>
              <td>{row.batchNumber}</td>
              <td>{row.supplier}</td>
              <td>{row.quantityInStock}</td>
              <td>{row.reorderLevel}</td>
              <td>{row.expiryDate}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stock Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Reagent</th><th>Type</th><th>Quantity</th><th>Reason</th><th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.transactionId}>
              <td>{tx.transactionId}</td><td>{tx.reagentCode}</td><td>{tx.type}</td><td>{tx.quantity}</td><td>{tx.reason}</td><td>{tx.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
