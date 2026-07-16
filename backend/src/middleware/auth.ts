import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';
import logger from '../config/logger';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

export const checkLabAccess = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { labId } = req.params;
  
  if (req.user?.role === 'SUPER_ADMIN') {
    return next();
  }

  if (req.user?.labId !== labId && req.user?.role !== 'LAB_ADMIN') {
    return res.status(403).json({ error: 'No access to this lab' });
  }

  next();
};
