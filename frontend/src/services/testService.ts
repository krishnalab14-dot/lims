import apiClient from './api';

export const testService = {
  async getTests(orgId: string, labId: string) {
    const response = await apiClient.get(
      `/organizations/${orgId}/labs/${labId}/tests`
    );
    return response.data;
  },

  async createTest(
    orgId: string,
    labId: string,
    code: string,
    name: string,
    category: string,
    price: number,
    normalRange?: string,
    unit?: string,
    resultForm?: any
  ) {
    const response = await apiClient.post(
      `/organizations/${orgId}/labs/${labId}/tests`,
      {
        code,
        name,
        category,
        price,
        normalRange,
        unit,
        resultForm,
      }
    );
    return response.data;
  },

  async getTestGroups(orgId: string, labId: string) {
    const response = await apiClient.get(
      `/organizations/${orgId}/labs/${labId}/tests/groups`
    );
    return response.data;
  },

  async createTestGroup(
    orgId: string,
    labId: string,
    name: string,
    code: string,
    order: number = 0
  ) {
    const response = await apiClient.post(
      `/organizations/${orgId}/labs/${labId}/tests/groups`,
      { name, code, order }
    );
    return response.data;
  },
};
