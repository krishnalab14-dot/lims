import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { Role, JwtPayload } from '../types';
import logger from '../config/logger';

export const authService = {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { lab: true },
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const passwordValid = await bcryptjs.compare(password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    const tokens = this.generateTokens(user);
    
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    logger.info(`User ${email} logged in successfully`);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        labId: user.labId,
      },
      ...tokens,
    };
  },

  generateTokens(user: any) {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      labId: user.labId,
      organizationId: user.lab?.organizationId,
      role: user.role as Role,
      iat: Date.now(),
      exp: 0,
    };

    const accessToken = jwt.sign(
      { ...payload, exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRY || '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
    );

    return { accessToken, refreshToken };
  },

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { lab: true },
      });

      if (!user || !user.isActive) {
        throw new Error('User not found');
      }

      return this.generateTokens(user);
    } catch (error) {
      logger.error('Token refresh failed:', error);
      throw new Error('Invalid refresh token');
    }
  },

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    labId: string,
    role: Role = Role.TECHNICIAN
  ) {
    const hashedPassword = await bcryptjs.hash(password, Number(process.env.BCRYPT_ROUNDS) || 10);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        labId,
        role,
      },
    });
  },
};