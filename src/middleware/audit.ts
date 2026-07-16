import { Request, Response, NextFunction } from 'express';
import { logger } from '@config/logger.js';
import { prisma } from '@config/db.js';
import { AuditAction } from '@prisma/client';

export interface AuditableRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const auditLog = async (
  organizationId: string,
  labId: string | undefined,
  userId: string | undefined,
  action: AuditAction,
  entity: string,
  entityId: string,
  oldValue?: any,
  newValue?: any,
  ipAddress?: string,
  userAgent?: string
) => {
  try {
    await prisma.auditLog.create({
      data: {
        organizationId,
        labId,
        userId,
        action,
        entity,
        entityId,
        oldValue,
        newValue,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    logger.error('Failed to create audit log:', error);
  }
};

export const auditMiddleware = (req: AuditableRequest, res: Response, next: NextFunction) => {
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  (req as any).audit = {
    ipAddress,
    userAgent,
  };

  next();
};
