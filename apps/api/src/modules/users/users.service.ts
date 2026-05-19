import { LoginActivity, Permission, Role, UserAccount, UserStatus } from './users.types';

export class UsersService {
  private users: UserAccount[] = [];
  private roles: Role[] = [];
  private permissions: Permission[] = [];
  private rolePermissions: Record<string, string[]> = {};
  private loginActivities: LoginActivity[] = [];

  createUser(payload: Omit<UserAccount, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'roleIds'>): UserAccount {
    const now = new Date().toISOString();
    const user: UserAccount = {
      id: `usr-${this.users.length + 1}`,
      ...payload,
      status: 'ACTIVE',
      roleIds: [],
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);
    return user;
  }

  createRole(code: string, name: string): Role {
    const role: Role = { id: `rol-${this.roles.length + 1}`, code, name };
    this.roles.push(role);
    this.rolePermissions[role.id] = [];
    return role;
  }

  createPermission(code: string, name: string): Permission {
    const permission: Permission = { id: `per-${this.permissions.length + 1}`, code, name };
    this.permissions.push(permission);
    return permission;
  }

  assignRole(userId: string, roleId: string): UserAccount | null {
    const user = this.users.find((entry) => entry.id === userId);
    if (!user) return null;
    if (!user.roleIds.includes(roleId)) user.roleIds.push(roleId);
    user.updatedAt = new Date().toISOString();
    return user;
  }

  mapPermissionToRole(roleId: string, permissionId: string): string[] | null {
    const role = this.roles.find((entry) => entry.id === roleId);
    const permission = this.permissions.find((entry) => entry.id === permissionId);
    if (!role || !permission) return null;

    const mapped = this.rolePermissions[roleId] ?? [];
    if (!mapped.includes(permissionId)) mapped.push(permissionId);
    this.rolePermissions[roleId] = mapped;
    return mapped;
  }

  updateUserStatus(userId: string, status: UserStatus): UserAccount | null {
    const user = this.users.find((entry) => entry.id === userId);
    if (!user) return null;
    user.status = status;
    user.updatedAt = new Date().toISOString();
    return user;
  }

  trackLoginActivity(userId: string, success: boolean, ipAddress?: string, userAgent?: string): LoginActivity {
    const activity: LoginActivity = {
      id: `lia-${this.loginActivities.length + 1}`,
      userId,
      success,
      ipAddress,
      userAgent,
      loginAt: new Date().toISOString(),
    };
    this.loginActivities.push(activity);
    return activity;
  }
}
