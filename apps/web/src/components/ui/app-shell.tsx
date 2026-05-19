import { ReactNode } from 'react';
import { primaryNavigation } from '../../modules/ui/navigation';

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', gap: 16 }}>
      <aside style={{ padding: 16, borderRight: '1px solid #ddd' }}>
        <h2>LIMS</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {primaryNavigation.map((item) => (
              <li key={item.href} style={{ marginBottom: 8 }}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <section style={{ padding: 16 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{title}</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Search everywhere..." aria-label="Search everywhere" />
            <button type="button">Dark/Light</button>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
