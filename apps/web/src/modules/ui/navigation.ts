export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavigation: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Patients', href: '/patients' },
  { label: 'Samples', href: '/samples' },
  { label: 'Results', href: '/results' },
  { label: 'Billing', href: '/billing' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Tests', href: '/tests' },
  { label: 'Reports', href: '/report-printing' },
  { label: 'Users', href: '/users' },
  { label: 'Settings', href: '/settings' },
  { label: 'Audit Logs', href: '/audit-logs' },
];
