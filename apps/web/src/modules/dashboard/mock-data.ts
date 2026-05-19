import { DashboardSnapshot } from './types';

export const dashboardSnapshot: DashboardSnapshot = {
  kpi: {
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
  },
  recentActivities: [
    { id: 'a1', actor: 'Receptionist', action: 'Registered patient #PT-10344', timestamp: '2026-05-19T08:13:00Z' },
    { id: 'a2', actor: 'Lab Technician', action: 'Completed sample #SM-7701', timestamp: '2026-05-19T08:05:00Z' },
    { id: 'a3', actor: 'Doctor', action: 'Approved report #RP-5521', timestamp: '2026-05-19T07:54:00Z' },
  ],
  graph: [
    { label: 'Mon', patients: 92, completedReports: 70, revenue: 6200 },
    { label: 'Tue', patients: 110, completedReports: 84, revenue: 7100 },
    { label: 'Wed', patients: 103, completedReports: 79, revenue: 6980 },
    { label: 'Thu', patients: 121, completedReports: 93, revenue: 7720 },
    { label: 'Fri', patients: 128, completedReports: 107, revenue: 8420 },
  ],
};
