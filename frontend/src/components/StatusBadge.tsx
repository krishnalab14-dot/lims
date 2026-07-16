import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColorMap: Record<string, string> = {
  PENDING_COLLECTION: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  RECEIVED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  PROCESSING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  VERIFIED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  RELEASED: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  CANCELLED: 'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const colorClass = statusColorMap[status] || 'bg-gray-100 text-gray-800';
  const displayStatus = status.replace(/_/g, ' ');

  return (
    <span className={clsx('px-2 py-1 text-xs font-medium rounded-full', colorClass, className)}>
      {displayStatus}
    </span>
  );
};
