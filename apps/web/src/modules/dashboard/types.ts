export type DashboardKpi = {
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

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
};

export type DashboardGraphPoint = {
  label: string;
  patients: number;
  completedReports: number;
  revenue: number;
};

export type DashboardSnapshot = {
  kpi: DashboardKpi;
  recentActivities: ActivityItem[];
  graph: DashboardGraphPoint[];
};
