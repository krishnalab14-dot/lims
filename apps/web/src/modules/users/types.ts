export interface UserRow {
  username: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Locked';
  roles: string[];
}

export interface PermissionMapRow {
  role: string;
  permissions: string[];
}

export interface LoginActivityRow {
  username: string;
  success: boolean;
  ipAddress: string;
  userAgent: string;
  loginAt: string;
}
