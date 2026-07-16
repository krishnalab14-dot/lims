import { Router } from 'express';
import { AuthRequest, authorize } from '@middleware/auth.js';
import { asyncHandler } from '@middleware/errorHandler.js';
import { prisma } from '@config/db.js';
import bcryptjs from 'bcryptjs';
import { jwtConfig } from '@config/jwt.js';
import { logger } from '@config/logger.js';

const router = Router();

// Register
router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    },
  });

  const accessToken = jwtConfig.generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = jwtConfig.generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  logger.info(`User registered: ${email}`);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken,
      refreshToken,
    },
  });
}));

// Login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    logger.warn(`Login attempt with non-existent email: ${email}`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    logger.warn(`Failed login attempt for: ${email}`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = jwtConfig.generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    labId: user.labId || undefined,
  });

  const refreshToken = jwtConfig.generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    labId: user.labId || undefined,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  logger.info(`User logged in: ${email}`);

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        labId: user.labId,
      },
      accessToken,
      refreshToken,
    },
  });
}));

// Refresh token
router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  const payload = jwtConfig.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(401).json({ error: 'Refresh token not found' });
  }

  const newAccessToken = jwtConfig.generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    labId: user.labId || undefined,
  });

  const newRefreshToken = jwtConfig.generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    labId: user.labId || undefined,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newRefreshToken },
  });

  res.json({
    success: true,
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
}));

// Logout
router.post('/logout', asyncHandler(async (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  await prisma.user.update({
    where: { id: req.user.userId },
    data: { refreshToken: null },
  });

  logger.info(`User logged out: ${req.user.email}`);

  res.json({ success: true, message: 'Logged out successfully' });
}));

export default router;
