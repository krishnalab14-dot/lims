import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { KPICard } from '../components/KPICard';
import { Sparkline } from '../components/Sparkline';
import { StatusBadge } from '../components/StatusBadge';
import { useDashboardStats } from '../hooks/useDashboard';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

export const DashboardPage: React.FC = () => {
  const { selectedOrgId, selectedLabId } = useUIStore();
  const { user } = useAuthStore();
  const { data: stats, isLoading, error } = useDashboardStats(selectedOrgId || '', selectedLabId || '');

  if (isLoading) return <PageWrapper title="Dashboard"><div>Loading...</div></PageWrapper>;
  if (error) return <PageWrapper title="Dashboard"><div>Error loading dashboard</div></PageWrapper>;

  const sparklineData = [
    { x: 'Mon', y: 45 },
    { x: 'Tue', y: 52 },
    { x: 'Wed', y: 48 },
    { x: 'Thu', y: 61 },
    { x: 'Fri', y: 55 },
    { x: 'Sat', y: 42 },
    { x: 'Sun', y: 38 },
  ];

  return (
    <PageWrapper title="Dashboard" description="Lab performance overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Samples"
          value={stats?.totalSamples || 0}
          color="blue"
          icon="📊"
        />
        <KPICard
          title="Pending"
          value={stats?.pendingSamples || 0}
          color="yellow"
          icon="⏳"
        />
        <KPICard
          title="Completed Today"
          value={stats?.completedToday || 0}
          color="green"
          icon="✓"
        />
        <KPICard
          title="Avg Processing"
          value={stats?.avgProcessingTime || 0}
          unit="min"
          color="blue"
          icon="⏱️"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-3">Samples Trend</h3>
          <Sparkline data={sparklineData} color="#3b82f6" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-3">Sample Status Distribution</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <StatusBadge status="RECEIVED" /> <span>45</span>
            </div>
            <div className="flex justify-between">
              <StatusBadge status="PROCESSING" /> <span>32</span>
            </div>
            <div className="flex justify-between">
              <StatusBadge status="COMPLETED" /> <span>120</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
