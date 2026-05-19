import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  createUser(payload: Parameters<UsersService['createUser']>[0]) {
    return this.usersService.createUser(payload);
  }

  createRole(code: string, name: string) {
    return this.usersService.createRole(code, name);
  }

  createPermission(code: string, name: string) {
    return this.usersService.createPermission(code, name);
  }

  assignRole(userId: string, roleId: string) {
    return this.usersService.assignRole(userId, roleId);
  }

  mapPermission(roleId: string, permissionId: string) {
    return this.usersService.mapPermissionToRole(roleId, permissionId);
  }

  changeStatus(userId: string, status: 'ACTIVE' | 'INACTIVE' | 'LOCKED') {
    return this.usersService.updateUserStatus(userId, status);
  }

  loginActivity(userId: string, success: boolean, ipAddress?: string, userAgent?: string) {
    return this.usersService.trackLoginActivity(userId, success, ipAddress, userAgent);
  }
}
