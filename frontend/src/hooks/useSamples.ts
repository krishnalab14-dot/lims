import { useQuery } from '@tanstack/react-query';
import { sampleService } from '../services/sampleService';

export const useSamples = (
  orgId: string,
  labId: string,
  limit: number = 50,
  cursor?: string
) => {
  return useQuery({
    queryKey: ['samples', orgId, labId, cursor],
    queryFn: () => sampleService.getSamples(orgId, labId, limit, cursor),
    enabled: !!orgId && !!labId,
  });
};

export const useSample = (orgId: string, labId: string, sampleId: string) => {
  return useQuery({
    queryKey: ['sample', orgId, labId, sampleId],
    queryFn: () => sampleService.getSampleById(orgId, labId, sampleId),
    enabled: !!orgId && !!labId && !!sampleId,
  });
};
