import { useQuery } from '@tanstack/react-query';
import { testService } from '../services/testService';

export const useTests = (orgId: string, labId: string) => {
  return useQuery({
    queryKey: ['tests', orgId, labId],
    queryFn: () => testService.getTests(orgId, labId),
    enabled: !!orgId && !!labId,
  });
};

export const useTestGroups = (orgId: string, labId: string) => {
  return useQuery({
    queryKey: ['testGroups', orgId, labId],
    queryFn: () => testService.getTestGroups(orgId, labId),
    enabled: !!orgId && !!labId,
  });
};
