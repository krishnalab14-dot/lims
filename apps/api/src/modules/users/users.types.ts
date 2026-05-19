export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';

export interface Role {
  id: string;
  code: string;
  name: string;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
}

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  status: UserStatus;
  roleIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginActivity {
  id: string;
  userId: string;
  loginAt: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
}
