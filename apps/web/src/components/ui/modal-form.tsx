import { ReactNode } from 'react';

export function ModalForm({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ border: '1px solid #bbb', padding: 12, marginTop: 12 }}>
      <h3>{title}</h3>
      {children}
      <div style={{ marginTop: 8 }}><button type="button">Save</button> <button type="button">Cancel</button></div>
    </div>
  );
}
