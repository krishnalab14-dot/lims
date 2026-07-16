import prisma from '../utils/prisma';
import redis, { cacheKeys, cacheTTL } from '../config/redis';
import logger from '../config/logger';

export const testService = {
  async createTest(
    labId: string,
    testGroupId: string | null,
    code: string,
    name: string,
    category: string,
    price: number,
    normalRange?: string,
    unit?: string,
    resultForm?: any
  ) {
    const test = await prisma.test.create({
      data: {
        code,
        name,
        category,
        price,
        normalRange,
        unit,
        resultForm,
        testGroupId,
      },
    });

    await redis.del(cacheKeys.TEST_CATALOG(labId));
    return test;
  },

  async getTestsByLab(labId: string) {
    const cacheKey = cacheKeys.TEST_CATALOG(labId);
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const tests = await prisma.test.findMany({
      where: {
        testGroup: {
          labId,
        },
      },
      include: { testGroup: true },
    });

    await redis.setex(cacheKey, cacheTTL.TEST_CATALOG, JSON.stringify(tests));
    return tests;
  },

  async createTestGroup(
    labId: string,
    name: string,
    code: string,
    order: number = 0
  ) {
    const testGroup = await prisma.testGroup.create({
      data: {
        labId,
        name,
        code,
        order,
      },
    });

    await redis.del(cacheKeys.TEST_CATALOG(labId));
    return testGroup;
  },

  async getTestGroups(labId: string) {
    return prisma.testGroup.findMany({
      where: { labId },
      include: { tests: true },
      orderBy: { order: 'asc' },
    });
  },
};
