import apiClient from './api';

export const dashboardService = {
  async getDashboardStats(orgId: string, labId: string) {
    const response = await apiClient.get(
      `/organizations/${orgId}/labs/${labId}/dashboard/stats`
    );
    return response.data;
  },
};
