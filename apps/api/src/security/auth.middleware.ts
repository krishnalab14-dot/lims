import { AuthenticatedRequestContext } from './security.types';

export function authenticationMiddleware(authHeader?: string): AuthenticatedRequestContext {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  return {
    userId: 'demo-user',
    roles: ['ADMIN'],
    permissions: ['PATIENT_VIEW', 'RESULT_ENTRY'],
  };
}

export function authorizationMiddleware(context: AuthenticatedRequestContext, requiredPermission: string): void {
  if (!context.permissions.includes(requiredPermission)) {
    throw new Error('Forbidden');
  }
}
