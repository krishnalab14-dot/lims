import { Router } from 'express';
import { AuthRequest, authorize } from '@middleware/auth.js';
import { asyncHandler } from '@middleware/errorHandler.js';
import { prisma } from '@config/db.js';
import { cache } from '@config/redis.js';
import { logger } from '@config/logger.js';

const router = Router();

// Get all organizations (SUPERADMIN only)
router.get('/', authorize('SUPERADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const cacheKey = 'orgs:all';
  const cached = await cache.get(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached });
  }

  const organizations = await prisma.organization.findMany({
    include: {
      labs: true,
      patients: { select: { id: true } },
    },
  });

  await cache.set(cacheKey, organizations, 3600);
  res.json({ success: true, data: organizations });
}));

// Create organization
router.post('/', authorize('SUPERADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Organization name required' });
  }

  const org = await prisma.organization.create({
    data: { name },
  });

  await cache.invalidatePattern('orgs:*');
  logger.info(`Organization created: ${name}`);

  res.status(201).json({ success: true, data: org });
}));

// Get organization by ID
router.get('/:orgId', asyncHandler(async (req: AuthRequest, res) => {
  const { orgId } = req.params;

  const cacheKey = `org:${orgId}`;
  const cached = await cache.get(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached });
  }

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      labs: true,
      patients: { select: { id: true } },
    },
  });

  if (!org) {
    return res.status(404).json({ error: 'Organization not found' });
  }

  await cache.set(cacheKey, org, 3600);
  res.json({ success: true, data: org });
}));

// Update organization
router.put('/:orgId', authorize('SUPERADMIN', 'LABADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const { orgId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Organization name required' });
  }

  const org = await prisma.organization.update({
    where: { id: orgId },
    data: { name },
  });

  await cache.del(`org:${orgId}`, 'orgs:all', 'orgs:*');
  logger.info(`Organization updated: ${orgId}`);

  res.json({ success: true, data: org });
}));

export default router;
