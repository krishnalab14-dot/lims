import { Request, Response, NextFunction } from 'express';
import { AuthRequest, AuditContext } from '../types';
import prisma from '../utils/prisma';
import logger from '../config/logger';

export const createAuditContext = (req: AuthRequest): AuditContext => {
  return {
    userId: req.user?.userId || 'ANONYMOUS',
    labId: req.user?.labId,
    organizationId: req.user?.organizationId || '',
    ipAddress: req.ip || 'UNKNOWN',
    userAgent: req.get('user-agent') || 'UNKNOWN',
  };
};

export const auditLog = async (
  context: AuditContext,
  action: string,
  entityType: string,
  entityId: string | null,
  details: Record<string, any> = {}
) => {
  try {
    await prisma.auditLog.create({
      data: {
        organizationId: context.organizationId,
        labId: context.labId,
        userId: context.userId,
        action: action as any,
        entityType,
        entityId,
        details,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
      },
    });
  } catch (error) {
    logger.error('Failed to create audit log:', error);
  }
};