export type DashboardSummary = {
  dailyPatientCount: number;
  pendingSamples: number;
  pendingReports: number;
  completedReports: number;
  revenueSummary: {
    currency: 'USD';
    today: number;
    monthToDate: number;
  };
  inventoryAlerts: number;
};

export class DashboardService {
  getSummary(): DashboardSummary {
    return {
      dailyPatientCount: 128,
      pendingSamples: 34,
      pendingReports: 21,
      completedReports: 107,
      revenueSummary: {
        currency: 'USD',
        today: 8420,
        monthToDate: 147890,
      },
      inventoryAlerts: 6,
    };
  }
}
