import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';

export const useDashboardStats = (orgId: string, labId: string) => {
  return useQuery({
    queryKey: ['dashboardStats', orgId, labId],
    queryFn: () => dashboardService.getDashboardStats(orgId, labId),
    enabled: !!orgId && !!labId,
    refetchInterval: 30000,
  });
};
