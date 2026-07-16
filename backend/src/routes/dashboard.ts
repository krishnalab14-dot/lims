import { Router, Response } from 'express';
import { AuthRequest } from '../types';
import { dashboardService } from '../services/dashboardService';
import { authMiddleware, checkLabAccess } from '../middleware/auth';
import logger from '../config/logger';

const router = Router({ mergeParams: true });

router.use(authMiddleware);
router.use(checkLabAccess);

router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const { labId } = req.params;
    const stats = await dashboardService.getDashboardStats(labId);
    res.json(stats);
  } catch (error: any) {
    logger.error('Failed to fetch dashboard stats:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
