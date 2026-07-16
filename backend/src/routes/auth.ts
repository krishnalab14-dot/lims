import { Router, Response } from 'express';
import { AuthRequest } from '../types';
import { authService } from '../services/authService';
import { loginLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/auth';
import logger from '../config/logger';

const router = Router();

router.post('/login', loginLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    logger.error('Login failed:', error);
    res.status(401).json({ error: error.message });
  }
});

router.post('/refresh', async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const tokens = await authService.refreshToken(refreshToken);
    res.json(tokens);
  } catch (error: any) {
    logger.error('Token refresh failed:', error);
    res.status(401).json({ error: error.message });
  }
});

router.post('/logout', authMiddleware, (req: AuthRequest, res: Response) => {
  // Token invalidation can be handled by client-side removal
  res.json({ message: 'Logged out successfully' });
});

export default router;
