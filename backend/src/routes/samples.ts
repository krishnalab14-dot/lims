import { Router, Response } from 'express';
import { AuthRequest } from '../types';
import { sampleService } from '../services/sampleService';
import { authMiddleware, checkLabAccess, requireRole } from '../middleware/auth';
import { createAuditContext, auditLog } from '../middleware/audit';
import { searchLimiter } from '../middleware/rateLimiter';
import logger from '../config/logger';

const router = Router({ mergeParams: true });

router.use(authMiddleware);
router.use(checkLabAccess);

router.post('/', requireRole(['LAB_ADMIN', 'TECHNICIAN']), async (req: AuthRequest, res: Response) => {
  try {
    const { orgId, labId } = req.params;
    const { patientId, sampleType, tests } = req.body;

    const sample = await sampleService.createSample(
      labId,
      patientId,
      sampleType,
      tests || []
    );

    const auditContext = createAuditContext(req);
    await auditLog(auditContext, 'CREATE', 'Sample', sample.id, { sampleType });

    res.status(201).json(sample);
  } catch (error: any) {
    logger.error('Failed to create sample:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', searchLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { labId } = req.params;
    const { limit = 50, cursor } = req.query;

    const result = await sampleService.getSamples(
      labId,
      Math.min(Number(limit), 500),
      cursor as string | undefined
    );

    res.json(result);
  } catch (error: any) {
    logger.error('Failed to fetch samples:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:sampleId', async (req: AuthRequest, res: Response) => {
  try {
    const { sampleId } = req.params;

    const sample = await sampleService.getSampleById(sampleId);
    if (!sample) {
      return res.status(404).json({ error: 'Sample not found' });
    }

    const auditContext = createAuditContext(req);
    await auditLog(auditContext, 'READ', 'Sample', sampleId);

    res.json(sample);
  } catch (error: any) {
    logger.error('Failed to fetch sample:', error);
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:sampleId', requireRole(['LAB_ADMIN', 'PATHOLOGIST']), async (req: AuthRequest, res: Response) => {
  try {
    const { sampleId } = req.params;
    const { status } = req.body;

    const sample = await sampleService.updateSampleStatus(sampleId, status);

    const auditContext = createAuditContext(req);
    await auditLog(auditContext, 'UPDATE', 'Sample', sampleId, { status });

    res.json(sample);
  } catch (error: any) {
    logger.error('Failed to update sample:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
