import { ActivityItem } from '../../modules/dashboard/types';

type RecentActivitiesProps = {
  items: ActivityItem[];
};

export function RecentActivities({ items }: RecentActivitiesProps) {
  return (
    <section>
      <h2>Recent Activities</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.actor}</strong> — {item.action} <em>({new Date(item.timestamp).toLocaleString('en-US')})</em>
          </li>
        ))}
      </ul>
    </section>
  );
}
