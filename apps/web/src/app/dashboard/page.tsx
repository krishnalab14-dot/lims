import { DashboardCards } from '../../components/dashboard/dashboard-cards';
import { DashboardGraph } from '../../components/dashboard/dashboard-graph';
import { RecentActivities } from '../../components/dashboard/recent-activities';
import { dashboardSnapshot } from '../../modules/dashboard/mock-data';

export default function DashboardPage() {
  return (
    <main>
      <h1>LIMS Dashboard</h1>
      <DashboardCards kpi={dashboardSnapshot.kpi} />
      <DashboardGraph graph={dashboardSnapshot.graph} />
      <RecentActivities items={dashboardSnapshot.recentActivities} />
    </main>
  );
}
