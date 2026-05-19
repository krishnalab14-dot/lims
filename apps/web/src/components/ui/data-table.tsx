import { ReactNode } from 'react';

export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <table>
      <thead>
        <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => <tr key={i}>{row.map((cell, idx) => <td key={idx}>{cell}</td>)}</tr>)}
      </tbody>
    </table>
  );
}
