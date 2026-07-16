import prisma from '../utils/prisma';
import redis, { cacheKeys, cacheTTL } from '../config/redis';
import { CursorPaginationResult } from '../types';
import logger from '../config/logger';

export const sampleService = {
  async createSample(
    labId: string,
    patientId: string,
    sampleType: string,
    tests: string[]
  ) {
    const sample = await prisma.sample.create({
      data: {
        labId,
        sampleId: `S-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        patientId,
        sampleType: sampleType as any,
        tests: {
          create: tests.map((testId) => ({ testId })),
        },
      },
      include: { tests: true, patient: true },
    });

    // Invalidate cache
    await redis.del(cacheKeys.DASHBOARD_STATS(labId));

    return sample;
  },

  async getSamples(
    labId: string,
    limit: number = 50,
    cursor?: string
  ): Promise<CursorPaginationResult<any>> {
    const samples = await prisma.sample.findMany({
      where: { labId },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { patient: true, tests: { include: { test: true } } },
    });

    const hasMore = samples.length > limit;
    const data = hasMore ? samples.slice(0, -1) : samples;

    return {
      data,
      nextCursor: hasMore ? data[data.length - 1]?.id : undefined,
      hasMore,
      count: data.length,
    };
  },

  async updateSampleStatus(sampleId: string, status: string) {
    const sample = await prisma.sample.findUnique({ where: { id: sampleId } });
    if (!sample) throw new Error('Sample not found');

    const updated = await prisma.sample.update({
      where: { id: sampleId },
      data: {
        status: status as any,
        processedDate: status === 'PROCESSING' ? new Date() : undefined,
        completedDate: status === 'COMPLETED' ? new Date() : undefined,
      },
      include: { tests: true, patient: true },
    });

    // Invalidate cache
    await redis.del(cacheKeys.DASHBOARD_STATS(sample.labId));

    return updated;
  },

  async getSampleById(sampleId: string) {
    return prisma.sample.findUnique({
      where: { id: sampleId },
      include: {
        patient: true,
        tests: {
          include: { test: true },
        },
        assignedUser: true,
      },
    });
  },
};
