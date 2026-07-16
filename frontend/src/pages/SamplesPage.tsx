import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { useSamples } from '../hooks/useSamples';
import { useUIStore } from '../store/uiStore';
import { StatusBadge } from '../components/StatusBadge';

export const SamplesPage: React.FC = () => {
  const { selectedOrgId, selectedLabId } = useUIStore();
  const { data: samplesData, isLoading, error } = useSamples(
    selectedOrgId || '',
    selectedLabId || '',
    50
  );

  if (isLoading) return <PageWrapper title="Samples"><div>Loading...</div></PageWrapper>;
  if (error) return <PageWrapper title="Samples"><div>Error loading samples</div></PageWrapper>;

  const samples = samplesData?.data || [];

  return (
    <PageWrapper title="Samples" description="View and manage lab samples">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Sample ID</th>
                <th className="px-4 py-2 text-left font-semibold">Patient</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {samples.map((sample: any) => (
                <tr
                  key={sample.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2 font-mono text-xs">{sample.sampleId}</td>
                  <td className="px-4 py-2">
                    {sample.patient.firstName} {sample.patient.lastName}
                  </td>
                  <td className="px-4 py-2">{sample.sampleType}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={sample.status} />
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {new Date(sample.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
};
