import { DashboardKpi } from '../../modules/dashboard/types';

type DashboardCardsProps = {
  kpi: DashboardKpi;
};

export function DashboardCards({ kpi }: DashboardCardsProps) {
  const cards = [
    ['Daily Patient Count', kpi.dailyPatientCount.toString()],
    ['Pending Samples', kpi.pendingSamples.toString()],
    ['Pending Reports', kpi.pendingReports.toString()],
    ['Completed Reports', kpi.completedReports.toString()],
    ['Revenue Today', `${kpi.revenueSummary.currency} ${kpi.revenueSummary.today.toLocaleString()}`],
    ['Revenue MTD', `${kpi.revenueSummary.currency} ${kpi.revenueSummary.monthToDate.toLocaleString()}`],
    ['Inventory Alerts', kpi.inventoryAlerts.toString()],
  ] as const;

  return (
    <section>
      <h2>Dashboard Overview</h2>
      <div>
        {cards.map(([title, value]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
