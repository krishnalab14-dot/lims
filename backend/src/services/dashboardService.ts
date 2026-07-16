import prisma from '../utils/prisma';
import redis, { cacheKeys, cacheTTL } from '../config/redis';

export const dashboardService = {
  async getDashboardStats(labId: string) {
    const cacheKey = cacheKeys.DASHBOARD_STATS(labId);
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const [totalSamples, pendingSamples, completedToday, avgProcessingTime] =
      await Promise.all([
        prisma.sample.count({ where: { labId } }),
        prisma.sample.count({
          where: { labId, status: { in: ['PENDING_COLLECTION', 'RECEIVED'] } },
        }),
        prisma.sample.count({
          where: {
            labId,
            status: 'COMPLETED',
            completedDate: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        }),
        prisma.sample.findMany({
          where: {
            labId,
            status: 'COMPLETED',
            receivedDate: { not: null },
            completedDate: { not: null },
          },
          select: {
            receivedDate: true,
            completedDate: true,
          },
          take: 100,
        }),
      ]);

    const avgProcessing =
      avgProcessingTime.length > 0
        ? avgProcessingTime.reduce((acc, s) => {
            const diff =
              (s.completedDate!.getTime() - s.receivedDate!.getTime()) / (1000 * 60);
            return acc + diff;
          }, 0) / avgProcessingTime.length
        : 0;

    const stats = {
      totalSamples,
      pendingSamples,
      completedToday,
      avgProcessingTime: Math.round(avgProcessing),
      timestamp: new Date(),
    };

    await redis.setex(cacheKey, cacheTTL.DASHBOARD_STATS, JSON.stringify(stats));
    return stats;
  },
};
