import { AppShell } from '../../components/ui/app-shell';
import { DataTable } from '../../components/ui/data-table';
import { FilterBar } from '../../components/ui/filter-bar';
import { ModalForm } from '../../components/ui/modal-form';
import { Pagination } from '../../components/ui/pagination';
import { ToastStack } from '../../components/ui/toast-stack';
import { DashboardCards } from '../../components/dashboard/dashboard-cards';
import { DashboardGraph } from '../../components/dashboard/dashboard-graph';
import { RecentActivities } from '../../components/dashboard/recent-activities';
import { dashboardSnapshot } from '../../modules/dashboard/mock-data';

export default function DashboardPage() {
  return (
    <AppShell title="Modern LIMS Dashboard">
      <DashboardCards kpi={dashboardSnapshot.kpi} />
      <FilterBar />
      <DashboardGraph graph={dashboardSnapshot.graph} />
      <DataTable
        headers={['Metric', 'Value']}
        rows={dashboardSnapshot.graph.points.map((point) => [point.label, point.value.toString()])}
      />
      <Pagination page={1} totalPages={5} />
      <RecentActivities items={dashboardSnapshot.recentActivities} />
      <ModalForm title="Quick Add Patient">
        <input placeholder="Patient Name" aria-label="Patient Name" />
      </ModalForm>
      <ToastStack />
    </AppShell>
  );
}
