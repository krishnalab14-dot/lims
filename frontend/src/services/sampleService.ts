import apiClient from './api';

export const sampleService = {
  async getSamples(
    orgId: string,
    labId: string,
    limit: number = 50,
    cursor?: string
  ) {
    const response = await apiClient.get(
      `/organizations/${orgId}/labs/${labId}/samples`,
      { params: { limit, cursor } }
    );
    return response.data;
  },

  async getSampleById(orgId: string, labId: string, sampleId: string) {
    const response = await apiClient.get(
      `/organizations/${orgId}/labs/${labId}/samples/${sampleId}`
    );
    return response.data;
  },

  async createSample(
    orgId: string,
    labId: string,
    patientId: string,
    sampleType: string,
    tests: string[]
  ) {
    const response = await apiClient.post(
      `/organizations/${orgId}/labs/${labId}/samples`,
      { patientId, sampleType, tests }
    );
    return response.data;
  },

  async updateSampleStatus(
    orgId: string,
    labId: string,
    sampleId: string,
    status: string
  ) {
    const response = await apiClient.patch(
      `/organizations/${orgId}/labs/${labId}/samples/${sampleId}`,
      { status }
    );
    return response.data;
  },
};
