import { Router, Response } from 'express';
import { AuthRequest } from '../types';
import { testService } from '../services/testService';
import { authMiddleware, checkLabAccess, requireRole } from '../middleware/auth';
import { createAuditContext, auditLog } from '../middleware/audit';
import logger from '../config/logger';

const router = Router({ mergeParams: true });

router.use(authMiddleware);
router.use(checkLabAccess);

router.post('/', requireRole(['LAB_ADMIN']), async (req: AuthRequest, res: Response) => {
  try {
    const { labId } = req.params;
    const { testGroupId, code, name, category, price, normalRange, unit, resultForm } = req.body;

    const test = await testService.createTest(
      labId,
      testGroupId,
      code,
      name,
      category,
      price,
      normalRange,
      unit,
      resultForm
    );

    const auditContext = createAuditContext(req);
    await auditLog(auditContext, 'CREATE', 'Test', test.id, { code, name });

    res.status(201).json(test);
  } catch (error: any) {
    logger.error('Failed to create test:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { labId } = req.params;
    const tests = await testService.getTestsByLab(labId);
    res.json(tests);
  } catch (error: any) {
    logger.error('Failed to fetch tests:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/groups', requireRole(['LAB_ADMIN']), async (req: AuthRequest, res: Response) => {
  try {
    const { labId } = req.params;
    const { name, code, order } = req.body;

    const testGroup = await testService.createTestGroup(labId, name, code, order);

    const auditContext = createAuditContext(req);
    await auditLog(auditContext, 'CREATE', 'TestGroup', testGroup.id, { name, code });

    res.status(201).json(testGroup);
  } catch (error: any) {
    logger.error('Failed to create test group:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/groups', async (req: AuthRequest, res: Response) => {
  try {
    const { labId } = req.params;
    const testGroups = await testService.getTestGroups(labId);
    res.json(testGroups);
  } catch (error: any) {
    logger.error('Failed to fetch test groups:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
