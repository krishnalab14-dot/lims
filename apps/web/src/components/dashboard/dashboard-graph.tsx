import { DashboardGraphPoint } from '../../modules/dashboard/types';

type DashboardGraphProps = {
  graph: DashboardGraphPoint[];
};

export function DashboardGraph({ graph }: DashboardGraphProps) {
  return (
    <section>
      <h2>Graphs and Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Patients</th>
            <th>Completed Reports</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {graph.map((point) => (
            <tr key={point.label}>
              <td>{point.label}</td>
              <td>{point.patients}</td>
              <td>{point.completedReports}</td>
              <td>{point.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
