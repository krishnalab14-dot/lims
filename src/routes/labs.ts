import { Router } from 'express';
import { AuthRequest, authorize } from '@middleware/auth.js';
import { asyncHandler } from '@middleware/errorHandler.js';
import { prisma } from '@config/db.js';
import { cache } from '@config/redis.js';
import { logger } from '@config/logger.js';

const router = Router();

// Get all labs in organization
router.get('/:orgId/labs', asyncHandler(async (req: AuthRequest, res) => {
  const { orgId } = req.params;

  const cacheKey = `org:${orgId}:labs`;
  const cached = await cache.get(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached });
  }

  const labs = await prisma.lab.findMany({
    where: { organizationId: orgId },
    include: {
      users: { select: { id: true, email: true, role: true } },
      samples: { select: { id: true } },
    },
  });

  await cache.set(cacheKey, labs, 1800);
  res.json({ success: true, data: labs });
}));

// Create lab
router.post('/:orgId/labs', authorize('SUPERADMIN', 'LABADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const { orgId } = req.params;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Lab name required' });
  }

  // Verify organization exists
  const org = await prisma.organization.findUnique({ where: { id: orgId } });
  if (!org) {
    return res.status(404).json({ error: 'Organization not found' });
  }

  const lab = await prisma.lab.create({
    data: {
      organizationId: orgId,
      name,
      description,
    },
  });

  await cache.invalidatePattern(`org:${orgId}:labs*`);
  logger.info(`Lab created: ${name} in org ${orgId}`);

  res.status(201).json({ success: true, data: lab });
}));

// Get lab by ID
router.get('/:orgId/labs/:labId', asyncHandler(async (req: AuthRequest, res) => {
  const { orgId, labId } = req.params;

  const cacheKey = `lab:${labId}`;
  const cached = await cache.get(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached });
  }

  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    include: {
      users: { select: { id: true, email: true, role: true, firstName: true, lastName: true } },
      samples: { select: { id: true, status: true } },
      workflows: true,
      testGroups: { include: { tests: true } },
    },
  });

  if (!lab || lab.organizationId !== orgId) {
    return res.status(404).json({ error: 'Lab not found' });
  }

  await cache.set(cacheKey, lab, 1800);
  res.json({ success: true, data: lab });
}));

// Update lab
router.put('/:orgId/labs/:labId', authorize('SUPERADMIN', 'LABADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const { orgId, labId } = req.params;
  const { name, description, isActive } = req.body;

  const lab = await prisma.lab.update({
    where: { id: labId },
    data: { name, description, isActive },
  });

  if (lab.organizationId !== orgId) {
    return res.status(403).json({ error: 'Lab does not belong to this organization' });
  }

  await cache.del(`lab:${labId}`, `org:${orgId}:labs`);
  logger.info(`Lab updated: ${labId}`);

  res.json({ success: true, data: lab });
}));

export default router;
