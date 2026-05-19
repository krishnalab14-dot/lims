export const ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'RECEPTIONIST',
  'LAB_TECHNICIAN',
  'DOCTOR',
  'ACCOUNTANT',
  'STORE_MANAGER',
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = {
  USERS_MANAGE: 'users.manage',
  ROLES_MANAGE: 'roles.manage',
  SAMPLES_CREATE: 'samples.create',
  SAMPLES_UPDATE: 'samples.update',
  RESULTS_APPROVE: 'results.approve',
  BILLING_MANAGE: 'billing.manage',
  INVENTORY_MANAGE: 'inventory.manage',
  AUDIT_VIEW: 'audit.view',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSION_MATRIX: Record<Role, Permission[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  ADMIN: [
    PERMISSIONS.USERS_MANAGE,
    PERMISSIONS.SAMPLES_CREATE,
    PERMISSIONS.SAMPLES_UPDATE,
    PERMISSIONS.AUDIT_VIEW,
  ],
  RECEPTIONIST: [PERMISSIONS.SAMPLES_CREATE],
  LAB_TECHNICIAN: [PERMISSIONS.SAMPLES_UPDATE],
  DOCTOR: [PERMISSIONS.RESULTS_APPROVE],
  ACCOUNTANT: [PERMISSIONS.BILLING_MANAGE],
  STORE_MANAGER: [PERMISSIONS.INVENTORY_MANAGE],
};
